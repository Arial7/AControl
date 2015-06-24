#ifndef ACBUTTON_H
#define ACBUTTON_H

#include <QPushButton>
#include "commanager.h"

class ACButton : public QPushButton
{
    Q_OBJECT

public:
    ACButton(QWidget* parent = 0, int id = 1000, ComManager *commgr = 0);
private:
    int id;
    ComManager *commgr;

public slots:
    void runCommand();

};

#endif // ACBUTTON_H
