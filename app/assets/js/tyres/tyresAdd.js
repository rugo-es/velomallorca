let tyre = {
  brand: '',
  model: '',
  description: '',
  price: 0,
  image: '',
  shopifyId: '',
  anchors: {
    center: {x: false, y: false}
  }
};
let anchor = null;

function submit() {
  if(!validateForm()) {
    createTyre(tyre)
  }
}

function createTyre(data) {
  let tyreJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/tyres",
    "method": "POST",
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