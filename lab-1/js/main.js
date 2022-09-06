$(function(){
    
    function stopDefAction(event) {
        event.preventDefault();
    }
    for(let i = 1; i <= 5; i++) {
        var elem = document.getElementById('button' + i);
        elem.addEventListener(
            'click', stopDefAction, false
        );
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    function validateX() {
        if ($('.x-checkbox').is(':checked')) {
            let counter = 0;
            for(let i = 1; i <= 9; i++) {
                if ($('#x-checkbox'+i).is(":checked"))
                {
                    counter++;
                }
            }
            if (counter > 1) {
                $('.x-label').addClass('box-error');
                return false;
            }
            $('.x-label').removeClass('box-error');
            return true;
        } else {
            $('.x-label').addClass('box-error');
            return false;
        }
    }
    
    function validateY() {
        const Y_MIN = -5;
        const Y_MAX = 3;
    
        let yField = $('#y-textinput');
        let numY = yField.val().replace(',', '.');
    
        if (isNumeric(numY) && numY > Y_MIN && numY < Y_MAX)
        {
            yField.removeClass('text-error');
            return true;
        } else {
            yField.addClass('text-error');
            return false;
        }
    }
    
    function validateR() {
        for(let i = 1; i <= 5; i++) {
            let elem = $('#button' + i).css("backgroundColor");
            if (elem == 'rgb(0, 250, 154)'){
                return true;
            };
        }
        $('.r-input-button').addClass('text-error');
        return false;
    }   
    
    function validateForm() {
        return validateX() & validateY() & validateR();
    }
    
    $('#input-form').on('submit', function(event) {
        event.preventDefault();
        if (!validateForm()) return;
        let x = 0;
        for(let i = 1; i <= 9; i++) {
            if ($('#x-checkbox'+i).is(":checked"))
            {
                x = $('#x-checkbox'+i).val();
                break
            }
        }
        let y = $('#y-textinput').val().replace(',', '.');
        let r = 0;
        for(let i = 1; i <= 5; i++) {
            let elem = $('#button' + i);
            if (elem.css("backgroundColor") == 'rgb(0, 250, 154)'){
                r = elem.val();
            };
        }
        $.ajax({
            url: 'php/main.php?',
            method: 'GET',
            data: 'x=' + x + '&y=' + y + '&r=' + r + '&session=0',
            beforeSend: function() {
                $('.button').attr('disabled', 'disabled');
            },
            success: function(data) {
                $('.button').attr('disabled', false);
                data = JSON.parse(data);
                
                if (data['isCorrect']) {
                    newRow = '<tr>';
                    newRow += '<td>' + data['x'] + '</td>';
                    newRow += '<td>' + data['y'] + '</td>';
                    newRow += '<td>' + data['r'] + '</td>';
                    newRow += '<td>' + data['date'] + '</td>';
                    newRow += '<td>' + data['time'] + '</td>';
                    newRow += '<td>' + data['answer'] + '</td>';
                    $('#result-table').append(newRow);
                }
            }
        });
    });
    $.ajax({
        url: 'php/main.php?',
        method: 'GET',
        data: 'session=1',
        beforeSend: function() {
            $('.button').attr('disabled', 'disabled');
        },
        success: function(bigData) {
            $('.button').attr('disabled', false);
            if (bigData != null) {
                bigData = JSON.parse(bigData);
                for(let i=0; i < bigData.length; i++){
                    let data = bigData[i];
                    
                    if (data['isCorrect']) {
                    newRow = '<tr>';
                    newRow += '<td>' + data['x'] + '</td>';
                    newRow += '<td>' + data['y'] + '</td>';
                    newRow += '<td>' + data['r'] + '</td>';
                    newRow += '<td>' + data['date'] + '</td>';
                    newRow += '<td>' + data['time'] + '</td>';
                    newRow += '<td>' + data['answer'] + '</td>';
                    $('#result-table').append(newRow);
                    }
                }
            }
        }
    });
});