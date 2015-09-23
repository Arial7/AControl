#pragma once

#include <vector>

#include "track.h"

class APlan
{
private:
    int sizeX_;
    int sizeY_;
    //Track tracks_[sizeX_][sizeY_];
public:
    APlan(int x, int y /*, Track tracks[x][y]*/) : sizeX_(x), sizeY_(y) /*, tracks_(tracks)*/ {};
    Track getTrack(int x, int y){
        if(x >= sizeX_ || y >= sizeY_)
        return Track(TrackType::EMPTY);
        //return tracks_[x][y];
    }
};
