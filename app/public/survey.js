$(document).ready(function() {


    $('.toShow').hide()
        // console.log($('.thumbnail img').attr('src'))
        // $('.toShow').hide()

    //Animation CSS default constructor

    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    $('input').on('click', function() {
        $(this).animateCss('bounce');
    });

    // GLOBAL TEST CASE FOR INPUT
    $('#formGroupExampleInput')[0].value = 'Dzmitry'
    $('#formGroupExampleInput2')[0].value = 'https://avatars0.githubusercontent.com/u/21366035?v=3&s=400'
    var stuff = [];
    for (i = 1; i <= 10; i++) {

        var element = document.getElementsByName('question' + [i])

        stuff.push(element)
    }
    for (var i = 0; i < 10; i++) {
        var random = Math.floor(Math.random() * 5)
        stuff[i][random].checked = true
    }
    // document.getElementsByTagName('button')[1].click()
    console.log(stuff)

    console.log('hello')


    $('.submit').on('click', function(event) {
        $('body').css('overflow-y', ' hidden')
        var answers = []
        console.log($('input[name]:checked').length)
            // [1].value
        var a = $('#formGroupExampleInput')[0].value
        var b = $('#formGroupExampleInput2')[0].value
        if ($('input[name]:checked').length !== 10 || a == "" || a == null || b == "" || b == null) {
            alert("Answer all questions and fill out all fields")
            location.reload();
        }
        var totals = $('input[name]:checked')
            // 

        console.log(totals)
        for (var i = 0; i < totals.length; i++) {

            answers.push((parseInt(totals[i].value)))


            // console.log(answers)

            event.preventDefault();

        }

        console.log(answers)


        var NewApplicant = {
            name: $('#formGroupExampleInput')[0].value.trim(),
            photo: $('#formGroupExampleInput2')[0].value.trim(),
            scores: [...answers],
            total: answers.reduce((a, b) => a + b, 0)
        }
        $.ajax({
                url: '/people',
                type: 'GET',
                dataType: 'JSON'
            })
            .done(function(data) {
                // math.abs()
                // console.log(NewApplicant.total)
                var holderDifferences = []
                data.forEach(function(element, index) {

                    var difference = Math.abs(element.total - NewApplicant.total)
                        // console.log(difference)
                    holderDifferences.push(difference)
                        // Math.min(...arr)
                });
                console.log(holderDifferences)
                    // console.log(holderDifferences.indexOf(Math.min(...holderDifferences)))
                    //we create array of differences between scores, then we finding the smallest number in array
                    //and defining it's index, since the index is going to match in DATA object then we can pull
                    //whole data with this object as a perfect match find out what id there is two of small numbers
                    // console.log('Your Perfect match is')
                    // console.log(data[holderDifferences.indexOf(Math.min(...holderDifferences))])
                    // <img src="${data[holderDifferences.indexOf(Math.min(...holderDifferences))].photo}" alt=""></img>

                $('form, .form-group, .likert-header').fadeOut("slow");

                function DisplayStuff() {

                    $('.matcher').animateCss('bounceInLeft');
                    $('.testDoer').animateCss('bounceInRight');
                    $('.appendH1').animateCss('bounceInDown');

                    $('.tester').append(`<h3>${NewApplicant.name}</h3>`)
                    $('.matcing').append(`<h3>${data[holderDifferences.indexOf(Math.min(...holderDifferences))].name}</h3>`)
                    $('.matcing').attr('href', `${data[holderDifferences.indexOf(Math.min(...holderDifferences))].name}`)
                    $('.tester').attr('href', `${NewApplicant.name}`)

                    var src = data[holderDifferences.indexOf(Math.min(...holderDifferences))].photo
                    $('.thumbnail img').attr('src', src)
                    $('.tester img').attr('src', NewApplicant.photo)
                    $('.toShow').show()
                }
                setTimeout(DisplayStuff, 1000)

            })


        $.ajax({
            type: "POST",
            url: '/people/new',
            data: NewApplicant,
            success: function(msg) {
                console.log('Good added stuff')
            }
        });


    });



});