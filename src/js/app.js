$(function(){
  $('.option__body').first().show();

  $('.option__control').on('click', function(){
    $(this).next('.option__body').toggle();
  });
});
