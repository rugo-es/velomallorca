let frameset = {
  brand: '',
  model: '',
  description: '',
  price: 0,
  colors: [{
    image: false,
    colorCode: '',
    shopifyId: '',
    hasBar: false,
    hasSeatpot: false,
    anchors: {
      frontWheel: {x: false, y: false},
      backWheel: {x: false, y: false},
      set: {x: false, y: false},
      saddle: {x: false, y: false},
      bar: {x: false, y: false},
    }
  }]
};
let anchor = null;
let currentColorSelected = 0;
let colorsRemoved = [];

$(document).ready(function() {
  addFramesetColorElements(0)
  $(`#colorSelectorBtn-0`).addClass('btnColorSelected')
})

function submit() {
  if(!validateForm()) {
    createFrameset(frameset)
  }
}

function createFrameset(data) {
  let framesetJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/framesets",
    "method": "POST",
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
    .fail( function(jqXHR, textStatus, errorThrown){
      showAlert('alert-danger', 3000, '<strong>'+errorThrown+'</strong>')
    })
}