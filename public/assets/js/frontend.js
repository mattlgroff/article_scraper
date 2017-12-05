$(document).ready( function(){
  $("#scrapeBtn").on('click', postToServer);
});

function postToServer(){
  let obj = {
    scrape: null
  }

  $.ajax({
    type: "POST",
    url: "/",
    data: obj,
    dataType: "json",
    success: function(response) {
      console.log("Response received: ");
      console.log(response);

      response.results.forEach(function (currentValue, index, array) {
        let html = "<div id='" + response.results[index].url + "'><a href='" + response.results[index].url + "'>" + response.results[index].title + "</a></div>";
        $("#articleContainer").append(html)
      });
      
    }
  });
}