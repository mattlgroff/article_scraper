const url = "https://linustechtips.com/main/forum/13-tech-news-and-reviews/";
const express = require("express");
const path = require("path");
const controller = require("../controllers/controller.js");

module.exports = app => {
  //Public Folder
  app.use(express.static(path.join(__dirname, './../public')));

  //Get to scrape
  app.get("/scrape", (req, res) => {
    controller.scrape(req, res, url);
  });

  //Post to comment
  app.post("/comment", (req, res) => {
    controller.comment(req, res);
  });

   //Get to find
  app.get("/", (req, res) => {
    controller.find(req, res);
  });

}
