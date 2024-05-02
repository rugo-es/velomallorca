"use strict"

const cdn = {
  css: {
    bootstrap:{
      default: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
      icons: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css'
    },
    bootswatch: {
      lux: 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/lux/bootstrap.min.css'
    },
    animate: {
      textillate: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css',
      default: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
    },
    //datatable: 'https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css',
    datatable: 'https://cdn.datatables.net/2.0.3/css/dataTables.bootstrap5.css',
    lightbox: 'https://cdn.jsdelivr.net/npm/simplelightbox@2.7.0/dist/simple-lightbox.min.css'
  },
  js: {
    jquery: 'https://code.jquery.com/jquery-3.7.1.min.js',
    bootstrap: {
      bundle: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
    },
    //datatable: 'https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js',
    datatable: 'https://cdn.datatables.net/2.0.3/js/dataTables.js',
    datatableBootstrap: 'https://cdn.datatables.net/2.0.3/js/dataTables.bootstrap5.js',
    lettering: 'https://cdnjs.cloudflare.com/ajax/libs/lettering.js/0.6.1/jquery.lettering.min.js',
    textillate: 'https://cdnjs.cloudflare.com/ajax/libs/textillate/0.4.0/jquery.textillate.min.js',
    amcharts: {
      core: 'https://cdn.amcharts.com/lib/4/core.js',
      charts: 'https://cdn.amcharts.com/lib/4/charts.js',
      timeline: 'https://cdn.amcharts.com/lib/4/plugins/timeline.js',
      bullets: 'https://cdn.amcharts.com/lib/4/plugins/bullets.js',
      animated: 'https://cdn.amcharts.com/lib/4/themes/animated.js',
      theme: {
        dark: 'https://cdn.amcharts.com/lib/4/themes/dark.js'
      }
    },
    lightbox: 'https://cdn.jsdelivr.net/npm/simplelightbox@2.7.0/dist/simple-lightbox.min.js'
  }
}

module.exports = cdn