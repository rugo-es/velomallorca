let groupset = {
  brand: '',
  model: '',
  description: '',
  price: 0,
  components: {
    chainring: {
      image: '',
      shopifyId: '',
      anchors: {x: false, y: false}
      
    },
    cassete: {
      image: '',
      shopifyId: '',
      anchors: {x: false, y: false}
    },
    brakeDisk: {
      image: '',
      shopifyId: '',
      anchors: {x: false, y: false}
    },
    brakeCaliper: {
      image: '',
      shopifyId: '',
      anchors: {x: false, y: false}
    },
    diverter: {
      image: '',
      shopifyId: '',
      anchors: {x: false, y: false}
    },
    levers: {
      image: '',
      shopifyId: '',
      anchors: {x: false, y: false}
    }
  }
};
let anchor = null;

function submit() {
  if(!validateForm()) {
    createGroupset(groupset)
  }
}

function createGroupset(data) {
  let groupsetJson = JSON.stringify(data)
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/groupsets",
    "method": "POST",
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
    .fail( function(jqXHR, textStatus, errorThrown){
      showAlert('alert-danger', 3000, '<strong>'+errorThrown+'</strong>')
    })
}