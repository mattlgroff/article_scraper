const url = "https://linustechtips.com/main/forum/13-tech-news-and-reviews/";
const express = require("express");
const path = require("path");
const controller = require("../controllers/controller.js");

module.exports = app => {
  //Public Folder
  app.use(express.static(path.join(__dirname, './../public')));

  //Post to create a new food
  app.post("/", (req, res) => {
    controller.scrape(req, res, url);
  });

}
