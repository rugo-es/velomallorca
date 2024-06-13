let framesets = []
let datatable

$(document).ready(function() {

  datatable = $('#datatable').DataTable({
    language: {
      // URL: //cdn.datatables.net/plug-ins/2.0.3/i18n/es-ES.json 
      url: '/json/es-ES.json',
    },
    scrollX: true,
    paging: false,
    scrollCollapse: true,
    scrollY: '400px',
    columns: [
      { data: 'brand' },
      { data: 'model' },
      { 
        data: "price",
        render: $.fn.dataTable.render.number( '.', ',', 2, '' ) 
      },
      { 
        data: 'colors',
        orderable: false,
        render: function(data, type, row, meta) {
          let show = data.map(x => `<span class="badge border border-black" style="background-color: ${x.colorCode};">&nbsp;&nbsp;</span>`)
          return show.join(' ')
        }
      },
      { 
        orderable: false,
        render: function(data, type, row, meta) {
          return `<a href="/app/framesets/edit/${row.id}" type="button" class="btn btn-sm btn-primary px-1 py-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
            </a>
            <button type="button" class="btn btn-sm btn-danger px-1 py-0" onclick="showDeleteModal('${row.id.toString()}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
              </svg>
            </button>`
        }
      }
    ]
  })

  var settings = {
    "url": "/api/framesets",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  };
  $.ajax(settings)
    .done(function (response) { 
      framesets = response
      console.log(framesets)
      loadTable(framesets)
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(textStatus)
    })
})

function loadTable(data) {
  datatable.clear();
  datatable.rows.add(data);
  datatable.draw();
}

function showDeleteModal(framesetId) {
  let frameset = framesets.find((frameset) => frameset.id === framesetId)
  $('#deleteDescription').text(`${frameset.brand} ${frameset.model}`)
  $('#deleteImage').attr('src', frameset.colors[0].image)
  $('#deleteBtn').attr('onclick', `deleteFrameset('${framesetId}')`)
  $('#deleteModal').modal('show');
}

function deleteFrameset(framesetId) {
  let token = localStorage.getItem('token')
  var settings = {
    "url": `/api/framesets/${framesetId}`,
    "method": "DELETE",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      framesets = framesets.filter((frameset => frameset.id !== framesetId))
      loadTable(framesets);
      $('#deleteModal').modal('hide');
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(textStatus)
    })
  
}