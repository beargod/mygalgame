
// Animations initialization
new WOW().init();

$(function () {
    $(".sticky").sticky({
        topSpacing: 90
        , zIndex: 2
        , stopper: "#YourStopperId"
    });
});

$(function () {
    $(".sticky2").sticky({
        topSpacing: 90
        , zIndex: 2
        , stopper: "#YourStopperId"
    });
});
var defaultImg = "img/gradient2.png";

var gameData = new Vue({
    el:".game-data",
    data: {
        gameId:0,
        nowChapterId:0,
        game:{},
        chapter:{},
        lastChapter:{},
        text:[],
        selects:[],
        danmus:[],
        mode:0,
        nowText:0,
        loadGame:1,
        nowDanmu:0,
        aDanmu:"",
        gameImage:defaultImg,
        lastSelectText:"开始游戏"
    },
    methods: {
        sendDanmu:function () {
            var value = 0;
            var callArgs = [];
            callArgs.push(this.chapter.id);
            callArgs.push(this.aDanmu);
            callArgs.push("#000000");
            nebPay.call(dappAddress, value, "aDanmu", JSON.stringify(callArgs), {
                listener: cbDanmu
            });
        },
        nextText:function () {
            if(this.text.length<=this.nowText+1){
                return;
            }
            this.nowText++;
        },
        nextChapter:function (toChapter,img) {
            if(img){
                this.gameImage = img;
            }else {
                this.gameImage = defaultImg;
            }
            loadChapter(toChapter);
        },
        like:function () {
            var callArgs = "["+this.nowChapterId+"]";
            var value = 0;
            nebPay.call(dappAddress, value, "likeChapter", callArgs, function (rs) {
                cbnetwork(rs);
                this.chapter.liked = !this.chapter.liked;
            });
        },
        unlike:function () {
            var callArgs = "["+this.nowChapterId+"]";
            var value = 0;
            nebPay.call(dappAddress, value, "unlikeChapter", callArgs, function (rs) {
                cbnetwork(rs);
                this.chapter.unliked = !this.chapter.unliked;
            });
        },
        save:function () {
            var callArgs = "["+this.nowChapterId+"]";
            var value = 0;
            nebPay.call(dappAddress, value, "save", callArgs, function (rs) {
                cbnetwork(rs);
            });
        }
    },
    watch: {

    }
})

function cbDanmu(rs) {
    cbnetwork(rs);
    var comment = {
        text: '',

        time: 233.3,

        // 在使用 canvas 引擎时，类似于 CanvasRenderingContext2D 对象，以下属性作为默认
        canvasStyle: {
            // Chrome 中最小字号为 12px
            font: '24px sans-serif',
            textAlign: 'start',
        },
    }
    comment.text = gameData.aDanmu;
    danmaku.emit(comment);
}

function init() {
     loadGame();
}

function loadGame() {
    gameData.gameId = getUrlParms("id");
    nebGet("gGame", "[" + gameData.gameId+ "]", function (rs) {
        cbgetnetwork(rs);
        if(rs.execute_err){
            gameData.loadGame = 0;
            gameData.text.push("没有找到该游戏");
            return;
        }
        gameData.game = JSON.parse(rs.result);
        var cId = getUrlParms("cId");
        if(cId){
            gameData.nowChapterId = cId;
        }else {
            gameData.nowChapterId = gameData.game.startChapter;
        }
        loadChapter(gameData.nowChapterId);
    });
}

function loadChapter(id) {
    gameData.loadGame = 1;
    nebGet("gChapter", "["+ id+"," +gameData.mode+","+ 7+ "]", function (rs) {
        cbgetnetwork(rs);
        gameData.lastChapter = gameData.chapter;
        gameData.chapter = JSON.parse(rs.result);
        gameData.selects = gameData.chapter.selects;
        gameData.text = gameData.chapter.text.split("。");
        gameData.nowText = 0;
        gameData.loadGame = 0;
        if(gameData.chapter.lastSelect){
            gameData.lastSelectText = gameData.chapter.lastSelect.description;
        }
        if(gameData.chapter.img){
            gameData.gameImage = gameData.chapter.img;
        }else {
            gameData.gameImage = defaultImg;
        }
        loadDanmu(id);
    });
}

function loadDanmu(id) {
    nebGet("gDanmu", "["+id+","+0+","+10+"]", function (rs) {
        cbgetnetwork(rs);
        if(!rs.result){
            return;
        }
        gameData.danmus = JSON.parse(rs.result);
        gameData.nowDanmu = 0;
        var interval = setInterval(function(){
            var comment = {
                text: '',

                time: 233.3,

                // 在使用 canvas 引擎时，类似于 CanvasRenderingContext2D 对象，以下属性作为默认
                canvasStyle: {
                    // Chrome 中最小字号为 12px
                    font: '24px sans-serif',
                    textAlign: 'start',
                },
            }
            if(gameData.nowDanmu>=gameData.danmus.length){
                clearInterval(interval);
                return;
            }
            comment.text = gameData.danmus[gameData.nowDanmu].text;
            gameData.nowDanmu++;
            danmaku.emit(comment);
        }, 1000);
    });
}