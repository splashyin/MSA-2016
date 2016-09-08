//Clear the image when everytime website is loaded or refresed
$(document).ready(function(){
    $("img").hide();
});

//Pokemon class, to construct an pokemon object
class Pokemon {
     poke_id: number;
     poke_name: string;
     poke_order: number;
     poke_abilities: any;
     poke_attack: number;
     poke_specialattack: number;
     poke_hp: number;

     constructor(id: number,
                 name: string,
                 order: number, 
                 abilities: any,
                 attack: number,
                 specialattack: number,
                 hp: number){
         this.poke_id = id;
         this.poke_name = name;
         this.poke_order = order;
         this.poke_abilities = abilities;
         this.poke_attack = attack;
         this.poke_hp = hp;
         this.poke_specialattack = specialattack;
     }      
}

//A function to be called when the request succeed...
function response(resp: any): void{
    var abi_stack: any = [];
    var i: number;
    var j: number; 
    var ablitemp: string;
    var theAbli: string;
    var pokemon_attack: number;
    var pokemon_specialattack: number;
    var pokemon_hp: number;

    //get abilities...
    for (i=0; i<resp['abilities'].length; i++){ 
        ablitemp = resp['abilities'][i].ability.name;
        theAbli = ablitemp[0].toUpperCase() + ablitemp.slice(1);

        abi_stack.push((i+1) + ". " + theAbli + "<br>"); 
    } 
    //get the stat of attack, special-attack and hp...
    for(j=0; j<resp['stats'].length; j++){
        if(resp['stats'][j].stat.name == "attack"){
            pokemon_attack = resp['stats'][j].base_stat;
        }
        if(resp['stats'][j].stat.name == "hp"){
            pokemon_hp = resp['stats'][j].base_stat;
        }
        if(resp['stats'][j].stat.name == "special-attack"){
            pokemon_specialattack = resp['stats'][j].base_stat;
        }
    }

//Construct a new Pokemon!
    var aPokemon: Pokemon = new Pokemon(
        resp['id'],
        resp['name'],
        resp['order'],
        abi_stack,
        pokemon_attack,
        pokemon_specialattack,
        pokemon_hp
        );

    $('#pokemon-name').html(aPokemon.poke_name.toUpperCase());
    $('#pokemon-ability').html(aPokemon.poke_abilities);
    $('#pokemon-hp').html(""+ aPokemon.poke_hp);
    //$('#pokemon-attack').html(""+ aPokemon.poke_attack);
    //$('#pokemon-specialattck').html(""+ aPokemon.poke_specialattack);

    var image_url: string = resp['sprites'].front_default;
    $("#poke_image").show();
    $("#poke_image").attr("src", image_url);

}

//A function to be called when the request fails...
function err_response(err_resp: any): void{
    alert("Wrong Input! Please enter Pokemon's Name or Index.");
    $('#pokemon-name').html("This pokemon is ...");
    $('#pokemon-ability').html("" + err_resp.statusText);
    $("#poke_image").hide();
}
//Button listener..
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
     error: err_response //failure...
     });
}); 

