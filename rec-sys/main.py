from random import randint
from tensorflow import keras
from sklearn.metrics.pairwise import euclidean_distances as ED

import pandas as pd
import numpy as np
import collections
import tensorflow as tf

from keras import backend as K


temp_df = pd.read_csv('users_cleaned.csv')
temp_df = temp_df.dropna(subset=['username'])
users_df = temp_df[["user_id", "username", "gender", "location", "birth_date"]]
# print(users_df.head())

user_cat_feats = ["username", "gender", "location", "birth_date"]
users_ohe_df = users_df.user_id
for feat in user_cat_feats:
    ohe_feat_df = pd.get_dummies(users_df[feat], prefix=feat)
    users_ohe_df = pd.concat([users_ohe_df, ohe_feat_df], axis=1)

# print(users_ohe_df.head())

anime_df = pd.read_csv('anime_cleaned.csv')
# print(anime_df.head())

anime_cat_feats = ["title", "type", "source", "episodes", "status", "studio", "genre", "rating", "aired_from_year"]
anime_ohe_df = anime_df.anime_id
for feat in anime_cat_feats:
    ohe_feat_df = pd.get_dummies(anime_df[feat], prefix=feat)
    anime_ohe_df = pd.concat([anime_ohe_df, ohe_feat_df], axis=1)

print(anime_ohe_df.head())

interactions_df = pd.read_csv('interactions.csv')
interactions_df['user_id'] = interactions_df['username'].map(dict(zip(users_df.username, users_df.user_id)))
print(interactions_df.head(5))

valid_users = []

c = collections.Counter(interactions_df.user_id)
for user_id, entries in c.most_common():
    if entries > 10:
        valid_users.append(user_id)

valid_items = []

c = collections.Counter(interactions_df.anime_id)
for anime_id, entries in c.most_common():
    if entries > 10:
        valid_items.append(anime_id)

interactions_df = interactions_df[interactions_df.user_id.isin(valid_users)]
interactions_df = interactions_df[interactions_df.anime_id.isin(valid_items)]

print(f"N users after: {interactions_df.user_id.nunique()}")
print(f"N anime after: {interactions_df.anime_id.nunique()}")

common_users = set(interactions_df.user_id.unique()).intersection(set(users_ohe_df.user_id.unique()))
common_items = set(interactions_df.anime_id.unique()).intersection(set(anime_ohe_df.anime_id.unique()))

print(len(common_users))
print(len(common_items))

interactions_df = interactions_df[interactions_df.anime_id.isin(common_items)]
interactions_df = interactions_df[interactions_df.user_id.isin(common_users)]

anime_ohe_df = anime_ohe_df[anime_ohe_df.anime_id.isin(common_items)]
users_ohe_df = users_ohe_df[users_ohe_df.user_id.isin(common_users)]

interactions_df["uid"] = interactions_df["user_id"].astype("category")
interactions_df["uid"] = interactions_df["uid"].cat.codes

interactions_df["iid"] = interactions_df["anime_id"].astype("category")
interactions_df["iid"] = interactions_df["iid"].cat.codes

print(sorted(interactions_df.iid.unique())[:5])
print(sorted(interactions_df.uid.unique())[:5])
interactions_df.head()

interactions_vec = np.zeros((interactions_df.uid.nunique(),
                             interactions_df.iid.nunique()))

for user_id, anime_id in zip(interactions_df.uid, interactions_df.iid):
    interactions_vec[user_id, anime_id] += 1

res = interactions_vec.sum(axis=1)
for i in range(len(interactions_vec)):
    interactions_vec[i] /= res[i]

print(interactions_df.anime_id.nunique())
print(anime_ohe_df.anime_id.nunique())
print(interactions_df.user_id.nunique())
print(users_ohe_df.user_id.nunique())

set(anime_ohe_df.anime_id.unique()) - set(interactions_df.anime_id.unique())

iid_to_item_id = interactions_df[["iid", "anime_id"]].drop_duplicates().set_index("iid").to_dict()["anime_id"]
item_id_to_iid = interactions_df[["iid", "anime_id"]].drop_duplicates().set_index("anime_id").to_dict()["iid"]

uid_to_user_id = interactions_df[["uid", "user_id"]].drop_duplicates().set_index("uid").to_dict()["user_id"]
user_id_to_uid = interactions_df[["uid", "user_id"]].drop_duplicates().set_index("user_id").to_dict()["uid"]

anime_ohe_df["iid"] = anime_ohe_df["anime_id"].apply(lambda x: item_id_to_iid[x])
items_ohe_df = anime_ohe_df.set_index("iid")

users_ohe_df["uid"] = users_ohe_df["user_id"].apply(lambda x: user_id_to_uid[x])
users_ohe_df = users_ohe_df.set_index("uid")


def triplet_loss(y_true, y_pred, n_dims=128, alpha=0.4):
    anchor = y_pred[:, 0:n_dims]
    positive = y_pred[:, n_dims:n_dims * 2]
    negative = y_pred[:, n_dims * 2:n_dims * 3]

    pos_dist = K.sum(K.square(anchor - positive), axis=1)
    neg_dist = K.sum(K.square(anchor - negative), axis=1)

    basic_loss = pos_dist - neg_dist + alpha
    loss = K.maximum(basic_loss, 0.0)

    return loss


def generator(items, users, interactions, batch_size=1024):
    while True:
        uid_meta = []
        uid_interaction = []
        pos = []
        neg = []
        for _ in range(batch_size):
            uid_i = randint(0, interactions.shape[0] - 1)
            pos_i = np.random.choice(range(interactions.shape[1]), p=interactions[uid_i])
            neg_i = np.random.choice(range(interactions.shape[1]))
            uid_meta.append(users.iloc[uid_i])
            pos.append(items.iloc[pos_i])
            neg.append(items.iloc[neg_i])

        yield [np.array(uid_meta), np.array(uid_interaction), np.array(pos), np.array(neg)], [np.array(uid_meta),
                                                                                              np.array(uid_interaction),
                                                                                              np.array(pos),
                                                                                              np.array(neg)]


gen = generator(items=items_ohe_df.drop(["anime_id"], axis=1),
                users=users_ohe_df.drop(["user_id"], axis=1),
                interactions=interactions_vec)

