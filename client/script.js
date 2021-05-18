const URL = "ws://127.0.0.1:9876/websockets";
const server = new WebSocket(URL);

const msgs = document.getElementById("msgs");
const input = document.getElementById("input");
const button = document.getElementById("send");

button.disabled = true;
button.addEventListener("click", sendMessage, false);

server.onopen = () => {
    button.disabled = false;
};

server.onmessage = (event) => {
    const {
        data
    } = event;
    onMessage(data);
};

function onMessage(msg) {
    msgs.innerHTML += "<br>" + msg;
}

function sendMessage() {
    var msg = input.value;
    onMessage(msg);
    server.send(msg);
    input.value = "";
}