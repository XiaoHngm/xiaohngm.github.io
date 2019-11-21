


cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,// 星星和主角之间的距离小于这个数值时，就会完成收集
        ground: { // 地面节点，用于确定星星生成的高度
            default: null,
            type: cc.Node
        },
        player: { // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
            default: null,
            type: cc.Node
        },
        starPrefab: { // 这个属性引用了星星预制资源
            default: null,
            type: cc.Prefab
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: { // 得分音效资源
            default: null,
            type: cc.AudioClip
        },
    },

    onLoad: function () {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;
        // 初始化计时器
        this.score = 0;
        // 生成一个新的星星
        this.spawnNewStar();
    },

    start () {},

    update: function (dt) {
        console.log("adsa");
        if (this.star.getComponent('Star').timer > this.star.getComponent('Star').starDuration) { //超过限度还没有摘到星星
            this.gameOver(); // 调用游戏结束
        } else if (this.getPlayerDistance() < this.pickRadius) { //判断星星和主角之间的距离是否小于收集距离
            this.starPicked(); //调用收集行为
        } else;
    },

    gameOver: function () {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    },

    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        this.star = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(this.star);
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var randX = (Math.random() - 0.5) * this.node.width;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        this.star.setPosition(cc.v2(randX, randY));
    },

    getPlayerDistance: function () {
        // 得到 player 节点位置
        var playerPos = this.player.getPosition();
        // 根据player和star两节点位置计算两点之间距离
        var dist = this.star.position.sub(playerPos).mag();
        return dist;
    },

    starPicked: function() {
        // 调用 Game 脚本的得分方法
        this.gainScore();
        // 然后销毁当前星星节点
        this.star.destroy();
        // 当星星被收集时，生成一个新的星星
        this.spawnNewStar();
    },

    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    genPlayer: function () {

    },
});
