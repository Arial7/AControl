#include "commanager.h"
#include <QException>
#include <QDebug>
#include <QtSerialPort/QSerialPortInfo>
#include <stdlib.h>
#include <time.h>
#include <iostream>
#include <string>

ComManager::ComManager(QObject *parent)
{
    this->parent = parent;
    srand(time(NULL));
}
ComManager::~ComManager(){
    //delete parent;
    if(activePort != nullptr)
        delete activePort;
}

void ComManager::sendCommand(QString command)
{
    //Generate a random id for the command
    int id = rand() % 999;
    cout << id << endl;
    string msg = command.toStdString() + "?" + to_string(id);
    activePort->write(msg.c_str(), msg.size());

    cout << msg.c_str() << endl;
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
        qDebug() << "Error while connecting to Serial port:" << ex.what() << endl;
    }
}

void ComManager::setBauds(quint16 baudrate) {
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
    emit dataReceived(QString(data));
}
