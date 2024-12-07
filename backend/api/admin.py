from django.contrib import admin
from .models import Post,Category,Comment,Reply,Subscriber

admin.site.register(Post)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Reply)
admin.site.register(Subscriber)
