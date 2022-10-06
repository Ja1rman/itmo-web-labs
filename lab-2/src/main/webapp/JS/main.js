import {Animation} from "./animation.js";
import {addRequestElement, addRequestElementForJSON} from "./addRequestElement.js";
import {changeTheme, setThemeMode} from "./themes.js";
import {isValidNumber, refresh} from "./validateData.js";
import {draw, drawPoint} from "./draw.js";


export const main = (mainJsonData) => {

    const canvas = document.getElementById('canv')
    const contextDraw = canvas.getContext('2d')
    window.rValue = -1
    window.amountOfRequests = mainJsonData.length
    for (let i = 0; i < mainJsonData.length;i++){
        addRequestElementForJSON(mainJsonData[i], i+1)
    }
    setThemeMode()
    draw(contextDraw, mainJsonData)
    let clickableStatus = {status: 'normal'}
    const animation = new Animation(clickableStatus)
    animation.addMicroAnimation({
        elementId: 'requests', speed: -1, toDefaultStatus: 'before', difference: -80*amountOfRequests, property: 'top', isReturnableMicroAnimation: false
    })
    animation.addMicroAnimation({
        elementId: 'requests',
        speed: 15,
        toDefaultStatus: 'no',
        difference: 80*amountOfRequests,
        property: 'top',
        isReturnableMicroAnimation: false
    })


    const form = document.getElementById('mainForm');
    const formData = new FormData(form)
    document.getElementById('canv').addEventListener("click", (e)=>{
        if (rValue > 0){
            const x = e.offsetX
            const y = e.offsetY
            if (x >= 50 && x <= 450 && y <= 410 && y >= 90){
                const newX = Math.round((x-250)/40)
                const newY = Math.round((-y+250)/4)/10
                handle({x:newX, y:newY, r:rValue}, false)
            }
        }


    })



    document.getElementById('inputX').addEventListener('mouseover', () => {
        document.getElementById('rangeX').style.visibility = 'visible'
    })
    document.getElementById('inputX').addEventListener('mouseout', () => {
        document.getElementById('rangeX').style.visibility = 'hidden'
    })
    document.getElementById('inputR').addEventListener('mouseover', () => {
        document.getElementById('rangeR').style.visibility = 'visible'
    })
    document.getElementById('inputR').addEventListener('mouseout', () => {
        document.getElementById('rangeR').style.visibility = 'hidden'
    })
    const showRequest = (status, responseText = '') => {
        window.amountOfRequests++
        animation.addMicroAnimation({
            elementId: 'requests', speed: -1, toDefaultStatus: 'before', difference: -80, property: 'top',
            afterMicroAnimation: () => {
                addRequestElement(responseText, status, contextDraw, mainJsonData)
            }, isReturnableMicroAnimation: false
        })
        animation.addMicroAnimation({
            elementId: 'requests',
            speed: 15,
            toDefaultStatus: 'no',
            difference: 80,
            property: 'top',
            isReturnableMicroAnimation: false
        })
        animation.addMicroAnimation({
            elementId: "request№" + window.amountOfRequests.toString(),
            property: "left",
            difference: -910,
            speed: 50,
            statusClickableAfter: "shown",
            toDefaultStatus: "no",
            afterMicroAnimation: () => {
                for (let i of document.getElementsByClassName('request')) {
                    const arr = i.classList
                    arr.remove('shownRequest')
                    arr.add('hiddenRequest')
                }
            },
            actionAfterAndBeforeReversedStatus: false,
            actionAfterMicroAnimationStatus: "back"
        })
    }


    const handle = (data, withRClean) => {
        const xhr = new XMLHttpRequest();
        let done = false
        xhr.open("get", "./?" + Object.keys(data).map(key => key + '=' + data[key]).join('&'))
        setTimeout(()=>{if (!done){
            done = true
            showRequest(-1)
        }
        }, 7000)
        xhr.onloadend = ()=>{
            if(!done) {
                done = true
                showRequest(xhr.status, xhr.responseText)
            }
        }
        xhr.send()
        clean(withRClean)
    }

    const clean = (withR) => {
        if (withR)
            rValue = -1
        const inputsList = document.getElementsByTagName('input')
        for (let y of inputsList) {
            if (y.getAttribute('type') === 'radio' || (y.getAttribute('type') === 'checkbox'))
                y.checked = false
        }
        const x = document.getElementById('inputX')
        x.classList.remove('greenStyle');
        x.value = ''
        const r = document.getElementById('inputR')
        r.classList.remove('greenStyle');
        r.value = ''
        document.getElementsByTagName('legend')[0].textContent = 'Enter X, Y, R values.'

        inputErrors = ['XEmpty', 'REmpty']
        if (withR)
            inputErrors.push('YEmpty')
    }

    form.addEventListener('submit', (e) => {
        document.getElementById("sub").disabled = true;
        e.preventDefault()
        const form = document.getElementById('mainForm');
        const formData = new FormData(form)
        const x = inputX.value
        const y = formData.get('y')
        const r = inputR.value
        handle({x, y, r}, true)
    })


    window.handleClickShow = (indexOfRequest) => {
        if (clickableStatus.status !== 'normal' || animation.getAnimationIsRunning())
            return;
        animation.addMicroAnimation({
            elementId: 'requests',
            property: "top",
            difference: -(window.amountOfRequests - indexOfRequest) * (60 + 5 * 2 + 10),
            speed: 15,
            toDefaultStatus: "before"
        })
        animation.addMicroAnimation({
            elementId: "request№" + indexOfRequest.toString(),
            property: "left",
            difference: -910,
            speed: 50,
            statusClickableAfter: "shown",
            toDefaultStatus: "no",
            afterMicroAnimation: () => {
                for (let i of document.getElementsByClassName('request')) {
                    const arr = i.classList
                    if (arr.contains('hiddenRequest'))
                        arr.remove('hiddenRequest')
                    if (!arr.contains('shownRequest'))
                        arr.add('shownRequest')
                }
            },
            beforeMicroAnimation: () => {
                for (let i of document.getElementsByClassName('request')) {
                    const arr = i.classList
                    if (arr.contains('shownRequest'))
                        arr.remove('shownRequest')
                    if (!arr.contains('hiddenRequest'))
                        arr.add('hiddenRequest')
                }
            }
        })
    }
    window.handleClickHide = () => {
        if (clickableStatus.status !== 'shown' || animation.getAnimationIsRunning())
            return;
        animation.addMicroAnimation({toDefaultStatus: "action"})
    }

    setThemeMode()
//document.getElementById('toAnotherTheme').setAttribute('src', 'images/toDarkTheme.png')
    window.handleClickChangeColor = () => {
        changeTheme(document.getElementById('toAnotherTheme').getAttribute('src') === 'images/toLightTheme.jpg')
        draw(contextDraw, mainJsonData);
    }


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
            return true
        } else {
            if (arr.contains('greenStyle'))
                arr.remove('greenStyle')
            if (!arr.contains('redStyle'))
                arr.add('redStyle')
        }
        return false
    }


    let inputErrors = ['XEmpty', 'YEmpty', 'REmpty']

    const inputs = document.getElementsByTagName('input')
    for (let y of inputs) {
        if (y.getAttribute('type') === 'radio')
            y.addEventListener('change', () => {
                    const index = inputErrors.indexOf('YEmpty');
                    if (index !== -1) {
                        inputErrors.splice(index, 1);
                        refresh(inputErrors)
                    }
                }
            )
    }
    let checkboxes = [];
    for (let i of inputs)
        if (i.getAttribute('type') === 'checkbox')
            checkboxes.push(i)
    for (let i of checkboxes) {
        i.addEventListener('change', (e) => {

            const form = document.getElementById('mainForm');
            const formData = new FormData(form)
                const index = inputErrors.indexOf('YEmpty');
                if (index !== -1) {
                    inputErrors.splice(index, 1);
                    refresh(inputErrors)
                    //return;
                }
                let sum = 0;
                for (let i of checkboxes) {
                    if (i.checked)
                        sum++
                }
                const index1 = inputErrors.indexOf('Select one value for Y!');
                if (sum !== 1) {
                    if (index1 === -1) {
                        inputErrors.unshift('Select one value for Y!')
                        refresh(inputErrors)
                    }
                } else {
                    if (index1 !== -1) {
                        inputErrors.splice(index1, 1)
                        refresh(inputErrors)
                    }
                }
            }
        )
    }

    const inputX = document.getElementById('inputX')
    const inputR = document.getElementById('inputR')

    inputX.addEventListener('input', () => {
        checkInputText(inputX, -5, 5, inputErrors, 'X')
    })
    inputR.addEventListener('input', () => {
        if (checkInputText(inputR, 1, 4, inputErrors, 'R'))
        {rValue = inputR.value
        draw(contextDraw, mainJsonData);}
    })
}