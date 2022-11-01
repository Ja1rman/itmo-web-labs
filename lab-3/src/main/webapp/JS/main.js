import {changeTheme, setThemeMode} from "./themes.js";
import {isValidNumber, refresh} from "./validateData.js";
import {draw} from "./draw.js";

document.getElementById('mainForm:sub').disabled = true
window.contextDraw = null;
window.pushX = 0
window.pushY = 0
window.clickableSub = false;
window.isGraphRequest = false;
document.getElementById('mainForm:inputY').value = ''
document.getElementById('mainForm:inputX').value = ''
document.getElementById('mainForm:inputR1').checked = false
document.getElementById('mainForm:inputR2').checked = false
document.getElementById('mainForm:inputR3').checked = false
document.getElementById('mainForm:inputR4').checked = false
document.getElementById('mainForm:inputR5').checked = true
document.getElementById('mainForm:inputR1').value = false
document.getElementById('mainForm:inputR2').value = false
document.getElementById('mainForm:inputR3').value = false
document.getElementById('mainForm:inputR4').value = false
document.getElementById('mainForm:inputR5').value = true

const canvas = document.getElementById('canv')
contextDraw = canvas.getContext('2d')

draw()
let clickableStatus = {status: 'normal'}


window.handleClickChangeColor = () => {
    changeTheme(document.getElementById('toAnotherTheme').getAttribute('src') === 'images/toLightTheme.jpg')
    draw();
}


document.getElementById('canv').addEventListener("click", (e) => {
    const x = e.offsetX
    const y = e.offsetY
    console.log("x,y")
    console.log(x)
    console.log(y)
    if (x >= 50 && x <= 450 && y <= 450 && y >= 50) {
        console.log("clicked")
        window.isGraphRequest = true;
        const newX = (x - 250) / 40
        const newY = (-y + 250) / 40
        window.pushX = document.getElementById('mainForm:inputX').value
        window.pushY = document.getElementById('mainForm:inputY').value
        document.getElementById('mainForm:inputX').value = newX.toString()
        document.getElementById('mainForm:inputY').value = newY.toString()
        window.clickableSub = document.getElementById('mainForm:sub').disabled
        document.getElementById('mainForm:sub').disabled = false
        document.getElementById('mainForm:sub').click()
        window.isGraphRequest = false;
    }
})


document.getElementById('mainForm:inputY').addEventListener('mouseover', () => {
    document.getElementById('rangeY').style.visibility = 'visible'
})
document.getElementById('mainForm:inputY').addEventListener('mouseout', () => {
    document.getElementById('rangeY').style.visibility = 'hidden'
})
document.getElementById('mainForm:inputX').addEventListener('mouseover', () => {
    document.getElementById('rangeX').style.visibility = 'visible'
})
document.getElementById('mainForm:inputX').addEventListener('mouseout', () => {
    document.getElementById('rangeX').style.visibility = 'hidden'
})

const clean = () => {
    document.getElementById('mainForm:inputR1').checked = false
    document.getElementById('mainForm:inputR2').checked = false
    document.getElementById('mainForm:inputR3').checked = false
    document.getElementById('mainForm:inputR4').checked = false
    document.getElementById('mainForm:inputR5').checked = true
    document.getElementById('mainForm:inputR1').value = false
    document.getElementById('mainForm:inputR2').value = false
    document.getElementById('mainForm:inputR3').value = false
    document.getElementById('mainForm:inputR4').value = false
    document.getElementById('mainForm:inputR5').value = true
    const y = document.getElementById('mainForm:inputY')
    y.classList.remove('greenStyle');
    y.value = ''
    const x = document.getElementById('mainForm:inputX')
    x.classList.remove('greenStyle');
    x.value = ''
    document.getElementsByTagName('legend')[0].textContent = 'Enter X, Y, R values.'
    inputErrors = ['YEmpty', 'XEmpty']
}
document.getElementById('mainForm:sub').addEventListener('click', (e) => {
    if (!window.isGraphRequest) {
        document.getElementById("mainForm:sub").disabled = true;
        clean()
    }
    else {
        document.getElementById('mainForm:sub').disabled = clickableSub
        document.getElementById('mainForm:inputX').value = pushX
        document.getElementById('mainForm:inputY').value = pushY
    }
})




setThemeMode()


const checkInputText = (element, min, max, errors, varName) => {
    let isOk;
    const str = element.value
    for (let i = 0; i < errors.length; i++)
        if (errors[i].includes(` ${varName} `))
            errors.splice(i, 1)
    if (str === '' || str === null) {
        isOk = false
        errors.push(varName + 'Empty')
    } else {
        const index = errors.indexOf(varName + 'Empty');
        if (index !== -1) {
            errors.splice(index, 1);
        }
        isOk = isValidNumber(str, min, max, errors, varName)
    }

    refresh(errors)
    const arr = element.classList
    if (isOk) {
        if (arr.contains('redStyle'))
            arr.remove('redStyle')
        if (!arr.contains('greenStyle'))
            arr.add('greenStyle')
    } else {
        if (arr.contains('greenStyle'))
            arr.remove('greenStyle')
        if (!arr.contains('redStyle'))
            arr.add('redStyle')
    }
}


let inputErrors = ['YEmpty','XEmpty']

document.getElementById('mainForm:inputR1').addEventListener('change', (e) => {
    draw();
})
document.getElementById('mainForm:inputR2').addEventListener('change', (e) => {
    draw();
})
document.getElementById('mainForm:inputR3').addEventListener('change', (e) => {
    draw();
})
document.getElementById('mainForm:inputR4').addEventListener('change', (e) => {
    draw();
})
document.getElementById('mainForm:inputR5').addEventListener('change', (e) => {
    draw();
})

const inputX = document.getElementById('mainForm:inputX')
const inputY = document.getElementById('mainForm:inputY')

inputX.addEventListener('input', () => {
    checkInputText(inputX, -3, 3, inputErrors, 'X')
})
inputY.addEventListener('input', () => {
    checkInputText(inputY, -5, 3, inputErrors, 'Y')
})

window.getRequestsAndDraw = (jsonParse) => {
    console.log(jsonParse)
    window.mainJsonData = JSON.parse(jsonParse)
    draw()
}
