// dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

// Requiring models
var userComment = require("./models/userComment.js");
var Story = require("./models/Story.js");

mongoose.Promise = Promise;
// Database configuration with mongoose

mongoose.connect("mongodb://localhost/mongoosearticles");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});
// initialize express
var app = express();
// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
// Make public a static dir
app.use(express.static("public"));

// pulling in handlebars
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");
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
    res.render("index");
});
// Retrieve data from the db
app.get("/stories", function(req, res) {
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
// scraping the data
app.get("/scrape", function(req, res){
  request("https://news.ycombinator.com/", function(error, response, html) {
    var $ = cheerio.load(html);

    $(".title").each(function(i, element){
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
