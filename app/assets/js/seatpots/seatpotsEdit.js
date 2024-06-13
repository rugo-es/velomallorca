let seatpot = {};
let anchor = null;

$(document).ready(function(){
  let seatpotsId = window.location.href.split('/').at(-1)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/seatpots/${seatpotsId}`,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      seatpot = response;
      loadSeatpot(seatpot)
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus)
    })
})

function loadSeatpot(seatpot) {
  $('#brand').val(seatpot.brand)
  $('#model').val(seatpot.model)
  $('#description').val(seatpot.description)
  $('#price').val(seatpot.price)
  $('#shopifyId').val(seatpot.shopifyId)
  drawImageAndAnchors()
}

function submit() {
  if(!validateForm()) {
    editSeatpot(seatpot)
  }
}

function editSeatpot(data) {
  let seatpotJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/seatpots/${data.id}`,
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    "data": seatpotJson
  };
  $.ajax(settings)
    .done(function (response) { 
      location.href = "/app/seatpots"
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      showAlert('alert-danger', 3000, '<strong>'+errorThrown+'</strong>')
    })
}