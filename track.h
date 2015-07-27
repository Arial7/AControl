#ifndef TRACK_H
#define TRACK_H

enum Track {
    //straight pieces
    S0,
    S90,
    //digonal pieces
    D0,
    D90,
    D180,
    D270,
    //double diagonals
    DD0,
    DD90,
    DD180,
    DD270,
    //switches
    WL0,
    WL90,
    WL180,
    WL270,
    WR0,
    WR90,
    WR180,
    WR270,
    //arrow pieces
    A0,
    A90,
    A180,
    A270,
    //stop pieces
    P0,
    P90,
    P180,
    P270,

    //NO TRACK
    EMPTY
};


#endif // TRACK_H
