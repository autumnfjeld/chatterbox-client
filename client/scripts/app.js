
var message = {
  'username': 'sexyman',
  'text': '<script>document.createElement("div").text("oh yeah")</script>;',
  'roomname': 'main'
};

var text;

$.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    sendMessage(data);
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});

$.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  data: {"order":"-createdAt"},
  contentType: 'application/json',
  success: function (data) {
    displayTexts(data);
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});


var sendMessage = function(data){
  var $body = $('#main').append("<div>"+data+"<div>");
  text = data;
  console.log(data, "data");
  console.log(text, "text");
};

var displayTexts = function(data){
  var $messages = $('#main').append("<ul class='messages'></ul>");
  
  _.each(data.results, function(value){
    console.log(value.text);
    $messages.append("<li>"+value.username+value.createdAt+"</li>");
    var $msgtext = $("<span class='text'></span>");
    $msgtext.text(value.text);
    $msgtext.appendTo($messages);
  });
};







