window.chat = {
  message : {
      'username' : null,
      'text'     : null,
      'roomname' : null },

init : function() {
    //listeners
    $('.getmsgs').on('click', chat.test);
    $('#header form').submit(function(e) {
      e.preventDefault();
    });
  },


  test : function(){
    console.log('its autumn');
  },

  
  sendmsg : function(){
      $.ajax({
          url: 'https://api.parse.com/1/classes/chatterbox',
          type: 'POST',
          data: JSON.stringify(message),
          contentType: 'application/json',
          success: function(data) {
              console.log('WooHoo--Message Sent.');
          },
          error: function(data) {
              console.error('Failed to send message');
          }
      });
  }
};





// //$(document).ready(function() {
// window.chat = {
//   var message = {
//       'username' : null,
//       'text'     : null,
//       'roomname' : null };

//   //do stuff when form is submitted
//   $('#header form').submit(function(e) {
//       e.preventDefault();

//       $.ajax({
//           url: 'https://api.parse.com/1/classes/chatterbox',
//           type: 'POST',
//           data: JSON.stringify(message),
//           contentType: 'application/json',
//           success: function(data) {
//               console.log('WooHoo--Message Sent.')
//           },
//           error: function(data) {
//               console.error('Failed to send message');
//           }
//       });
//   });


// var function 


// //});