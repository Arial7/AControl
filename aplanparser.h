#ifndef APLANPARSER_H
#define APLANPARSER_H

#include "aplan.h"
#include <QString>

class APlanParser
{
public:
    APlanParser();
    APlan parse(QString filename);

};

#endif // APLANPARSER_H
