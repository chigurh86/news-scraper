$(document).ready(function(){
  $(document).on('click', '.savenote', function(){
    var id = $(this).attr("data-id");
    console.log($(".theComment").val());
    $.ajax({
      method: "POST",
      url: "/stories/save/"+ id,
      data: {
        value: $(".theComment").val()
      }
    }).done(function(data){
      // console.log("data"+data);
    });
  });
});
