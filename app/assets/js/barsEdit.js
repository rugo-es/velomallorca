let bar = {};
let anchor = null;

$(document).ready(function(){
  let barsId = window.location.href.split('/').at(-1)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/bars/${barsId}`,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      bar = response;
      loadBar(bar)
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus)
    })
})

function loadBar(bar) {
  $('#brand').val(bar.brand)
  $('#model').val(bar.model)
  $('#description').val(bar.description)
  $('#price').val(bar.price)
  $('#shopifyId').val(bar.shopifyId)
  drawImageAndAnchors()
}

function submit() {
  if(!validateForm()) {
    editBar(bar)
  }
}

function editBar(data) {
  let barJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/bars/${data.id}`,
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    "data": barJson
  };
  $.ajax(settings)
    .done(function (response) { 
      location.href = "/app/bars"
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      showAlert('alert-danger', 3000, '<strong>'+errorThrown+'</strong>')
    })
}