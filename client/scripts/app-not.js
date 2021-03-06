
$(document).ready(function(){


var text;
var currentRoom = "main";
var incomingRooms = {"main":"main"};
var loadedRooms = {"main":"main"};

var sendMessage = function(message){
  console.log("send");
  $.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    getMessage();
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});
};

var getMessage = function(){
  console.log("get");
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
};

var displayTexts = function(data){
  var $messages = $('#main').append("<ul class='messages'></ul>");
  $("span").remove();
  $("li").remove();
  _.each(data.results, function(value){
    incomingRooms[value.roomname] = value.roomname;
    makeRoom();
    if(value.roomname && value.roomname === currentRoom){
      $messages.append("<li>"+value.username+"  "+"<span class='time'>"+moment(value.createdAt).fromNow()+"</span>"+"</li>");
      var $msgtext = $("<span class='text'></span>");
      $msgtext.text(value.text);
      $msgtext.appendTo($messages);
    }
  });
};


$(".write").keydown(function(event){
  var message = {};
  if(event.which === 13){
    message["username"]= window.location.search.split("=")[1];
    message["text"] = $(".write").val();
    message["roomname"] = currentRoom;
    $("input").val("");
    sendMessage(message);
  }
});

$(".room").click(function(){
  userRoom();
});

$("select").change(function(){
  console.log($(':selected').val());
  currentRoom = $(':selected').val();
  getMessage();
});

var makeRoom = function(){
  _.each(incomingRooms, function(value){
    if(!_.contains(loadedRooms, value)){
      $("select").append("<option>"+value+"</span>");
      loadedRooms[value] = value;
    }
  });
};

var userRoom = function(){
  var newRoom = prompt("Christian your room" || "Anon");
  currentRoom = newRoom;
  incomingRooms[newRoom] = newRoom;
  $("select").append("<option>"+currentRoom+"</span>");
  loadedRooms[newRoom] = newRoom;
  $("select").val(currentRoom);
  getMessage();
};


getMessage();

});





