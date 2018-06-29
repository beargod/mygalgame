var cChapter = new Vue({
    el:".c-chapter",
    data:{
        game:{},
        chapterId:0,
        chapter:{},
        selectText:"",
        chapterText:"",
        chapterFinished:false,
        chapterEdited:true,
        gameImg:"",
        contactImg:"",
        firstChapter:0
    },
    methods:{
        commitChapter: function(){
            var value = 0;
            if(!this.selectText&&!this.firstChapter){
                toastr.error('选择描述不能为空');
                return;
            }

            if(!this.chapterText){
                toastr.error('剧情描述不能为空');
                return;
            }
            var callArgs = [];
            callArgs.push(this.chapterId);
            callArgs.push(this.chapterText);
            callArgs.push(this.contactImg);
            callArgs.push(this.gameImg);
            callArgs.push(this.selectText);
            callArgs.push("");
            callArgs.push(this.chapterEdited);
            callArgs.push(this.chapterFinished);
            nebPay.call(dappAddress, value, "cChapter", JSON.stringify(callArgs), {
                listener: cbnetwork
            });

        },
        uploadContact: function (event) {
            var file = event.target.files[0];
            this.contactImg = getObjectURL(file);
            uploadImg(file, function (res) {
                toastr.success('上传成功');
                cChapter.contactImg = qiniudomain + res.key;

            });
        },
        uploadGame: function (event) {
            var file = event.target.files[0];
            this.gameImg = getObjectURL(file);
            uploadImg(file, function (res) {
                toastr.success('上传成功');
                cChapter.gameImg = qiniudomain + res.key;
            });
        }
    }
});

function init() {
    loadChapter(function (rs) {
        if (rs.execute_err) {
            return;
        }
        var nowChapter = JSON.parse(rs.result);

        cChapter.chapterText = nowChapter.text;
        cChapter.chapterFinished = nowChapter.isOver;
        cChapter.chapterEdited = nowChapter.isEdit;
        cChapter.gameImg = nowChapter.img;
        if(nowChapter.lastSelect) {
            cChapter.selectText = nowChapter.lastSelect.text;
            cChapter.contactImg = nowChapter.lastSelect.img;
            cChapter.firstChapter = 0;
            loadChapter(function (rs) {
                if (rs.execute_err) {
                    return;
                }
                cChapter.chapter = JSON.parse(rs.result);
            });
        }else {
            cChapter.firstChapter = 1;
        }
        loadGame(nowChapter.game);
    });
}

function loadGame(id) {
    nebGet("gGame", "[" + id+ "]", function (rs) {
        cbgetnetwork(rs);
        cChapter.game = JSON.parse(rs.result);
    });
}

function loadChapter(fuc) {
    cChapter.chapterId = getUrlParms("id");
    nebGet("gChapter", "["+ cChapter.chapterId+"," +0+","+ 7+ "]", function (rs) {
        cbgetnetwork(rs);
        fuc(rs);
    });
}
