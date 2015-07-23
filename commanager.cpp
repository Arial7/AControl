#include "commanager.h"
#include <QException>
#include <QDebug>
#include <QtSerialPort/QSerialPortInfo>
#include <stdlib.h>
#include <time.h>
#include <iostream>
#include <string>

ComManager::ComManager(QObject *parent, ALogger *logger)
{
    this->parent = parent;
    srand(time(NULL));
    this->logger = logger;
}
ComManager::~ComManager(){
    if(activePort != nullptr) {
        activePort->close();
        delete activePort;
    }
}

void ComManager::sendCommand(QString command)
{
    //Generate a random id for the command
    int id = rand() % 999;
    lastID = id;
    string msg = command.toStdString() + "?" + to_string(id);
    activePort->write(msg.c_str(), msg.size());
    cout << "running command" << endl;
    logger->log(Loglevel::INFO, command);


}

void ComManager::connect(QString portname) {
    try {
        activePort = new QSerialPort(portname, parent);
        activePort->setBaudRate(baudrate);
        activePort->open(QIODevice::ReadWrite);
        emit connectionChanged(true);
        QObject::connect(activePort, SIGNAL(readyRead()), this, SLOT(receiveData()));
    }
    catch (QException ex){
        logger->log(Loglevel::ERROR, QString("Konnte nicht mit Port verbinden: %1").arg(ex.what()));
    }
}

void ComManager::setBauds(quint32 baudrate) {
    this->baudrate = baudrate;
}

void ComManager::disconnect() {
    activePort->close();
    emit connectionChanged(false);
}

QStringList ComManager::getPorts() {
    QList <QSerialPortInfo> infoList = QSerialPortInfo::availablePorts();
    QStringList strings;
    for(QSerialPortInfo info : infoList) {
        strings.append(info.portName());
    }
    return strings;
}


void ComManager::receiveData() {
    activePort->waitForReadyRead(500);
    QByteArray data = activePort->readAll();
    if(QString(data) == QString("AOK?%1").arg(lastID)){
        logger->log(Loglevel::INFO, "ABase responded OK to last command", false);
    }
    else {
        emit dataReceived(QString(data));
    }

}
