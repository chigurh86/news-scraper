$.getJSON("/stories", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the information on the page
    $("#stories").append("<div class='well'><p data-id='" + data[i]._id + "'>" + data[i].title + "<br/>" + "<a href='" + data[i].link + "'>" + data[i].link + "</a>"+ "</p></div>");
  }
});

$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#stories").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id")

$.ajax({
  method: "GET",
  url: "/stories/" + thisId
})
  // With that done, add the note information to the page
  .done(function(data) {
    console.log("sdcsdcsd: "+ JSON.stringify(data));
    $("#stories").append("<h2>" + data.title + "</h2>");
    // An input to enter a new title
    $("#stories").append("<input id='titleinput' name='title' >");
    // A textarea to add a new note body
    $("#stories").append("<textarea id='bodyinput' name='body'></textarea>");
    // A button to submit a new note, with the id of the article saved to it
    $("#stories").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

    // If there's a note in the article
    if (data.note) {
      // Place the title of the note in the title input
      $("#titleinput").val(data.note.title);
      // Place the body of the note in the body textarea
      $("#bodyinput").val(data.note.body);
    }
    });
});
