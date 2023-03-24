{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            // Using preventDefault() can stop the browser from executing that default behavior(submitting)
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                // serialize() js fun gets data from a form and converts it into a query string
                // The data attribute is used to set or get data values associated with forms
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();
}