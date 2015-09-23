#ifndef ACBUTTON_H
#define ACBUTTON_H

#include <QPushButton>
#include "commanager.h"
#include "track.h"

class ACButton : public QPushButton
{
    Q_OBJECT
private:
    int id_;
    SwitchDirection dir_;
    TrackType type_;
    ComManager *commgr;

public:
    ACButton(QWidget* parent = 0, int id = 999999, SwitchDirection dir = SwitchDirection::LEFT, TrackType type = TrackType::EMPTY, ComManager *commgr = 0);

public slots:
    void runCommand();

};

#endif // ACBUTTON_H
