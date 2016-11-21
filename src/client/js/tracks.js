define(["utils"], function(utils) {
    return {

        allTracks: [
            "g0",
            "g90",
            "a0",
            "a90",
            "a180",
            "a270",
            "p0",
            "p90",
            "p180",
            "p270",
            "d0",
            "d90",
            "d180",
            "d270",
            "dd0",
            "dd90"
        ],
        allSwitches: [
            "wl0",
            "wl90",
            "wl180",
            "wl270",
            "wr0",
            "wr90",
            "wr180",
            "wr270"
        ],
        getIcon: (track) => {
            return `url("/img/tracks/${track}.png")`;
        },
        getBG: (track) => {
            return { backgroundImage: `url("/img/tracks/${track}.png")` };
        },
        objectFromStyle: (style) => {
            let bg = style.backgroundImage;
            let icon = bg.substring(bg.indexOf("tracks/") + 7, bg.indexOf(".png"));
            let x = parseInt(style.left.substring(0, style.left.indexOf("px"))) / utils.baseACIconSize;
            let y = parseInt(style.top.substring(0, style.top.indexOf("px"))) / utils.baseACIconSize;
            if (icon == "") {
                return null;
            } else if (icon.startsWith("w")) {
                return {
                    type: "switch",
                    icon: icon.substring(0, icon.indexOf("_")),
                    x: x,
                    y: y,
                    isLeft: icon.endsWith("_l")
                }
            } else {
                return {
                    type: "normal",
                    icon: icon,
                    x: x,
                    y: y
                }
            }
        }
    };
});
