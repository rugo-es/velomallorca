let tyre = {};
let anchor = null;

$(document).ready(function(){
  let tyresId = window.location.href.split('/').at(-1)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/tyres/${tyresId}`,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      tyre = response;
      loadTyre(tyre)
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus)
    })
})

function loadTyre(tyre) {
  $('#brand').val(tyre.brand)
  $('#model').val(tyre.model)
  $('#description').val(tyre.description)
  $('#price').val(tyre.price)
  $('#shopifyId').val(tyre.shopifyId)
  drawImageAndAnchors()
}

function submit() {
  if(!validateForm()) {
    editTyre(tyre)
  }
}

function editTyre(data) {
  let tyreJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/tyres/${data.id}`,
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    "data": tyreJson
  };
  $.ajax(settings)
    .done(function (response) { 
      location.href = "/app/tyres"
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      showAlert('alert-danger', 3000, '<strong>'+errorThrown+'</strong>')
    })
}