# Generated by Django 5.0.1 on 2024-04-11 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_product_stock_count_product_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='type',
            field=models.CharField(default='Organic', max_length=100),
        ),
    ]