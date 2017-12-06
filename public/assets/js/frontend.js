$(document).ready( function(){
  $("#scrapeBtn").on('click', scrape);

  $('#articleContainer').on('click', '.addCommentBtn', function() {
    if($(this).hasClass('addCommentBtn')){
      let id = $(this).attr('id');
      console.log("Article ID is: " + id);
      addComment(id);
    }
    else{
      //do nothing
    }
  });
});

function scrape(){
  let obj = {
    scrape: null
  }

  $.ajax({
    type: "GET",
    url: "/scrape",
    data: obj,
    dataType: "json",
    success: function(response) {
      console.log("Response received: ");
      console.log(response);

      location.reload();
      
    }
  });
}

function addComment(id){
  let jquery = "#" + id + "Text";
  let content = $(jquery).val().trim();

  console.log(jquery);
  console.log("Comment content: " + content);

  let obj = {
    body: content,
    id: id
  }

  $.ajax({
    type: "POST",
    url: "/comment",
    data: obj,
    dataType: "json",
    success: function(response) {
      console.log("Response received: ");
      console.log(response);
      location.reload();
      
    }
  });
}