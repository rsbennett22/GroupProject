# Generated by Django 3.2.12 on 2022-05-04 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dogWalkers', '0002_auto_20220503_2045'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dogwalker',
            name='acpt_18k',
        ),
        migrations.RemoveField(
            model_name='dogwalker',
            name='acpt_45k',
        ),
        migrations.RemoveField(
            model_name='dogwalker',
            name='acpt_7k',
        ),
        migrations.RemoveField(
            model_name='dogwalker',
            name='acpt_abv_45k',
        ),
        migrations.RemoveField(
            model_name='dogwalker',
            name='avbl_aftn',
        ),
        migrations.RemoveField(
            model_name='dogwalker',
            name='avbl_eve',
        ),
        migrations.RemoveField(
            model_name='dogwalker',
            name='avbl_morn',
        ),
        migrations.AddField(
            model_name='dogwalker',
            name='has_avbl',
            field=models.BooleanField(default=False),
        ),
    ]
