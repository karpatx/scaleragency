# Generated by Django 5.2 on 2024-11-18 14:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointmentsrest', '0003_employee_department_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='department',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='appointmentsrest.department'),
        ),
    ]
