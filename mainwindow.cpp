#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "acbutton.h"
#include <QLabel>
#include <QDebug>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::Main),
    comManager(this)
{
    ui->setupUi(this);

    //Setup basic Window stuff

    setWindowTitle("AControl - Qt Beta - 3.0");
    //setWindowState(Qt::WindowMaximized);


    //TEMP:
    ui->gridLayout->addWidget(new ACButton(this, 1, &comManager), 0, 0, 1, 1);
    ui->gridLayout->addWidget(new ACButton(this, 2, &comManager), 5, 4, 1, 1);

    connectionStatus = new QLabel("Verbindung: Getrennt ", this);
    ui->statusBar->addWidget(connectionStatus);


    //add the ports
    QList <QAction*> portsActions;
    QStringList portsList = comManager.getPorts();
    portsGroup = new QActionGroup(ui->menuConnectionPort);
    for (QString port : portsList) {
        QAction *action = new QAction(port, ui->menuConnectionPort);
        action->setCheckable(true);
        action->setActionGroup(portsGroup);
        portsActions.append(action);
    }
    ui->menuConnectionPort->addActions(portsActions);


    //init fields
    logger = new ALogger(ui->logpanel);

    //connect signals and slots
    connect(ui->actionConnect, SIGNAL(triggered(bool)), this, SLOT(connectPort()));
    connect(ui->actionDisconnect, SIGNAL(triggered(bool)), this, SLOT(disconnectPort()));
    connect(&comManager, SIGNAL(connectionChanged(bool)), this, SLOT(changeConnectionStatus(bool)));
    connect(&comManager, SIGNAL(dataReceived(QString)), this, SLOT(dataReceived(QString)));
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::connectPort() {
    QString selectedPort = "!!";
    for (QAction* action : portsGroup->actions()) {
        if (action->isChecked()) {
            selectedPort = action->text();
            break;
        }
    }
    if (selectedPort == "!!")  {
        qDebug() << "No port selected" << endl;
        return;
    }
    comManager.connect(selectedPort);
}

void MainWindow::disconnectPort() {
    comManager.disconnect();
}

void MainWindow::changeConnectionStatus(bool connected) {
    if(connected) {
        connectionStatus->setText("Verbindung: Verbunden");
        ui->actionConnect->setEnabled(false);
        ui->actionDisconnect->setEnabled(true);

        logger->log(/*ALogger::INFO,*/ "Verbindung hergestellt");


    }
    else {
        connectionStatus->setText("Verbindung: Getrennt");
        ui->actionConnect->setEnabled(true);
        ui->actionDisconnect->setEnabled(false);

        logger->log(/*ALogger::INFO,*/ "Verbindung getrennt");

    }
    ui->statusBar->update();
}

void MainWindow::dataReceived(QString data) {
    logger->log(data);
}
