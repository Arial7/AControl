#ifndef ACLABEL_H
#define ACLABEL_H

#include <QLabel>
#include "track.h"


class ACLabel : public QLabel
{
    Q_OBJECT

public:
    ACLabel(QWidget *parent = 0, Track type = Track::EMPTY);
};

#endif // ACLABEL_H
