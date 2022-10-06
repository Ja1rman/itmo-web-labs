export const drawPoint = (x, y, isIn, context) => {
    context.beginPath()
    const isDarkTheme = document.getElementById('toAnotherTheme').getAttribute('src') === 'images/toLightTheme.jpg';
    if (!isIn && isDarkTheme)
        context.strokeStyle = "#ad0e16";
    if (isIn && isDarkTheme)
        context.strokeStyle = "#105224";
    if (!isIn && !isDarkTheme)
        context.strokeStyle = "red";
    if (isIn && !isDarkTheme)
        context.strokeStyle = "green";
    console.log(x, y)
    context.arc(40 * x + 250, -40 * y + 250, 4, 0, 2*Math.PI)
    context.stroke()
}

export const draw = (context, mainJsonData) => {
    const isDarkTheme = document.getElementById('toAnotherTheme').getAttribute('src') === 'images/toLightTheme.jpg';
    context.clearRect(0, 0, 500, 500);
    const rad = (rValue <= 0 || rValue > 4) ? 3 : rValue;
    context.beginPath()
    context.arc(250, 250, 40 * rad, 0, -Math.PI / 2, true)
    context.lineTo(250, 250 + 40 * rad) //tr
    context.lineTo(250 + 40 * rad, 250) //tr
    context.lineTo(250, 250)
    context.lineTo(250, 250 + 40 * rad)
    context.lineTo(250 - 40 * rad, 250 + 40 * rad)
    context.lineTo(250 - 40 * rad, 250)
    context.lineTo(250 + 40 * rad, 250)
    context.closePath()
    context.strokeStyle = 'black';
    context.fillStyle = "gray";
    context.fill()
    context.lineWidth = 1;
    context.stroke();

    context.beginPath()
    if (rValue !== -1) {
        for (let i = 0; i <= 20; i += 1) {
            context.moveTo(50 + 20 * i, 410)
            context.lineTo(50 + 20 * i, 90)
        }
        for (let i = 0; i <= 16; i += 1) {
            context.moveTo(450, 90 + 20 * i)
            context.lineTo(50, 90 + 20 * i)
        }
    }
    context.textAlign = "left";
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.textBaseline = "top";
    context.font = "15px Areal";
    context.stroke();

    context.beginPath()
    context.moveTo(0, 250)
    context.lineTo(500, 250)
    context.moveTo(480, 240)
    context.lineTo(500, 250)
    context.moveTo(480, 260)
    context.lineTo(500, 250)

    context.moveTo(250, 500)
    context.lineTo(250, 0)
    context.moveTo(260, 20)
    context.lineTo(250, 0)
    context.moveTo(240, 20)
    context.lineTo(250, 0)
    context.lineWidth = 2;
    context.stroke();

    for (let i of mainJsonData){
        drawPoint(i.x, i.y, i.isIn, context)
    }

}
