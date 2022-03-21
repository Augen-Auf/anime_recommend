import pandas as pd
import seaborn as sns
import pickle
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from surprise import accuracy

sns.set_style("darkgrid")

anime_df = pd.read_csv('SVD_data/anime.csv')
rate_df = pd.read_csv('SVD_data/rating.csv')
algo = SVD()
filename = 'models/finalized_model.sav'


def combine_df(df_for_upd, df_with_changes):
    a = df_for_upd.set_index(['user_id', 'anime_id'])
    b = df_with_changes.set_index(['user_id', 'anime_id'])

    res = b.combine_first(a) \
        .reset_index().reindex(columns=df_with_changes.columns)

    return res


def save_to_csv(df):
    df_to_save = df
    df_to_save.rename({'rating_x': 'rating'})
    df_to_save.to_csv('SVD_data/rating.csv')


def get_top_n(user_id, n=10):
    data_pred = []
    for row in anime_df.itertuples():
        est_score = algo.predict(user_id, row[1]).est
        data_pred.append((user_id, row[1], est_score))
    data_pred = pd.DataFrame(data_pred, columns=['user_id', 'anime_id', 'rating'])

    return data_pred.sort_values(by=['rating'], ascending=False)[:n]


def train_model(user_id, anime_ratings):
    full_df = rate_df.merge(anime_df, how='left', left_on=['anime_id'], right_on=['anime_id'])
    df = full_df[full_df['rating_x'] != -1]
    df = df[['user_id', 'anime_id', 'rating_x']]

    if anime_ratings:
        user_ratings_df = pd.DataFrame.from_dict({
            'user_id': [user_id for id in anime_ratings.keys()],
            'anime_id': anime_ratings.keys(),
            'rating_x': anime_ratings.values()
        })

        df = combine_df(df, user_ratings_df)
        save_to_csv(df)

    reader = Reader(rating_scale=(0, 10))
    data = Dataset.load_from_df(df, reader)

    trainset, testset = train_test_split(data, test_size=0.25)
    predictions = algo.fit(trainset).test(testset)
    print(accuracy.rmse(predictions))
    # algo.fit(data.build_full_trainset())
    # pickle.dump(algo, open(filename, 'wb'))


def make_predict(user_id):
    global algo
    algo = pickle.load(open(filename, 'rb'))
    predictions = get_top_n(user_id)
    print(predictions)
    return predictions['anime_id'].tolist()

