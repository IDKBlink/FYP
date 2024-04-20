from core.models import CartOrderProducts, Product, Category, Vendor, CartOrder, ProductImages, ProductReview, wishlist_model, Address
from ast import Add


def default(request):
    categories = Category.objects.all()
    vendors = Vendor.objects.all()

    try:
        address = Address.objects.get(user=request.user)
    except:
        address = None
    return{
        'categories':categories,
        'address':address,
        'vendors':vendors,
    }