$("#button_space").click(function() {
    $.ajax({
        url: 'http://api.open-notify.org/astros.json',
        type: 'GET',
        dataType: 'jsonp',
        success: function(){
            alert("h");
        }
    })
});
