

function documentReadyFunction () {
    $(".score").click(function(e){
        //text = $("#log").text() + "ssss";
        //$("#log").text($(e.target.id+"+p").text());
        $("#log").text($("#"+e.target.id+"+p").text());
        //topPos = String(Number($("#score").css("top").slice(0,-2))+63)+"px";
        //$("#score").css("top", topPos);
        //$(".score").css("opacity", "0");
    });
}