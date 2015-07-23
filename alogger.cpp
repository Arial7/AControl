#include "alogger.h"

#include <QTime>
#include <QDate>
#include <QFile>
#include <QTextStream>

ALogger::ALogger(QTextBrowser *logpane)
{
    this->logpane = logpane;
    logfile = new QFile(logfilename);
    if(!logfile->open(QIODevice::WriteOnly | QIODevice::Text | QIODevice::Truncate))
        this->logpane->append("[" + QTime::currentTime().toString() + "]" + "[ERROR]Logfile konnte nicht geöffnet werden");
    else {
        QString l = QString("--- AControl log - %1 ---").arg(QDate::currentDate().toString());
        QTextStream output(logfile);
        output << l << endl;
    }
}

ALogger::~ALogger()
{
    if(logfile->isOpen()){
        logfile->close();
        delete logfile;
    }
}


void ALogger::log(Loglevel level, QString message){
    QString l = "[INFO]";
    switch(level){
    case INFO:
        l = "[INFO]";
        break;
    case WARN:
        l = "[WARN]";
        break;
    case ERROR:
        l = "[ERROR]";
        break;
    case FATAL:
        l = "[FATAL]";
        break;
    }
    QString msg = QString("[%1]%2%3").arg(QTime::currentTime().toString(), l, message);
    logpane->append(msg);
    if(logfile->isOpen()) {
        QTextStream output(logfile);
        output << msg << endl;
    }
}

void ALogger::log(Loglevel level, QString message, bool showInConsole)
{
    QString l = "[INFO]";
    switch(level){
    case INFO:
        l = "[INFO]";
        break;
    case WARN:
        l = "[WARN]";
        break;
    case ERROR:
        l = "[ERROR]";
        break;
    case FATAL:
        l = "[FATAL]";
        break;
    }
    QString msg = QString("[%1]%2%3").arg(QTime::currentTime().toString(), l, message);
    if (showInConsole){
        logpane->append(msg);
    }
    if(logfile->isOpen()) {
        QTextStream output(logfile);
        output << msg << endl;
    }
}
