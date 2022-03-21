import pandas as pd

user_ratings_df_1 = pd.DataFrame.from_dict({
    'user_id': [1, 2, 3, 4, 5],
    'anime_id': [10, 20, 30, 30, 35],
    'rating_x': [6.0, 6.0, 6.0, 6.0, 6.0]
})


user_ratings_df_2 = pd.DataFrame.from_dict({
    'user_id': [1, 1, 1, 2, 3],
    'anime_id': [10, 15, 20, 25, 30],
    'rating_x': [5, 5, 5, 5, 5]
})

print(user_ratings_df_1)
print(user_ratings_df_2)

# user_ratings_df_1.set_index(['user_id', 'anime_id'], inplace=True)
# user_ratings_df_1.update(user_ratings_df_2.set_index(['user_id', 'anime_id']))
# user_ratings_df_1.reset_index(inplace=True)
#
# user_ratings_df = pd.concat([user_ratings_df_1, user_ratings_df_2]).drop_duplicates()

a = user_ratings_df_1.set_index(['user_id', 'anime_id'])
b = user_ratings_df_2.set_index(['user_id', 'anime_id'])

res = a.combine_first(b)\
    .reset_index().reindex(columns=user_ratings_df_2.columns)

print(res)
