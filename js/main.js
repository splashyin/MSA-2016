"use strict";
var appInsights = require("applicationinsights");
appInsights.setup("<a5106a31-41bd-4144-8a83-644de01a9d95>");
//Pokemon class, to construct an pokemon object
var Pokemon = (function () {
    function Pokemon(id, name, order, abilities, attack, specialattack, hp) {
        this.poke_id = id;
        this.poke_name = name;
        this.poke_order = order;
        this.poke_abilities = abilities;
        this.poke_attack = attack;
        this.poke_hp = hp;
        this.poke_specialattack = specialattack;
    }
    return Pokemon;
}());
function replaceAt(aString, index, character) {
    return aString.substr(0, index) + character + aString.substr(index + character.length);
}
//A function to load FAcebook SDK for Javascript
function get_fb(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7";
    fjs.parentNode.insertBefore(js, fjs);
}
//A function to be called when the request succeed...
function response(resp) {
    //local variables...
    var abi_stack = [];
    var i;
    var j;
    var k;
    var a;
    var ablitemp;
    var theAbli;
    var pokemon_attack;
    var pokemon_specialattack;
    var pokemon_hp;
    var aNew_ability;
    var updated;
    //get abilities...'process' the string to readable sentence...
    for (i = 0; i < resp['abilities'].length; i++) {
        ablitemp = resp['abilities'][i].ability.name;
        theAbli = ablitemp[0].toUpperCase() + ablitemp.slice(1);
        updated = false;
        for (a = 0; a < theAbli.length; a++) {
            if (theAbli[a] == "-") {
                aNew_ability = replaceAt(theAbli, a, " ");
                updated = true;
            }
        }
        if (updated == true) {
            abi_stack.push(aNew_ability + "<br>");
        }
        else {
            abi_stack.push(theAbli + "<br>");
        }
    }
    //get the stat of attack, special-attack and hp...
    for (j = 0; j < resp['stats'].length; j++) {
        if (resp['stats'][j].stat.name == "attack") {
            pokemon_attack = resp['stats'][j].base_stat;
        }
        if (resp['stats'][j].stat.name == "hp") {
            pokemon_hp = resp['stats'][j].base_stat;
        }
        if (resp['stats'][j].stat.name == "special-attack") {
            pokemon_specialattack = resp['stats'][j].base_stat;
        }
    }
    //Construct a new Pokemon!
    var aPokemon = new Pokemon(resp['id'], resp['name'], resp['order'], abi_stack, pokemon_attack, pokemon_specialattack, pokemon_hp);
    $("table").show();
    $('#pokemon-name').html(aPokemon.poke_name.toUpperCase());
    $('#pokemon-ability').html(aPokemon.poke_abilities);
    $('#pokemon-hp').html("" + aPokemon.poke_hp);
    $('#pokemon-attack').html("" + aPokemon.poke_attack);
    $('#pokemon-special-attack').html("" + aPokemon.poke_specialattack);
    var image_url = resp['sprites'].front_default;
    $("#poke_image").show();
    $("#poke_image").attr("src", image_url);
}
//A function to be called when the request fails...
function err_response(err_resp) {
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
$("#find_button").click(function () {
    var pokeindex = $('#poke-input').val();
    if (typeof pokeindex == "string") {
        pokeindex = pokeindex.toLowerCase();
    }
    $.ajax({
        url: 'http://pokeapi.co/api/v2/pokemon/' + pokeindex,
        type: 'GET',
        dataType: 'json',
        success: response,
        error: err_response //failure...
    });
});
//Clear the image when everytime website is loaded or refresed
$(document).ready(function () {
    $("img").hide();
    $("table").hide();
    get_fb(document, 'script', 'facebook-jssdk');
});
