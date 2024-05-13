function addFramesetColorElements(colorId, colorData = null) {
  $('#colorSelector').append(`<div id="colorSelector-${colorId}" data-id="${colorId}" class="d-inline-block me-3 mt-1">
    <div class="d-flex">
      <button id="colorSelectorBtn-${colorId}" type="button" class="btn btn-primary rounded-pill" onclick="selectColor(${colorId})" style="background-color: ${colorData?.colorCode ? colorData.colorCode : '#000000'};">
        #${colorId + 1}
      </button>
      <svg id="colorSelectorRemove-${colorId}" onclick="deleteColor(${colorId})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(217, 83, 79)" class="bi bi-x-square-fill deleteColorBtn" viewBox="0 0 16 16">
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
      </svg>
    </div>
  </div>`)
  let classButtons = colorData ? 'btn-success' : 'btn-dark';
  $('#colorContainer').append(`
    <div id="colorContainer-${colorId}">
      <div class="form-group mb-3">
        <label for="image-${colorId}">Imagen</label>
        <input type="file" class="form-control" id="image-${colorId}">
        <div class="invalid-feedback">Selecciona una imagen.</div>
      </div>
      <div class="form-group mb-3">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="hasBar" id="hasBar-${colorId}" ${colorData?.hasBar ? 'checked' : '' }>
          <label class="form-check-label" for="hasBar-${colorId}">
            Incluye manillar
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="hasSeatpot" id="hasSeatpot-${colorId}" ${colorData?.hasSeatpot ? 'checked' : '' }>
          <label class="form-check-label" for="hasSeatpot-${colorId}">
            Incluye barra del sillín
          </label>
        </div>
      </div>
      <p class="mb-1">Selecciona los puntos de anclaje.</p>
      <div class="btn-group mb-3 d-block" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="anchors-${colorId}" id="frontWheel-${colorId}" autocomplete="off" onclick="changeAnchor('frontWheel')">
        <label class="btn btn-sm ${classButtons} mt-1" for="frontWheel-${colorId}" id="frontWheelLabel-${colorId}">Rueda delantera</label>
        <input type="radio" class="btn-check" name="anchors-${colorId}" id="backWheel-${colorId}" autocomplete="off" onclick="changeAnchor('backWheel')">
        <label class="btn btn-sm ${classButtons} mt-1" for="backWheel-${colorId}" id="backWheelLabel-${colorId}">Rueda trasera</label>
        <input type="radio" class="btn-check" name="anchors-${colorId}" id="set-${colorId}" autocomplete="off" onclick="changeAnchor('set')">
        <label class="btn btn-sm ${classButtons} mt-1" for="set-${colorId}" id="setLabel-${colorId}">Platos</label>
        <input type="radio" class="btn-check" name="anchors-${colorId}" id="saddle-${colorId}" autocomplete="off" onclick="changeAnchor('saddle')">
        <label class="btn btn-sm ${classButtons} mt-1" for="saddle-${colorId}" id="saddleLabel-${colorId}">Sillín</label>
        <input type="radio" class="btn-check" name="anchors-${colorId}" id="bar-${colorId}" autocomplete="off" onclick="changeAnchor('bar')">
        <label class="btn btn-sm ${classButtons} mt-1" for="bar-${colorId}" id="barLabel-${colorId}">Manillar</label>
        <input type="radio" class="btn-check" name="anchors-${colorId}" id="diverter-${colorId}" autocomplete="off" onclick="changeAnchor('diverter')">
        <label class="btn btn-sm ${classButtons} mt-1" for="diverter-${colorId}" id="diverterLabel-${colorId}">Desviador</label>
      </div>
      <canvas id="canvas-${colorId}" class="border border-primary mb-3" width="500" height="300"></canvas>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group mb-3">
            <label for="colorCode">Color</label>
            <input type="color" class="form-control p-1 mt-2" id="colorCode-${colorId}" value="${colorData?.colorCode ? colorData.colorCode : '#000000' }">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group mb-3">
            <label for="shopifyId">ID Shopify</label>
            <input type="text" class="form-control" id="shopifyId-${colorId}" value="${colorData?.shopifyId ? colorData.shopifyId : '' }">
            <div class="invalid-feedback">Introduce una el ID del producto en Shopify.</div>
          </div>
        </div>
      </div>
    </div>
  `)
  document.getElementById(`colorCode-${colorId}`).addEventListener('change', function(e) { 
    $(`#colorSelectorBtn-${colorId}`).css("background-color", $(this).val());
  })
  document.getElementById(`image-${colorId}`).addEventListener('change', function(e) {
    if(e.target.files[0]) {
      try {
        let file = $(`#image-${colorId}`)[0].files[0]
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
            img.src = `/img/framesets/${response.data}`;
            frameset.colors[colorId].image = img.src;
            $(`#frontWheelLabel-${colorId}`).removeClass('btn-success btn-danger').addClass('btn-dark')
            $(`#backWheelLabel-${colorId}`).removeClass('btn-success btn-danger').addClass('btn-dark')
            $(`#setLabel-${colorId}`).removeClass('btn-success btn-danger').addClass('btn-dark')
            $(`#saddleLabel-${colorId}`).removeClass('btn-success btn-danger').addClass('btn-dark')
            $(`#barLabel-${colorId}`).removeClass('btn-success btn-danger').addClass('btn-dark')
            $(`#diverterLabel-${colorId}`).removeClass('btn-success btn-danger').addClass('btn-dark')
            frameset.colors[colorId].anchors.frontWheel.x = false
            frameset.colors[colorId].anchors.frontWheel.y = false
            frameset.colors[colorId].anchors.backWheel.x = false
            frameset.colors[colorId].anchors.backWheel.y = false
            frameset.colors[colorId].anchors.set.x = false
            frameset.colors[colorId].anchors.set.y = false
            frameset.colors[colorId].anchors.saddle.x = false
            frameset.colors[colorId].anchors.saddle.y = false
            frameset.colors[colorId].anchors.bar.x = false
            frameset.colors[colorId].anchors.bar.y = false
            frameset.colors[colorId].anchors.diverter.x = false
            frameset.colors[colorId].anchors.diverter.y = false
          }
        });
        xhr.open("POST", "/api/uploadAvatar");
        xhr.setRequestHeader("Directory", "framesets");
        xhr.send(data)
      } catch(e) {
        console.log(e)
      }
    }
  });
  const canvas = document.getElementById(`canvas-${colorId}`);
  const ctx = canvas.getContext("2d");
  canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(e, colorId)
  });
}

function drawImageAndAnchors(colorId) {
  const canvas = document.getElementById(`canvas-${colorId}`);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 125, 35, 250, img.height * (250/img.width));
    Object.values(frameset.colors[colorId].anchors).forEach(anchor => {
      if(!anchor.x || !anchor.y) return
      ctx.fillStyle = "red";
      ctx.fillRect(anchor.x - 3, anchor.y - 3, 6, 6);
    });
  };
  img.src = frameset.colors[colorId].image;
}

function addColor() {
  let colors = $('#colorSelector').children();
  colorId = parseInt(colors.last()[0].dataset.id) + 1;
  $(`#colorContainer-${currentColorSelected}`).hide()
  frameset.colors.push({
    image: false,
    colorCode: '',
    shopifyId: '',
    anchors: {
      frontWheel: {x: false, y: false},
      backWheel: {x: false, y: false},
      set: {x: false, y: false},
      saddle: {x: false, y: false},
      bar: {x: false, y: false},
      diverter: {x: false, y: false},
    }
  })
  addFramesetColorElements(colorId)
  currentColorSelected = colorId;
  $('button[id^=colorSelectorBtn-]').removeClass('btnColorSelected')
  $(`#colorSelectorBtn-${colorId}`).addClass('btnColorSelected')
}

function changeAnchor(target) {
  anchor = target;
}

function getCursorPosition(event, colorId) {
  if(!frameset.colors[colorId].image) return;
  if(!anchor) {
    showMessageModal('ERROR', 'Selecciona un punto de anclaje')
    return;
  }
  const canvas = document.getElementById(`canvas-${colorId}`);
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  if(!frameset.colors[colorId].anchors[anchor]) {
    frameset.colors[colorId].anchors[anchor] = {x: false, y: false}
  }
  frameset.colors[colorId].anchors[anchor].x = x; 
  frameset.colors[colorId].anchors[anchor].y = y;
  drawImageAndAnchors(colorId)
  $(`#${anchor}Label-${colorId}`).removeClass('btn-dark btn-danger').addClass('btn-success')
}

function selectColor(colorId) {
  $(`#colorContainer-${currentColorSelected}`).hide()
  $(`#colorContainer-${colorId}`).show()
  $('button[id^=colorSelectorBtn-]').removeClass('btnColorSelected')
  $(`#colorSelectorBtn-${colorId}`).addClass('btnColorSelected')
  currentColorSelected = colorId;
  anchor = null;
}

function deleteColor(colorId) {
  let colorsLength = $('#colorSelector').children().length;
  if(colorsLength === 1) {
    showMessageModal('ERROR', 'No puedes eliminar el color, al menos debe haber uno.')
    return;
  }
  colorsRemoved.push(colorId);
  $(`#colorContainer-${colorId}`).remove()
  $(`#colorSelector-${colorId}`).remove()
  if(colorId === currentColorSelected) {
    currentColorSelected--;
    $(`#colorSelectorBtn-${currentColorSelected}`).addClass('btnColorSelected')
    $(`#colorContainer-${currentColorSelected}`).show()
  }
}

function validateForm() {
  frameset.brand = validateInput('brand')
  frameset.model = validateInput('model')
  frameset.description = validateInput('description')
  frameset.price = validateInput('price')
  let error = !frameset.brand || !frameset.model || !frameset.description || !frameset.price;
  let colors = $('#colorSelector').children();
  colors.each((i, color) => {
    let colorId = color.dataset.id;
    frameset.colors[colorId].colorCode = validateInput(`colorCode-${colorId}`)
    frameset.colors[colorId].shopifyId = validateInput(`shopifyId-${colorId}`)
    frameset.colors[colorId].hasBar = $(`#hasBar-${colorId}`).prop('checked')
    frameset.colors[colorId].hasSeatpot = $(`#hasSeatpot-${colorId}`).prop('checked')
    if(!frameset.colors[colorId].image) {
      $(`#image-${colorId}`).addClass("is-invalid");
    } else {
      $(`#image-${colorId}`).removeClass("is-invalid").addClass('is-valid');
    }
    if (validateAnchors(colorId) || !frameset.colors[colorId].image || !frameset.colors[colorId].shopifyId) {
      error = true
    }
  })
  if(error) return error;
  colorsRemoved.sort().reverse().forEach(async (colorRemoved) => {
    frameset.colors.splice(colorRemoved, 1)
  });
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

function validateAnchors(colorId) {
  let validate = [
    validateAnchor(colorId, 'frontWheel'),
    validateAnchor(colorId, 'backWheel'),
    validateAnchor(colorId, 'set'),
    validateAnchor(colorId, 'saddle'),
    validateAnchor(colorId, 'bar'),
    validateAnchor(colorId, 'diverter')
  ]
  return validate.some((e) => !e)
}

function validateAnchor(colorId, anchor) {
  if (!frameset.colors[colorId].anchors[anchor].x || !frameset.colors[colorId].anchors[anchor].y) {
    $(`#${anchor}Label-${colorId}`).removeClass('btn-dark').addClass('btn-danger')
    return false;
  }
  return true;
}

function showMessageModal(label, text, actionBtn = null) {
  $('#messageModalLabel').text(label)
  $('#messageModalText').text(text)
  $('#messageModal').modal('show');
}
