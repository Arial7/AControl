# ACommands
ACommands are the serial commands used to communicate between AControl and your ADevices.

## Syntax
Every ACommand has to be built like the following:
`<commmand>[-<data>]?<id>` where everything in `<>` *has* to be sent and everything in `[]` is optional (command dependent).

`<id>` Is a randomly generated number with tree digits, that just serves as an identifier for the command. It *has* to be prefixed with a question mark `?`. You should make sure, that two following commands do not have the same id.

## Commands

The commands are divided into two categories: requests and responses.
While requests always are in the direction AControl -> ADevice, responses always are in the direciton ADevice -> AControl.

### Responses
- `AOK?<id>`: The command with id `<id>` executed successfully

- `AKO?<id>`: The command with id `<id>` has not been executed successfully


### Requests
- `ACK?<id>` Ping the ADevice. Can be used for heartbeat<br>
Returns: <br>
  - `AOK?<id>` - Always
- `ACN?<id>` Request connection.<br>
Returns: <br>
  - `AOK?<id>` if connection was successful.
  - `AKO?<id>` if connection could not be established (another server already is connected)
- `ADC?<id>` Request disconnection. You should always request disconnection before terminating the server.<br>
Returns: <br>
  - `AOK?<id>` if disconnected
  - `AKO?<id>` if not disconnected (was not connected before)
- `ASW-<switch>?<id>` Toggle the switch no. `switch`. <br>
Returns: <br>
   - `AOK?<id>` if switch could be toggled.
   - `AKO?<id>` if switch could not be toggled (`switch` is out of bounds)
- `AST-<index>~<value>?<id>` Set specific element in the switches array (temporarily used for setting it up)
Returns: <br>
   - `AOK?<id>` if value has been set
   - `AKO?<id>` if value could not be set (out of bounds) 
