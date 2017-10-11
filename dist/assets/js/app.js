$(function(){
  // Options
  $('.option__body').first().show();

  $('.option__control').on('click', function(e){
    e.preventDefault();
    $(this).parent().next('.option__body').toggle();
  });

  // Tour
  $('.tour__step-title').on('click', function(){
    var $sibling = $(this).next('.tour__step-body');
    $('.tour__step-body').not($sibling).hide();
    $sibling.toggle();
  });

  $(document).on('click', function(e){
    if (!$(e.target).is('.tour__step-title')) {
      $('.tour__step-body').hide();
    }
  });
});
