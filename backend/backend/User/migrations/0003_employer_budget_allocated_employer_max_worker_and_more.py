# Generated by Django 5.0.4 on 2024-04-12 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0002_remove_candidate_start_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='employer',
            name='Budget_allocated',
            field=models.IntegerField(default=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employer',
            name='Max_worker',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employer',
            name='Min_worker',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employer',
            name='Skill_Requirement',
            field=models.CharField(default='hello', max_length=1000),
            preserve_default=False,
        ),
    ]