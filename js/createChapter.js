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
        contactImg:""
    },
    methods:{
        commitChapter: function(){
            var value = 0;
            if(!this.selectText){
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
            nebPay.call(dappAddress, value, "aSelect", JSON.stringify(callArgs), {
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
    loadChapter();
}

function loadGame(id) {
    nebGet("gGame", "[" + id+ "]", function (rs) {
        cbgetnetwork(rs);
        cChapter.game = JSON.parse(rs.result);
    });
}

function loadChapter() {
    cChapter.chapterId = getUrlParms("id");
    nebGet("gChapter", "["+ cChapter.chapterId+"," +0+","+ 7+ "]", function (rs) {
        cbgetnetwork(rs);
        if (rs.execute_err) {
            return;
        }
        cChapter.chapter = JSON.parse(rs.result);
        loadGame(cChapter.chapter.game);
    });
}
