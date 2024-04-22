from django.urls import path
from core.views import index, category_list_view,  category_product_list__view, product_list_view, vendor_list_view, vendor_detail_view, product_detail_view, tag_list, ajax_add_review, search_view, filter_product, add_to_cart, cart_view, delete_item_from_cart, update_cart, checkout_view, payment_completed_view, contact, ajax_contact_form, wishlist_view, add_to_wishlist, customer_dashboard, order_detail, payment_failed_view

app_name = "core"

urlpatterns = [

    # Home page
    path("", index, name='index'),
    path("products/", product_list_view, name='product-list'),
    path("product/<pid>/", product_detail_view, name='product-detail'),

    # Category
    path("category/", category_list_view, name='category-list'),
    path("category/<cid>/", category_product_list__view, name='category-product-list'),

    # Vendor
    path("vendors/", vendor_list_view, name="vendor-list"),
    path("vendor/<vid>/", vendor_detail_view, name="vendor-detail"),

    # Tags
    path("products/tag/<slug:tag_slug>/", tag_list, name="tags"),

    # Add reviews
    path("ajax-add-review/<pid>", ajax_add_review, name="ajax-add-review"),

    # Serach
    path("search/", search_view, name="search"),


    # Filter Product url
    path("filter-products/", filter_product, name="filter-product"),

     # Add to cart URL
    path("add-to-cart/", add_to_cart, name="add-to-cart"),

    # Cart Page URL
    path("cart/", cart_view, name="cart"),

    # Delete ITem from Cart
    path("delete-from-cart/", delete_item_from_cart, name="delete-from-cart"),

    # Update  Cart
    path("update-cart/", update_cart, name="update-cart"),

    # Checkout  URL
    path("checkout/", checkout_view, name="checkout"),

    # Payment Successful
    path("payment-completed/", payment_completed_view, name="payment-completed"),

    # Payment Failed
    path("payment-failed/", payment_failed_view, name="payment-failed"),

    # Dahboard URL
    path("dashboard/", customer_dashboard, name="dashboard"),

    # Order Detail URL
    path("dashboard/order/<int:id>", order_detail, name="order-detail"),

    # wishlist page
    path("wishlist/", wishlist_view, name="wishlist"),

    # adding to wishlist
    path("add-to-wishlist/", add_to_wishlist, name="add-to-wishlist"),

    path("contact/", contact, name="contact"),

    path("ajax-contact-form/", ajax_contact_form, name="ajax-contact-form"),


]
