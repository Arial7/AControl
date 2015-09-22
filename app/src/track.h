#pragma once
enum TrackType {
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

enum RailType {
    //usual track such as straight or corner pieces
    TRACK,
    //If switch, you also have to get the position of the switch
    SWITCH
};

enum SwitchDirection {
    LEFT,
    RIGHT
};

struct Track {
    RailType railType;
    TrackType trackType;
    SwitchDirection switchDirection;
    Track(TrackType _trackType) : railType(RailType::TRACK), trackType(_trackType) {};
    Track(RailType _railT, TrackType _trackT, SwitchDirection _switchDir) : railType(_railT), trackType(_trackT), switchDirection(_switchDir) {};
};
