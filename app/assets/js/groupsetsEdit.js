let groupset = {}
let anchor = null;

$(document).ready(function() {
  let groupsetId = window.location.href.split('/').at(-1)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/groupsets/${groupsetId}`,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      groupset = response;
      loadGroupset(groupset)
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus)
    })
});

function loadGroupset(groupset) {
  $('#brand').val(groupset.brand)
  $('#model').val(groupset.model)
  $('#description').val(groupset.description)
  $('#price').val(groupset.price)

  $('#shopifyIdChainring').val(groupset.components.chainring.shopifyId)
  drawImageAndAnchors('chainring');
  $('#shopifyIdCassete').val(groupset.components.chainring.shopifyId)
  drawImageAndAnchors('cassete');
  $('#shopifyIdBrakeDisk').val(groupset.components.chainring.shopifyId)
  drawImageAndAnchors('brakeDisk');
  $('#shopifyIdBrakeCaliper').val(groupset.components.chainring.shopifyId)
  drawImageAndAnchors('brakeCaliper');
  $('#shopifyIdDiverter').val(groupset.components.chainring.shopifyId)
  drawImageAndAnchors('diverter');
  $('#shopifyIdLevers').val(groupset.components.chainring.shopifyId)
  drawImageAndAnchors('levers');
}

function submit() {
  if(!validateForm()) {
    editGroupset(groupset)
  }
}

function editGroupset(data) {
  let groupsetJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/groupsets/${data.id}`,
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    },
    "data": groupsetJson
  };
  $.ajax(settings)
    .done(function (response) { 
      location.href = "/app/groupsets"
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      showAlert('alert-danger', 3000, '<strong>'+errorThrown+'</strong>')
    })
}