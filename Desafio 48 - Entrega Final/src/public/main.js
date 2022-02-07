
var socket = io.connect("http://localhost:8080", { forceNew: true });

function renderChat(data) {
  var html = data.map(function (elem, index) {
    return `<div>
      <p align="left" style="color: brown">
      <strong style="color: blue">${elem.email}</strong>
      ${elem.date}:
      <i style="color: green">${elem.opinion}</i>
      </p>
      </div>`;
  }).join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

socket.on("mensajes", function (data) {
  renderChat(data)
});

var date = new Date()
var dateConverted = moment(date).format('lll');

function addMensaje() {
  var mensaje = {
    "email": document.getElementById("email").value,
    "date": dateConverted,
    "opinion": document.getElementById("opinion").value,
  };

  if (document.getElementById("email").value != 0) {
    socket.emit("new-mensaje", mensaje);

  } else
    console.log("need email")
}
