from django.urls import path
from core.views import index, category_list_view,  category_product_list__view, product_list_view, vendor_list_view


app_name = "core"

urlpatterns = [

    # Home page
    path("", index, name='index'),
    path("product/", product_list_view, name='product-list'),

    # Category
    path("category/", category_list_view, name='category-list'),
    path("category/<cid>/", category_product_list__view, name='category-product-list'),

    # Vendor
    path("vendors/", vendor_list_view, name="vendor-list"),
]
