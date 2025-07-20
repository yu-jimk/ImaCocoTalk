json.name @user.name
json.avatar @user.gravatar_url(size: 100)
json.email @user.email
json.bio @user.bio || ""
json.joinDate @user.join_date
json.totalPosts @user.total_posts
json.totalCheckins @user.total_checkins
json.favoriteStores @user.favorite_stores_count
json.likedPostsCount @user.liked_posts_count
