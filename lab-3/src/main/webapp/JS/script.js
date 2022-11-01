import {changeTheme, setThemeMode} from "./themes.js";
import {draw} from "./draw.js";
document.getElementById("formStart:inputName").value = ''
//
document.getElementById("formStart:startButton").addEventListener('click', ()=> {
    // document.getElementById("formStart:startButton").disabled = true;
    // document.getElementById("formStart:inputName").value = ''
})
window.handleClickChangeColor = () => {
    changeTheme(document.getElementById('toAnotherTheme').getAttribute('src') === 'images/toLightTheme.jpg')
}
setThemeMode()

const divClock = document.getElementById("clock")
const showDate = ()=>{
    const date = new Date();
    let a = date.getHours().toString()
    if (a.length === 1)
        a = "0" + a;
    let b = date.getMinutes().toString()
    if (b.length === 1)
        b = "0" + b;
    let c = date.getSeconds().toString()
    if (c.length === 1)
        c = "0" + c;
    return a + ":" + b + ":" + c
}

divClock.textContent = 'current time is: ' + showDate()
setInterval(()=>{
    divClock.textContent = 'current time is: ' + showDate()
}, 15000)