var Pokemon = (function () {
    function Pokemon(id, name, order, abilities) {
        this.poke_id = id;
        this.poke_name = name;
        this.poke_order = order;
        this.poke_abilities = abilities;
    }
    return Pokemon;
}());
//A function to be called when the request succeed...
var response = function (resp) {
    var abi_stack = [];
    var i;
    var ablitemp;
    var theAbli;
    for (i = 0; i < resp['abilities'].length; i++) {
        ablitemp = resp['abilities'][i].ability.name;
        theAbli = ablitemp[0].toUpperCase() + ablitemp.slice(1);
        abi_stack.push((i + 1) + ". " + theAbli + "<br>");
    }
    var aPokemon = new Pokemon(resp['id'], resp['name'], resp['order'], abi_stack);
    $('#pokemon-name').html(aPokemon.poke_name.toUpperCase());
    $('#pokemon-ability').html(aPokemon.poke_abilities);
    var image_url = resp['sprites'].front_default;
    $("#poke_image").show();
    $("#poke_image").attr("src", image_url);
};
//A function to be called when the request fails...
var err_response = function (err_resp) {
    alert("Wrong Input! Please enter Pokemon's Name or Index.");
    $('#pokemon-name').html("This pokemon is ...");
    $('#pokemon-ability').html("" + err_resp.statusText);
    $("#poke_image").hide();
};
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
        error: err_response
    });
});
