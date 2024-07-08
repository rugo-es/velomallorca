const canvasChainring = document.getElementById(`canvasChainring`);
const ctxChainring = canvasChainring.getContext("2d");
let bmpChairing
const canvasCassete = document.getElementById(`canvasCassete`);
const ctxCassete = canvasCassete.getContext("2d");
let bmpCassete
const canvasBrakeDisk = document.getElementById(`canvasBrakeDisk`);
const ctxBrakeDisk = canvasBrakeDisk.getContext("2d");
let bmpBrakeDisk
const canvasBrakeCaliper = document.getElementById(`canvasBrakeCaliper`);
const ctxBrakeCaliper = canvasBrakeCaliper.getContext("2d");
let bmpBrakeCaliper
const canvasDiverter = document.getElementById(`canvasDiverter`);
const ctxDiverter = canvasDiverter.getContext("2d");
let bmpLevers
const canvasLevers = document.getElementById(`canvasLevers`);
const ctxLevers = canvasLevers.getContext("2d");

$(document).ready(() => {
  // Listener de chainring
  document.getElementById(`imageChainring`).addEventListener('change', function(e) {
    $('#containerChainringImage').show();
    if(e.target.files[0]) {
      try {
        let file = $(`#imageChainring`)[0].files[0]
        var data = new FormData();
        data.append("image", file);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            let response = JSON.parse(this.response)
            ctxChainring.clearRect(0, 0, canvasChainring.width, canvasChainring.height);
            const img = new Image();
            img.onload = () => {
              ctxChainring.drawImage(img, 0, 0, 250, img.height * (250/img.width));
            };
            img.src = response.data;
            groupset.components.chainring.image = response.data;
            $(`#chainringLabel`).removeClass('btn-success btn-danger').addClass('btn-dark')
            groupset.components.chainring.anchors.x = false
            groupset.components.chainring.anchors.y = false
          }
        });
        xhr.open("POST", "/api/uploadImage");
        // xhr.setRequestHeader("Directory", "groupsets");
        xhr.send(data)
      } catch(e) {
        console.log(e)
      }
    }
  });
  canvasChainring.addEventListener('mousedown', function(e) {
    getCursorPosition(e, 'chainring')
  });
  // listener de cassete
  document.getElementById(`imageCassete`).addEventListener('change', function(e) {
    $('#containerCasseteImage').show();
    if(e.target.files[0]) {
      try {
        let file = $(`#imageCassete`)[0].files[0]
        var data = new FormData();
        data.append("image", file);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            let response = JSON.parse(this.response)
            ctxCassete.clearRect(0, 0, canvasCassete.width, canvasCassete.height);
            const img = new Image();
            img.onload = () => {
              ctxCassete.drawImage(img, 0, 0, 250, img.height * (250/img.width));
            };
            img.src = response.data;
            groupset.components.cassete.image = response.data;
            $(`#casseteLabel`).removeClass('btn-success btn-danger').addClass('btn-dark')
            groupset.components.cassete.anchors.x = false
            groupset.components.cassete.anchors.y = false
          }
        });
        xhr.open("POST", "/api/uploadImage");
        // xhr.setRequestHeader("Directory", "groupsets");
        xhr.send(data)
      } catch(e) {
        console.log(e)
      }
    }
  });
  canvasCassete.addEventListener('mousedown', function(e) {
    getCursorPosition(e, 'cassete')
  });
  // listener de brake disk
  document.getElementById(`imageBrakeDisk`).addEventListener('change', function(e) {
    $('#containerBrakeDiskImage').show();
    if(e.target.files[0]) {
      try {
        let file = $(`#imageBrakeDisk`)[0].files[0]
        var data = new FormData();
        data.append("image", file);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            let response = JSON.parse(this.response)
            ctxBrakeDisk.clearRect(0, 0, canvasBrakeDisk.width, canvasBrakeDisk.height);
            const img = new Image();
            img.onload = () => {
              ctxBrakeDisk.drawImage(img, 0, 0, 250, img.height * (250/img.width));
            };
            img.src = response.data;
            groupset.components.brakeDisk.image = response.data;
            $(`#brakeDiskLabel`).removeClass('btn-success btn-danger').addClass('btn-dark')
            groupset.components.brakeDisk.anchors.x = false
            groupset.components.brakeDisk.anchors.y = false
          }
        });
        xhr.open("POST", "/api/uploadImage");
        // xhr.setRequestHeader("Directory", "groupsets");
        xhr.send(data)
      } catch(e) {
        console.log(e)
      }
    }
  });
  canvasBrakeDisk.addEventListener('mousedown', function(e) {
    getCursorPosition(e, 'brakeDisk')
  });
  // listener de brake caliper
  document.getElementById(`imageBrakeCaliper`).addEventListener('change', function(e) {
    $('#containerBrakeCaliperImage').show();
    if(e.target.files[0]) {
      try {
        let file = $(`#imageBrakeCaliper`)[0].files[0]
        var data = new FormData();
        data.append("image", file);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            let response = JSON.parse(this.response)
            ctxBrakeCaliper.clearRect(0, 0, canvasBrakeCaliper.width, canvasBrakeCaliper.height);
            const img = new Image();
            img.onload = () => {
              ctxBrakeCaliper.drawImage(img, 0, 0, 250, img.height * (250/img.width));
            };
            img.src = response.data;
            groupset.components.brakeCaliper.image = response.data;
            $(`#brakeCaliperLabel`).removeClass('btn-success btn-danger').addClass('btn-dark')
            groupset.components.brakeCaliper.anchors.x = false
            groupset.components.brakeCaliper.anchors.y = false
          }
        });
        xhr.open("POST", "/api/uploadImage");
        // xhr.setRequestHeader("Directory", "groupsets");
        xhr.send(data)
      } catch(e) {
        console.log(e)
      }
    }
  });
  canvasBrakeCaliper.addEventListener('mousedown', function(e) {
    getCursorPosition(e, 'brakeCaliper')
  });
  // listener de diverter
  document.getElementById(`imageDiverter`).addEventListener('change', function(e) {
    $('#containerDiverterImage').show();
    if(e.target.files[0]) {
      try {
        let file = $(`#imageDiverter`)[0].files[0]
        var data = new FormData();
        data.append("image", file);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            let response = JSON.parse(this.response)
            ctxDiverter.clearRect(0, 0, canvasDiverter.width, canvasDiverter.height);
            const img = new Image();
            img.onload = () => {
              ctxDiverter.drawImage(img, 0, 0, 250, img.height * (250/img.width));
            };
            img.src = response.data;
            groupset.components.diverter.image = response.data;
            $(`#diverterLabel`).removeClass('btn-success btn-danger').addClass('btn-dark')
            groupset.components.diverter.anchors.x = false
            groupset.components.diverter.anchors.y = false
          }
        });
        xhr.open("POST", "/api/uploadImage");
        // xhr.setRequestHeader("Directory", "groupsets");
        xhr.send(data)
      } catch(e) {
        console.log(e)
      }
    }
  });
  canvasDiverter.addEventListener('mousedown', function(e) {
    getCursorPosition(e, 'diverter')
  });
  // listener de levers
  document.getElementById(`imageLevers`).addEventListener('change', function(e) {
    $('#containerLeversImage').show();
    if(e.target.files[0]) {
      try {
        let file = $(`#imageLevers`)[0].files[0]
        var data = new FormData();
        data.append("image", file);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            let response = JSON.parse(this.response)
            ctxLevers.clearRect(0, 0, canvasLevers.width, canvasLevers.height);
            const img = new Image();
            img.onload = () => {
              ctxLevers.drawImage(img, 0, 0, 250, img.height * (250/img.width));
            };
            img.src = response.data;
            groupset.components.levers.image = response.data;
            $(`#leversLabel`).removeClass('btn-success btn-danger').addClass('btn-dark')
            groupset.components.levers.anchors.x = false
            groupset.components.levers.anchors.y = false
          }
        });
        xhr.open("POST", "/api/uploadImage");
        // xhr.setRequestHeader("Directory", "groupsets");
        xhr.send(data)
      } catch(e) {
        console.log(e)
      }
    }
  });
  canvasLevers.addEventListener('mousedown', function(e) {
    getCursorPosition(e, 'levers')
  });
})

document.onvisibilitychange = async(evt) => {
  if (document.visibilityState === "hidden") {
    bmpChairing = await createImageBitmap(canvasChainring);
    bmpCassete = await createImageBitmap(canvasCassete);
    bmpBrakeDisk = await createImageBitmap(canvasBrakeDisk);
    bmpBrakeCaliper = await createImageBitmap(canvasBrakeCaliper);
    bmpDiverter = await createImageBitmap(canvasDiverter);
    bmpLevers = await createImageBitmap(canvasLevers);
  } else {
    ctxChainring.globalCompositeOperation = "copy";
    ctxChainring.drawImage(bmpChairing, 0, 0);
    ctxChainring.globalCompositeOperation = "source-over";

    ctxCassete.globalCompositeOperation = "copy";
    ctxCassete.drawImage(bmpCassete, 0, 0);
    ctxCassete.globalCompositeOperation = "source-over";

    ctxBrakeDisk.globalCompositeOperation = "copy";
    ctxBrakeDisk.drawImage(bmpBrakeDisk, 0, 0);
    ctxBrakeDisk.globalCompositeOperation = "source-over";

    ctxBrakeCaliper.globalCompositeOperation = "copy";
    ctxBrakeCaliper.drawImage(bmpBrakeCaliper, 0, 0);
    ctxBrakeCaliper.globalCompositeOperation = "source-over";

    ctxDiverter.globalCompositeOperation = "copy";
    ctxDiverter.drawImage(bmpDiverter, 0, 0);
    ctxDiverter.globalCompositeOperation = "source-over";

    ctxLevers.globalCompositeOperation = "copy";
    ctxLevers.drawImage(bmpLevers, 0, 0);
    ctxLevers.globalCompositeOperation = "source-over";
  }
};

function drawImageAndAnchors(item) {
  const canvas = document.getElementById(`canvas${capitalize(item)}`);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 250, img.height * (250/img.width));
    let {x, y} = groupset.components[item].anchors;
    ctx.fillStyle = "red";
    ctx.fillRect(x - 3, y - 3, 6, 6);
  };
  img.src = groupset.components[item].image;
}

function changeAnchor(target) {
  anchor = target;
}

function getCursorPosition(event, item) {
  if(!groupset.components[item].image) return;
  if(!anchor) {
    showMessageModal('ERROR', 'Selecciona un punto de anclaje')
    return;
  }
  const canvas = document.getElementById(`canvas${capitalize(item)}`);
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  groupset.components[item].anchors.x = x; 
  groupset.components[item].anchors.y = y;
  drawImageAndAnchors(item)
  $(`#${item}Label`).removeClass('btn-dark btn-danger').addClass('btn-success')
}

function validateForm() {
  groupset.brand = validateInput('brand')
  groupset.model = validateInput('model')
  groupset.description = validateInput('description')
  groupset.price = validateInput('price')
  let error = !groupset.brand || !groupset.model || !groupset.description || !groupset.price;

  // validar chainring
  if(!groupset.components.chainring.image) {
    $(`#imageChainring`).addClass("is-invalid");
  } else {
    $(`#imageChainring`).removeClass("is-invalid").addClass('is-valid');
  }
  if (!validateAnchor('chainring')) {
    error = true
  }
  groupset.components.chainring.shopifyId = validateInput(`shopifyIdChainring`)
  // Validar cassete
  if(!groupset.components.cassete.image) {
    $(`#imageCassete`).addClass("is-invalid");
  } else {
    $(`#imageCassete`).removeClass("is-invalid").addClass('is-valid');
  }
  if (!validateAnchor('cassete')) {
    error = true
  }
  groupset.components.cassete.shopifyId = validateInput(`shopifyIdCassete`)
  // Validar brake disk
  if(!groupset.components.brakeDisk.image) {
    $(`#imageBrakeDisk`).addClass("is-invalid");
  } else {
    $(`#imageBrakeDisk`).removeClass("is-invalid").addClass('is-valid');
  }
  if (!validateAnchor('brakeDisk')) {
    error = true
  }
  groupset.components.brakeDisk.shopifyId = validateInput(`shopifyIdBrakeDisk`)
  // Validar brake caliper
  if(!groupset.components.brakeCaliper.image) {
    $(`#imageBrakeCaliper`).addClass("is-invalid");
  } else {
    $(`#imageBrakeCaliper`).removeClass("is-invalid").addClass('is-valid');
  }
  if (!validateAnchor('brakeCaliper')) {
    error = true
  }
  groupset.components.brakeCaliper.shopifyId = validateInput(`shopifyIdBrakeCaliper`)
  // Validar diverter
  if(!groupset.components.diverter.image) {
    $(`#imageDiverter`).addClass("is-invalid");
  } else {
    $(`#imageDiverter`).removeClass("is-invalid").addClass('is-valid');
  }
  if (!validateAnchor('diverter')) {
    error = true
  }
  groupset.components.diverter.shopifyId = validateInput(`shopifyIdDiverter`)
  // Validar levers
  if(!groupset.components.levers.image) {
    $(`#imageLevers`).addClass("is-invalid");
  } else {
    $(`#imageLevers`).removeClass("is-invalid").addClass('is-valid');
  }
  if (!validateAnchor('levers')) {
    error = true
  }
  groupset.components.levers.shopifyId = validateInput(`shopifyIdLevers`)

  if(error) return error;
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
  if (!groupset.components[anchor].anchors.x || !groupset.components[anchor].anchors.y) {
    $(`#${anchor}Label`).removeClass('btn-dark').addClass('btn-danger')
    return false;
  }
  return true;
}

function showMessageModal(label, text, actionBtn = null) {
  $('#messageModalLabel').text(label)
  $('#messageModalText').text(text)
  $('#messageModal').modal('show');
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}