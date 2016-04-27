var userData;
var diceAry = [];

$.getJSON('data/user.json', function(response) {
    userData = response;
    $(window).trigger('JSONready');
});

$(window).on('JSONready', function(){
    for (i = 0; i < userData.user.dice.count; i++) {
        addDice();
    }
    console.log(diceAry);
});

// add number of dice object to the dice array for later use
function addDice() {
    var d = new Die();
    diceAry.push(d);
}

$("#foo").click(function() {
    for (i=0; i<diceAry.length; i++) {
        diceAry[i].roll();
    }
});
