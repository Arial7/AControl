/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.5.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QLocale>
#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenu>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QRadioButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QTextBrowser>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Main
{
public:
    QAction *actionOpenProject;
    QAction *actionNewProject;
    QAction *actionConnect;
    QAction *actionDisconnect;
    QAction *actionPort;
    QAction *actionSearchPorts;
    QAction *actionBearbeiten;
    QAction *actionSettings;
    QAction *actionQuit;
    QWidget *centralWidget;
    QGridLayout *gridLayout_2;
    QGridLayout *gridLayout_main;
    QGridLayout *gridLayout;
    QSpacerItem *verticalSpacer;
    QTextBrowser *logpanel;
    QRadioButton *radioButton;
    QMenuBar *menuBar;
    QMenu *menuProject;
    QMenu *menuConnection;
    QMenu *menuConnectionPort;
    QMenu *menuTools;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *Main)
    {
        if (Main->objectName().isEmpty())
            Main->setObjectName(QStringLiteral("Main"));
        Main->resize(988, 599);
        actionOpenProject = new QAction(Main);
        actionOpenProject->setObjectName(QStringLiteral("actionOpenProject"));
        actionOpenProject->setEnabled(false);
        actionNewProject = new QAction(Main);
        actionNewProject->setObjectName(QStringLiteral("actionNewProject"));
        actionNewProject->setEnabled(false);
        actionConnect = new QAction(Main);
        actionConnect->setObjectName(QStringLiteral("actionConnect"));
        actionDisconnect = new QAction(Main);
        actionDisconnect->setObjectName(QStringLiteral("actionDisconnect"));
        actionDisconnect->setEnabled(false);
        actionPort = new QAction(Main);
        actionPort->setObjectName(QStringLiteral("actionPort"));
        actionSearchPorts = new QAction(Main);
        actionSearchPorts->setObjectName(QStringLiteral("actionSearchPorts"));
        actionSearchPorts->setEnabled(true);
        actionBearbeiten = new QAction(Main);
        actionBearbeiten->setObjectName(QStringLiteral("actionBearbeiten"));
        actionBearbeiten->setEnabled(false);
        actionSettings = new QAction(Main);
        actionSettings->setObjectName(QStringLiteral("actionSettings"));
        actionQuit = new QAction(Main);
        actionQuit->setObjectName(QStringLiteral("actionQuit"));
        actionQuit->setShortcutContext(Qt::ApplicationShortcut);
        centralWidget = new QWidget(Main);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        centralWidget->setEnabled(true);
        QSizePolicy sizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(centralWidget->sizePolicy().hasHeightForWidth());
        centralWidget->setSizePolicy(sizePolicy);
        gridLayout_2 = new QGridLayout(centralWidget);
        gridLayout_2->setSpacing(6);
        gridLayout_2->setContentsMargins(11, 11, 11, 11);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        gridLayout_main = new QGridLayout();
        gridLayout_main->setSpacing(6);
        gridLayout_main->setObjectName(QStringLiteral("gridLayout_main"));
        gridLayout_main->setSizeConstraint(QLayout::SetMaximumSize);
        gridLayout_main->setContentsMargins(-1, -1, 0, -1);
        gridLayout = new QGridLayout();
        gridLayout->setSpacing(6);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));

        gridLayout_main->addLayout(gridLayout, 0, 0, 1, 1);

        verticalSpacer = new QSpacerItem(10, 10, QSizePolicy::Minimum, QSizePolicy::Maximum);

        gridLayout_main->addItem(verticalSpacer, 1, 0, 1, 1);

        logpanel = new QTextBrowser(centralWidget);
        logpanel->setObjectName(QStringLiteral("logpanel"));
        logpanel->setEnabled(true);
        QSizePolicy sizePolicy1(QSizePolicy::Expanding, QSizePolicy::Preferred);
        sizePolicy1.setHorizontalStretch(0);
        sizePolicy1.setVerticalStretch(0);
        sizePolicy1.setHeightForWidth(logpanel->sizePolicy().hasHeightForWidth());
        logpanel->setSizePolicy(sizePolicy1);
        logpanel->setLocale(QLocale(QLocale::German, QLocale::Germany));
        logpanel->setFrameShape(QFrame::NoFrame);
        logpanel->setFrameShadow(QFrame::Plain);
        logpanel->setLineWidth(0);

        gridLayout_main->addWidget(logpanel, 3, 0, 1, 1);

        radioButton = new QRadioButton(centralWidget);
        radioButton->setObjectName(QStringLiteral("radioButton"));

        gridLayout_main->addWidget(radioButton, 2, 0, 1, 1);


        gridLayout_2->addLayout(gridLayout_main, 0, 0, 1, 1);

        Main->setCentralWidget(centralWidget);
        menuBar = new QMenuBar(Main);
        menuBar->setObjectName(QStringLiteral("menuBar"));
        menuBar->setGeometry(QRect(0, 0, 988, 15));
        menuProject = new QMenu(menuBar);
        menuProject->setObjectName(QStringLiteral("menuProject"));
        menuConnection = new QMenu(menuBar);
        menuConnection->setObjectName(QStringLiteral("menuConnection"));
        menuConnectionPort = new QMenu(menuConnection);
        menuConnectionPort->setObjectName(QStringLiteral("menuConnectionPort"));
        menuConnectionPort->setGeometry(QRect(0, 0, 131, 36));
        menuTools = new QMenu(menuBar);
        menuTools->setObjectName(QStringLiteral("menuTools"));
        Main->setMenuBar(menuBar);
        statusBar = new QStatusBar(Main);
        statusBar->setObjectName(QStringLiteral("statusBar"));
        Main->setStatusBar(statusBar);

        menuBar->addAction(menuProject->menuAction());
        menuBar->addAction(menuConnection->menuAction());
        menuBar->addAction(menuTools->menuAction());
        menuProject->addAction(actionOpenProject);
        menuProject->addAction(actionNewProject);
        menuProject->addAction(actionBearbeiten);
        menuConnection->addAction(actionConnect);
        menuConnection->addAction(actionDisconnect);
        menuConnection->addSeparator();
        menuConnection->addAction(menuConnectionPort->menuAction());
        menuConnection->addSeparator();
        menuConnection->addAction(actionSearchPorts);
        menuTools->addAction(actionSettings);
        menuTools->addSeparator();
        menuTools->addAction(actionQuit);

        retranslateUi(Main);

        QMetaObject::connectSlotsByName(Main);
    } // setupUi

    void retranslateUi(QMainWindow *Main)
    {
        Main->setWindowTitle(QApplication::translate("Main", "Main", 0));
        actionOpenProject->setText(QApplication::translate("Main", "\303\226ffnen", 0));
        actionNewProject->setText(QApplication::translate("Main", "Neu", 0));
        actionConnect->setText(QApplication::translate("Main", "Verbinden", 0));
        actionDisconnect->setText(QApplication::translate("Main", "Trennen", 0));
        actionPort->setText(QApplication::translate("Main", "Port", 0));
        actionSearchPorts->setText(QApplication::translate("Main", "Suchen", 0));
        actionBearbeiten->setText(QApplication::translate("Main", "Bearbeiten", 0));
        actionSettings->setText(QApplication::translate("Main", "Einstellungen", 0));
        actionQuit->setText(QApplication::translate("Main", "Beenden", 0));
        actionQuit->setShortcut(QApplication::translate("Main", "Ctrl+Q", 0));
        radioButton->setText(QApplication::translate("Main", "RadioButton", 0));
        menuProject->setTitle(QApplication::translate("Main", "Projekt", 0));
        menuConnection->setTitle(QApplication::translate("Main", "Verbindung", 0));
        menuConnectionPort->setTitle(QApplication::translate("Main", "Port", 0));
        menuTools->setTitle(QApplication::translate("Main", "Tools", 0));
    } // retranslateUi

};

namespace Ui {
    class Main: public Ui_Main {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
