let wheel = {
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
    createWheel(wheel)
  }
}

function createWheel(data) {
  let wheelJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/wheels",
    "method": "POST",
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