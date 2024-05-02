$(document).ready(function() {
  document.getElementById('image').addEventListener('change', function(e) {
    if(e.target.files[0]) {
      try {
        let file = $("#image")[0].files[0]
        var data = new FormData();
        data.append("avatar", file);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            let response = JSON.parse(this.response)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, 0, 0, img.width * (300/img.height), 300);
            };
            img.src = "/img/seatpots/"+response.data;
            seatpot.image = "/img/seatpots/"+response.data;
            $(`#centerLabel`).removeClass('btn-success btn-danger').addClass('btn-dark')
            seatpot.anchors.center.x = false
            seatpot.anchors.center.y = false
          }
        });
        xhr.open("POST", "/api/uploadAvatar");
        xhr.setRequestHeader("Directory", "seatpots");
        xhr.send(data)
      } catch(e) {
        console.log(e)
      }
    }
  });
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(e)
  })
})

function showMessageModal(label, text, actionBtn = null) {
  $('#messageModalLabel').text(label)
  $('#messageModalText').text(text)
  $('#messageModal').modal('show');
}

function validateForm() {
  seatpot.brand = validateInput('brand'),
  seatpot.model = validateInput('model'),
  seatpot.description = validateInput('description'),
  seatpot.price = validateInput('price')
  seatpot.shopifyId = validateInput('shopifyId')
  if(!seatpot.image) {
    $('#image').addClass("is-invalid");
  } else {
    $('#image').removeClass("is-invalid").addClass('is-valid');
  }
  if (!seatpot.brand || !seatpot.model || !seatpot.description 
    || !seatpot.price || !seatpot.image || !seatpot.shopifyId 
    || validateAnchor('center')) {
    return true
  }
  return false
}

function validateInput(inputId) {
  let item = $('#'+inputId);
  if(item.val().trim() === '') {
    item.addClass("is-invalid");
    return false;
  }
  item.removeClass("is-invalid").addClass('is-valid');
  return item.val();
}

function validateAnchor(anchor) {
  if (!seatpot.anchors[anchor].x || !seatpot.anchors[anchor].y) {
    $(`#${anchor}Label`).removeClass('btn-dark').addClass('btn-danger')
    return true;
  }
  $(`#${anchor}Label`).removeClass('btn-dark btn-danger').addClass('btn-success')
  return false;
}

function changeAnchor(target) {
  anchor = target;
}

function getCursorPosition(event) {
  if(!seatpot.image) return;
  if(!anchor) {
    showMessageModal('ERROR', 'Selecciona un punto de anclaje')
    return;
  }
  const canvas = document.getElementById(`canvas`);
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  seatpot.anchors[anchor].x = x; 
  seatpot.anchors[anchor].y = y;
  ctx.fillStyle = "red";
  ctx.fillRect(x - 3, y - 3, 6, 6);
  $(`#${anchor}Label`).removeClass('btn-dark').addClass('btn-success')
  drawImageAndAnchors()
}

function drawImageAndAnchors() {
  console.log('draw images and anchors')
  const canvas = document.getElementById(`canvas`);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, img.width * (300/img.height), 300);
    Object.values(seatpot.anchors).forEach(anchor => {
      if(!anchor.x || !anchor.y) return
      ctx.fillStyle = "red";
      ctx.fillRect(anchor.x - 3, anchor.y - 3, 6, 6);
    });
  };
  img.src = seatpot.image;
}