# Generated by Django 5.1.1 on 2024-12-03 07:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_post_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='image',
            field=models.ImageField(upload_to='images/'),
        ),
    ]
