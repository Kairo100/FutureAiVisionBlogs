from django.urls import path
from .views import PostListView, PostDetailView 
from .views import CategoryListView, CategoryDetailView,search_posts,subscribe
urlpatterns = [
    path('api/posts/', PostListView.as_view(), name='post-list'),
    path('api/posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('api/categories/', CategoryListView.as_view(), name='category-list'),  # URL for listing categories
    path('api/categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    # path('api/posts/<int:post_id>/comments/', fetch_comments, name='fetch_comments'),
    # path('api/posts/<int:post_id>/comments/add/', submit_comment, name='submit_comment'),
     path('api/posts/', search_posts, name='search_posts'),
    path('api/subscribe/', subscribe, name='subscribe'),
     #path('api/posts/<int:post_id>/comments/', comments_view, name='comments_view'),
    #  path('api/posts/<int:post_id>/comments/', PostCommentsAPIView.as_view(), name='post-comments'),
    #     # URL for category detail page
 # Comment URLs
   # path('api/posts/<int:pk>/comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    # path('api/comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),

    # # Reply URLs
    # path('api/comments/<int:pk>/replies/', ReplyListCreateView.as_view(), name='reply-list-create'),
    # path('api/replies/<int:pk>/', ReplyDetailView.as_view(), name='reply-detail'),

]