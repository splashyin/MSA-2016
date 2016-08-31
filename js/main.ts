var response = function(resp){ 
    var abi_stack: any = [];
    var i: number;

    for (i=0; i<resp['abilities'].length; i++){ 
        abi_stack.push(resp['abilities'][i].ability.name + "<br>"); 
    } 
    $('#pokemon-ability').html(abi_stack); 
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
