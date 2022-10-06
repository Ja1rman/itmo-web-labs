<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:useBean id="reqList" class="sessions.ReqHttpList" scope="session" />

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Web-lab-2</title>
    <link href="css/style.css" type="text/css" rel="stylesheet">
</head>
<body>
<div id="header"><h1 id="a">Ovsyannikov Roman Dmitrievich (P32081), Variant 3627</h1></div>
<div id="changeThemeMode" onclick="handleClickChangeColor()">
    <img alt="image" id="toAnotherTheme">
</div>
<div id="mainBody">
    <div id="divInput">
        <fieldset>
            <legend>Enter X, Y, R values.</legend>
            <form id="mainForm" method="post" action="${pageContext.request.contextPath}/">
                <label>
                    X:
                    <input type="text" id="inputX" name="X">
                </label>
                <label id="rangeX">Range is from -5 to 5</label>
                <br>
                <br>
                <label>
                    Y:
                    <input type="checkbox" name="y" value=-4>-4
                </label>
                <label>
                    <input type="checkbox" name="y" value=-3>-3
                </label>
                <label>
                    <input type="checkbox" name="y" value=-2>-2
                </label>
                <label>
                    <input type="checkbox" name="y" value=-1>-1
                </label>
                <label>
                    <input type="checkbox" name="y" value=0>0
                </label>
                <label>
                    <input type="checkbox" name="y" value=1>1
                </label>
                <label>
                    <input type="checkbox" name="y" value=2>2
                </label>
                <label>
                    <input type="checkbox" name="y" value=3>3
                </label>
                <label>
                    <input type="checkbox" name="y" value=4>4
                </label>
                <br>
                <br>
                <label>
                    R:
                    <input type="text" id="inputR" name="R">
                </label>
                <label id="rangeR">Range is from 1 to 4</label>
                <br>
                <br>
                <input type="submit" value="check" id="sub" disabled>
            </form>
        </fieldset>
        <div id="imageXY">
            <canvas id="canv" height="500" width="500"></canvas>
        </div>
    </div>
    <div id="coordinates"></div>
    <div id="requests">
    </div>
</div>
<div id="footer">
    <div id="divWithLink"></div>
    <div>Supported by </div><a href="https://mcbrawl.ru">BrawlCraft LTD</a>
</div>
<script type="module" src="JS/script.js"></script>
</body>
</html>