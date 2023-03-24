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
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost); // prepend meand add front of the list
                    deletePost($(' .delete-post-button', newPost));
                  }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    // method to create a post in DOM
let newPostDom = function(post){
    return $(` <li id="post-${ post._id }">
    <p>
      
         <small>
           <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
         </small>
      
         ${ post.content } <br>
         <small>
           ${ post.user.name }
         </small>
    </p>
      <div class="post-comments">
       
         <form action="/comments/create" method="post">
           <input type="text"  name="content" placeholder="Type Comments..." required>
           <input type="hidden" name="post" value="${ post._id }" >
           <input type="submit"  value="Add Comment">
         </form>
        
  
         <div class="post-comments-list">
           <ul id="post-comments-${ post._id }">
           </ul>
         </div>
      </div>
    </li> `
  )}

  // method to delete a post from DOM
  let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'), // it can get the value of a tag
        success: function(data){
          $(`#post-${data.data.post_id}`).remove();
        },
        error: function(error){
          console.log(error.responseText);
        }
      })
    })
  }

  

    createPost();
}