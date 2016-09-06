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
$("#find_button").click(function () {
    var pokeindex = $('#poke-input').val();
    if (pokeindex <= 0) {
        alert("Wrong input");
    }
    $.ajax({
        url: 'http://pokeapi.co/api/v2/pokemon/' + pokeindex,
        type: 'GET',
        dataType: 'json',
        success: response //success(result, status, xhr) a function to be run when the request succeeds...    
    });
});
