function tabOpt(evt, cityName) {
    // W3 schools hack borrowing! 
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

$(document).ready(function() {
    // getting data for table
    $.ajax({
        type: "get",
        url: "/api",
        data: "data",
        dataType: "JSON",
        success: response => {
            //sorting the array
            response = response.sort(
                (a, b) => {
                    return (
                        a.earnings -
                        b.earnings
                    );
                }
            );

            let table = $(
                "#rates"
            );
            // generating table
            response.forEach(
                element => {
                    //adding dara + 2 decimals for each number
                    table.prepend(`
                <tr> <td>${element.name}</td>
                           
                            <td>${element.apy.toFixed(2)}%</td>
                            <td>$${element.earnings.toFixed(2)}</td>
                        </tr>

                `);


                },
                this
            );
             table.prepend(` <tr>
                            <td></td>
                            <td><sub>Annual Percentage Yeld </sub></td>
                            <td><sub>Est. Earnings for 1 Year* </sub></td>
                        </tr>`);

        }
    });

    $('p.login-window').click(function() {

        var loginBox = $(this).attr('href');
        $(loginBox).fadeIn(300);
        var popMargTop = ($(loginBox).height() + 24) / 2;
        var popMargLeft = ($(loginBox).width() + 24) / 2;
        $(loginBox).css({
            'margin-top': -popMargTop,
            'margin-left': -popMargLeft
        });
        $('body').append('<div id="mask"></div>');
        $('#mask').fadeIn(300)
        return false;
    });
    $('a.close, #mask').on('click', function() {
        $('#mask , .login-popup').fadeOut(300, function() {
            $('#mask').remove();
        });
        return false;
    });

});