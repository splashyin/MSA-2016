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

function replaceAt(aString: string, index: number, character: string): string{
    return aString.substr(0, index) + character + aString.substr(index+character.length);
}

//A function to load FAcebook SDK for Javascript
function get_fb(d: any, s: string, id: string): void{
  var js: any, fjs: any = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7";
  fjs.parentNode.insertBefore(js, fjs);
}

//A function to be called when the request succeed...
function response(resp: any): void{
    //local variables...
    var abi_stack: any = [];
    var i: number;
    var j: number; 
    var k: number;
    var a: number;
    var ablitemp: string;
    var theAbli: string;
    var pokemon_attack: number;
    var pokemon_specialattack: number;
    var pokemon_hp: number;
    var aNew_ability : string;
    var updated: boolean;

    //get abilities...'process' the string to readable sentence...
    for (i=0; i<resp['abilities'].length; i++){ 
        ablitemp = resp['abilities'][i].ability.name;
        theAbli = ablitemp[0].toUpperCase() + ablitemp.slice(1);
        updated =false;
        for(a=0; a<theAbli.length; a++){
            if(theAbli[a] == "-"){
                aNew_ability = replaceAt(theAbli, a, " ");
                updated = true;
            }
        }
        if (updated == true){
            abi_stack.push(aNew_ability + "<br>");
        }
        else{
            abi_stack.push(theAbli + "<br>");
        } 
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
    
    
    $("table").show();
    $('#pokemon-name').html(aPokemon.poke_name.toUpperCase());
    $('#pokemon-ability').html(aPokemon.poke_abilities);
    $('#pokemon-hp').html(""+ aPokemon.poke_hp);
    $('#pokemon-attack').html(""+ aPokemon.poke_attack);
    $('#pokemon-special-attack').html(""+ aPokemon.poke_specialattack);

    var image_url: string = resp['sprites'].front_default;
    $("#poke_image").show();
    $("#poke_image").attr("src", image_url);

}

//A function to be called when the request fails...
function err_response(err_resp: any): void{
    alert("Wrong Input! Please enter Pokemon's Name or Index.");
    $("table").show();
    $('#pokemon-name').html("This pokemon is ...");
    $('#pokemon-ability').html("" + err_resp.statusText);
    $('#pokemon-hp').html("-");
    $('#pokemon-attack').html("-");
    $('#pokemon-special-attack').html("-");
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

//Clear the image when everytime website is loaded or refresed
$(document).ready(function(){
    $("img").hide();
    $("table").hide();
    get_fb(document, 'script', 'facebook-jssdk');
});