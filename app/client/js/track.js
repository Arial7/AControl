"use strict"

var Track = function(x, y, icn) {
    this.x = x;
    this.y = y;
    this.icn = icn;
    this.$object = $('<div />', {class: 'track ' + icn});
};

Track.prototype.getObject = function() {
    return this.$object;
};

var Switch = function(x, y, icn, left) {
    this.x = x;
    this.y = y;
    this.icn = icn;
    this.left = left;
    this.$object = $('<div />', {class: 'track switch ' + icn + " " + this.getStateString()});
};

Switch.prototype.getStateString = function() {
    return (this.left === true) ? 'l' : 'r';
};

Switch.prototype.getObject = function() {
    return this.$object;
};
