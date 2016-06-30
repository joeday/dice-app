// parse the JSON into this
var userData;

// Load the die objects into this
var diceAry = [];

// Get the user data so we can create the dice
$.getJSON('data/user.json', function(response) {
    console.log(response);
    userData = response;
    $(window).trigger('JSONready');
});

// Once data is loaded...
// 1. instantiate the number of dice based on what user selected
// 2. create the appropriate number of dice in the dom
// 3. do the first roll
$(window).on('JSONready', function(){
    console.log(userData.user.dice.count + " count");
    for (i = 0; i < userData.user.dice.count; i++) {
        getDice();
        createDie(i);
    }
    rollDice();
});

// Instantiate new dice objects and add to the array
function getDice() {
    var d = new Die();
    diceAry.push(d);
}

// Add dice to the dom
function createDie(num) {
    var n = num;
    var maxDice = numberToText(userData.user.dice.count);
    var die = $("<div></div>").addClass("die "+ maxDice);
    var txt = $("<p></p>").addClass("txt");
    $(die).attr("id", ("die"+n));
    $(die).append(txt);
    $('.flex-container').append(die);

}

// Call the roll() method on each die object in the array
function rollDice() {
    var sum;
    for (i = 0; i < diceAry.length; i++) {
        diceAry[i].roll(i);
    }
}

function numberToText(num) {
    var n = num;
    var ary = ["zero", "one", "two", "three", "four", "five", "six"];
    return ary[n];
}

// INTERACTION
// To roll the dice, either click an element
$("#foo").click(function() {
    rollDice();
});

// or press space bar
document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        rollDice();
    }
};
