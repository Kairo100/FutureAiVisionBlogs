from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.auth.models import User

class Category(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='images/')
    
    @property
    def post_count(self):
        return self.posts.count()  # Returns the number of related posts

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='images/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1, related_name='posts')
    popular = models.BooleanField(default=False)
    hot = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    
    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']  # Order posts by the most recent ones


# Signal to update post count after a post is created or updated
@receiver(post_save, sender=Post)
def update_post_count_on_create_or_update(sender, instance, **kwargs):
    # Get the related category of the post
    category = instance.category
    # No need to set post_count directly, just ensure the related posts are added/deleted correctly
    # The post_count property will return the correct count when accessed

# Signal to update post count after a post is deleted
@receiver(post_delete, sender=Post)
def update_post_count_on_delete(sender, instance, **kwargs):
    # Get the related category of the post
    category = instance.category
    # No need to set post_count directly, just ensure the related posts are added/deleted correctly
    # The post_count property will return the correct count when accessed




class Comment(models.Model):
    post = models.ForeignKey('Post', related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by anyone on {self.post.title}"

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class Reply(models.Model):
    comment = models.ForeignKey(Comment, related_name='replies', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Associate reply with a user
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reply by {self.user.username} to comment {self.comment.id}"
