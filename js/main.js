function sendAstroRequest(file, callback){
    $.ajax({
        url: "http://api.open-notify.org/astros.json",
        type: "GET",
        data: file,
        processData: false
    })
    .done(function () {
        alert("hehe");
    });
}