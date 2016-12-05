import { baseIconSize } from "../utils/utils.js";
export var allSwitches = [
    "wl0",
    "wl90",
    "wl180",
    "wl270",
    "wr0",
    "wr90",
    "wr180",
    "wr270"
];

export function getIcon(track) {
    return `url("/img/tracks/${track}.png")`;
}

export function getBG(track) {
    return { backgroundImage: `url("/img/tracks/${track}.png")` };
}

export function objectFromStyle(style) {
    let bg = style.backgroundImage;
    let icon = bg.substring(bg.indexOf("tracks/") + 7, bg.indexOf(".png"));
    let x = parseInt(style.left.substring(0, style.left.indexOf("px"))) / baseIconSize;
    let y = parseInt(style.top.substring(0, style.top.indexOf("px"))) / baseIconSize;
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
