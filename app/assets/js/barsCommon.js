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
            img.src = "/img/bars/"+response.data;
            bar.image = "/img/bars/"+response.data;
            $(`#centerLabel`).removeClass('btn-success btn-danger').addClass('btn-dark')
            $(`#leversLabel`).removeClass('btn-success btn-danger').addClass('btn-dark')
            bar.anchors.center.x = false
            bar.anchors.center.y = false
            bar.anchors.levers.x = false
            bar.anchors.levers.y = false
          }
        });
        xhr.open("POST", "/api/uploadAvatar");
        xhr.setRequestHeader("Directory", "bars");
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
  bar.brand = validateInput('brand'),
  bar.model = validateInput('model'),
  bar.description = validateInput('description'),
  bar.price = validateInput('price')
  bar.shopifyId = validateInput('shopifyId')
  if(!bar.image) {
    $('#image').addClass("is-invalid");
  } else {
    $('#image').removeClass("is-invalid").addClass('is-valid');
  }
  let error = !bar.brand || !bar.model || !bar.description || !bar.price || !bar.image || !bar.shopifyId ? true : false
  if(validateAnchor('center')) error = true 
  if(validateAnchor('levers')) error = true
  return error
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
  if (!bar.anchors[anchor].x || !bar.anchors[anchor].y) {
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
  if(!bar.image) return;
  if(!anchor) {
    showMessageModal('ERROR', 'Selecciona un punto de anclaje')
    return;
  }
  const canvas = document.getElementById(`canvas`);
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  if(!bar.anchors[anchor]) {
    bar.anchors[anchor] = {x: false, y: false}
  }
  bar.anchors[anchor].x = x; 
  bar.anchors[anchor].y = y;
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
    Object.values(bar.anchors).forEach(anchor => {
      if(!anchor.x || !anchor.y) return
      ctx.fillStyle = "red";
      ctx.fillRect(anchor.x - 3, anchor.y - 3, 6, 6);
    });
  };
  img.src = bar.image;
}