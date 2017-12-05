const cheerio = require("cheerio");
const request = require("request");
const mongojs = require("mongojs");
const databaseUrl = "articles";
const collections = ["ltt"];

// Use mongojs to hook the database to the db variable
const db = mongojs(databaseUrl, collections);
const ltt = db.collection('ltt');

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", error => {
  console.log("Database Error:", error);
});


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

        db.ltt.insert(results);

        res.json({"results":results});
      }
      
    });

  },
  comment: function(req, res){
    db.ltt.findOne({url: req.body.url}, results => {

      console.log(results);

      let comment = results.comment;

      comment.push(req.body.comment);
    });

    db.ltt.update({url: req.body.url}, {comment:comment}, [options], [callback])
  }
}

