let seatpot = {
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
    createSeatpot(seatpot)
  }
}

function createSeatpot(data) {
  let seatpotJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/seatpots",
    "method": "POST",
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