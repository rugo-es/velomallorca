let saddle = {
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
    createSaddle(saddle)
  }
}

function createSaddle(data) {
  let saddleJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/saddles",
    "method": "POST",
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