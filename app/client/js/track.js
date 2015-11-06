class Track {
    var icn;
    var x, y;

    constructor(x, y, icn) {
        this.x = x;
        this.y = y;
        this.icn = icn;
    }

    get icon() {
        return icn;
    }
    
    get x() {
        return x;
    }

    get y() {
        return y;
    }
        


}

class Switch extends Track {
    var state : bool;
    
    constructor(x, y, icn, state) {
        this.x = x;
        this.y = y;
        this.icn = icn;
        this.state = state;
    }

    get state() {

    }

    getStateString(state : bool) {
        return 
    }
    
}
