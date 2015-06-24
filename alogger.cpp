#include "alogger.h"

#include <QTime>


ALogger::ALogger(QTextBrowser *logpane)
{
    this->logpane = logpane;

}


void ALogger::log(/*int level,*/ QString message){
    QString l = "[INFO]";
//    switch(level){
//    case INFO:
//        l = "[INFO]";
//        break;
//    case WARN:
//        l = "[WARN]";
//        break;
//    case ERROR:
//        l = "[ERROR]";
//        break;
//    case FATAL:
//        l = "[FATAL]";
//        break;
//    }

    logpane->append("[" + QTime::currentTime().toString() + "]" + l + message + "\n");
}
