$(document).ready( function(){
  find();
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

      showResults(response.results);
      
    }
  });
}

function find(){
  let obj = {
    scrape: null
  }

  $.ajax({
    type: "GET",
    url: "/find",
    data: obj,
    dataType: "json",
    success: function(response) {
      console.log("Response received: ");
      console.log(response);

      showResults(response.results);
      
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

      find();
      
    }
  });
}

function showResults(array){

  $("#articleContainer").html("");
    array.forEach(function (currentValue, index, arr) {

      let articleHtml = 
        "<div class='card cardMargin col-sm-12 col-xs-12 col-md-12 col-lg-12' id='" 
        + array[index].url 
        + "'><a href='" 
        + array[index].url 
        + "'>" 
        + array[index].title 
        + "</a>" 
        + "<ul id='" + array[index]._id  + "Comments'>Comments: "
        + "</ul>"
        + "<textarea id='" 
        + array[index]._id 
        + "Text' rows='4' cols='50'></textarea>"
        + "<br><button class='btn btn-primary addCommentBtn' id='" 
        + array[index]._id 
        + "'>Add Comment</button>"
        + "</div>";

      let comments_id = "#" + array[index]._id + "Comments";
      
      array[index].comments.forEach(function(currentValue, i, arr){
        console.log("Comment Body: " + array[index].comments[i].body);
        let comment =
          "<li>Comment: "
         + array[index].comments[i].body 
         + "<br>Date: " 
         + array[index].comments[i].date
         + "</li>";

         $(comment).appendTo(comments_id)
      });

      $("#articleContainer").append(articleHtml);

    });
}