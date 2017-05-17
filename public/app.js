$.getJSON("/stories", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the information on the page
    console.log("Hello");
    $("#stories").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#stories").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id")
});
