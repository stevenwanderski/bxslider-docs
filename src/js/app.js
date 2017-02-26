$(function(){
  $('.option__body').first().show();

  $('.option__control').on('click', function(e){
    e.preventDefault();
    $(this).parent().next('.option__body').toggle();
  });
});
