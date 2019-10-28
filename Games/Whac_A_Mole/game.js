

function documentReadyFunction () {
    "use strict";


    var screenWidth = screen.availWidth, screenHeight = screen.availHeight;
    if (screenWidth < 400) { // 电脑
        $("body").css({"width":screenWidth+"px", "height":screenHeight+"px"});
    } else { // 手机
        $("body").css({"width":screenWidth+"px", "height":screenHeight+"px"});
    }


    $(".enemy .enemy_img").click(function(e){
        var topPos = String(Number($("#score").css("top").slice(0,-2))+63)+"px";
        $("#score").css("top", topPos);
    });
}
