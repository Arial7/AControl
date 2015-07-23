#ifndef ALOGGER_H
#define ALOGGER_H

#include <QTextBrowser>
#include <QFile>

enum Loglevel{
    INFO,
    WARN,
    ERROR,
    FATAL
};

class ALogger
{
public:
    ALogger(QTextBrowser *logpane);
    ~ALogger();
    void log(Loglevel level, QString message);
    void log(Loglevel level, QString message, bool showInConsole);
private:
    QTextBrowser *logpane;
    const QString logfilename = "./AControl.log";
    QFile *logfile;
};

#endif // ALOGGER_H
