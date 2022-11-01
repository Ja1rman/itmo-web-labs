export const drawPoint = (x, y, isin) => {
    console.log("isIn")
    console.log(isin)
    contextDraw.beginPath()
    const isDarkTheme = document.getElementById('toAnotherTheme').getAttribute('src') === 'images/toLightTheme.jpg';
    if (!isin && isDarkTheme)
        contextDraw.strokeStyle = "#ad0e16";
    if (isin && isDarkTheme)
        contextDraw.strokeStyle = "#105224";
    if (!isin && !isDarkTheme)
        contextDraw.strokeStyle = "red";
    if (isin && !isDarkTheme)
        contextDraw.strokeStyle = "green";
    contextDraw.arc(40 * x + 250, -40 * y + 250, 4, 0, 2 * Math.PI)
    contextDraw.stroke()

}

export const draw = () => {

    const canvas = document.getElementById('canv')
    const contextDraw = canvas.getContext('2d')
    if (window.mainJsonData === null || window.mainJsonData === undefined)
        window.mainJsonData = []
    const isDarkTheme = document.getElementById('toAnotherTheme').getAttribute('src') === 'images/toLightTheme.jpg';
    console.log("HERE!!!!")
    contextDraw.clearRect(0, 0, 500, 500);

    let rad = 5
    if (document.getElementById('mainForm:inputR1').checked) {
        rad = 1
        document.getElementById('mainForm:inputR1').value = true
    } else document.getElementById('mainForm:inputR1').value = false
    if (document.getElementById('mainForm:inputR2').checked) {
        rad = 2
        document.getElementById('mainForm:inputR2').value = true
    } else document.getElementById('mainForm:inputR2').value = false
    if (document.getElementById('mainForm:inputR3').checked) {
        rad = 3
        document.getElementById('mainForm:inputR3').value = true
    } else document.getElementById('mainForm:inputR3').value = false
    if (document.getElementById('mainForm:inputR4').checked) {
        rad = 4
        document.getElementById('mainForm:inputR4').value = true
    } else document.getElementById('mainForm:inputR4').value = false
    if (document.getElementById('mainForm:inputR5').checked) {
        rad = 5
        document.getElementById('mainForm:inputR5').value = true
    } else document.getElementById('mainForm:inputR5').value = false
    contextDraw.beginPath()
    contextDraw.lineTo(250, 250)
    contextDraw.arc(250, 250, 40 * rad, -Math.PI / 2, -Math.PI, true)
    contextDraw.lineTo(250, 250)
    contextDraw.lineTo(250, 250 - 40 * rad)
    contextDraw.lineTo(250 + 20 * rad, 250 - 40 * rad)
    contextDraw.lineTo(250 + 20 * rad, 250)
    contextDraw.lineTo(250, 250)
    contextDraw.lineTo(250, 250 + 40*rad)
    contextDraw.lineTo(250-20*rad, 250)

    contextDraw.closePath()
    contextDraw.strokeStyle = 'black';
    contextDraw.fillStyle = "gray";
    contextDraw.fill()
    contextDraw.lineWidth = 1;
    contextDraw.stroke();

    contextDraw.beginPath()


    for (let i = 0; i <= 20; i += 1) {
        contextDraw.moveTo(50 + 20 * i, 450)
        contextDraw.lineTo(50 + 20 * i, 50)
    }
    for (let i = 0; i <= 20; i += 1) {
        contextDraw.moveTo(450, 50 + 20 * i)
        contextDraw.lineTo(50, 50 + 20 * i)
    }

    contextDraw.textAlign = "left";
    contextDraw.lineWidth = 1;
    contextDraw.strokeStyle = 'black';
    contextDraw.textBaseline = "top";
    contextDraw.font = "15px Areal";
    contextDraw.stroke();

    contextDraw.beginPath()
    contextDraw.moveTo(0, 250)
    contextDraw.lineTo(500, 250)
    contextDraw.moveTo(480, 240)
    contextDraw.lineTo(500, 250)
    contextDraw.moveTo(480, 260)
    contextDraw.lineTo(500, 250)

    contextDraw.moveTo(250, 500)
    contextDraw.lineTo(250, 0)
    contextDraw.moveTo(260, 20)
    contextDraw.lineTo(250, 0)
    contextDraw.moveTo(240, 20)
    contextDraw.lineTo(250, 0)
    contextDraw.lineWidth = 2;
    contextDraw.stroke();

    for (let i of window.mainJsonData) {
        drawPoint(i.x, i.y, i.isin)
    }

}
