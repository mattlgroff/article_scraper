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
      let commentHtml = "<h3>Comments:</h3><ul>";

      array[index].comments.forEach(function(currentValue, i, arr){
        $(commentHtml).append(
          "<li>Comment: "
         + array[index].comments[i].body 
         + "<br>Date: " 
         + array[index].comments[i].date
         + "</li>");
      });

      let articleHtml = 
        "<div class='card cardMargin col-sm-12 col-xs-12 col-md-12 col-lg-12' id='" 
        + array[index].url 
        + "'><a href='" 
        + array[index].url 
        + "'>" 
        + array[index].title 
        + "</a>" 
        + commentHtml 
        + "</ul>"
        + "<textarea id='" 
        + array[index]._id 
        + "Text' rows='4' cols='50'></textarea>"
        + "<br><button class='btn btn-primary addCommentBtn' id='" 
        + array[index]._id 
        + "'>Add Comment</button>"
        + "</div>";

      $(articleHtml).append();                  
      
      $("#articleContainer").append(articleHtml)
    });
}