# Generated by Django 5.2 on 2024-11-18 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointmentsrest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='title',
            field=models.CharField(default='', max_length=200),
        ),
    ]
