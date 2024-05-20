const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let bmp

$(document).ready(function(){
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
              ctx.drawImage(img, 125, 35, 250, img.height * (250/img.width));
            };
            img.src = "/img/tyres/"+response.data;
            tyre.image = "/img/tyres/"+response.data;
            $(`#centerLabel`).removeClass('btn-success btn-danger').addClass('btn-dark')
            tyre.anchors.center.x = false
            tyre.anchors.center.y = false
          }
        });
        xhr.open("POST", "/api/uploadAvatar");
        xhr.setRequestHeader("Directory", "tyres");
        xhr.send(data)
      } catch(e) {
        console.log(e)
      }
    }
  });
  canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(e)
  })
})

document.onvisibilitychange = async(evt) => {
  if (document.visibilityState === "hidden") {
    bmp = await createImageBitmap(canvas);
  } else {
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage(bmp, 0, 0);
    ctx.globalCompositeOperation = "source-over";
  }
};

function showMessageModal(label, text, actionBtn = null) {
  $('#messageModalLabel').text(label)
  $('#messageModalText').text(text)
  $('#messageModal').modal('show');
}

function validateForm() {
  tyre.brand = validateInput('brand'),
  tyre.model = validateInput('model'),
  tyre.description = validateInput('description'),
  tyre.price = validateInput('price')
  tyre.shopifyId = validateInput('shopifyId')
  if(!tyre.image) {
    $('#image').addClass("is-invalid");
  } else {
    $('#image').removeClass("is-invalid").addClass('is-valid');
  }
  if (!tyre.brand || !tyre.model || !tyre.description 
    || !tyre.price || !tyre.image || !tyre.shopifyId 
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
  if (!tyre.anchors[anchor].x || !tyre.anchors[anchor].y) {
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
  if(!tyre.image) return;
  if(!anchor) {
    showMessageModal('ERROR', 'Selecciona un punto de anclaje')
    return;
  }
  const canvas = document.getElementById(`canvas`);
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  tyre.anchors[anchor].x = x; 
  tyre.anchors[anchor].y = y;
  ctx.fillStyle = "red";
  ctx.fillRect(x - 3, y - 3, 6, 6);
  $(`#${anchor}Label`).removeClass('btn-dark').addClass('btn-success')
  drawImageAndAnchors()
}

function drawImageAndAnchors() {
  const canvas = document.getElementById(`canvas`);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 125, 35, 250, img.height * (250/img.width));
    Object.values(tyre.anchors).forEach(anchor => {
      if(!anchor.x || !anchor.y) return
      ctx.fillStyle = "red";
      ctx.fillRect(anchor.x - 3, anchor.y - 3, 6, 6);
    });
  };
  img.src = tyre.image;
}