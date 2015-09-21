#include "aplanparser.h"
#include <iostream>
#include <fstream>

APlanParser::APlanParser()
{

}

std::vector<Track> APlanParser::loadPlan(QString planPath){
  std::vector<Track> tracks;
  std::string line;
  std::fstream stream(planPath.toStdString(), std::fstream::in);
  if(stream.is_open()){


    }
}


QPixmap APlanParser::getSymbol(Track track){
  switch(track){
    case S0:
      return loadSymbol("S0");
    case S90:
      return loadSymbol("S90");
    case D0:
      return loadSymbol("D0");
    case D90:
      return loadSymbol("D90");
    case D180:
      return loadSymbol("D180");
    case D270:
      return loadSymbol("D270");
    case DD0:
      return loadSymbol("DD0");
    case DD90:
      return loadSymbol("DD90");
    case A0:
      return loadSymbol("A0");
    case A90:
      return loadSymbol("A90");
    case A180:
      return loadSymbol("A180");
    case A270:
      return loadSymbol("A270");
    case P0:
      return loadSymbol("P0");
    case P90:
      return loadSymbol("P90");
    case P180:
      return loadSymbol("P180");
    case P270:
      return loadSymbol("P270");

    default:
      return loadSymbol("NA");
    }
}

QPixmap APlanParser::loadSymbol(QString name){
  return QPixmap(QString("res/symbols/%1.png").arg(name));
}
