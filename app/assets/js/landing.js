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
const canvas = document.getElementById("canvasBuilder");
const ctx = canvas.getContext("2d");

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
        <div class="w-100 d-flex justify-content-center">
          <img style="width: 180px;" class="px-2 py-3" src="${item.colors[0].image}" alt="">
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
  controlSelectorNav('groupsets')
  hiddenColorSelectorAndLabel()
  let selected = bike.groupset ? bike.groupset.id : null
  $('#container-items').html('')
  groupsets.forEach((item) => {
    let selectedClass = item.id === selected ? 'itemSelected' : '';
    $('#container-items').append(`
      <button type="button" id="groupset${item.id}" class="border list-group-item list-group-item-action ${selectedClass}" onclick="selectGroupset(${item.id})">
        <div class="w-100 d-flex justify-content-center">
          <img style="width: 180px;" class="px-2 py-3" src="${item.components.chainring.image}" alt="">
        </div>
        <div class="mt-2 d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-lg-end">
          <span class="cardBrandAndModel fw-bold" style="max-width: 200px;">${item.brand} ${item.model}</span>
        </div>
      </button>
    `)
  });
  if(bike.groupset) {
    selectWheel(bike.groupset.id, false)
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
          <img style="width: 180px;" class="px-2 py-3" src="${item.image}" alt="">
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
          <img style="width: 180px;" class="px-2 py-3" src="${item.image}" alt="">
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
          <img style="width: 180px;" class="px-2 py-3" src="${item.image}" alt="">
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
          <img style="width: 180px;" class="px-2 py-3" src="${item.image}" alt="">
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
        <div class="w-100 d-flex justify-content-center">
          <img style="width: 180px;" class="px-2 py-3" src="${item.image}" alt="">
        </div>
        <div class="mt-2 d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-lg-end">
          <span class="cardBrandAndModel fw-bold" style="max-width: 200px;">${item.brand} ${item.model}</span>
        </div>
      </button>
    `)
  });
  if(bike.saddles) {
    selectSeatpot(bike.saddles.id, false)
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
  $('#navWheels').addClass("disabled")
  $('#navTyres').addClass("disabled")
  $('#navSeatpots').addClass("disabled")
  $('#navSaddles').addClass("disabled")

  $('#containerLabelAndDescription').addClass('invisible') 
  $('#containerColorSelector').addClass('invisible') 

  $('#containerDetailsMobile').addClass('d-none')

  updatePrice()
  showFramesets()
}

function updatePrice() {
  let totalPrice = 0;
  for(const [key, value] of Object.entries(bike)) {
    if(bike[key]?.price) {
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
      totalPrice += parseFloat(bike[key].price)
      let image
      if(key === 'frameset') image = bike[key].colors[bike[key].colorSelected].image
      if(['bar', 'wheels', 'tyres', 'seatpots', 'saddles'].includes(key)) image = bike[key].image
      $('#detailsModalContent').append(`
        <div class="col-12 col-lg-6 col-xl-3 mt-2">
          <div class="card mb-3 rounded shadow h-100">
            <div class="card-header p-0">
              <img src="${image}" class="w-100 p-5" />
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
  if(bike.frameset) {
    if(bike.frameset.colors[bike.frameset.colorSelected].hasBar) {
      $(`#navSet`).removeClass("disabled")
    } else {
      $(`#navSet`).addClass("disabled")
      $(`#navBars`).removeClass("disabled")
    }
  } else {
    $(`#navBars`).addClass("disabled")
    $(`#navWheels`).addClass("disabled")
  }
  if(bike.bar) {
    $(`#navWheels`).removeClass("disabled")
  }
  if(bike.wheels) {
    $(`#navWheels`).removeClass("disabled")
    $(`#navTyres`).removeClass("disabled")
  } else {
    $(`#navTyres`).addClass("disabled")
  }
  if(bike.tyres) {
    if(bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) {
      $(`#navSaddles`).removeClass("disabled")
    } else {
      $(`#navSaddles`).addClass("disabled")
      $(`#navSeatpots`).removeClass("disabled")
    }
  } else {
    $(`#navSaddles`).addClass("disabled")
    $(`#navSeatpots`).addClass("disabled")
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
  let label, labelMobile, funcBack, funcNext
  switch(item) {
    case 'frameset':
      label = 'FRAMESETS'
      labelMobile = 'FRAMESETS (1/8)'
      funcBack = ''
      funcNext = 'showBars()'
      if(bike.frameset && bike.frameset.colors[bike.frameset.colorSelected].hasBar) { 
        funcNext = 'showWheels()'
      }
      break;
    case 'groupsets':
      label = 'GROUPSETS'
      labelMobile = 'GROUPSETS (2/8)'
      funcBack = 'showFramesets()'
      funcNext = 'showWheels()'
      break;
    case 'bar':
      label = 'BARS'
      labelMobile = 'BARS (2/8)'
      funcBack = 'showFramesets()'
      funcNext = 'showWheels()'
      break;
    case 'wheels':
      label = 'WHEELS'
      labelMobile = 'WHEELS (3/8)'
      funcBack = 'showBars()'
      funcNext = 'showTyres()'
      if(bike.frameset.colors[bike.frameset.colorSelected].hasBar) { 
        funcBack = 'showFramesets()'
      }
      break;
    case 'tyres':
      label = 'TYRES'
      labelMobile = 'TYRES (4/8)'
      funcBack = 'showWheels()'
      funcNext = 'showSeatpots()'
      if(bike.frameset && bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) { 
        funcNext = 'showSaddles()'
      }
      break;
    case 'seatpots':
      label = 'SEATPOT'
      labelMobile = 'SEATPOT (5/8)'
      funcBack = 'showTyres()'
      funcNext = 'showSaddles()'
      break;
    case 'saddles':
      label = 'SADDLES'
      labelMobile = 'SADDLE (5/8)'
      funcBack = 'showSeatpots()'
      funcNext = 'showSaddles()'
      if(bike.frameset && bike.frameset.colors[bike.frameset.colorSelected].hasSeatpot) { 
        funcBack = 'showTyres()'
      }
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