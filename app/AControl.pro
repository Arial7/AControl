#-------------------------------------------------
#
# Project created by QtCreator 2015-06-17T20:24:32
#
#-------------------------------------------------

QT       += core gui serialport

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = AControl
TEMPLATE = app

CONFIG += c++11

SOURCES += \
    mainwindow.cpp \
    main.cpp \
    acbutton.cpp \
    commanager.cpp \
    alogger.cpp \
    aplanparser.cpp \
    aplan.cpp \
    aclabel.cpp

HEADERS  += \
    mainwindow.h \
    acbutton.h \
    commanager.h \
    alogger.h \
    switchtype.h \
    aplanparser.h \
    aplan.h \
    track.h \
    aclabel.h

FORMS    += \
    mainwindow.ui

DISTFILES += \
    AControl.log \
    Projects/mek.acp
