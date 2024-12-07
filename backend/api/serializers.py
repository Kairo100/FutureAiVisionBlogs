from rest_framework import serializers
from .models import Post
from .models import Category
from .models import Comment, Reply
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
# from django_comments.models import Comment
class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    class Meta:
        model=Post
        fields='__all__' #columns
        


class CategorySerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    class Meta:
        model = Category
        fields = '__all__'  # Include all fields from the Category model



# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = ['id', 'user_name', 'comment', 'submit_date', 'object_pk']  # Include relevant fields


# class CommentSerializer(serializers.ModelSerializer):
#     user = serializers.StringRelatedField(read_only=True)  # Display username of the user, not editable

#     class Meta:
#         model = Comment
#         fields = ['id',  'text', 'created_at']

#     def create(self, validated_data):
#         # Automatically assign the authenticated user when creating a comment
#         user = self.context['request'].user  # Get the authenticated user from the request context
#         validated_data['user'] = user
#         return super().create(validated_data)
# class ReplySerializer(serializers.ModelSerializer):
#     user = serializers.StringRelatedField(read_only=True)  # Display username of the user, not editable

#     class Meta:
#         model = Reply
#         fields = ['id', 'user', 'text', 'created_at']

#     def create(self, validated_data):
#         # Automatically assign the authenticated user when creating a reply
#         user = self.context['request'].user  # Get the authenticated user from the request context
#         validated_data['user'] = user
#         return super().create(validated_data)
    

# @permission_classes([IsAuthenticated])
# def create_reply(request, comment_id):
#     # Handle creating a reply
#     pass