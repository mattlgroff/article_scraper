const cheerio = require("cheerio");
const request = require("request");
const Articles = require("../models/Articles.js");

module.exports = {
  scrape: function(req, res, url){

    request(url, (error, response, html) => {

      if(error){
        console.error(error);
        res.json({"Error":error});
      }
      else{
        let $ = cheerio.load(html);

        let results = [];

        $(".cTopicTitle").each(function(i, element) {
          let title = $(element)
                        .find('a')
                        .text()
                        .split("\n");

          let url = $(element)
                    .find('a')
                    .attr('href');       

          results.push({
            title: title[2],
            url: url,
            comments: []
          });
        });

        //Remove pinned topic from results
        results.shift();

        //// pass an array
        Articles.create(results, function (err, candies) {
          if (err) {
            console.error(err);
            res.json({"Error": err})
          }
          else{
            res.json({"results":candies});
          }
        });
        
      }//End Else
      
    });//End Request

  }
}

