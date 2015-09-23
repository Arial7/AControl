#include "acbutton.h"

ACButton::ACButton(QWidget *parent, int id, SwitchDirection dir, TrackType type, ComManager *commgr) : QPushButton(parent)
{
    setSizePolicy(QSizePolicy::Fixed, QSizePolicy::Fixed);
    setMaximumSize(QSize(32, 32));
    setMinimumSize(QSize(32, 32));

    this->id_ = id;
    this->dir_ = dir;
    this->type_ = type;
    this->commgr = commgr;
    connect(this, SIGNAL(clicked(bool)), (ACButton*)this, SLOT(runCommand()));

}

void ACButton::runCommand()
{
    commgr->sendCommand(QString("ASW~%1~%2").arg(id_, type_));
}
