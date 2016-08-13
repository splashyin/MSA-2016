$("#sendrequest").click(function() {
    $.ajax({
        url: 'http://api.open-notify.org/astros.json',
        type: 'GET',
        data: {
            format: 'json'
        },
        processData: false
    })
    .done(function (data) {
        alert(data);
    });
});