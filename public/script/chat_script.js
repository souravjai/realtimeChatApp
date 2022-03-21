const message = document.getElementById("message");
const send = document.getElementById("send");
const chats = document.getElementById("chats");

const socket = io();

//get username and room from url

var { username, code } = Qs.parse(location.search.substring(1), {
    ignoreQueryprefix: true
});

if (!code) code = Math.round(Math.random() * 10000);

document.getElementById("roomcode").innerText = code;

socket.emit("joining", username, code);


socket.on("incoming-message", (msg, username) => {
    message_recieved(msg, username);
})

socket.on("information", msg => {
    display(msg);
})


function send_message() {
    var text = message.value;
    if (text.length == 0) return;

    //sending message to the server
    socket.emit("incoming-message", text);

    var div = document.createElement("div");
    var span = document.createElement("span");
    span.innerText = text;
    div.appendChild(span);
    div.classList.add("message-chat", "sent")
    chats.appendChild(div);
    message.value = "";

    chats.scrollTop = chats.scrollHeight;
}

function display(information) {
    div = document.createElement("div");
    div.classList.add("information")
    div.innerText = information;
    chats.appendChild(div);
    chats.scrollTop = chats.scrollHeight;
}

function message_recieved(recived, username) {

    var div = document.createElement("div");
    var span = document.createElement("span");

    var username_span = document.createElement("span");
    username_span.classList.add("username");
    username_span.innerText = username + ":";

    var message_span = document.createElement("span");
    message_span.innerText = recived;

    span.appendChild(username_span);
    span.appendChild(message_span);
    div.appendChild(span);
    div.classList.add("message-chat", "recived")

    chats.appendChild(div);

    chats.scrollTop = chats.scrollHeight;
}

message.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("send").click();
    }
});