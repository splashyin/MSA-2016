class Pokemon {
     poke_id: number;
     poke_name: string;
     poke_order: number;
     poke_abilities: any;

     constructor(id: number, name: string, order: number, abilities: any){
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
        abi_stack.push((i+1) + ". " + resp['abilities'][i].ability.name + "<br>"); 
    } 

    var aPokemon: Pokemon = new Pokemon(resp['id'], resp['name'], resp['order'], abi_stack);
    $('#pokemon-name').html(aPokemon.poke_name);
    $('#pokemon-ability').html(aPokemon.poke_abilities); 
}; 
 
$("#find_button").click(function() { 
     var pokeindex: number = $('#poke-input').val(); 
     $.ajax({ 
     url: 'http://pokeapi.co/api/v2/pokemon/' + pokeindex, 
     type: 'GET', 
     dataType: 'json', 
     success: response //success(result, status, xhr) a function to be run when the request succeeds...    
     });
}); 

