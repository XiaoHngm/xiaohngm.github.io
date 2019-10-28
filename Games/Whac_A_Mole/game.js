

function documentReadyFunction () {
    "use strict";
    $(".enemy .enemy_img").click(function(e){
        var topPos = String(Number($("#score").css("top").slice(0,-2))+63)+"px";
        $("#score").css("top", topPos);
    });
}
