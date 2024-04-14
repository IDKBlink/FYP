console.log("working fine");

$("#commentForm").submit(function (e) {
    
    e.preventDefault();//prevent the website from reload when clicking in the submit button

    $.ajax({
        data: $(this).serialize(),

        method: $(this).attr("method"),

        url: $(this).attr("action"),

        dataType: "json",

        success: function(res){
            console.log("Comment Saved to DB...");

            if (res.bool == true) {
                $("#review-res").html("Review added successfully.")
            }

        }
    })

})