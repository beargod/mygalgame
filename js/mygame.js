var userData = new Vue({
    el:".user-data",
    data: {
        user:{},
        nameEdit:0,
        isEdit:0,
        oldName:"",
        oldAvatar:"",
        gameContent:[],
        tab:0
    },
    methods: {
        editName:function () {
            this.nameEdit=1;
        },
        saveName:function () {
            this.nameEdit=0;
            if(this.oldName!=this.user.name){
                this.isEdit=1;
            }else {
                this.isEdit=0;
            }
        },
        uploadGame: function (event) {
            var file = event.target.files[0];
            this.gameImg = getObjectURL(file);
            uploadImg(file, function (res) {
                toastr.success('上传成功');
                userData.user.avatar = qiniudomain + res.key;
                userData.isEdit=1;
            });
        },
        updateUser:function () {
            var callArgs = "[\""+this.user.name+"\",\""+this.user.avatar+"\"]";
            var value = 0;
            nebPay.call(dappAddress, value, "aUser", callArgs, {
                listener: cbnetwork
            });
        },
        changeTab:function (nowTab) {
            this.tab = nowTab;
            loadContent();
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
    },
    watch: {
        user: function (newVal,oldVal) {
            if(!oldVal.name||!newVal){
                return;
            }
            if(newVal.name!=oldVal.name){
                this.isEdit=1;
                return;
            }
            if(newVal.avatar!=oldVal.avatar){
                this.isEdit=1;
            }
        },
        tab:function (newVal,oldVal) {
            this.gameContent = [];
        }
    }
})

function init() {
    loadUser();
}

function loadUser() {
    nebGet("userData", "", function (rs) {
        cbgetnetwork(rs);
        userData.user = JSON.parse(rs.result);
        userData.oldName = userData.user.name;
        userData.oldAvatar = userData.user.oldAvatar;
        loadContent();
    });
}

function loadContent() {
    if(userData.tab===0){
        userData.$children[0].setAllPage(userData.user.gameSize);
    }else if(userData.tab===1){
        userData.$children[0].setAllPage(userData.user.likeSize);
    }else if(userData.tab===2){
        userData.$children[0].setAllPage(userData.user.mySize);
    }else if(userData.tab===3){
        userData.$children[0].setAllPage(userData.user.editSize);
    }
    userData.$children[0].goto(userData.$children[0].current);
}

function getPageData(begin,end) {
    var method = "";
    if(userData.tab===0){
        method = "userGameHistory";
        userData.pageSize = Math.ceil(userData.user.gameSize/userData.pageLength);
    }else if(userData.tab===1){
        method = "userLike";
        userData.pageSize = Math.ceil(userData.user.likeSize/userData.pageLength);
    }else if(userData.tab===2){
        method = "userGame";
        userData.pageSize = Math.ceil(userData.user.mySize/userData.pageLength);
    }else if(userData.tab===3){
        method = "userEditGame";
        userData.pageSize = Math.ceil(userData.user.editSize/userData.pageLength);
    }
    var callArgs = "["+begin+","+end+"]";
    nebGet(method, callArgs, function (rs) {
        cbgetnetwork(rs);
        userData.gameContent = JSON.parse(rs.result);
    });
}
