'use strict'
var socket = null

function connect () {
  console.log('connect called')
  var serverUrl
  var scheme = 'ws'

  if (document.location.protocol === 'https:') {
    scheme += 's'
  }

  serverUrl = scheme + '://' + document.location.hostname + ':' +document.location.port

  socket = new WebSocket(serverUrl, 'json')

  socket.onmessage = event => {
    const msg = JSON.parse(event.data)
    $('#messages').append($('<li>').text(msg.name + ':' + msg.message))
    window.scrollTo(0, document.body.scrollHeight)
    socket.addEventListener('error', error => {
      console.log(error)
    })
  }

  $('form').submit(sendMessage);
}

function sendMessage () {
  name = $('#n').val()
  if (name == '') {
    return
  }
  $('#n').prop('disabled', true)
  $('#n').css('background', 'grey')
  $('#n').css('color', 'white')
  const msg = { type: 'message', name: name, message: $('#m').val() }
  socket.send(JSON.stringify(msg))
  $('#m').val('')
  return false
}
