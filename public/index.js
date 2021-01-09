const sock = io()

const sendEvent = () => {
  const elem = document.getElementById('msg-input')
  const msg = elem.value
  sock.emit('send', { msg: msg })
  elem.value = ''
}

sock.on('send', (data) => {
  console.log(data)
  const elem = document.getElementById('msg-whole')
  const div = document.createElement('div')
  div.textContent = data.msg
  elem.appendChild(div)
})
