$("#button_space").click(function() {
    $.ajax({
        url: 'http://api.open-notify.org/astros.json',
        type: 'GET',
        dataType: 'json',
        success: function(){
            alert("h");
        }
    })
});
