#ifndef ACBUTTON_H
#define ACBUTTON_H

#include <QPushButton>
#include "commanager.h"
#include "switchtype.h"

class ACButton : public QPushButton
{
    Q_OBJECT

public:
    ACButton(QWidget* parent = 0, int id = 1000, bool left = false, Switchtype type = Switchtype::NONE, ComManager *commgr = 0);
private:
    int id;
    bool left = false;
    Switchtype type;
    ComManager *commgr;

public slots:
    void runCommand();

};

#endif // ACBUTTON_H
