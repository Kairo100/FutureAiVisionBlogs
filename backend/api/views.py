from django.shortcuts import render
from rest_framework import generics
from .models import Post
from .serializers import PostSerializer,CategorySerializer
from django.views.generic import ListView, DetailView
from .models import Category
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import  Reply
from django.core.exceptions import PermissionDenied
from rest_framework.views import APIView
# from django_comments.models import Comment
from django.contrib.contenttypes.models import ContentType
# from django_comments.forms import CommentForm
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Subscriber
import json
from django.db.models import Q
# View to list all posts
class PostListView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# View to retrieve a single post
class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer




def fetch_comments(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    comments = Comment.objects.filter(object_pk=post.id).values(
        'id', 'user_name', 'comment', 'submit_date'
    )
    return JsonResponse(list(comments), safe=False)

# from django_comments.forms import CommentForm
# from django.http import JsonResponse
# from django.contrib.contenttypes.models import ContentType
# from django.contrib.sites.models import Site

# def submit_comment(request, post_id):
#     if request.method == 'POST':
#         data = request.POST.copy()
#         data.update({
#             'content_type': ContentType.objects.get(app_label='your_app', model='post').id,  # Replace 'your_app' and 'post'
#             'object_pk': post_id,
#             'site': Site.objects.get_current().id,  # Ensure the Site framework is configured
#         })

#         form = CommentForm(data)

#         if form.is_valid():
#             form.save()
#             return JsonResponse({'success': True, 'message': 'Comment added successfully!'})
#         return JsonResponse({'success': False, 'errors': form.errors}, status=400)

#     return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=405)


def search_posts(request):
    query = request.GET.get('search', '')
    if query:
        posts = Post.objects.filter(Q(title__icontains=query) | Q(content__icontains=query))
    else:
        posts = Post.objects.all()
    data = [{'id': post.id, 'title': post.title} for post in posts]
    return JsonResponse(data, safe=False)







# views.py


@csrf_exempt
def subscribe(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            if not email:
                return JsonResponse({'success': False, 'message': 'Email is required'}, status=400)
            
            # Check if the email already exists
            if Subscriber.objects.filter(email=email).exists():
                return JsonResponse({'success': False, 'message': 'Email already subscribed'}, status=400)

            # Save the subscriber
            Subscriber.objects.create(email=email)
            return JsonResponse({'success': True, 'message': 'Subscription successful!'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': 'An error occurred'}, status=500)
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=405)

# class PostCommentsAPIView(APIView):
#     def get(self, request, post_id):
#         post = Post.objects.get(id=post_id)
#         content_type = ContentType.objects.get_for_model(Post)
#         comments = Comment.objects.filter(content_type=content_type, object_pk=post_id)
#         serializer = CommentSerializer(comments, many=True)
#         return Response(serializer.data)

# @api_view(['GET', 'POST'])
# def comments_view(request, post_id):
#     if request.method == 'GET':
#         # Fetch comments for the specific post
#         comments = Comment.objects.filter(object_pk=post_id).order_by('-submit_date')
#         data = [
#             {
#                 'id': comment.id,
#                 'user_name': comment.user_name,
#                 'submit_date': comment.submit_date,
#                 'comment': comment.comment,
#             }
#             for comment in comments
#         ]
#         return Response(data)

#     if request.method == 'POST':
#         # Save a new comment
#         form = CommentForm(data=request.data)
#         if form.is_valid():
#             comment = form.save()
#             return Response({
#                 'id': comment.id,
#                 'user_name': comment.user_name,
#                 'submit_date': comment.submit_date,
#                 'comment': comment.comment,
#             }, status=201)
#         return Response({'error': 'Invalid comment data'}, status=400)

# # View for listing and creating comments
# class CommentListCreateView(generics.ListCreateAPIView):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer
   

   

# # View for retrieving, updating or deleting a specific comment
# class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer

# # View for listing and creating replies
# class ReplyListCreateView(generics.ListCreateAPIView):
#     queryset = Reply.objects.all()
#     serializer_class = ReplySerializer

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user, comment_id=self.kwargs['comment_id'])

# # View for retrieving, updating or deleting a specific reply
# class ReplyDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Reply.objects.all()
#     serializer_class = ReplySerializer
