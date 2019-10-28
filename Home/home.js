

function documentReadyFunction () {
    "use strict";


    var screenWidth = screen.availWidth;
    if (screenWidth > 640) { // 电脑
        $("#Game_1 a").attr("href", "Games/Whac_A_Mole/game.html");
    } else { // 手机
        $("#Game_1 a").attr("href", "Games/Mobile/Whac_A_Mole/game.html");
    }
}
