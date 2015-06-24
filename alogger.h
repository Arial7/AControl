#ifndef ALOGGER_H
#define ALOGGER_H

#include <QTextBrowser>

class ALogger
{
public:
    ALogger(QTextBrowser *logpane);
    void log(/*int level, */QString message);
    const int INFO = 1;
    const int WARN = 2;
    const int ERROR = 3;
    const int FATAL = 4;
private:
    QTextBrowser *logpane;
};

#endif // ALOGGER_H
