from core.models import CartOrderProducts, Product, Category, Vendor, CartOrder, ProductImages, ProductReview, wishlist_model, Address

def default(request):
    categories = Category.objects.all()
    address = Address.objects.get(user=request.user )
    return{
        'categories':categories,
        'address':address,
    }