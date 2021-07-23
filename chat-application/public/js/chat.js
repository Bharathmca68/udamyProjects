const socket = io();

//elements
const $messageform = document.querySelector("#message-form");
const $messageforminput = $messageform.querySelector("input");
const $messageformbtn = $messageform.querySelector("button");
const elebtn = document.getElementById("messa");
const $messages = document.querySelector("#messages");

//template

const messageTemplate = document.querySelector("#messageTemplate").innerHTML;
const LocationTemplate = document.querySelector("#LocationTemplate").innerHTML;
const sidebar_template = document.querySelector("#sidebar_template").innerHTML;

//options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

//event for messages
socket.on("Message", (message) => {
  const html = Mustache.render(messageTemplate, {
    user: message.username,
    message: message.text,
    Time: moment(message.createAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  console.log(message);
});

//rooms list of users
socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebar_template, {
    room: room,
    users: users,
  });
  document.querySelector("#sidebar").innerHTML = html;
});

//event for locations
socket.on("LocationMessage", (url) => {
  const htmlloc = Mustache.render(LocationTemplate, {
    user: url.username,
    url: url.url,
    timestamp: moment(url.timestamp).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", htmlloc);
  console.log(url);
});

$messageform.addEventListener("submit", (e) => {
  e.preventDefault();

  $messageformbtn.setAttribute("disabled", "disabled"); //disabled the btn
  $messageforminput.focus();

  const msg = e.target.elements.message.value;
  socket.emit("sendMsg", msg, (error) => {
    $messageformbtn.removeAttribute("disabled");
    $messageforminput.value = "";
    if (error) {
      return console.log(error);
    }
    console.log("Deliveried..!");
  });
});

//sending geo location
elebtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not Found");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position);
    elebtn.setAttribute("disabled", "disabled");
    socket.emit(
      "sendlocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        elebtn.removeAttribute("disabled");
        console.log("Location Shared...!");
      }
    );
  });
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

// socket.on("countUpdated", (count) => {
//   console.log(`updated count ${count}`);
// });

// document.querySelector("#increment").addEventListener("click", () => {
//   console.log("clicked");
//   socket.emit("increment");
// });
