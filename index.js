var inputVal = "";
var blueMode = false;
var sleepTime = 10;

function createPast(val, slp, green=false) {
    const newId = `el-${Math.floor(Math.random() * 1000000000)}`;
    const elem = document.createElement('div');
    elem.id = newId;
    elem.className = `balloon${green ? " green" : blueMode ? " blue" : ""}`;
    elem.innerHTML = val;
    const target = document.querySelector('.balloon:last-child');
    target.parentNode.insertBefore(elem, target);
    setTimeout(function() {
        document.querySelector(`#${newId}`).className = `balloon${green ? " green" : blueMode ? " blue" : ""} hidden`;
        setTimeout(function() {
            document.querySelector(`#${newId}`).remove();
        }, 500);
    }, slp * 1000);
}

document.onkeydown = function (e) {
    e = e || window.event;
    var inp = e.key;
    if (inp.length == 1) {
        inputVal += inp;
    } else {
        if (inp == "Backspace") {
            inputVal = inputVal.slice(0, -1);
        } else if (inp == "Enter") {
            if (inputVal == "!color") {
                blueMode = blueMode ? false : true;
            } else if (inputVal == "!help") {
                createPast("Type '!help' to show this screen.", 10, true);
                createPast("Type '!color' to switch between colors.", 10, true);
                createPast("Type '!sleepTime x' to change sleep time to x seconds.", 10, true);
            } else if (inputVal.includes("!sleepTime")) {
                sleepTime = parseInt(inputVal.split(" ")[1]);
            } else {
                createPast(inputVal, sleepTime);
            }
            inputVal = "";
        }
    }
    if (inputVal == "") {
        document.querySelector('.balloon:last-child').classList = `balloon${blueMode ? " blue" : ""} hidden2`;
    } else {
        document.querySelector('.balloon:last-child').classList = `balloon${blueMode ? " blue" : ""}`;
    }
    document.querySelector('.balloon:last-child').innerHTML = inputVal.replaceAll(" ", "&nbsp;") + `<span id="carrot${blueMode ? "-blue" : ""}"></span>`;
};

setTimeout(function() {
    createPast("Welcome to ScreenTypr by YGZ!", 4.5);
    createPast("Type '!help' to get help", 4.7);
    createPast("Enjoy!", 4.9);
}, 500);