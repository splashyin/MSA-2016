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
    var abi_stack;
    var i;
    for (i = 0; i < resp['abilities'].length; i++) {
        abi_stack.push(resp['abilities'][i].ability.name + "<br>");
    }
    var aPokemon = new Pokemon(resp['id'], resp['name'], resp['order'], abi_stack);
    $('#pokemon-ability').html(aPokemon.poke_name);
};
$("#button_space").click(function () {
    var pokeindex = $('#pokeindex').val();
    $.ajax({
        url: 'http://pokeapi.co/api/v2/pokemon/' + pokeindex,
        type: 'GET',
        dataType: 'json',
        success: response //success(result, status, xhr) a function to be run when the request succeeds...    
    });
});
