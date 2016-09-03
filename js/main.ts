class Pokemon {
     poke_id: number;
     poke_name: string;
     poke_order: number;
     poke_abilities: string[];

     constructor(id: number, name: string, order: number, abilities: string[]){
         this.poke_id = id;
         this.poke_name = name;
         this.poke_order = order;
         this.poke_abilities = abilities;
     }      
}

//A function to be called when the request succeed...
var response: any = function(resp: any){ 
    var abi_stack: any = [];
    var i: number; 

    for (i=0; i<resp['abilities'].length; i++){ 
        abi_stack.push(resp['abilities'][i].ability.name + "<br>"); 
    } 

    var aPokemon: Pokemon = new Pokemon(resp['id'], resp['name'], resp['order'], abi_stack);

    $('#pokemon-ability').html(aPokemon.poke_name); 
}; 
 
$("#button_space").click(function() { 
     var pokeindex: number = $('#pokeindex').val(); 
     $.ajax({ 
     url: 'http://pokeapi.co/api/v2/pokemon/' + pokeindex, 
     type: 'GET', 
     dataType: 'json', 
     success: response //success(result, status, xhr) a function to be run when the request succeeds...    
     });
}); 

