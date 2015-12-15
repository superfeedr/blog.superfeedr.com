// $.ready(function() {
var $things = $(".things");

var $width  = $things.width();
var $height = $things.height();

$things.width( $width + 20 );

$("#typed").typed({
  strings: [
  "competitor",
  "business",
  "product",
  "name",
  "boss",
  "website"
  ],
  backDelay: 2000,
  showCursor: false,
  typeSpeed: 100,
  loop: true
});
// })
