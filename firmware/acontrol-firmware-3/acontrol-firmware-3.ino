/*
 * Title:        AControl - Arduino Firmware
 * Author:       Pascal Riesinger
 * Version:      3.x - Suitable for AControl Version 3.x
 * Description:  This is the firmware running on the "master" device of an AControl system.
 * Copyright:    © 2014-2015, Pascal Riesinger. For licence, see https://opensource.org/licenses/MIT
 *               Although you are free to modify and share your version of this software, please mention me
 *               and my Github page (github.com/Arial7)
 */


//TODO: rewrite for master-slave operation
//TODO: load the states array up with some data at initialization (need to get this data from the server or save it in EEPROM)

#define LANG_EN
//#define LANG_DE

#ifdef LANG_EN
    #define MSG_INIT_FINISHED "Successfully initialized"
    #define MSG_INVALID_COMMAND "Invalid command received:"
#else ifdef LANG_DE
    #define MSG_INIT_FINISHED "Initialsierung abgeschlossen"
    #define MSG_INVALID_COMMAND "Unbekannten Befehl empfangen:"
#endif


#define BAUD_RATE 115200

//TODO: Send this as init code
//How many switches you have connected
#define SWITCHES 15

//These Pins connect to the Shift Registers
#define DS_PIN 5
#define ST_CP_PIN 4
#define SH_CP_PIN 3
#define MR_PIN 2

//This array holds the stats of the switches
boolean states[SWITCHES * 2];

//These Varaibles are used for serial communication
String serialInput = "";
boolean finishedRead = false;

bool isConnected = false;

void setup(){
    //set digital pins 2-7 to OUTPUT
    DDRD = DDRD | B11111100;
    //set digital pins 8-13 to OUTPUT
    DDRB = DDRB | B00111111;

    //Set all of the Shift-Register pins to the appropriate default (and clear their contents)
    digitalWrite(MR_PIN, 0);
    digitalWrite(ST_CP_PIN, 0);
    digitalWrite(ST_CP_PIN, 1);
    digitalWrite(MR_PIN, 1);

    //Begin the serial communication
    Serial.begin(BAUD_RATE);
    Serial.println(MSG_INIT_FINISHED);
}


void loop(){
    //Get all the available data and then compute it
    getSerial();
    if (finishedRead) {
        processCommand();
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

void processCommand() {
    int idPosition = serialInput.indexOf('?');
    //Every command has to contain an ID
    if (idPosition != -1) {
        int messageID = serialInput.substring(idPosition + 1).toInt();
        int dataPosition = serialInput.indexOf('-');
        //If the command contains data
        String data = (dataPosition != -1) ? serialInput.substring(dataPosition + 1, idPosition) : "";
        String command = (dataPosition != -1) ? serialInput.substring(0, dataPosition) : serialInput.substring(0, idPosition);


        //Now process the command

        if (command == "ACK") {
            reply(true, messageID);
        }
        else if (command == "ACN") {
            if (isConnected) {
                reply(false, messageID);
            }
            else {
                isConnected = true;
                reply(true, messageID);
            }
        }
        else if (command == "ADC") {
            if (isConnected) {
                isConnected = false;
                reply(true, messageID);
            }
            else {
                reply(false, messageID);
            }
        }
        else if (command == "ASW" && data != "") {
            if (!isConnected) {
                reply(false, messageID);
                return;
            }
            if (toggleSwitch(data.toInt())) {
                reply(true, messageID);
            }
            else {
                reply(false, messageID);
            }
        }
        else if (command == "AST" && data != "") {
            int value = data.substring(data.indexOf('~') + 1).toInt();
            int index = data.substring(0, data.indexOf('~')).toInt();
            if (index < SWITCHES * 2) {
                states[index] = value;
                reply(true, messageID);
            }
            else {
                reply(false, messageID);
            }
        }
        else {
            reply(false, messageID);
            Serial.println(MSG_INVALID_COMMAND + serialInput);
        }
    }
    else {
        Serial.println(MSG_INVALID_COMMAND + serialInput);
    }


}

bool toggleSwitch(int switchID) {
    if (switchID * 2 >= SWITCHES && switchID > 0) {
        states[switchID * 2] != states[switchID * 2];
        states[switchID * 2 + 1] != states[switchID * 2 + 1];
        writeStates();
        return true;
    }
    else {
        return false;
    }

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
/**
 * Helper function for sending AOK or AKO to the server
 */
void reply(bool success, int ID) {
    Serial.println((success ? String("AOK") : String("AKO"))  + "?" + ID);
}
