let bar = {
  brand: '',
  model: '',
  description: '',
  price: 0,
  image: '',
  shopifyId: '',
  anchors: {
    center: {x: false, y: false},
    levers: {x: false, y: false}
  }
};
let anchor = null;

function submit() {
  if(!validateForm()) {
    createBar(bar)
  }
}

function createBar(data) {
  let barJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/bars",
    "method": "POST",
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