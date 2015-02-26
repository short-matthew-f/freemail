var currentUser;
var $formTemplate = $('#compose').clone().hide();

function getInbox () {
  $.ajax({
    url: '/users/' + currentUser.id + '/messages', // this is not accurate
    dataType: 'json',
    success: renderMessages
  });
};

function getOutbox () {
  $.ajax({
    url: '/users/' + currentUser.id + '/messages', // this is not accurate
    dataType: 'json',
    success: renderMessages
  });
};

function setCurrentUser (callbackFunction) {
  $.ajax({
    url: '/users/current',
    dataType: 'json',
    success: function (data) {
      currentUser = data;

      if (callbackFunction) {
        callbackFunction();
      };
    }
  });
};

function createMessage (message) {
  $.ajax({
    url: '/users/' + currentUser.id + '/messages',
    method: 'post',
    data: message,
    success: clearAndFadeForm
  });
}

function renderMessages (messages) {
  var $messages = $('.messages ul');

  $(messages).each(function (index, message) {
    $messages.append( renderMessage(message) );
  });
};

function renderMessage (message) {
  // tack on sender name

  var $li = $('<li class="message">').data('id', message.id);
  var $h4 = $('<h4>').text(message.subject);
  // var $h4 = $('<h4>').html(message.subject + '<small>' + ... +  '</small>');
  var $p = $('<p>').text(message.content);

  return $li.append($h4).append($p);
};

function setHandlers () {
  var $messages = $('.messages ul');

  $messages.on('click', 'h4', function (event) {
    $(this).siblings().slideDown(400, function () {
      $(this).addClass('open');
    });

    $('.open').slideUp(400, function () {
      $(this).removeClass('open');
    });
  });

  $('body').on('click', '.close-window', clearAndFadeForm);

  $('body').on('click', '#send-message', function (event) {
    var $form = $('#compose');
    var formElements = $form[0].elements;
    var formData = {
      message: {
        recipient_id: formElements.recipient_id.value,
        subject: formElements.subject.value,
        content: formElements.content.value,
        important: formElements.important.checked
      }
    };
    createMessage( formData );
  });

  $('.inbox nav').on('click', 'li', function (event) {
    var method = $(this).data('method');

    if (method == "compose") {
      $("#compose").fadeIn('fast');
    };
  });
};

function hideElements () {
  $('#compose').hide();
};

function clearAndFadeForm () {
  var $form = $('#compose');
  $form.fadeOut('fast', function () {
    $('#compose').remove();
    $('main').after( $formTemplate.clone() );
  });
};

/*
function refreshInbox () {
  removes inbox elements
  runs getInbox
}
*/

function initialize () {
  hideElements();
  setHandlers();
  setCurrentUser( getInbox );

  // setInterval( refreshInbox, 100 );
};

initialize();
