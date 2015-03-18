$(function(){

  // keep track of which document the user is on
  var current = null;
  var socket = io('http://localhost:3000');
  var error = '  \nCould Not Fetch from Database.  \n_File may not exist yet._'

  // set up socket listeners for incoming updates
  socket.on('populateFullTimeA', function(data){
    !data ? editor.setValue('#Re: FullTimeA' + error) : editor.setValue(data.markdown);
    current = 'FullTimeA';
  });

  socket.on('populateFullTimeB', function(data){
    !data ? editor.setValue('#Re: FullTimeB' + error) : editor.setValue(data.markdown);
    current = 'FullTimeB';
  });

  socket.on('populatePartTimeA', function(data){
    !data ? editor.setValue('#Re: PartTimeA' + error) : editor.setValue(data.markdown);
    current = 'PartTimeA';
  });

  socket.on('populatePartTimeB', function(data){
    !data ? editor.setValue('#Re: PartTimeB' + error) : editor.setValue(data.markdown);
    current = 'PartTimeB';
  });

  // set up listeners on DOM elements to respond to user intents
  $('.FTA').on('click', function(){
    socket.emit('fetchFullTimeA');  
  });

  $('.FTB').on('click', function(){
    socket.emit('fetchFullTimeB');  
  });

  $('.PTA').on('click', function(){
    socket.emit('fetchPartTimeA');  
  });

  $('.PTB').on('click', function(){
    socket.emit('fetchPartTimeB');  
  });

  // set up listener and cooresponding action for save feature
  $('.saveToDB').on('click', function(){
    if (!current){console.log('No Email Selected'); return;}
    socket.emit('update' + current, { html: $('#out').html(), markdown: editor.getValue() });
  });

});

// var HTML = $('out').html();
// var markdown = editor.getValue();

// socket.emit('updateFullTimeA', {html: $('#out').html(), markdown: editor.getValue()});