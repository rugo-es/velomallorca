let wheel = {};
let anchor = null;

$(document).ready(function(){
  let wheelsId = window.location.href.split('/').at(-1)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/wheels/${wheelsId}`,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      wheel = response;
      loadWheel(wheel)
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus)
    })
})

function loadWheel(wheel) {
  $('#brand').val(wheel.brand)
  $('#model').val(wheel.model)
  $('#description').val(wheel.description)
  $('#price').val(wheel.price)
  $('#shopifyId').val(wheel.shopifyId)
  drawImageAndAnchors()
}

function submit() {
  if(!validateForm()) {
    editWheel(wheel)
  }
}

function editWheel(data) {
  let wheelJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/wheels/${data.id}`,
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    "data": wheelJson
  };
  $.ajax(settings)
    .done(function (response) { 
      location.href = "/app/wheels"
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      showAlert('alert-danger', 3000, '<strong>'+errorThrown+'</strong>')
    })
}