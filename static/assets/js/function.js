console.log("working fine");
const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

$("#commentForm").submit(function (e) { 
    e.preventDefault();//prevent the website from reload when clicking in the submit button

    let dt = new Date();
    let time = dt.getDay() + " " + monthNames[dt.getUTCMonth()] + ", " + dt.getFullYear()

    $.ajax({
        data: $(this).serialize(),

        method: $(this).attr("method"),

        url: $(this).attr("action"),

        dataType: "json",

        success: function(res){
            console.log("Comment Saved to DB...");

            if (res.bool == true) {
                $("#review-res").html("Review added successfully.")
                $(".hide-comment-form").hide()
                $(".add-review").hide()

                let _html ='<div class="single-comment justify-content-between d-flex mb-30">'
                _html += '<div class="user justify-content-between d-flex">'
                _html += '<div class="thumb text-center">'
                _html += '<img src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" alt="" />'
                _html += '<a href="#" class="font-heading text-brand">' + res.context.user + '</a>'
                _html += '</div>'

                _html += '<div class="desc">'
                _html += '<div class="d-flex justify-content-between mb-10">'
                _html += '<div class="d-flex align-items-center">'
                _html += '<span class="font-xs text-muted">' + time + ' </span>'
                _html += '</div>'

                for (var i = 1; i <= res.context.rating; i++) {
                    _html += '<i class="fas fa-star text-warning"></i>';
                }

                _html += '</div>'
                _html += '<p class="mb-10">' + res.context.review + '</p>'

                _html += '</div>'
                _html += '</div>'
                _html += ' </div>'

                $(".comment-list").prepend(_html)
            }

        }
    })

})


// $(document).ready(function () {
//     $(".filter-checkbox, #price-filter-btn").on("click", function () {
//         console.log("A checkbox have been clicked");

//         let filter_object = {}

//         $(".filter-checkbox").each(function () {
//             let filter_value = $(this).val()
//             let filter_key = $(this).data("filter") // vendor, category

//             // console.log("Filter value is:", filter_value);
//             // console.log("Filter key is:", filter_key);

//             filter_object[filter_key] = Array.from(document.querySelectorAll('input[data-filter=' + filter_key + ']:checked')).map(function (element) {
//                 return element.value
//             })
//         })
//         console.log("Filter Object is: ", filter_object);
//         $.ajax({
//             url: '/filter-products',
//             data: filter_object,
//             dataType: 'json',
//             beforeSend: function () {
//                 console.log("Trying to filter product...");
//             },
//             success: function (response) {
//                 console.log(response);
//                 console.log("Data filtred successfully...");
//                 $("#filtered-product").html(response.data)
//             }
//         })
//     })
// })
$(document).ready(function () {
    $(".filter-checkbox, #price-filter-btn").on("click", function () {
        console.log("A checkbox or the price filter button has been clicked");

        let filter_object = {};

        $(".filter-checkbox").each(function () {
            let filter_value = $(this).val();
            let filter_key = $(this).data("filter"); // vendor, category

            filter_object[filter_key] = Array.from(document.querySelectorAll('input[data-filter=' + filter_key + ']:checked')).map(function (element) {
                return element.value;
            });
        });

        // Adding price filter to the filter object
        let minPrice = $('#range').attr('min');
        let maxPrice = $('#range').val();
        filter_object['price'] = [minPrice, maxPrice];

        console.log("Filter Object is: ", filter_object);

        $.ajax({
            url: '/filter-products',
            data: filter_object,
            dataType: 'json',
            beforeSend: function () {
                console.log("Trying to filter product...");
            },
            success: function (response) {
                console.log(response);
                console.log("Data filtered successfully...");
                $("#filtered-product").html(response.data);
            }
        });
    });

    // Add event listener for input range change
    $('#range').on('input', function () {
        let minPrice = $('#range').attr('min');
        let maxPrice = $('#range').val();
        $('#slider-range-value1').text('$' + minPrice);
        $('#slider-range-value2').text('$' + maxPrice);
    });

    // Add to cart functionality
    $(".add-to-cart-btn").on("click", function(){

        let this_val = $(this)
        let index = this_val.attr("data-index")

        let quantity = $(".product-quantity-" + index).val()
        let product_title = $(".product-title-" + index).val()

        let product_id = $(".product-id-" + index).val()
        let product_price = $(".current-product-price-" + index).text()

        let product_pid = $(".product-pid-" + index).val()
        let product_image = $(".product-image-" + index).val()
        

        console.log("Quantity:", quantity);
        console.log("Title:", product_title);
        console.log("Price:", product_price);
        console.log("ID:", product_id);
        console.log("PID:", product_pid);
        console.log("Image:", product_image);
        console.log("Index:", index);
        console.log("Currrent Element:", this_val);

        $.ajax({
            url: '/add-to-cart/',
            data:{
                'id': product_id,
                'pid': product_pid,
                'image': product_image,// Include the image parameter
                'qty': quantity,
                'title': product_title,
                'price': product_price,
            },
            dataType: 'json',
            beforeSend: function(){
                console.log("Adding Product to Cart...");
            },
            success: function(data){ // Use 'data' instead of 'response'
                this_val.html("✔");
                console.log("Added Product to Cart");
                $(".cart-items-count").text(data.totalcartitems); // Access 'data' instead of 'response'
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(xhr.responseText); // Log any error response
            }
        });
    });


    $(".delete-product").on("click", function (){

        let product_id = $(this).attr("data-product")
        let this_val = $(this)

        console.log("PRoduct ID:", product_id);

        $.ajax({
            url: "/delete-from-cart",
            data: {
                "id": product_id
            },
            dataType: "json",
            beforeSend: function () {
                this_val.hide()
            },
            success: function (response) {
                this_val.show()
                $(".cart-items-count").text(response.totalcartitems)
                $("#cart-list").html(response.data)
            }
        })
        

    })

    $(".update-product").on("click", function (){

        let product_id = $(this).attr("data-product")
        let this_val = $(this)
        let product_quantity = $(".product-qty-"+product_id).val();


        console.log("PRoduct ID:", product_id);
        console.log("PRoduct QTY:", product_quantity);


        $.ajax({
            url: "/update-cart",
            data: {
                "id": product_id,
                "qty" : product_quantity,
            },
            dataType: "json",
            beforeSend: function () {
                this_val.hide()
            },
            success: function (response) {
                this_val.show()
                $(".cart-items-count").text(response.totalcartitems)
                $("#cart-list").html(response.data)
            }
        })
        

    })

    $(".checkout-btn").on("click", function(){
        $.ajax({
            url: '/checkout-items/',
            dataType: 'json',
            beforeSend: function(){
                console.log("Initiating Checkout...");
            },
            success: function(data){
                console.log("Checkout Successful");
                // Handle success, e.g., redirect to thank you page
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("Error during checkout:", xhr.responseText);
                // Handle error
            }
        });
    });
    

    // Making Default Address
    $(document).on("click", ".make-default-address", function (){
        let id = $(this).attr("data-address-id")
        let this_val = $(this)

        console.log("ID is:", id);
        console.log("Element is:", this_val);

        $.ajax({
            url: "/make-default-address",
            data: {
                "id": id
            },
            dataType: "json",
            success: function (response) {
                console.log("Address Made Default....");
                if (response.boolean == true) {
                    $(".check").hide()
                    $(".action_btn").show()

                    $(".check" + id).show()
                    $(".button" + id).hide()
                }
            }
        })
    })

    // Adding to wishlist
    $(document).on("click", ".add-to-wishlist", function (){
        let product_id = $(this).attr("data-product-item")
        let this_val = $(this)

        console.log("PRoduct ID IS", product_id);

        $.ajax({
            url: "/add-to-wishlist",
            data: {
                "id": product_id
            },
            dataType: "json",
            beforeSend: function () {
                console.log("Adding to wishlist...")
            },
            success: function (response) {
                this_val.html("✓")
                if (response.bool === true) {
                    console.log("Added to wishlist...");
                }
            }

        })
    })


    //Adding Contact page
    $(document).on("submit", "#contact-form-ajax", function(e){
        e.preventDefault()
        console.log("Submited...");

        let full_name = $("#full_name").val()
        let email = $("#email").val()
        let phone = $("#phone").val()
        let subject = $("#subject").val()
        let message = $("#message").val()

        console.log("Name:", full_name);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Subject:", subject);
        console.log("MEssage:", message);

        $.ajax({
            url: "/ajax-contact-form",
            data: {
                "full_name": full_name,
                "email": email,
                "phone": phone,
                "subject": subject,
                "message": message,
            },
            dataType: "json",
            beforeSend: function () {
                console.log("Sending Data to Server...");
            },
            success: function (res) {
                console.log("Sent Data to server!");
                $(".contact_us_p").hide()
                $("#contact-form-ajax").hide()
                $("#message-response").html("Message sent successfully.")

            }
        })
    })
});




// // Add to cart functionality
// $(".add-to-cart-btn").on("click", function(){
//     let quantity = $("#product-quantity").val();
//     let product_title = $(".product-title").val();
//     let product_id = $(".product-id").val();
//     let product_price = $("#current-product-price").text();
//     let product_image = $("#current-product-image").attr("src"); // assuming the image is retrieved from an <img> tag
//     let this_val = $(this);

//     console.log("Quantity:", quantity);
//     console.log("Title:", product_title);
//     console.log("Price:", product_price);
//     console.log("ID:", product_id);
//     console.log("Image:", product_image);
//     console.log("Currrent Element:", this_val);

//     $.ajax({
//         url: '/add-to-cart/',
//         data:{
//             'id': product_id,
//             'qty': quantity,
//             'title': product_title,
//             'price': product_price,
//             'image': product_image, // Include the image parameter
//         },
//         dataType: 'json',
//         beforeSend: function(){
//             console.log("Adding Product to Cart...");
//         },
//         success: function(data){ // Use 'data' instead of 'response'
//             this_val.html("Item added to Cart");
//             console.log("Added Product to Cart");
//             $(".cart-items-count").text(data.totalcartitems); // Access 'data' instead of 'response'
//         },
//         error: function(xhr, textStatus, errorThrown) {
//             console.log(xhr.responseText); // Log any error response
//         }
//     });
// });
