#ifndef APLANPARSER_H
#define APLANPARSER_H

#include "aplan.h"
#include "track.h"
#include <QString>
#include <QPixmap>
#include <vector>



class APlanParser
{
public:
    APlanParser();
    APlan parse(QString filename);
    QPixmap getSymbol(Track track);
    std::vector<Track> loadPlan(QString planPath);
private:
    QPixmap loadSymbol(QString name);
};

#endif // APLANPARSER_H
