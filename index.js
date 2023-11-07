$(document).ready(function(){
    loadPosts();
    $("#add-btn").click(addPost);
    $(document).on('click', '.delete', deletePost);
    $(document).on('click', '.edit', editPost);
})

function addPost(){
    var title = $("#post").val();
    var body = $("#post").val();
if(title) {

    $.ajax({
         url: "https://654a5fef1f197d51e49224e1.mockapi.io/posts",
        method: "POST",
        data: {title, body},
        success: function(response){
            console.log(response)
            loadPosts();
        }
    })
}
}

function loadPosts(){
    $.ajax({
        // url: "https://jsonplaceholder.typicode.com/posts",
        url: "https://654a5fef1f197d51e49224e1.mockapi.io/posts",
        method: "GET",
        
        success:function(response){
            $("#post-list").empty();
            response.forEach(function(element) {
                $("#post-list").append('<li id=' + element.id + '>' + element.title + '<button class="edit" > Edit </button> <button class="delete"> Delete </button></li>');
            });
            
        }
})

}

function deletePost(){
    var list = $(this).parent().attr('id');
    $.ajax({
        url: "https://654a5fef1f197d51e49224e1.mockapi.io/posts/" + list,
        method: "DELETE",
        
        success:function(response){
            console.log(response)
            loadPosts();
        }});

}


function editPost(){
    
    var list = $(this).parent().attr('id');
    
    $("#post").attr('placeholder', 'Edit Here and press Enter');
    $("add-btn").css('display', 'none')
    $("#post").keypress(function(event){

        if(event.which === 13){
            var title = $("#post").val();
    var body = $("#post").val();
            $.ajax({
                url: "https://654a5fef1f197d51e49224e1.mockapi.io/posts/" + list,
                method: "PUT",
                data: {title, body},
                success:function(response){
                    console.log(response)
                    $("#post").val = "";
                    $("#post").attr('placeholder', 'What\'s on your mind');
                    loadPosts();
                }});
                
        }
        
            
    });


    
    }
    


