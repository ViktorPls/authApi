const OPTIONS = {
  method: POST,
  body: JSON.stringify(data),
  headers: {"Content-type": "application/json; charset=UTF-8"}
}
const sendData = (data) => {
  console.log(OPTIONS)
  fetch('localhost:3000', OPTIONS)
}
//TODO: Enviar objeto data al backend

const $form = document.querySelector("#form");
const $name = document.querySelector("#name");
const $user = document.querySelector("#user");
const $password = document.querySelector("#password");

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = {
    name: $name.value,
    user: $user.value,
    password: $password.value
  }

  sendData(data)

});
