// Thoughts
// Instead of having 9 dots that light up, only use the number of dots the die needs. Flexbox should be able to hanlde it and it should reduce code complexity.
// Create die via JS
// Instantiate dice dynamically
// Data API for user containing name, number of dice, type of dice that is used to instantiate the application



// A single die object containing everything a die needs:
// Random number
// Color & color history
var Die = function () {
    this.colorsAry = [];
};

Die.prototype.randomNumber = function() {
    this.num = Math.floor((Math.random() * 6) + 1);
    this.sum = this.num;
    return this.num;
};

Die.prototype.getColor = function(prev) {

    this.palette = [
        "rgb(125,161,191)",
        "rgb(28,78,137)",
        "rgb(78,110,56)",
        "rgb(127,128,64)",
        "rgb(198,203,204)",
        "rgb(138,133,135)",
        "rgb(210,178,154)",
        "rgb(199,141,107)",
        "rgb(149,82,81)",
        "rgb(179,143,177)"
    ];

    this.prev = prev || this.palette[8];

    this.colors = [this.palette[0],this.palette[4],this.palette[5]];

    // remove previus color from array to ensure each role of die gets new color
    for (var i = 0; i < this.palette.length; i++) {
        if (this.colors[i] === this.prev) {
            this.colors.splice(i, 1);
        }
    }

    // get a random number based on contents of colors array
    this.randColor = Math.floor((Math.random() * this.colors.length));

    // set the color to return
    this.currentColor = this.colors[this.randColor];
    // this.colorHistory(this.currentColor);

    return this.currentColor;
};

// Why do I need this?!
// Die.prototype.colorHistory = function(prev) {
//     this.colorsAry.push(this.prev);
//     if (this.colorsAry.lengh >= 10) {
//         this.colorsAry.shift();
//     }
//     console.log(this.colorsAry);
// };

// Self is merely used as part of identifying the element on the page, for instance die1, die2, etc...
Die.prototype.roll = function(num) {
    var self = num;
    this.setText(self);
    // this.setDots(self);
};

Die.prototype.setText = function(self) {
    var el = document.getElementById("die"+self);
    var num = this.randomNumber();
    $(el).find(".txt").text(num);
    $(el).css('background-color', this.getColor());
};
