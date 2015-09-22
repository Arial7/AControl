#pragma once

#include <QLabel>
#include "track.h"


class ACLabel : public QLabel
{
    Q_OBJECT
public:
    ACLabel(QWidget *parent = 0, TrackType type = TrackType::EMPTY);
};
