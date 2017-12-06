const cheerio = require("cheerio");
const request = require("request");
const Articles = require("../models/Articles.js");
const mongoose = require('mongoose');

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

        //Pass an results into the Articles model.
        Articles.insertMany(results, {ordered: false})
        .then(results => {
          console.log("Scrape complete.");
          res.json(results);
        })
        .catch(err => {
          //console.error(err);
          console.log("Scrape complete with errors.");
          res.json({"error":err})
        });
        
      }//End Else
      
    });//End Request

  },
  find: function(req, res){
    Articles.find().limit(20).sort({date: -1}).exec( (err, docs) =>{
      if(err){
        console.error(err);
        res.send(err);
      }
      else{
        console.log("Sent Results.");
        res.render("index", {results:docs})
        //res.json({"results": docs});
      }
    });
  }
  ,
  comment: function(req, res){

    console.log("ID: " + req.body.id)

    let newComment = {
      body: req.body.body,
      date: Date.now()
    }
    
    Articles.findOneAndUpdate({"_id": mongoose.Types.ObjectId(req.body.id)}, {$push: {comments: newComment}}, (err, docs) =>{
      if(err){
        console.error(err);
        res.json({"error": err});
      }
      else{
        res.json(docs);
      }
    });

  }
}

