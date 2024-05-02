function showAlert(style, time, message){
  $("body").append('<div id="alert-container" style="position: fixed; z-index: 99999; bottom: 10px; left: 10px; display: none;"><div class="m-0 alert alert-dismissible '+style+'">'+message+'</div></div>')
  $("#alert-container").fadeIn()
  setTimeout(function(){ $("#alert-container").fadeOut('slow', ()=>{
    $("#alert-container").remove()
  }) }, time)
}
