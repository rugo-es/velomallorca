let saddle = {};
let anchor = null;

$(document).ready(function(){
  let saddlesId = window.location.href.split('/').at(-1)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/saddles/${saddlesId}`,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      saddle = response;
      loadSaddle(saddle)
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus)
    })
})

function loadSaddle(saddle) {
  $('#brand').val(saddle.brand)
  $('#model').val(saddle.model)
  $('#description').val(saddle.description)
  $('#price').val(saddle.price)
  $('#shopifyId').val(saddle.shopifyId)
  drawImageAndAnchors()
}

function submit() {
  if(!validateForm()) {
    editSaddle(saddle)
  }
}

function editSaddle(data) {
  let saddleJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/saddles/${data.id}`,
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    "data": saddleJson
  };
  $.ajax(settings)
    .done(function (response) { 
      location.href = "/app/saddles"
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      showAlert('alert-danger', 3000, '<strong>'+errorThrown+'</strong>')
    })
}