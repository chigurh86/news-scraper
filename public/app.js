$.getJSON("/stories", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the information on the page
    $("#stories").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});
