// dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
// initialize express
var app = express();
// database config
var databaseUrl = "scraper";
var collections = ["scrapedData"];
// link mongojs to db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error){
  console.log("Database Error: ",error);
});
// Main route
app.get("/", function(req, res) {
  res.send("News Scraper");
});
// Retrieve data from the db
app.get("/all", function(req, res) {
  db.scrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as a json
    else {
      res.json(found);
    }
  });
});
app.get("/scrape", function(req, res){
  request("https://www.cnn.com/", function(error, response, html) {
    var $ = cheerio.load(html);

    $(".cd__headline").each(function(i, element){
      var title = $(this).children("a").text();
      var link = $(this).children("a").attr("href");
      // if there is a title
      if (title && link) {
        // Save the data in the scrapedData db
        db.scrapedData.save({
          title: title,
          link: link
        },
        function(error, saved) {
          // If there's an error during this query
          if (error) {
            // Log the error
            console.log(error);
          }
          // Otherwise,
          else {
            // Log the saved data
            console.log(saved);
          }
        });
      }
    });
  });
  res.send("Completed Scrape");
});
// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
