#include "aclabel.h"

ACLabel::ACLabel()
{
}


ACLabel::ACLabel(QWidget *parent, Track type) : QLabel(parent)
{
    this->setPixmap(new QPixmap());
}
