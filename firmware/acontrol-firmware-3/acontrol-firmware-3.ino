/*
 *Title:        AControl - Arduino Firmware
 *Author:       Pascal Riesinger
 *Version:      3.x - Suitable for AControl Version 3.x
 *Description:  This is the firmware running on the "master" device of an AControl system.
 *Copyright:    © 2014-2015, Pascal Riesinger. For licence, see https://opensource.org/licenses/MIT
 *              Although you are free to modify and share your version of this software, please mention me
 *              and my Github page (github.com/Arial7)
 */


//TODO: rewrite for the custom ACommand system
//TODO: rewrite for master-slave operation

/*
 *Error Codes:
 *	-E1 : Invalid Data received
 *	-E2 : Invalid Command received
 */
#include <LiquidCrystal.h>


//The Baud-Rate, the Arduino uses to communicate
#define BAUD_RATE 115200
//How many switches you have connected
#define SWITCHES 15

//These Pins connect to the Shift Registers
#define DS_PIN 5
#define ST_CP_PIN 4
#define SH_CP_PIN 3
#define MR_PIN 2

//This array holds the stats of the switches
boolean states[SWITCHES];

//These Varaibles are used for serial communication
String serialInput = "";
boolean finishedRead = false;

//This sets up the LCD with the following pins
////LiquidCrystal lcd(13, 12, 11, 10, 9, 8);
//                RS,E, D4,D5,D6,D7

//These Variables hold the statuses etc
String connectionStatus;
int lsw;

/*
 *RUN ONCE AT STARTUP
 */
void setup(){
    //Set all the neccesary pin modes
    pinMode(DS_PIN, OUTPUT);
    pinMode(ST_CP_PIN, OUTPUT);
    pinMode(SH_CP_PIN, OUTPUT);
    pinMode(MR_PIN, OUTPUT);

    //Set all of the Shift-Register pins to the appropriate default (and clear their contents)
    digitalWrite(MR_PIN, 0);
    digitalWrite(ST_CP_PIN, 0);
    digitalWrite(ST_CP_PIN, 1);
    digitalWrite(MR_PIN, 1);


    //Set the status variables to their default
    connectionStatus = "Getr";
    lsw = 0;

    //Begin the serial communication
    Serial.begin(BAUD_RATE);
    Serial.println("[AControl] Erfolgreich initialisiert!");
}
/*
 *RUN CONTINOUSLY
 */
void loop(){
    //Get all the available data and then compute it
    getSerial();
    if (finishedRead){
        computeData();
    }
}


/*
 * Gets the serial data available
 */
void getSerial(){
    //will be set to true if finished
    finishedRead = false;
    char lastRead;
    String serialData = "";
    // when there are no characters to read, or the character isn't a newline
    while (true) { // loop forever

        if (Serial.available() > 0) {
            // something to read
            lastRead = Serial.read();
            if (lastRead == '\n' || lastRead == '10') {
                break; // when we get a divider message, break out of loop
            }
            else {
                // add it to the inputString:
                serialData.concat(lastRead);

            }
        }
    }

    serialInput = serialData;
    finishedRead = true;

}

void computeData(){
    //Every ALP-command starts with the string "alp://"
    if(serialInput.startsWith("alp://cust")){
        //after the whole custom command, an ID is send. This starts with a "?"
        int messageIdPosition = serialInput.indexOf('?', 11 );
        //The custom message is determined by reading the substring between "alp://cust:" and the message ID
        String customMessage = serialInput.substring(11, messageIdPosition);

        //#DEPRECATED This was the old protocol and is only available for backwards compatibility
        //The message for switching a switch starts with PT
        if(customMessage.startsWith("PT")){
            processOldProtocol(customMessage);
        }

        //This is the new protocol and should always be used!
        else if(customMessage.startsWith("AC")){
             processNewProtocol(customMessage.substring(3));
        }

        else if(customMessage == "connect"){
            connectionStatus = "Verb";

        }

        else if(customMessage == "disconnnect"){
            connectionStatus = "Getr";

        }
        /* IF THE COMMAND WAS NOT RECOGNIZED SUCCESFULLY */
        else{
            Serial.println("[AControl] Fehlerhaften Befehl empfangen: " + customMessage);
        }

    }
    else{
        Serial.println("[AControl] Fehlerhafte Daten empfangen: " + serialInput);
    }
}

void processNewProtocol(String customMessage){
    /* New protocol example: AC~12~1?
     * Explanation: AC->just and identifier for the new protocol (Has already been choped off)
                    12->The switch id, i.e. the pin to output to the shift registers
                    1 ->Should it be inverted? If 1, switchID += 1 and switchID will output false
     */

    int switchID = customMessage.substring(0, (customMessage.indexOf('~'))).toInt();
    if(customMessage.substring(customMessage.indexOf('~') + 1).toInt() == 1){
         states[switchID] = false;
         states[switchID + 1] = true;
    }
    else{
         states[switchID] = true;
         states[switchID + 1] = false;
    }

    writeStates();

}

void processOldProtocol(String customMessage){
    Serial.println("[AControl]Altes Protokoll erkannt, bitte aktualisieren Sie ggf. Ihre Software und die Firmware");
    //this substring is the actual switch number. It starts at the fourth character, because there is a "~" between "PT" and the number
    int sInt = customMessage.substring(3).toInt();
    Serial.println("[AControl] Weiche " + String(sInt) + " geschaltet");
    states[sInt] = !(states[sInt]);
    writeStates();
    lsw = sInt;
}

/*
 * This writes the states to the Shift-Registers
 */
void writeStates(){
    //Reset all the shift-rgisters
    digitalWrite(MR_PIN, 0);
    digitalWrite(MR_PIN, 1);
    digitalWrite(ST_CP_PIN, 0);

    for (int i = SWITCHES; i > 0; i--){
        digitalWrite(SH_CP_PIN, 0);
        digitalWrite(DS_PIN, states[i]);
        digitalWrite(SH_CP_PIN, 1);
    }

    digitalWrite(ST_CP_PIN, 1);
}
