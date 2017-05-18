$.getJSON("/stories", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the information on the page
    $("#stories").append("");
    var savebutton = "<button data-id={{_id}} id='savenote' class='btn btn-primary btn-sm save-article'>Save Article</button>"
    $("#stories").append("<div class='well'><p data-id='" + data[i]._id + "'>" + data[i].title + "<br/>" + "<a href='" + data[i].link + "'>" + data[i].link + "</a>"+ "</p>"+ savebutton +"</div>");

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
}).done(function(data) {
    $("#stories").append("<div class=row>"+"<h2>Comments</h2><form><textarea id='bodyinput' name='body'></textarea><br><button data-id='" + data._id + "' id='savenote'>Save Note</button></form></div>");


    // If there's a note in the article
    if (data.note) {
      // Place the title of the note in the title input
      $("#titleinput").val(data.note.title);
      // Place the body of the note in the body textarea
      $("#bodyinput").val(data.note.body);
    }
    });
});

$(document).on('click', '#savenote', function(){
  //grab id associated with article from submitbtn
  var thisId = $(this).attr('data-id');

  //run post request to change note
  $.ajax({
    method: "POST",
    url: "/stories/" + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  }).done(function(data){
    console.log(data);
    $('#stories').empty();
  });
  $('#titleinput').val("");
  $('#bodyinput').val("");
});
