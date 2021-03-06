//=require socket.io
//=require jquery

var didDisconnect = false;

$(window).ready(function(){

  socket = io.connect()

  socket.on("connection", function(data){
    if( didDisconnect ) {
      window.location = window.location.pathname;
    } else {
      socket.emit("ripp-it", "croak");
    }
  });

  socket.on("disconnect", function(data){
    didDisconnect = true;
  });

  // listen for the tweeters
  socket.on("tweet", function(data){
    var el = $(jade.templates['tweet-box.jade']({
      text: data.text,
      tags: data.tags
    }));
    $("#socket-stream").append(el);
    socket.emit("ripp-it", "croak");
  });

  $("#tweets-wrapper").click(function(){
    me = $(this);
    main = $("#main");
    if( main.hasClass("collapsed") ){
      main.removeClass("collapsed");
      me.find('i').removeClass("icon-arrow-left");
      me.find('i').addClass("icon-arrow-right");
    } else {
      main.addClass("collapsed");
      me.find('i').removeClass("icon-arrow-right");
      me.find('i').addClass("icon-arrow-left");
    }
  });
  
});
