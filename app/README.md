# Control all of your tracks!
Welcome to AControl, the first of its kind, open-source model train track switching application.
AControl is based on a advanced client-server architecture, which enables you to control your track from multiple devices at the same time.
Hardware-side, we use custom control boards (also open-source) based on the infamous Arduino eco-system.

## Why use AControl?
- It is easy to install
- It is easy to use
- It is free
- It is open-source
- It works cross-platform (Almost every Linux-derivative, OS X, Windows, most \*NIX systems)
- It is __awesome__

## Install
We plan on creating packages for Ubuntu (therefore all other Debian based systems) and Arch Linux. You will unfortunately have to install AControl manually on every other system (for now) - but even then, if you already have `npm` and `grunt` installed, it is easy as pie.

#### Automatic install
On Arch Linux we recommend using yaourt or your favorite AUR management tool:
```shell
yaourt -S acontrol
```
If you rather want to install it manually from the AUR, download the tarball and:
```shell
tar -xvzf acontrol.tar.gz
cd acontrol
makepkg -s
pacman -U acontrol*.xz
```

#### Manual install
Fist of all, download the source from GitHub:
```shell
git clone https://github.com/Arial7/AControl
cd AControl/app
npm install
grunt build
```

## Usage
#### Start the server
We plan on creating app launchers, but for now, you will have to AControl manually. But even that is quite simple.

Switch to the AControl directory (where you downloaded and built it).
```shell
cd app && node app.js
```

This starts the server. It should give you a message like `Listening at http://<IP>:3030`

If AControl recognizes any serial devices connected to your computer, it will also list them out.

To stop the server, just press `ctrl+c` in the terminal you started the server in.

#### Connect to the server
To connect any client, just open your browser of choice and browse to `http://<IP of server>:3030`. If you run the client on the same computer as the server is running, this would be `http://localhost:3030` or `http://127.0.0.1:3030`

#### Connecting your ADevices
For now, you have to connect ADevices like the ASwitch __before__ the server is started (or just restart the server after connecting). This will be tackled in a future release.

Please note that you *have* to connect your accessories to the computer running the server. Connecting them to any other client doesn't do much at all.
