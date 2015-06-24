#ifndef COMMANAGER_H
#define COMMANAGER_H

#include <QtSerialPort/QSerialPort>
//#include <QObject>

using namespace std;

class ComManager : public QObject
{
    Q_OBJECT

public:
    explicit ComManager(QObject *parent);
    ~ComManager();
    //void sendRawString(QString data);
    void sendCommand(QString command);
    void connect(QString portname);
    void disconnect();
    //void setBauds(quint32 baudrate);
    QStringList getPorts();
private:
    qint32 baudrate = 115200;
    QSerialPort *activePort = nullptr;
    QObject *parent;
private slots:
    void receiveData();
signals:
    void dataReceived(QString data);
    void connectionChanged(bool connected);
};

#endif // COMMANAGER_H
