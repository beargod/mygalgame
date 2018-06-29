var gameData = new Vue({
    el: ".game-data",
    data:{
        gameContent:[],
        tags:[],
        nowTag:"",
        tagSize:0,
        tagLength:10,
        currentTag:0
    },
    methods:{
        otherTags:function () {
            getTag();
        },
        searchTags:function (name) {
            this.nowTag = name;
            gameData.$children[0].goto(1);
        },
        like:function (gameId) {
            var callArgs = "["+gameId+"]";
            var value = 0;
            nebPay.call(dappAddress, value, "likeGame", callArgs, {
                listener: cbnetwork
            });
        },
        unlike:function (gameId) {
            var callArgs = "["+gameId+"]";
            var value = 0;
            nebPay.call(dappAddress, value, "unlikeGame", callArgs, {
                listener: cbnetwork
            });
        }
    }
});

function init() {
    nebGet("gGameSize","[]", function (rs) {
        cbgetnetwork(rs);
        gameData.$children[0].setAllPage(rs.result) ;
        gameData.$children[0].goto(gameData.$children[0].current);
    });
    getTag();
}

function getPageData(begin,end) {
    var args = [];
    var method = "games";
    args.push(begin);
    args.push(end);
    if(gameData.nowTag){
        args.push(gameData.nowTag);
        method = "typeGames";
    }
    nebGet(method,JSON.stringify(args), function (rs) {
        cbgetnetwork(rs);
        gameData.gameContent = JSON.parse(rs.result);
    });

}

function getTag() {
    nebGet("gTypeSize","[]", function (rs) {
        cbgetnetwork(rs);
        gameData.tagSize = rs.result;
        if(gameData.currentTag*gameData.tagLength>gameData.tagSize){
            gameData.currentTag=1;
        }else {
            gameData.currentTag++;
        }
        var begin =  (gameData.currentTag-1)*gameData.tagLength;
        var end = gameData.currentTag*gameData.tagLength;
        var args = [];
        args.push(begin);
        args.push(end);
        nebGet("gTypes",JSON.stringify(args), function (rs) {
            cbgetnetwork(rs);
            gameData.tags = JSON.parse(rs.result);
        });
    });
}