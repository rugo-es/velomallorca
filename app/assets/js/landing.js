let bike = {
  frameset: null,
  groupset: null,
  bar: null,
  wheels: null,
  tyres: null,
  seatpots: null,
  saddles: null
}
let framesets = []
let groupsets = []
let bars = []
let wheels = []
let tyres = []
let seatpots = []
let saddles = []
const canvas = document.getElementById("canvasBuilder")
const ctx = canvas.getContext("2d")
let isLastStep = false
let isFirstIn = window.location.search ? true : false

$(document).ready(() => {
  getFramesets()
  getGroupsets()
  getBars()
  getWheels()
  getTyres()
  getSeatpots()
  getSaddles()
})

function getFramesets() {
  var settings = {
    "url": "/api/framesets",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  };
  $.ajax(settings)
    .done(function (response) { 
      framesets = response;
      showFramesets()
      selectLink('fr')
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(textStatus)
    })
}

function getGroupsets() {
  var settings = {
    "url": "/api/groupsets",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  };
  $.ajax(settings)
    .done(function (response) { 
      groupsets = response;
      selectLink('gr')
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(textStatus)
    })
}

function getWheels() {
  var settings = {
    "url": "/api/wheels",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  };
  $.ajax(settings)
    .done(function (response) { 
      wheels = response;
      selectLink('wh')
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(textStatus)
    })
}

function getTyres() {
  var settings = {
    "url": "/api/tyres",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  };
  $.ajax(settings)
    .done(function (response) { 
      tyres = response;
      selectLink('ty')
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(textStatus)
    })
}

function getBars() {
  var settings = {
    "url": "/api/bars",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  };
  $.ajax(settings)
    .done(function (response) { 
      bars = response;
      selectLink('ba')
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(textStatus)
    })
}

function getSeatpots() {
  var settings = {
    "url": "/api/seatpots",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  };
  $.ajax(settings)
    .done(function (response) { 
      seatpots = response;
      selectLink('se')
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(textStatus)
    })
}

function getSaddles() {
  var settings = {
    "url": "/api/saddles",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  };
  $.ajax(settings)
    .done(function (response) { 
      saddles = response;
      selectLink('sa')
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(textStatus)
    })
}

function showFramesets() {
  controlSelectorNav('frameset')
  let selected = bike.frameset ? bike.frameset.id : null
  $('#container-items').html('')
  framesets.forEach((item) => {
    let selectedClass = item.id === selected ? 'itemSelected' : '';
    let colors = item.colors.slice(0, 3).map((color, index) => `<span class="badge me-1 border border-1 border-black" style="background-color: ${color.colorCode};">&nbsp;&nbsp;</span>`).join('')
    colors += item.colors.length > 3 ? `<span>+${item.colors.length - 3}</span>` : ''
    $('#container-items').append(`
      <button type="button" id="frameset${item.id}" class="border list-group-item list-group-item-action ${selectedClass}" onclick="selectFrameset(${item.id})">
        <div class="w-100 d-flex justify-content-center" style="min-hei">
          <img style="height: 140px;" class="px-2 py-3" src="${item.colors[0].image}" alt="">
        </div>
        <div class="mt-2 d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-lg-end">
          <span class="cardBrandAndModel fw-bold" style="max-width: 200px;">${item.brand} ${item.model}</span>
          <div>${colors}</div>
        </div>
      </button>
    `)
  });
  if(bike.frameset) {
    let colorSelected = bike.frameset.colorSelected
    selectFrameset(bike.frameset.id, false)
    selectFramesetColor(colorSelected)
  }
}

function showSets() {
  controlSelectorNav('groupset')
  hiddenColorSelectorAndLabel()
  let selected = bike.groupset ? bike.groupset.id : null
  $('#container-items').html('')
  groupsets.forEach((item) => {
    let selectedClass = item.id === selected ? 'itemSelected' : '';
    $('#container-items').append(`
      <button type="button" id="groupset${item.id}" class="border list-group-item list-group-item-action ${selectedClass}" onclick="selectGroupset(${item.id})">
        <div class="w-100 d-flex justify-content-center">
          <img style="height: 140px;" class="px-2 py-3" src="${item.components.chainring.image}" alt="">
        </div>
        <div class="mt-2 d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-lg-end">
          <span class="cardBrandAndModel fw-bold" style="max-width: 200px;">${item.brand} ${item.model}</span>
        </div>
      </button>
    `)
  });
  if(bike.groupset) {
    selectGroupset(bike.groupset.id, false)
  }
}

function showBars() {
  controlSelectorNav('bar')
  hiddenColorSelectorAndLabel()
  let selected = bike.bar ? bike.bar.id : null
  $('#container-items').html('')
  bars.forEach((item) => {
    let selectedClass = item.id === selected ? 'itemSelected' : '';
    $('#container-items').append(`
      <button type="button" id="bars${item.id}" class="border list-group-item list-group-item-action ${selectedClass}" onclick="selectBars(${item.id})">
        <div class="w-100 d-flex justify-content-center">
          <img style="height: 140px;" class="px-2 py-3" src="${item.image}" alt="">
        </div>
        <div class="mt-2 d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-lg-end">
          <span class="cardBrandAndModel fw-bold" style="max-width: 200px;">${item.brand} ${item.model}</span>
        </div>
      </button>
    `)
  });
  if(bike.bar) {
    selectBars(bike.bar.id, false)
  }
}

function showWheels() {
  controlSelectorNav('wheels')
  hiddenColorSelectorAndLabel()
  let selected = bike.wheels ? bike.wheels.id : null
  $('#container-items').html('')
  wheels.forEach((item) => {
    let selectedClass = item.id === selected ? 'itemSelected' : '';
    $('#container-items').append(`
      <button type="button" id="wheels${item.id}" class="border list-group-item list-group-item-action ${selectedClass}" onclick="selectWheel(${item.id})">
        <div class="w-100 d-flex justify-content-center">
          <img style="height: 140px;" class="px-2 py-3" src="${item.image}" alt="">
        </div>
        <div class="mt-2 d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-lg-end">
          <span class="cardBrandAndModel fw-bold" style="max-width: 200px;">${item.brand} ${item.model}</span>
        </div>
      </button>
    `)
  });
  if(bike.wheels) {
    selectWheel(bike.wheels.id, false)
  }
}

function showTyres() {
  controlSelectorNav('tyres')
  hiddenColorSelectorAndLabel()
  let selected = bike.tyres ? bike.tyres.id : null
  $('#container-items').html('')
  tyres.forEach((item) => {
    let selectedClass = item.id === selected ? 'itemSelected' : '';
    $('#container-items').append(`
      <button type="button" id="tyres${item.id}" class="border list-group-item list-group-item-action ${selectedClass}" onclick="selectTyres(${item.id})">
        <div class="w-100 d-flex justify-content-center">
          <img style="height: 140px;" class="px-2 py-3" src="${item.image}" alt="">
        </div>
        <div class="mt-2 d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-lg-end">
          <span class="cardBrandAndModel fw-bold" style="max-width: 200px;">${item.brand} ${item.model}</span>
        </div>
      </button>
    `)
  });
  if(bike.tyres) {
    selectTyres(bike.tyres.id, false)
  }
}

function showSeatpots() {
  controlSelectorNav('seatpots')
  hiddenColorSelectorAndLabel()
  let selected = bike.seatpots ? bike.seatpots.id : null
  $('#container-items').html('')
  seatpots.forEach((item) => {
    let selectedClass = item.id === selected ? 'itemSelected' : '';
    $('#container-items').append(`
      <button type="button" id="seatpots${item.id}" class="border list-group-item list-group-item-action ${selectedClass}" onclick="selectSeatpot(${item.id})">
        <div class="w-100 d-flex justify-content-center">
          <img style="height: 140px;" class="px-2 py-3" src="${item.image}" alt="">
        </div>
        <div class="mt-2 d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-lg-end">
          <span class="cardBrandAndModel fw-bold" style="max-width: 200px;">${item.brand} ${item.model}</span>
        </div>
      </button>
    `)
  });
  if(bike.seatpots) {
    selectSeatpot(bike.seatpots.id, false)
  }
}

function showSaddles() {
  controlSelectorNav('saddles')
  hiddenColorSelectorAndLabel()
  let selected = bike.saddles ? bike.saddles.id : null
  $('#container-items').html('')
  saddles.forEach((item) => {
    let selectedClass = item.id === selected ? 'itemSelected' : '';
    $('#container-items').append(`
      <button type="button" id="saddles${item.id}" class="border list-group-item list-group-item-action ${selectedClass}" onclick="selectSaddle(${item.id})">
        <div class="w-100 d-flex justify-content-center" style="height: 140px;">
          <img style="height: 80px; max-width: 350px" class="px-2 py-3 mt-4" src="${item.image}" alt="">
        </div>
        <div class="mt-2 d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-lg-end">
          <span class="cardBrandAndModel fw-bold" style="max-width: 200px;">${item.brand} ${item.model}</span>
        </div>
      </button>
    `)
  });
  if(bike.saddles) {
    selectSaddle(bike.saddles.id, false)
  }
}

function selectFrameset(framesetId, draw = true) {
  if(!bike.frameset) {
    $('#landingNoSelectedFrameset').addClass("d-none")
    $('#containerCanvas').removeClass('d-none')
  }
  bike.frameset = framesets.find((elem) => elem.id === framesetId)
  $("button[id^=frameset]").removeClass('itemSelected')
  $(`#frameset${framesetId}`).addClass('itemSelected')
  loadDescriptionItem(bike.frameset.brand, bike.frameset.model)
  if(bike.frameset.colors.length > 1) {
    let colores = bike.frameset.colors.map((color, index) => {
      let classActive = index === 0 ? 'btnColorSelected': ''
      return `<button class="badge me-2 border border-1 border-black ${classActive}" data-index="${index}" style="background-color: ${color.colorCode};" onclick="selectFramesetColor(${index})">&nbsp;&nbsp;</button>`
    }).join('')
    $('#containerSelectorColorItems').html(colores)
    $('#containerSelectorColorItemsMobile').html(colores)
    $('#containerColorSelector').removeClass('invisible') 
    $('#containerColorSelectorMobile').removeClass('invisible') 
  } else {
    $('#containerSelectorColorItemsMobile').html()
    $('#containerColorSelector').addClass('invisible') 
    $('#containerColorSelectorMobile').addClass('invisible') 
  }
  bike.frameset.colorSelected = 0;
  if(draw) drawBike()
  loadDescriptionModal({
    type: 'Frameset',
    brand: bike.frameset.brand,
    model: bike.frameset.model,
    description: bike.frameset.description,
    image: bike.frameset.colors[bike.frameset.colorSelected].image
  })
  handlerNavigation()
  controlBreadcrumbs()
  controlSelectorNav('frameset')
  updatePrice()
}

function selectFramesetColor(index) {
  bike.frameset.colorSelected = index;
  handlerNavigation()
  controlSelectorNav('frameset')
  controlBreadcrumbs()
  $(`button.badge`).removeClass('btnColorSelected')
  $(`button[data-index=${index}]`).addClass('btnColorSelected')
  loadDescriptionModal({
    type: 'Frameset',
    brand: bike.frameset.brand,
    model: bike.frameset.model,
    description: bike.frameset.description,
    image: bike.frameset.colors[bike.frameset.colorSelected].image
  })
  drawBike()
}

function selectGroupset(groupsetId, draw = true) {
  bike.groupset = groupsets.find((elem) => elem.id === groupsetId)
  $("button[id^=groupset]").removeClass('itemSelected')
  $(`#groupset${groupsetId}`).addClass('itemSelected')
  loadDescriptionItem(bike.groupset.brand, bike.groupset.model)
  if(draw) drawBike()
  loadDescriptionModal({
    type: 'Groupset',
    brand: bike.groupset.brand,
    model: bike.groupset.model,
    description: bike.groupset.description,
    image: bike.groupset.components.chainring.image
  })
  controlBreadcrumbs()
  controlSelectorNav('groupset')
  updatePrice()
}

function selectBars(barsId, draw = true) {
  bike.bar = bars.find((elem) => elem.id === barsId)
  $("button[id^=bars]").removeClass('itemSelected')
  $(`#bars${barsId}`).addClass('itemSelected')
  loadDescriptionItem(bike.bar.brand, bike.bar.model)
  if(draw) drawBike()
  loadDescriptionModal({
    type: 'Bars',
    brand: bike.bar.brand,
    model: bike.bar.model,
    description: bike.bar.description,
    image: bike.bar.image
  })
  controlBreadcrumbs()
  controlSelectorNav('bar')
  updatePrice()
}

function selectWheel(wheelsId, draw = true) {
  bike.wheels = wheels.find((elem) => elem.id === wheelsId)
  $("button[id^=wheels]").removeClass('itemSelected')
  $(`#wheels${wheelsId}`).addClass('itemSelected')
  
  loadDescriptionItem(bike.wheels.brand, bike.wheels.model)

  if(draw) drawBike()
  loadDescriptionModal({
    type: 'Wheels',
    brand: bike.wheels.brand,
    model: bike.wheels.model,
    description: bike.wheels.description,
    image: bike.wheels.image
  })
  controlBreadcrumbs()
  controlSelectorNav('wheels')
  updatePrice()
}

function selectTyres(tyresId, draw = true) {
  bike.tyres = tyres.find((elem) => elem.id === tyresId)
  $("button[id^=tyres]").removeClass('itemSelected')
  $(`#tyres${tyresId}`).addClass('itemSelected')
  loadDescriptionItem(bike.tyres.brand, bike.tyres.model)
  if(draw) drawBike()
  loadDescriptionModal({
    type: 'Tyres',
    brand: bike.tyres.brand,
    model: bike.tyres.model,
    description: bike.tyres.description,
    image: bike.tyres.image
  })
  controlBreadcrumbs()
  controlSelectorNav('tyres')
  updatePrice()
}

function selectSeatpot(seatpotsId, draw = true) {
  bike.seatpots = seatpots.find((elem) => elem.id === seatpotsId)
  $("button[id^=seatpots]").removeClass('itemSelected')
  $(`#seatpots${seatpotsId}`).addClass('itemSelected')
  loadDescriptionItem(bike.seatpots.brand, bike.seatpots.model)
  if(draw) drawBike()
  loadDescriptionModal({
    type: 'Seatpot',
    brand: bike.seatpots.brand,
    model: bike.seatpots.model,
    description: bike.seatpots.description,
    image: bike.seatpots.image
  })
  controlBreadcrumbs()
  controlSelectorNav('seatpots')
  updatePrice()
}

function selectSaddle(saddlesId, draw = true) {
  bike.saddles = saddles.find((elem) => elem.id === saddlesId)
  $("button[id^=saddles]").removeClass('itemSelected')
  $(`#saddles${saddlesId}`).addClass('itemSelected')
  loadDescriptionItem(bike.saddles.brand, bike.saddles.model)
  if(draw) drawBike()
  loadDescriptionModal({
    type: 'Saddle',
    brand: bike.saddles.brand,
    model: bike.saddles.model,
    description: bike.saddles.description,
    image: bike.saddles.image
  })
  controlBreadcrumbs()
  controlSelectorNav('saddles')
  updatePrice()
}

function drawBike() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawGroupset()
}

function drawFrameset() {
  ctx.globalCompositeOperation='destination-over';
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 175, 30, 500, img.height * (500/img.width));
    if(bike.bar && !bike.frameset.colors[bike.frameset.colorSelected].hasBar) drawBars()
    if(bike.groupset) drawBrakeDisk()
    if(bike.saddles) drawSaddle()
    if(bike.wheels) drawWheels()
    if(bike.tyres) drawTyres()
  };
  img.src = bike.frameset.colors[bike.frameset.colorSelected].image
}

function drawGroupset() {
  if(bike.groupset) {
    let colorSelected = bike.frameset.colorSelected

    drawLevers()

    const diverterImage = new Image()
    diverterImage.onload = () => {
      ctx.drawImage(
        diverterImage, 
        (bike.frameset.colors[colorSelected].anchors.diverter.x * 2 + 175 - (125 * 2)) - ((bike.groupset.components.diverter.anchors.x * 2) * 0.10), 
        (bike.frameset.colors[colorSelected].anchors.diverter.y * 2 + 30 - (35 * 2)) -  ((bike.groupset.components.diverter.anchors.y * 2) * 0.10), 
        50, 
        diverterImage.height * (50/diverterImage.width)
      )
      drawCassete()
    };
    diverterImage.src = bike.groupset.components.diverter.image

    const chainringImage = new Image()
    chainringImage.onload = () => {
      ctx.drawImage(
        chainringImage, 
        (bike.frameset.colors[colorSelected].anchors.set.x * 2 + 175 - (125 * 2)) - (bike.groupset.components.chainring.anchors.x * 2) * 0.25, 
        (bike.frameset.colors[colorSelected].anchors.set.y * 2 + 30 - (35 * 2)) -  (bike.groupset.components.chainring.anchors.y * 2) * 0.25, 
        125, 
        chainringImage.height * (125/chainringImage.width)
      )
      drawCassete()
    };
    chainringImage.src = bike.groupset.components.chainring.image   
  } else {
    drawFrameset()
  }
}

function drawBrakeDisk() {
  let colorSelected = bike.frameset.colorSelected
  const brakeDiskImage = new Image()
  brakeDiskImage.onload = () => {
    ctx.drawImage(
      brakeDiskImage, 
      (bike.frameset.colors[colorSelected].anchors.frontWheel.x * 2 + 175 - (125 * 2)) - (bike.groupset.components.brakeDisk.anchors.x * 2) * 0.18, 
      (bike.frameset.colors[colorSelected].anchors.frontWheel.y * 2 + 30 - (35 * 2)) -  (bike.groupset.components.brakeDisk.anchors.y * 2) * 0.18, 
      90, 
      brakeDiskImage.height * (90/brakeDiskImage.width)
    )
    ctx.drawImage(
      brakeDiskImage, 
      (bike.frameset.colors[colorSelected].anchors.backWheel.x * 2 + 175 - (125 * 2)) - (bike.groupset.components.brakeDisk.anchors.x * 2) * 0.18, 
      (bike.frameset.colors[colorSelected].anchors.backWheel.y * 2 + 30 - (35 * 2)) -  (bike.groupset.components.brakeDisk.anchors.y * 2) * 0.18, 
      90, 
      brakeDiskImage.height * (90/brakeDiskImage.width)
    )
  };
  brakeDiskImage.src = bike.groupset.components.brakeDisk.image
}

function drawCassete() {
  let colorSelected = bike.frameset.colorSelected
  const casseteImage = new Image()
  casseteImage.onload = () => {
    ctx.drawImage(
      casseteImage, 
      (bike.frameset.colors[colorSelected].anchors.backWheel.x * 2 + 175 - (125 * 2)) - (bike.groupset.components.cassete.anchors.x * 2) * 0.16, 
      (bike.frameset.colors[colorSelected].anchors.backWheel.y * 2 + 30 - (35 * 2)) -  (bike.groupset.components.cassete.anchors.y * 2) * 0.16, 
      80, 
      casseteImage.height * (80/casseteImage.width)
    )
    drawFrameset()
  };
  casseteImage.src = bike.groupset.components.cassete.image
}

function drawLevers() {
  let colorSelected = bike.frameset.colorSelected
  let bar = {
    x: (bike.frameset.colors[colorSelected].anchors.bar.x * 2 + 175 - (125 * 2)) - (bike.groupset.components.levers.anchors.x * 2) * 0.16, 
    y: (bike.frameset.colors[colorSelected].anchors.bar.y * 2 + 30 - (35 * 2)) - (bike.groupset.components.levers.anchors.y * 2) * 0.16
  }
  if(!bike.frameset.colors[bike.frameset.colorSelected].hasBar) {
    if(!bike.bar) return
    bar.x = (bike.frameset.colors[colorSelected].anchors.bar.x * 2 + 175 - (125 * 2)) 
      - ((bike.bar.anchors.center.x - 125) * 0.4)
      + ((bike.bar.anchors.levers.x - 125) * 0.4)
      - (bike.groupset.components.levers.anchors.x * 2) * 0.2

    bar.y = (bike.frameset.colors[colorSelected].anchors.bar.y * 2 + 30 - (35 * 2)) 
      - ((bike.bar.anchors.center.y - 35) * 0.4)
      + ((bike.bar.anchors.levers.y - 35) * 0.4)
      - (bike.groupset.components.levers.anchors.y * 2) * 0.2
  }
  const leversImage = new Image()
  leversImage.onload = () => {
    ctx.drawImage(
      leversImage, 
      bar.x, 
      bar.y, 
      100, 
      leversImage.height * (100/leversImage.width)
    )
  };
  leversImage.src = bike.groupset.components.levers.image
}

function drawBars() {
  const img = new Image()
  let colorSelected = bike.frameset.colorSelected
  img.onload = () => {
    ctx.drawImage(
      img, 
      (bike.frameset.colors[colorSelected].anchors.bar.x * 2 + 175 - (125 * 2)) - ((bike.bar.anchors.center.x - 125) * 0.4),
      (bike.frameset.colors[colorSelected].anchors.bar.y * 2 + 30 - (35 * 2)) - ((bike.bar.anchors.center.y - 35) * 0.4),
      100, 
      img.height * (100/img.width)
    )
  };
  img.src = bike.bar.image
}

function drawWheels() {
  ctx.globalCompositeOperation='destination-over';
  const img = new Image()
  /*
    PARTE DEL ANCLAJE DEL CUADRO
    * 2 -> la posición de x e y se mutiplica por 2 por el tamaño del canvas 500 (añadir) y 1000 (builder)
    + 175 / + 30 -> el margen del canvas del builder
    - (125 * 2) / - (35 * 2) -> los margenes del canvas de añadir
    
    PARTE DEL ANCLAJE DE LA RUEDA
    + 125 / + 35 -> los margenes del canvas de añadir
    - (50 / 2) -> El aumento de tamaño de la imagen de la rueda (+50) entre 2 por el cambio de tamaño del canvas
  */
  let colorSelected = bike.frameset.colorSelected
  img.onload = () => {
    ctx.drawImage(
      img, 
      (bike.frameset.colors[colorSelected].anchors.frontWheel.x * 2 + 175 - (125 * 2)  -  bike.wheels.anchors.center.x + 125) - (50 / 2), 
      (bike.frameset.colors[colorSelected].anchors.frontWheel.y * 2 + 30 - (35 * 2)  -  bike.wheels.anchors.center.y + 35) - (50 / 2), 
      300, 
      img.height * (300/img.width)
    )
    ctx.drawImage(
      img, 
      (bike.frameset.colors[colorSelected].anchors.backWheel.x * 2 + 175 - (125*2)  -  bike.wheels.anchors.center.x + 125) - 25, 
      (bike.frameset.colors[colorSelected].anchors.backWheel.y * 2 + 30 - (35*2)  -  bike.wheels.anchors.center.y + 35) - 25, 
      300, 
      img.height * (300/img.width)
    )
    if(bike.seatpots && !bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) drawSeatpot()
  };
  img.src = bike.wheels.image
}

function drawTyres() {
  ctx.globalCompositeOperation='destination-over';
  const img = new Image()
  let colorSelected = bike.frameset.colorSelected
  img.onload = () => {
    ctx.drawImage(
      img, 
      (bike.frameset.colors[colorSelected].anchors.frontWheel.x * 2 + 175 - (125 * 2)  -  bike.wheels.anchors.center.x + 125) - (50 / 2) - 4, 
      (bike.frameset.colors[colorSelected].anchors.frontWheel.y * 2 + 30 - (35 * 2)  -  bike.wheels.anchors.center.y + 35) - (50 / 2) - 4, 
      308, 
      img.height * (308/img.width)
    )
    ctx.drawImage(
      img, 
      (bike.frameset.colors[colorSelected].anchors.backWheel.x * 2 + 175 - (125 * 2)  -  bike.wheels.anchors.center.x + 125) - 25 - 4, 
      (bike.frameset.colors[colorSelected].anchors.backWheel.y * 2 + 30 - (35 * 2)  -  bike.wheels.anchors.center.y + 35) - 25 - 4, 
      308, 
      img.height * (308/img.width)
    )
  };
  img.src = bike.tyres.image
}

function drawSeatpot() {
  ctx.globalCompositeOperation='destination-over';
  const img = new Image()
  let colorSelected = bike.frameset.colorSelected
  img.onload = () => {
    ctx.save();
    ctx.translate(
      175 + (bike.frameset.colors[colorSelected].anchors.saddle.x * 2) - (125 * 2) - (bike.seatpots.anchors.center.x * 0.73) - 20,
      30 + (bike.frameset.colors[colorSelected].anchors.saddle.y * 2) - (35 * 2) - (bike.seatpots.anchors.center.y * 0.73) 
    );
    ctx.rotate(-15 * Math.PI / 180);
    ctx.globalCompositeOperation='destination-over';
    ctx.fillStyle = "white";
    ctx.fillRect(0, (bike.seatpots.anchors.center.y * 0.73) + 20, 200, 200);
    ctx.drawImage(img, 0, 0, img.width * (220/img.height), 220)
    ctx.restore();
  };
  img.src = bike.seatpots.image
}

function drawSaddle() {
  const img = new Image()
  let colorSelected = bike.frameset.colorSelected
  img.onload = () => {

    if(bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) {
      ctx.save();
      ctx.translate(
        (175 + (bike.frameset.colors[colorSelected].anchors.saddle.x * 2) - (125 * 2) - 25) 
        - (bike.saddles.anchors.center.x * 0.5) + 125 * 0.5,
        (30 + (bike.frameset.colors[colorSelected].anchors.saddle.y * 2) - (35 * 2) - 5) 
        - (bike.saddles.anchors.center.y * 0.5) + 35 * 0.5
      );
      ctx.globalCompositeOperation='source-over';
      ctx.drawImage(img, 0, 0, 180, img.height * (180/img.width))
      ctx.restore();
    } else {
      ctx.save();
      ctx.translate(
        (175 + (bike.frameset.colors[colorSelected].anchors.saddle.x * 2) - (125 * 2) - (bike.seatpots.anchors.center.x * 0.73)) 
        - (bike.saddles.anchors.center.x * 0.5) + 125 * 0.5,
        (30 + (bike.frameset.colors[colorSelected].anchors.saddle.y * 2) - (35 * 2) - (bike.seatpots.anchors.center.y * 0.73)) 
        - (bike.saddles.anchors.center.y * 0.5) + 35 * 0.5
      );
      ctx.globalCompositeOperation='source-over';
      ctx.drawImage(img, 0, 0, 180, img.height * (180/img.width))
      ctx.restore();
    }
    
  };
  img.src = bike.saddles.image
}

function resetBike() {
  bike = {
    frameset: null,
    bar: null,
    groupset: null,
    wheels: null,
    tyres: null,
    seatpots: null,
    saddles: null
  }
  $('#containerCanvas').addClass('d-none')
  $('#landingNoSelectedFrameset').removeClass("d-none")

  $('#selectorNavNext').addClass("disabled")
  $('#selectorNavBack').addClass("disabled")
  $('#selectorNavContinue').addClass("disabled")

  $('#navBars').addClass("disabled")
  $('#navSet').addClass("disabled")
  $('#navWheels').addClass("disabled")
  $('#navTyres').addClass("disabled")
  $('#navSeatpots').addClass("disabled")
  $('#navSaddles').addClass("disabled")

  $('#containerLabelAndDescription').addClass('invisible') 
  $('#containerColorSelector').addClass('invisible') 

  $('#containerDetailsMobile').addClass('d-none')

  updatePrice()
  showFramesets()
  let isLastStep = false
}

function updatePrice() {
  let totalPrice = 0;
  for(const [key, value] of Object.entries(bike)) {
    if(bike[key]?.price) {
      if(key === 'bar' && bike.frameset.colors[bike.frameset.colorSelected].hasBar) continue
      if(key === 'seatpots' && bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) continue
      totalPrice += parseFloat(bike[key]?.price)
    }
  }
  let totalPriceFormat = totalPrice.toFixed(2).toString().replace('.', ',')
  $('#totalPrice').html(totalPriceFormat)
}

function showDetailsModal() {
  $('#detailsModalContent').html('')
  let totalPrice = 0;
  for(const [key, value] of Object.entries(bike)) {
    if(bike[key]) {
      if(key === 'bar' && bike.frameset.colors[bike.frameset.colorSelected].hasBar) continue
      if(key === 'seatpots' && bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) continue
      totalPrice += parseFloat(bike[key].price)
      let image
      if(key === 'frameset') image = bike[key].colors[bike[key].colorSelected].image
      if(key === 'groupset') image = bike[key].components.chainring.image
      if(['bar', 'wheels', 'tyres', 'seatpots', 'saddles'].includes(key)) image = bike[key].image
      $('#detailsModalContent').append(`
        <div class="col-12 col-lg-6 col-xl-3 mt-2">
          <div class="card mb-3 rounded shadow h-100">
            <div class="card-header p-0 d-flex justify-content-center" style="max-height: 240px; min-height: 240px; max-width: 100%;">
              <img src="${image}" style="max-height: 100%; max-width: 100%;" class="p-5 m-auto" />
            </div>
            <div class="card-body d-flex flex-column">
              <span class="fs-3 fw-bold">${bike[key].brand}</span>
              <span class="fs-4">${bike[key].model}</span>
              <div class="flex-grow-1 d-flex align-items-end justify-content-end fw-bold">
                ${parseFloat(bike[key].price).toFixed(2).toString().replace('.', ',')} €
              </div>
            </div>
          </div>
        </div>
      `)
    }
  }
  let totalPriceFormat = totalPrice.toFixed(2).toString().replace('.', ',')
  $('#totalPriceModal').html(totalPriceFormat)
  $('#detailsModal').modal('show');
}

function showDescriptionModal() {
  $('#descriptionModal').modal('show');
}

function loadDescriptionModal({type, brand, model, description, image}) {
  $('#descriptionModalType').text(type)
  $('#descriptionModalBrandAndModel').text(`${brand} - ${model}`)
  $('#descriptionModalDescription').text(description)
  $('#descriptionModalImage').prop('src', image)
}

function controlBreadcrumbs() {
  $(`#navBars`).addClass("disabled")
  $(`#navSet`).addClass("disabled")
  $(`#navWheels`).addClass("disabled")
  $(`#navTyres`).addClass("disabled")
  $(`#navSeatpots`).addClass("disabled")
  $(`#navSaddles`).addClass("disabled")
  if(bike.frameset) {
    if(bike.frameset.colors[bike.frameset.colorSelected].hasBar) {
      $(`#navSet`).removeClass("disabled")
    } else {
      $(`#navBars`).removeClass("disabled")
    }
  }
  if(bike.bar) {
    $(`#navSet`).removeClass("disabled")
  }
  if(bike.groupset) {
    $(`#navWheels`).removeClass("disabled")
  }
  if(bike.wheels) {
    $(`#navTyres`).removeClass("disabled")
  }
  if(bike.tyres) {
    if(bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) {
      $(`#navSaddles`).removeClass("disabled")
    } else {
      $(`#navSeatpots`).removeClass("disabled")
    }
  }
  if(bike.seatpots) {
    $(`#navSaddles`).removeClass("disabled")
  }
}

function controlSelectorNav(item) {
  $selectorNavLabel = $('#selectorNavLabel')
  $selectorNavLabelMobile = $('#selectorNavLabelMobile')
  $selectorNavBack = $('#selectorNavBack')
  $selectorNavBackMobile = $('#selectorNavBackMobile')
  $selectorNavNext = $('#selectorNavNext')
  $selectorNavNextMobile = $('#selectorNavNextMobile')
  $selectorNavContinue = $('#selectorNavContinue')
  let label, labelMobile, funcBack, funcNext, step
  let totalSteps = 8
  let hasBar = bike.frameset?.colors[bike.frameset.colorSelected].hasBar
  let hasSeatpot = bike.frameset?.colors[bike.frameset.colorSelected].hasSeatpot
  if(hasBar) totalSteps--
  if(hasSeatpot) totalSteps--
  $selectorNavContinue.text('CONTINUAR')
  switch(item) {
    case 'frameset':
      label = 'FRAMESETS'
      labelMobile = `FRAMESETS (1/${totalSteps})`
      funcBack = ''
      funcNext = 'showBars()'
      if(bike.frameset && bike.frameset.colors[bike.frameset.colorSelected].hasBar) { 
        funcNext = 'showSets()'
      }
      break;
    case 'bar':
      step = 2
      label = 'BARS'
      labelMobile = `BARS (${step}/${totalSteps})`
      funcBack = 'showFramesets()'
      funcNext = 'showSets()'
      break;
    case 'groupset':
      step = 3
      if(hasBar) step--
      label = 'GROUPSETS'
      labelMobile = `GROUPSETS (${step}/${totalSteps})`
      funcBack = 'showBars()'
      funcNext = 'showWheels()'
      if(bike.frameset && bike.frameset.colors[bike.frameset.colorSelected].hasBar) { 
        funcBack = 'showFramesets()'
      }
      break;
    case 'wheels':
      step = 4
      if(hasBar) step--
      label = 'WHEELS'
      labelMobile = `WHEELS (${step}/${totalSteps})`
      funcBack = 'showSets()'
      funcNext = 'showTyres()'
      break;
    case 'tyres':
      step = 5
      if(hasBar) step--
      label = 'TYRES'
      labelMobile = `TYRES (${step}/${totalSteps})`
      funcBack = 'showWheels()'
      funcNext = 'showSeatpots()'
      if(bike.frameset && bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) { 
        funcNext = 'showSaddles()'
      }
      break;
    case 'seatpots':
      step = 6
      if(hasBar) step--
      label = 'SEATPOT'
      labelMobile = `SEATPOT (${step}/${totalSteps})`
      funcBack = 'showTyres()'
      funcNext = 'showSaddles()'
      break;
    case 'saddles':
      step = 7
      if(hasBar) step--
      if(hasSeatpot) step--
      label = 'SADDLES'
      labelMobile = `SADDLE (${step}/${totalSteps})`
      funcBack = 'showSeatpots()'
      funcNext = 'lastStep()'
      if(bike.frameset && bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) { 
        funcBack = 'showTyres()'
      }
      break;
    case 'last':
      step = 8
      if(hasBar) step--
      if(hasSeatpot) step--
      label = 'BIKE FIT'
      labelMobile = `BIKE FIT (${step}/${totalSteps})`
      funcBack = 'showSeatpots()'
      funcNext = 'lastStep()'
      $selectorNavContinue.text('IR A LA TIENDA')
      break;
  }
  $selectorNavLabel.text(label)
  $selectorNavLabelMobile.text(labelMobile)
  if(item === 'frameset') {
    $selectorNavBack.addClass("disabled")
    $selectorNavBackMobile.addClass("invisible")
  } else {
    $selectorNavBack.removeClass("disabled").attr("onclick", funcBack)
    $selectorNavBackMobile.removeClass(["invisible", "disabled"]).attr("onclick", funcBack)
  }
  if(bike[item]) {
    $selectorNavNext.removeClass("disabled").attr("onclick", funcNext)
    $selectorNavNextMobile.removeClass(["invisible", "disabled"]).attr("onclick", funcNext)
    $selectorNavContinue.removeClass("disabled").attr("onclick", funcNext)
  } else {
    $selectorNavNext.addClass("disabled")
    $selectorNavNextMobile.addClass(["invisible", "disabled"])
    $selectorNavContinue.addClass("disabled")
  }
  if (!isFirstIn) {
    window.history.replaceState({}, '', generateLink());
    isFirstIn = false
  }
}

function hiddenColorSelectorAndLabel() {
  $('#containerColorSelector').addClass('invisible') 
  $('#containerLabelAndDescription').addClass('invisible')
  $(`#containerDetailsMobile`).addClass('d-none')
  $(`#containerColorSelectorMobile`).addClass('invisible')
}

function loadDescriptionItem(brand, model) {
  $('#labelBrandModel').text(`${brand} ${model}`)
  $('#labelBrandModelMobile').text(`${brand} ${model}`)
  $('#containerLabelAndDescription').removeClass('invisible') 
  $('#containerLabelAndDescriptionMobile').removeClass('invisible') 
  $('#containerDetailsMobile').removeClass('d-none')
}

function handlerNavigation() {
  if(bike.frameset.colors[bike.frameset.colorSelected].hasBar) {
    $('#navBarsContainer').addClass('d-none')
  } else {
    $('#navBarsContainer').removeClass('d-none')
  }
  if(bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) {
    $('#navSeatpotsContainer').addClass('d-none')
  } else {
    $('#navSeatpotsContainer').removeClass('d-none')
  }
}

function lastStep() {
  hiddenColorSelectorAndLabel()
  controlSelectorNav('last')   
  $('#selectorNavNext').addClass("disabled").attr("onclick", "")
  $('#selectorNavNextMobile').addClass(["invisible", "disabled"]).attr("onclick", "")
  $('#selectorNavBack').removeClass("disabled").attr("onclick", "showSaddles()")
  $('#selectorNavBackMobile').removeClass(["invisible", "disabled"]).attr("onclick", "showSaddles()")
  $('#selectorNavContinue').removeClass("disabled").attr('onclick', 'GoToShop()')
  let link = generateLink() 
  $('#container-items').html(`
  <div class="border-start border-top p-4 h-100 w-100 d-flex flex-column gap-3 text-center">
    <h3 class="my-3">TODO LISTO</h3>
    <div>
      <p class="mt-2 mb-0">Completa tu compra</p>
      <a href="">Ir a tienda</a>
    </div>
    <div>
      <p class="mt-2 mb-0">Contacta con nosotros</p>
      <a href="#">info@velomallorca.com</a>
    </div>
    <div>
      <p class="mt-2 mb-0">Comparte tu diseño</p>
        <button type="button" class="btn btn-sm btn-primary mx-auto" style="max-width: 120px;" onclick="copyLinkToClipboard()">
        <span class="me-1">Copiar link</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
        </svg>
      </button>
    </div>
  </div>
  `)
}

function generateLink() {
  let link = window.location.origin
  for(const [key, value] of Object.entries(bike)) {    
    if(!bike[key]) continue
    if(key === 'bar' && bike.frameset.colors[bike.frameset.colorSelected].hasBar) continue
    if(key === 'seatpots' && bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) continue
    if(key === 'frameset') {
      link += bike[key] ? `?fr=${bike.frameset.id}&fc=${bike.frameset.colorSelected}` : ''
    } else {
      link += bike[key] ? `&${key.slice(0, 2)}=${bike[key].id}` : ''
    }
  }
  return link
}

const isThereParam = (item) => {
  return window.location.search.search(item) == -1 ? false : true
}

function getValueLink(param) {
  let params = window.location.search
  return param == 'sa' 
    ? parseInt(params.slice(parseInt(params.search(param)) + 3)) 
    : parseInt(params.slice(parseInt(params.search(param)) + 3).split('&')[0])
}

function selectLink(item) {
  if (!isThereParam(item)) return
  switch(item) {
    case 'fr':
      let framesetId = getValueLink('fr')
      let framesetColorId = getValueLink('fc')
      selectFrameset(framesetId, false)
      selectFramesetColor(framesetColorId)
      break;
    case 'ba':
      selectBars(getValueLink('ba'))
      showBars()
      break;
    case 'gr':
      selectGroupset(getValueLink('gr'))
      showSets()
      break;
    case 'wh':
      selectWheel(getValueLink('wh'))
      showWheels()
      break;
    case 'ty':
      selectTyres(getValueLink('ty'))
      showTyres()
      break;
    case 'se':
      selectSeatpot(getValueLink('se'))
      showSeatpots()
      break;
    case 'sa':
      selectSaddle(getValueLink('sa'))
      lastStep()
      break;
  }
}

function showSharedLink() {
  $('#sharedModalLink').text(window.location.href)
  $('#sharedModal').modal('show');
}

function copyLinkToClipboard() {
  navigator.clipboard.writeText(generateLink())
}

function GoToShop() {
  alert('Ir a la tienda')
}