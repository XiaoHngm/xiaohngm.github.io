


cc.Class({
    extends: cc.Component,

    properties: {
        maxStarDuration: 5,// 星星产生后消失时间的随机范围
        minStarDuration: 3,
        minOpacity: 50,//星星的透明度最小值
    },

    onLoad () {
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    start () {},

    update: function (dt) {
        // 根据 Game 脚本中的计时器更新星星的透明度
        this.timer += dt;
        var opacityRatio = 1 - this.timer/this.starDuration;
        this.node.opacity = this.minOpacity + Math.floor(opacityRatio * (255 - this.minOpacity));
    },
});
