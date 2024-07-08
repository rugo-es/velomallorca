const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let bmp 

$(document).ready(function(){
  document.getElementById('image').addEventListener('change', function(e) {
    if(e.target.files[0]) {
      try {
        let file = $("#image")[0].files[0]
        var data = new FormData();
        data.append("image", file);
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
            img.src = response.data;
            wheel.image = response.data;
            $(`#centerLabel`).removeClass('btn-success btn-danger').addClass('btn-dark')
            wheel.anchors.center.x = false
            wheel.anchors.center.y = false
          }
        });
        xhr.open("POST", "/api/uploadImage");
        // xhr.setRequestHeader("Directory", "wheels");
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
  wheel.brand = validateInput('brand'),
  wheel.model = validateInput('model'),
  wheel.description = validateInput('description'),
  wheel.price = validateInput('price')
  wheel.shopifyId = validateInput('shopifyId')
  if(!wheel.image) {
    $('#image').addClass("is-invalid");
  } else {
    $('#image').removeClass("is-invalid").addClass('is-valid');
  }
  if (!wheel.brand || !wheel.model || !wheel.description 
    || !wheel.price || !wheel.image || !wheel.shopifyId 
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
  if (!wheel.anchors[anchor].x || !wheel.anchors[anchor].y) {
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
  if(!wheel.image) return;
  if(!anchor) {
    showMessageModal('ERROR', 'Selecciona un punto de anclaje')
    return;
  }
  const canvas = document.getElementById(`canvas`);
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  wheel.anchors[anchor].x = x; 
  wheel.anchors[anchor].y = y;
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
    Object.values(wheel.anchors).forEach(anchor => {
      if(!anchor.x || !anchor.y) return
      ctx.fillStyle = "red";
      ctx.fillRect(anchor.x - 3, anchor.y - 3, 6, 6);
    });
  };
  img.src = wheel.image;
}