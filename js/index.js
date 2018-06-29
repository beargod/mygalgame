var qiniudomain = "http://pad61xnfc.bkt.clouddn.com/"
var NebPay = require("nebpay");
var address = 0;
var network_error = 0;
new WOW().init();
var nebPay = new NebPay();
var dappAddress = "n1rgyZzqd69zSbXzcpQkcCNDDrxx7qAki1R";
var myPage = Vue.component("my-page",{
    data:function(){
        return{
            current:1,
            showItem:9,
            allPage:1
        }
    },
    methods:{
        setItem: function (number) {
            if(number<1){
                number=1;
            }
            this.showItem = number;
        },
        setAllPage:function (total) {
            this.allPage = Math.ceil(total/this.showItem);
        },
        goto:function(index){
            if(index<0){
                return;
            }
            this.current = index;
            getPageData((index-1)*this.showItem,index*this.showItem);
        }
    },
    template:
    '<nav class="d-flex justify-content-center wow fadeIn animated"\n' +
    '                     style="visibility: visible; animation-name: fadeIn;">\n' +
    '                    <ul class="pagination pg-blue">\n' +
    '\n' +
    '                        <!--Arrow left-->\n' +
    '                        <li class="page-item disabled" v-show="current-1<=0">\n' +
    '                            <a class="page-link waves-effect waves-effect" aria-label="Previous">\n' +
    '                                <span aria-hidden="true">«</span>\n' +
    '                                <span class="sr-only">Previous</span>\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '\n' +
    '                        <li class="page-item" v-show="current-1>0">\n' +
    '                            <a class="page-link waves-effect waves-effect" aria-label="Previous"\n' +
    '                               @click="goto(current-1)">\n' +
    '                                <span aria-hidden="true">«</span>\n' +
    '                                <span class="sr-only">Previous</span>\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                        <div v-for="index in allPage">\n' +
    '                            <li class="page-item active" v-show="index==current">\n' +
    '                                <a class="page-link waves-effect" @click="goto(index)">{{index}}\n' +
    '                                    <span class="sr-only">(current)</span>\n' +
    '                                </a>\n' +
    '                            </li>\n' +
    '                            <li class="page-item" v-show="index!=current">\n' +
    '                                <a class="page-link waves-effect " @click="goto(index)">{{index}}\n' +
    '                                    <span class="sr-only">(current)</span>\n' +
    '                                </a>\n' +
    '                            </li>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <li class="page-item disabled" v-show="current+1>=allPage">\n' +
    '                            <a class="page-link waves-effect waves-effect" aria-label="Next">\n' +
    '                                <span aria-hidden="true">»</span>\n' +
    '                                <span class="sr-only">Next</span>\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                        <li class="page-item disabled" v-show="current+1<allPage">\n' +
    '                            <a class="page-link waves-effect waves-effect" @click="goto(current+1)" aria-label="Next">\n' +
    '                                <span aria-hidden="true">»</span>\n' +
    '                                <span class="sr-only">Next</span>\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </nav>'
})

var myNav =  Vue.component("my-nav",{
    data:function(){
        return{
            user:{},
            serviceStatus:"已连接上星云网络",
            web_wallet:1
        }
    },
    template:
    '<nav class="home mb-1 navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar ">\n' +
    '    <div class="container col-md-11">\n' +
    '        <!-- Collapse -->\n' +
    '        <button class="navbar-toggler float-left" type="button" data-toggle="collapse"\n' +
    '                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"\n' +
    '                aria-expanded="false" aria-label="Toggle navigation">\n' +
    '            <span class="navbar-toggler-icon"></span>\n' +
    '        </button>\n' +
    '        <!-- Brand -->\n' +
    '        <a class="navbar-brand text-white" target="_blank">\n' +
    '            <strong>My GALGAME</strong>\n' +
    '        </a>\n' +
    '\n' +
    '        <!-- Links -->\n' +
    '        <div class="collapse navbar-collapse" id="navbarSupportedContent">\n' +
    '\n' +
    '            <!-- Left -->\n' +
    '            <ul class="navbar-nav mr-auto">\n' +
    '                <li class="nav-item">\n' +
    '                    <a class="nav-link" href="index.html">首页\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li class="nav-item">\n' +
    '                    <a class="nav-link" href="mygame.html">我的游戏</a>\n' +
    '                </li>\n' +
    '                <li class="nav-item">\n' +
    '                    <a class="nav-link" href="mygame.html">合约地址</a>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <ul class="navbar-nav nav-flex-icons ">\n' +
    '\n' +
    '            <a class="nav-link btn-sm border border-light rounded " data-toggle="dropdown"\n' +
    '               aria-haspopup="true" aria-expanded="true" v-show="user.name">\n' +
    '                <img alt="user avatar"\n' +
    '                     src="img/def-avatar.png"\n' +
    '                     class="img-fluid rounded-circle z-depth-0 mr-2" v-show="!user.avatar">\n' +
    '                <img alt="user avatar"\n' +
    '                     :src="user.avatar"\n' +
    '                     class="img-fluid rounded-circle z-depth-0 mr-2" v-show="user.avatar">{{user.name}}</a>\n' +
    '\n' +
    '            <a class="nav-link btn-sm border border-light rounded " href="#" \n' +
    '               aria-haspopup="true" aria-expanded="true" v-show="!user.name&&!web_wallet">点击安装钱包</a>\n' +
    '            <a class="nav-link btn-sm border border-light rounded " href="#" ' +
    '               aria-haspopup="true" aria-expanded="true" v-show="!user.name&&web_wallet">请导入用户</a>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="container col-md-1">\n' +
    '        <span class="white-text">{{serviceStatus}}</span>\n' +
    '    </div>\n' +
    '\n' +
    '\n' +
    '</nav>'
});

var myFoot = Vue.component("my-foot",{
    template:'<footer class="page-footer text-center font-small mt-4 wow fadeIn my-foot">\n' +
    '\n' +
    '    <hr class="my-4">\n' +
    '\n' +
    '    <!-- Social icons -->\n' +
    '    <div class="pb-4">\n' +
    '        <div class="footer-copyright">\n' +
    '            © 2018 Copyright:\n' +
    '            <a href="https://mdbootstrap.com/bootstrap-tutorial/" target="_blank"> MDBootstrap.com </a>\n' +
    '        </div>\n' +
    '        <div class="footer-copyright">\n' +
    '            use: <a href="nebulas.io" target="_blank"> Nebulas </a>\n' +
    '        </div>\n' +
    '        <div class="footer-copyright">\n' +
    '            contact: <a href="nebulas.io" target="_blank"> 729880623@qq.com </a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</footer>'

})

var foot= new Vue({
    el:"my-foot"
});

var nav = new Vue({
    el:".my-nav"
});

//检查扩展是否已安装
//如果安装了扩展，var“webExtensionWallet”将被注入到web页面中1
if (typeof(webExtensionWallet) === "undefined") {
    //alert ("扩展钱包未安装，请先安装.")
    nav.$children[0].web_wallet = 0;
}
//获取钱包地址
var nebulas = require("nebulas"), Account = nebulas.Account, neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));
getWalletInfo((myAddress) => {
    address = myAddress;
    if (address) {
        loadUser();

    }
});

function loadUser() {
    nebGet("userData", "", function (rs) {
        cbgetnetwork(rs);
        nav.$children[0].user = JSON.parse(rs.result);
        init();
    });
}

function cbnetwork(rs) {
    if (rs == "Error: Transaction rejected by user") {
        toastr.error("由于你拒绝了交易，数据没有成功上传到链上");
        return
    }
    if (rs.execute_err && rs.execute_err != "") {
        toastr.error(rs.execute_err);
    }
    toastr.success("提交成功");
    network_error = 0;
}

function cbgetnetwork(rs) {
    if (rs == "Network Error") {
        nav.$children[0].serviceStatus="网络卡顿，请稍后再试";
        window.location.reload();
        return
    }
    if (rs.execute_err) {
        toastr.error(rs.execute_err);
    }
    nav.$children[0].serviceStatus="已连接上星云网络";
}
function uploadImg(file, complete) {
    var options = {
        quality: 0.92,
        noCompressIfLarger: true
        // maxWidth: 1000,
        // maxHeight: 618
    }
    var putPolicy = new Object();
    putPolicy.scope = "galgame";
    putPolicy.deadline = Math.round(Date.now() / 1000) + 60 * 30;
    var key = Date.now() + "-" + file.name;
    var token = getUpToken(putPolicy);
    var config = {
        useCdnDomain: false,
        region: qiniu.region.z0
    };
    var putExtra = {
        fname: file.name,
        params: {},
        mimeType: ["image/png", "image/jpeg", "image/gif"]
    };
    qiniu.compressImage(file, options).then(data => {
        var observable = qiniu.upload(data.dist, key, token, putExtra, config)
        var subscription = observable.subscribe(function () {

        }, function () {

        }, complete)
    })
};

function nebGet(f, a, t) {

    var s = address ? address : "n1rGdr7pQayM46MGFAgzKw2YaefCGJRxsky";
    nav.$children[0].serviceStatus="正在连接星云网络";
    var r = {function: f, args: a};

        neb.api.call(s, dappAddress, "0", "1", "1", "1", r).then(function (a) {
            t(a)
        }).catch(function (e){
            nav.$children[0].serviceStatus="网络卡顿，请稍后刷新";
            window.location.reload();
        });
}

function getWalletInfo(callback) {
    window.postMessage({
        "target": "contentscript",
        "data": {},
        "method": "getAccount",
    }, "*");

    window.addEventListener('message', function (e) {
        if (e.data && e.data.data) {
            if (e.data.data.account) { //这就是当前钱包中的地址
                var address = e.data.data.account;
                if (address && address.length != 0) {
                    if (callback) {
                        callback(address);
                    }
                }
            }
        }
    });
}

function getObjectURL(file) {
    let url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    }
    return url;
}


function getUrlParms(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return decodeURI(r[2]);
    return null;
}