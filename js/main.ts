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
    var ablitemp: string;
    var theAbli: string;
    for (i=0; i<resp['abilities'].length; i++){ 
        ablitemp = resp['abilities'][i].ability.name;
        theAbli = ablitemp[0].toUpperCase() + ablitemp.slice(1);

        abi_stack.push((i+1) + ". " + theAbli + "<br>"); 
    } 

    var aPokemon: Pokemon = new Pokemon(resp['id'], resp['name'], resp['order'], abi_stack);
    $('#pokemon-name').html(aPokemon.poke_name.toUpperCase());
    $('#pokemon-ability').html(aPokemon.poke_abilities); 
}; 

//A function to be called when the request fails...
var err_response: any = function(err_resp: any){
    alert("Wrong Input! Please enter Pokemon's Name or Index.");
    $('#pokemon-name').html("This pokemon is ...");
    $('#pokemon-ability').html("" + err_resp.statusText);
}
 
$("#find_button").click(function() { 
     var pokeindex: any = $('#poke-input').val(); 
     if(typeof pokeindex == "string"){
         pokeindex = pokeindex.toLowerCase();
     }
     $.ajax({ 
     url: 'http://pokeapi.co/api/v2/pokemon/' + pokeindex, 
     type: 'GET', 
     dataType: 'json', 
     success: response, //success(result, status, xhr) a function to be run when the request succeeds...  
     error: err_response 
     });
}); 

