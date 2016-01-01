"use strict"

var Track = function(x, y, icn) {
    this.x = x;
    this.y = y;
    this.icn = icn;
    this.$object = $('<div />', {class: 'track ' + icn, style: 'left:' + (50 * x + 40) + 'px; top:' + (50 * y + 40) + 'px'});
};

Track.prototype.getObject = function() {
    return this.$object;
};

var Switch = function(x, y, icn, left, id) {
    this.x = x;
    this.y = y;
    this.icn = icn;
    this.left = left;
    this.ID = id;
    this.$object = $('<div />', {class: 'track switch ' + icn + " " + this.getStateString(), style: 'left:' + (50 * x + 40) + 'px; top:' + (50 * y + 40) + 'px', switchid: this.ID});
};

Switch.prototype.getStateString = function() {
    return (this.left === true) ? 'l' : 'r';
};

Switch.prototype.getObject = function() {
    return this.$object;
};

