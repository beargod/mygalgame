var qiniudomain = "http://pad61xnfc.bkt.clouddn.com/"
var NebPay = require("nebpay");
var cgame = new Vue({
    el: ".cgame-content",
    data: {
        titleImg: "",
        gameImg: "",
        gTypes: [],
        gameTypes: [],
        tag: "",
        gameName:"",
        gameDetail:"",
        gameChapter:"",
        editStatus:0
    },
    methods: {
        uploadTitle: function (event) {
            var file = event.target.files[0];
            this.titleImg = getObjectURL(file);
            uploadImg(file, function (res) {
                toastr.success('上传成功');
                cgame.titleImg = qiniudomain + res.key;

            });
        },
        uploadGame: function (event) {
            var file = event.target.files[0];
            this.gameImg = getObjectURL(file);
            uploadImg(file, function (res) {
                toastr.success('上传成功');
                cgame.gameImg = qiniudomain + res.key;
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
        createGame(){
            var value = 0;
            if(!this.gameName){
                toastr.error('标题不能为空');
                return;
            }

            if(!this.gameDetail){
                toastr.error('描述不能为空');
                return;
            }

            if(!this.gameChapter){
                toastr.error('第一章剧情不能为空');
                return;
            }
            var callArgs = [];
            callArgs.push(this.gameName);
            callArgs.push(this.titleImg);
            callArgs.push(this.gameDetail);
            callArgs.push(this.editStatus);
            callArgs.push(this.gameTypes);
            callArgs.push(this.gameChapter);
            callArgs.push(this.gameImg);
            nebPay.call(dappAddress, value, "aGame", JSON.stringify(callArgs), {
                listener: cbnetwork
            });
        }
    },
    watch: {
        titleImg: function (newV, oldV) {
            $('.title_img').attr('src', this.titleImg);
        },
        gameImg: function (newV, oldV) {
            $('.game_img').attr('src', this.gameImg);
        },
        tag: function (newV, oldV) {
            if(newV.length>10){
                this.tag = oldV;
            }
        },
        gameName: function (newV, oldV) {
            if(newV.length>20){
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
        },
    }

});

function init() {

}
