var response = function(resp){
    for (i=0; i<resp['abilities'].length; i++){
        console.log(resp['abilities'][i].ability.name);
    }
};

$("#button_space").click(function() {
    var pokeindex = $('#pokeindex').val();
    $.ajax({
    url: 'http://pokeapi.co/api/v2/pokemon/' + pokeindex,
    type: 'GET',
    dataType: 'json',
    success: response    
    });
});