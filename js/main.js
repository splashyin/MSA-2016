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
    for (i = 0; i < resp['abilities'].length; i++) {
        abi_stack.push((i + 1) + ". " + resp['abilities'][i].ability.name + "<br>");
    }
    var aPokemon = new Pokemon(resp['id'], resp['name'], resp['order'], abi_stack);
    $('#pokemon-name').html(aPokemon.poke_name);
    $('#pokemon-ability').html(aPokemon.poke_abilities);
};
//A function to be called when the request fails...
var err_response = function (err_resp) {
    $('#pokemon-name').html("This pokemon is ...");
    $('#pokemon-ability').html("" + err_resp.statusText);
};
$("#find_button").click(function () {
    var pokeindex = $('#poke-input').val();
    if (pokeindex <= 0) {
        alert("Wrong Input! Please enter Pokemon's Name or Index.");
    }
    $.ajax({
        url: 'http://pokeapi.co/api/v2/pokemon/' + pokeindex,
        type: 'GET',
        dataType: 'json',
        success: response,
        error: err_response
    });
});
