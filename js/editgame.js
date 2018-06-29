var qiniudomain = "http://pad61xnfc.bkt.clouddn.com/"
var NebPay = require("nebpay");
var egame = new Vue({
    el: ".egame-content",
    data: {
        gameId:0,
        titleImg: "",
        gTypes: [],
        gameTypes: [],
        tag: "",
        gameName:"",
        gameDetail:""
    },
    methods: {
        uploadTitle: function (event) {
            var file = event.target.files[0];
            this.titleImg = getObjectURL(file);
            uploadImg(file, function (res) {
                toastr.success('上传成功');
                egame.titleImg = qiniudomain + res.key;
            });
        },
        addType() {
            if (!this.tag) {
                toastr.error('不能上传空标签');
                return;
            }
            if (this.gameTypes.indexOf(this.tag) != -1) {
                return;
            }
            if(this.gameTypes.length>3){
                toastr.error('一个游戏最多只能有3给标签');
            }
            this.gameTypes.unshift(this.tag);
        },
        removeTag(tag){
            var index = this.gameTypes.indexOf(tag);
            if (index != -1) {
                this.gameTypes.splice(index,1);
            }
        },
        editGame(){
            var value = 0;
            if(!this.gameDetail){
                toastr.error('描述不能为空');
                return;
            }
            var callArgs = "["+this.gameId+",";
            callArgs = append(callArgs,this.titleImg);
            callArgs = append(callArgs,this.gameDetail);
            callArgs += JSON.stringify(this.gameTypes);
            callArgs +="]";
            nebPay.call(dappAddress, value, "cGame", callArgs, {
                listener: cbnetwork
            });
        }
    },
    watch: {
        titleImg: function (newV, oldV) {
            $('.title_img').attr('src', this.titleImg);
        },
        tag: function (newV, oldV) {
            if(newV.length>10){
                this.tag = oldV;
            }
        },
        gameDetail: function (newV, oldV) {
            if(newV.length>15){
                this.tag = oldV;
            }
        },
        gameChapter: function (newV, oldV) {
            if(newV.length>500){
                this.tag = oldV;
            }
        }
    }

});

var gTypeSize = 0;

function init() {
    loadGame();
}

function loadGame() {
    egame.gameId = getUrlParms("id");
    egame.gameName = getUrlParms("name");
    egame.titleImg=getUrlParms("titleImg");
    var type = getUrlParms("types");
    egame.gameTypes=type.split(",");
    egame.gameDetail = getUrlParms("detail");
}

function refreshGTypes() {
    var begin = Math.round(Math.random() * (Math.max(gTypeSize - 10, 0)));
    var end = begin + 15;
    nebGet("gTypes", "[" + begin + "," + end + "]", function (rs) {
        cbnetwork(rs);
        gTypeSize = rs;

    });
}


function append(str,data) {
    return str+"\""+data+"\",";
}
