const mix = require('laravel-mix');

// Copy individual JavaScript files
mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/sidebar.js', 'public/js')
   .js('resources/js/weather.js', 'public/js')
   .js('resources/js/forcast.js', 'public/js');

// Copy individual CSS files
mix.css('resources/css/app.css', 'public/css/app.css')
   .css('resources/css/sidebar.css', 'public/css/sidebar.css')
   .css('resources/css/styles.css', 'public/css/styles.css')
   .css('resources/css/forcast.css', 'public/css/forcast.css');
