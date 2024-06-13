let frameset = {}
let anchor = null;
let currentColorSelected = null;
let colorsRemoved = [];

$(document).ready(function() {
  let framesetId = window.location.href.split('/').at(-1)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/framesets/${framesetId}`,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      frameset = response;
      loadFrameset(frameset)
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus)
    })
});

function loadFrameset(frameset) {
  $('#brand').val(frameset.brand)
  $('#model').val(frameset.model)
  $('#description').val(frameset.description)
  $('#price').val(frameset.price)
  currentColorSelected = 0;
  for(let i = 0; i < frameset.colors.length; i++) {
    addFramesetColorElements(i, frameset.colors[i])
    drawImageAndAnchors(i);
    if(i > currentColorSelected) {
      $(`#colorContainer-${i}`).hide()
    }
  }
  $(`#colorSelectorBtn-0`).addClass('btnColorSelected')
}

function submit() {
  if(!validateForm()) {
    editFrameset(frameset)
  }
}

function editFrameset(data) {
  let framesetJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/framesets/${data.id}`,
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    },
    "data": framesetJson
  };
  $.ajax(settings)
    .done(function (response) { 
      location.href = "/app/framesets"
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      showAlert('alert-danger', 3000, '<strong>'+errorThrown+'</strong>')
    })
}