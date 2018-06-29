var mChapter = new Vue({
   el:".m-chapter",
   data:{
       gameId:0,
       myChapters:[],
       game:{}
   }
});

function init() {
    loadGame();
}


function loadGame() {
    mChapter.gameId = getUrlParms("id");
    mChapter.$children[0].setAllPage(getUrlParms("total"));
    nebGet("gGame", "[" + mChapter.gameId+ "]", function (rs) {
        cbgetnetwork(rs);
        if(rs.execute_err){
            return;
        }
        mChapter.game = JSON.parse(rs.result);
        mChapter.$children[0].goto(1);
    });
}


function getPageData(begin,end) {
    var callArgs = [];
    callArgs.push(begin);
    callArgs.push(end);
    callArgs.push(mChapter.gameId);
    nebGet("userEditGameChapter", JSON.stringify(callArgs), function (rs) {
        cbgetnetwork(rs);
        if(rs.execute_err){
            return;
        }
        mChapter.myChapters = JSON.parse(rs.result);
    });
}