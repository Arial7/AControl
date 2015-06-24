#include "acbutton.h"

ACButton::ACButton(QWidget *parent, int id, ComManager *commgr) : QPushButton(parent)
{
    setSizePolicy(QSizePolicy::Fixed, QSizePolicy::Fixed);
    setMaximumSize(QSize(32, 32));
    setMinimumSize(QSize(32, 32));

    this->id = id;
    this->commgr = commgr;
    connect(this, SIGNAL(clicked(bool)), (ACButton*)this, SLOT(runCommand()));

}

void ACButton::runCommand()
{
    commgr->sendCommand("ASW~");
}



