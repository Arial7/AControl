#ifndef MAIN_H
#define MAIN_H

#include <QMainWindow>
#include "commanager.h"
#include "alogger.h"
#include <QActionGroup>
#include <QLabel>

namespace Ui {
class Main;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    Ui::Main *ui;
    ComManager comManager;
    QActionGroup *portsGroup;
    QLabel *connectionStatus;
    ALogger *logger;
public slots:
    void connectPort();
    void changeConnectionStatus(bool connected);
    void disconnectPort();
    void dataReceived(QString data);
};

#endif // MAIN_H
