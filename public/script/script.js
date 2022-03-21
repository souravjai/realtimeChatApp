const create = document.getElementById("Create");
const join = document.getElementById("Join");
const content = document.getElementById("con");


function createRoom() {
    join.style.display = "none";
    create.onclick = "";
    create.innerText = "Creating Room"
    content.style.gap = "20px";
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
        <form action="chat.html">
            <input type="text" id="username" name="username" placeholder="Enter Your Name" >
            <input class="submit" type="submit" value="Submit" onclick="func(); ">
        </form>
    </div>
    `;
    div.id = "createlabel";
    content.appendChild(div);
    document.getElementById("username").focus();
}

function joinRoom() {
    create.style.display = "none";
    join.onclick = "";
    join.innerText = "Joining Room";
    content.style.gap = "10px";
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
        <form action="chat.html">
            <input type="text" id="username" name="username" placeholder="Enter Your Name" required>
            <input type="text" id="code" name="code" placeholder="Enter Room Code" required>
            <input class="submit" type="submit" value="Submit" onclick=func()>
        </form>
    </div>
    `;
    div.id = "joinlabel";
    content.prepend(div);
    document.getElementById("username").focus();
    document.querySelector("#joinlabel>div").style.marginBottom = "10px"
}

function func() {
    var user = document.getElementById("username");
    if (user.value.length == 0) {
        user.value = "Idiot No. " + Math.round(Math.random() * 10);
    }
}