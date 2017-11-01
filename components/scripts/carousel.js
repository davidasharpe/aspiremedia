$(function(){

  "use strict";

  var slideqty = $('#featured .item').length;
  var randSlide = Math.floor(Math.random()*slideqty);

  $('#featured .item').eq(randSlide).addClass('active');

  $('.carousel').carousel({
    pause: false
  });

  //Automatically generate carousel indicators
  for (var i=0; i < slideqty; i++) {
    var insertText = '<li data-target="#featured" data-slide-to="' + i + '"';
    if (i === randSlide) {
      insertText += ' class="active" ';
    }
    insertText += '></li>';
    $('#featured ol').append(insertText);
  }


});
