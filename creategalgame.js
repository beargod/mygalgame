"use strict"

var Game = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.title = obj.title;
        this.titleImg = obj.titleImg;
        this.description = obj.description;
        this.creator = obj.creator;
        this.editor = obj.editor;
        this.startChapter = obj.startChapter;
        this.like = obj.like;
        this.unlike = obj.unlike;
        this.id = obj.id;
        this.chapter = obj.chapter;
        this.type = obj.type;
    } else {
        this.title = "";
        this.titleImg = "";
        this.description = "";
        this.creator = "";
        this.startChapter = 0;
        this.like = [];
        this.unlike = [];
        this.id = 0;
        this.chapter = 0;
        this.type = [];
        this.editor = [];
    }
};

Game.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var Select = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;
        this.fromChapter = obj.fromChapter;
        this.description = obj.description;
        this.selectNumber = obj.selectNumber;
        this.img = obj.img;
        this.toChapter = obj.toChapter;
        this.creator = obj.creator;
    } else {
        this.id = 0;
        this.fromChapter = 0;
        this.description = "";
        this.selectNumber = 0;
        this.img = "";
        this.toChapter = 0;
        this.creator = "";
    }
}

Select.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }

};

var Chapter = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;
        this.img = obj.img;
        this.isEdit = obj.isEdit;
        this.creator = obj.creator;
        this.like = obj.like;
        this.unlike = obj.unlike;
        this.text = obj.text;
        this.selects = obj.selects;
        this.lastSelect = obj.lastSelect;
        this.isOver = obj.isOver;
        this.danmu = obj.danmu;
        this.game = obj.game;
        this.music = obj.music;
    } else {
        this.id = 0;
        this.img = "";
        this.creator = "";
        this.like = [];
        this.unlike = [];
        this.text = "";
        this.selects = [];
        this.lastSelect = 0;
        this.isOver = 0;
        this.danmu = [];
        this.game = 0;
        this.isEdit = 1;
        this.music = "";
    }
};

Chapter.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var Danmu = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;
        this.time = obj.time;
        this.creator = obj.creator;
        this.text = obj.text;
        this.color = obj.color;
        this.chapter = obj.chapter;
    } else {
        this.chapter = 0;
        this.id = 0;
        this.time = 0;
        this.creator = "";
        this.text = "";
        this.color = "";
    }
};

Danmu.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var User = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.avatar = obj.avatar;
        this.name = obj.name;
        this.gameHistory = obj.gameHistory;
        this.danmu = obj.danmu;
        this.likeGame = obj.likeGame;
        this.myGame = obj.myGame;
        this.myEditGame = obj.myEditGame;
        this.myChapter = obj.myChapter;
    } else {
        this.avatar = "";
        this.name = "";
        this.gameHistory = [];
        this.danmu = [];
        this.likeGame = [];
        this.myGame = [];
        this.myEditGame = [];
        this.myChapter = [[]];
    }
};

User.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var GameHistory = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.time = obj.time;
        this.game = obj.game;
        this.chapter = obj.chapter;
        this.id = obj.id;
    } else {
        this.time = 0;
        this.game = 0;
        this.chapter = 0;
        this.id = 0;
    }
};

GameHistory.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var GameType = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.name = obj.name;
        this.game = obj.game;
    } else {
        this.name = "";
        this.game = [];
    }
};

GameType.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var Galgame = function () {

    LocalContractStorage.defineMapProperty(this, "game", {

        parse: function (text) {

            return new Game(text);

        },

        stringify: function (o) {

            return o.toString();

        }

    });

    LocalContractStorage.defineMapProperty(this, "select", {

        parse: function (text) {

            return new Select(text);

        },

        stringify: function (o) {

            return o.toString();

        }

    });

    LocalContractStorage.defineMapProperty(this, "user", {

        parse: function (text) {

            return new User(text);

        },

        stringify: function (o) {

            return o.toString();

        }

    });

    LocalContractStorage.defineMapProperty(this, "typeId");

    LocalContractStorage.defineMapProperty(this, "chapter", {

        parse: function (text) {

            return new Chapter(text);

        },

        stringify: function (o) {

            return o.toString();

        }

    });

    LocalContractStorage.defineMapProperty(this, "danmu", {

        parse: function (text) {

            return new Danmu(text);

        },

        stringify: function (o) {

            return o.toString();

        }

    });


    LocalContractStorage.defineMapProperty(this, "history", {

        parse: function (text) {

            return new GameHistory(text);

        },

        stringify: function (o) {

            return o.toString();

        }

    });

    LocalContractStorage.defineMapProperty(this, "gameType", {

        parse: function (text) {

            return new GameType(text);

        },

        stringify: function (o) {

            return o.toString();

        }

    });

    LocalContractStorage.defineProperty(this, "gameSize");
    LocalContractStorage.defineProperty(this, "chapterSize");
    LocalContractStorage.defineProperty(this, "selectSize");
    LocalContractStorage.defineProperty(this, "typeSize");
    LocalContractStorage.defineProperty(this, "danmuSize");
    LocalContractStorage.defineProperty(this, "historySize");
    LocalContractStorage.defineProperty(this, "userSize");
    LocalContractStorage.defineProperty(this, "authorSize");
};

Galgame.prototype = {

    init: function () {
        this.gameSize = 0;
        this.chapterSize = 0;
        this.selectSize = 0;
        this.typeSize = 0;
        this.danmuSize = 0;
        this.historySize = 0;
        this.userSize = 0;
        this.authorSize = 0;
    },

    aUser: function (name, avatar) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);

        user.name = name;
        user.avatar = avatar;

        this.user.set(from, user);
        this.userSize++;
    },

    userData: function () {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        var userData = new Object();
        userData.name = user.name;
        userData.avatar = user.avatar;
        userData.gameSize = user.gameHistory.length;
        userData.likeSize = user.likeGame.length;
        userData.danmuSize = user.danmu.length;
        userData.mySize = user.myGame.length;
        userData.editSize = user.myEditGame.length;
        return userData;
    },

    userGameHistory: function (begin, end) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        var size = user.gameHistory.length;
        end = this._pagingMaker(begin, end, size);
        var array = [];
        for (var i = begin; i < end; i++) {
            var gameHistory = this.history.get(user.gameHistory[i]);
            var game =this.game.get(gameHistory.game);
            game.liked = game.like.indexOf(from)==-1?0:1;
            game.unliked = game.unlike.indexOf(from)==-1?0:1;
            game.like = game.like.length;
            game.unlike = game.unlike.length;
            var creator = this._userExist(game.creator);
            game.creator = creator.name;
            gameHistory.game = game;
            gameHistory.chapter = this.chapter.get(gameHistory.chapter);
            array.push(gameHistory);
        }
        return array;
    },

    userLike: function (begin, end) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        var size = user.likeGame.length;
        end = this._pagingMaker(begin, end, size);
        var array = [];
        for (var i = begin; i < end; i++) {
            var game =this.game.get(user.likeGame[i]);
            game.liked = game.like.indexOf(from)==-1?0:1;
            game.unliked = game.unlike.indexOf(from)==-1?0:1;
            game.like = game.like.length;
            game.unlike = game.unlike.length;
            game.creator = this.user.get(game.creator).name;
            array.push(game);
        }
        return array;
    },

    userGame: function (begin, end) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        var size = user.myGame.length;
        end = this._pagingMaker(begin, end, size);
        var array = [];
        for (var i = begin; i < end; i++) {
            var game = this.game.get(user.myGame[i]);
            game.liked = game.like.indexOf(from)==-1?0:1;
            game.unliked = game.unlike.indexOf(from)==-1?0:1;
            game.like = game.like.length;
            game.unlike = game.unlike.length;
            game.creator = user.name;
            array.push(game);
        }
        return array;
    },

    userEditGame: function (begin, end) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        var size = user.myEditGame.length;
        end = this._pagingMaker(begin, end, size);
        var array = [];
        for (var i = begin; i < end; i++) {
            var game = this.game.get(user.myEditGame[i]);
            game.liked = game.like.indexOf(from)==-1?0:1;
            game.unliked = game.unlike.indexOf(from)==-1?0:1;
            game.like = game.like.length;
            game.unlike = game.unlike.length;
            game.creator = user.name;
            game.editChapter = user.myChapter[game.id].length;
            array.push(game);
        }
        return array;
    },

    userEditGameChapter: function (begin,end,gameId) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        if(!user.myChapter[gameId]){
            return;
        }
        var size = user.myChapter[gameId].length;
        end = this._pagingMaker(begin, end, size);
        var array = [];
        for (var i = begin; i < end; i++) {
            var game = this.chapter.get(user.myChapter[gameId][i]);
            game.like = game.like.length;
            game.unlike = game.unlike.length;
            game.lastChapter = this.select.get(game.lastChapter);
            array.push(game);
        }
        return array;
    },

    aGame: function (title, titleImg, description, isEdit, type, cText, cImg) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);

        var game = new Game();
        var gameId = this.gameSize;
        var chapterId = this.chapterSize;
        game.title = title;
        game.titleImg = titleImg;
        game.description = description;
        game.creator = from;
        game.id = gameId;
        game.startChapter = chapterId;
        game.type = type;
        game.like = [];
        game.unlike = [];
        game.chapter = 1;
        game.editor = [];
        game.editor.push(from);

        var chapter = new Chapter();
        chapter.id = chapterId;
        chapter.img = cImg;
        chapter.creator = from;
        chapter.game = gameId;
        chapter.text = cText;
        chapter.like = [];
        chapter.unlike = [];
        chapter.selects = [];
        chapter.lastSelect = -1;
        chapter.isEdit = isEdit;
        chapter.isOver = 0;
        chapter.danmu = [];

        if (type) {
            for (var i = 0; i < type.length; i++) {
                var preType = this.gameType.get(type[i]);
                if (!preType) {
                    preType = new GameType();
                    preType.name = type[i];
                    preType.game = [];
                    this.typeId.set(this.typeSize,type[i]);
                    this.typeSize++;
                }
                preType.game.unshift(gameId);
                this.gameType.set(type[i], preType);
            }
        }

        user.myGame.unshift(gameId);
        user.myEditGame.unshift(gameId);
        user.myChapter[gameId] = new Array();
        user.myChapter[gameId].unshift(chapter.id);

        this.gameSize++;
        this.chapterSize++;
        this.game.set(gameId, game);
        this.chapter.set(chapterId, chapter);
        this.user.set(from, user);
        if (user.myEditGame.length == 0 && user.myGame.length == 0) {
            this.authorSize++;
        }
    },

    cGame: function (id, titleImg, description, type) {
        var from = Blockchain.transaction.from;
        var game = this._gameExist(id);
        if (game.creator != from) {
            throw new Error("not the author");
        }
        game.titleImg = titleImg;
        game.description = description;
        for (var i = 0; i < game.type.length; i++) {
            var preType = this.gameType.get(game.type[i]);
            if (!preType) {
                preType = new GameType();
                preType.name = game.type[i];
                preType.game = [];
            }
            this._remove(preType.game, id);
            this.gameType.set(game.type[i], preType);
        }
        if (type) {
            for (var i = 0; i < type.length; i++) {
                var preType = this.gameType.get(type[i]);
                if (!preType) {
                    preType = new GameType();
                    preType.name = type[i];
                    preType.game = [];
                    this.typeId.set(this.typeSize,type[i]);
                    this.typeSize++;
                }
                preType.game.unshift(id);
                this.gameType.set(type[i], preType);
            }
        }
        game.type = type;
        this.game.set(id, game);
    },

    gGameSize: function () {
        return this.gameSize;
    },

    games: function (begin, end) {
        var from = Blockchain.transaction.from;
        var size = this.gameSize;
        end = this._pagingMaker(begin, end, size);
        var array = [];
        for (var i = begin; i < end; i++) {
            var game = this.game.get(i);
            game.liked = game.like.indexOf(from)==-1?0:1;
            game.unliked = game.unlike.indexOf(from)==-1?0:1;
            game.like = game.like.length;
            game.unlike = game.unlike.length;
            var creator = this._userExist(game.creator);
            game.creator = creator.name;
            array.push(game);
        }
        return array;
    },

    typeGames: function (begin, end, name) {
        var from = Blockchain.transaction.from;
        var type = this.gameType.get(name);
        if (!type) {
            throw new Error("no such type");
        }
        var size = type.game.length;
        end = this._pagingMaker(begin, end, size);
        var array = [];
        for (var i = begin; i < end; i++) {
            var game = this.game.get(type.game[i]);
            game.liked = game.like.indexOf(from)==-1?0:1;
            game.unliked = game.unlike.indexOf(from)==-1?0:1;
            game.like = game.like.length;
            game.unlike = game.unlike.length;
            var creator = this._userExist(game.creator);
            game.creator = creator.name;
            array.push(game);
        }
        return array;
    },

    gTypeSize: function(){
        return this.typeSize;
    },

    aSelect: function (preChapter, text, sImg, cImg, sDes, music, isEdit, isOver) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);

        var lastChapter = this._chapterExist(preChapter);

        if (!lastChapter.isEdit&&from!=lastChapter.creator) {
            throw new Error("this chapter can't edit");
        }

        if(lastChapter.isOver){
            throw new Error("the game is over");
        }

        var game = this.game.get(lastChapter.game);

        var select = new Select();
        var selectId = this.selectSize;
        var chapterId = this.chapterSize;
        select.id = selectId;
        select.fromChapter = preChapter;
        select.description = sDes;
        select.img = sImg;
        select.selectNumber = 0;
        select.toChapter = chapterId;
        select.creator = from;


        var chapter = new Chapter();
        chapter.id = chapterId;
        chapter.img = cImg;
        chapter.creator = from;
        chapter.game = lastChapter.game;
        chapter.text = text;
        chapter.like = [];
        chapter.unlike = [];
        chapter.selects = [];
        chapter.lastSelect = selectId;
        chapter.isOver = isOver;
        chapter.danmu = [];
        chapter.music = music;
        chapter.isEdit = isEdit;

        lastChapter.selects.unshift(selectId);
        if(!user.myChapter[lastChapter.game]){
            user.myChapter[lastChapter.game] = new Array();
        }
        user.myChapter[lastChapter.game].unshift(chapter.id);
        if(user.myEditGame.indexOf(lastChapter.game)==-1){
            user.myEditGame.unshift(lastChapter.game);
        }
        if (game.editor.indexOf(from) === -1) {
            game.editor.unshift(from);
        }
        game.chapter++;

        if (user.myEditGame.length == 0 && user.myGame.length == 0) {
            this.authorSize++;
        }
        this.chapter.set(lastChapter.id,lastChapter);
        this.game.set(game.id, game);
        this.selectSize++;
        this.chapterSize++;
        this.select.set(selectId, select);
        this.chapter.set(chapterId, chapter);
        this.user.set(from, user);

    },

    gTypes: function(begin,end){
        var size = this.typeSize;
        var end = this._pagingMaker(begin,end,size);
        var result = [];
        for (var i = begin; i < end; i++) {
            result.push(this.gameType.get(this.typeId.get(i)));
        }
        return result;
    },

    cChapter: function (id, text, sImg, cImg, sDes, music, isEdit, isOver) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        var chapter = this._chapterExist(id);
        if (from != chapter.creator) {
            throw new Error("no chapter creator");
        }
        if(chapter.lastSelect!=-1){
            var select = this.select.get(chapter.lastSelect);
            if (!select) {
                throw new Error("no such select");
            }
            select.description = sDes;
            select.img = sImg;
            this.select.set(select.id, select);
        }

        chapter.img = cImg;
        chapter.text = text;
        chapter.music = music;
        chapter.isEdit = isEdit;
        chapter.isOver = isOver;
        this.chapter.set(id, chapter);
    },

    gGame(id){
        var game = this._gameExist(id);
        var creator = this._userExist(game.creator);
        game.creator = creator.name;
        return game;
    },

    gChapter: function (id, mode, length) {
        var from = Blockchain.transaction.from;
        var chapter = this._chapterExist(id);
        var selects = this.gSelectMode(id, 0, length, mode);
        chapter.selects = selects;
        chapter.danmu = chapter.danmu.length;
        chapter.liked = chapter.like.indexOf(from)==-1?0:1;
        chapter.unliked = chapter.unlike.indexOf(from)==-1?0:1;
        chapter.like = chapter.like.length;
        chapter.unlike = chapter.unlike.length;
        chapter.lastSelect = this.select.get(chapter.lastSelect);
        return chapter;
    },
    //0按时间倒叙,1只读chapter作者,2按热度倒叙,3.随机
    gSelectMode: function (id, begin, length, mode) {
        var chapter = this._chapterExist(id);
        var selects = chapter.selects;
        var orderSelects = [];
        var size = selects.length;
        var end = this._pagingMaker(begin, begin + length, size);
        if (mode === 0) {
            for (var i = begin; i < end; i++) {
                orderSelects.push(this.select.get(selects[i]));
            }
        }

        else if (mode === 1) {
            for (var index in selects) {
                var select = this.select.get(index);
                if (select.creator = chapter.creator) {
                    orderSelects.push(select);
                }
            }
        }

        else if (mode === 2) {
            selects = selects.sort(this._hotSort);
            for (var i = begin; i < end; i++) {
                orderSelects.push(this.select.get(selects[i]));
            }
        }

        else {
            var exist = [];
            while (exist.length < length) {
                var index = this._getRandom(size);
                if (exist.indexOf(index) === -1) {
                    exist.push(index);
                    orderSelects.push(this.select.get(index));
                }
            }
        }
        return orderSelects;
    },

    aDanmu: function (id, text, color) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        var chapter = this._chapterExist(id);
        var danmuId = this.danmuSize;
        var danmu = new Danmu();
        danmu.id = danmuId;
        danmu.time = Date.now();
        danmu.creator = from;
        danmu.text = text;
        danmu.color = color;
        danmu.chapter = id;

        user.danmu.unshift(danmuId);

        chapter.danmu.unshift(danmuId);

        this.user.set(from, user);
        this.danmuSize++;
        this.danmu.set(danmuId, danmu);
        this.chapter.set(id, chapter);
    },

    gDanmu: function (id, begin, end) {
        var chapter = this._chapterExist(id);
        var size = chapter.danmu.length;

        var end = this._pagingMaker(begin, end, size);
        var result = [];
        for (var i = begin; i < end; i++) {
            result.push(this.danmu.get(chapter.danmu[i]));
        }
        return result;
    },

    save: function (id) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);

        var chapter = this._chapterExist(id);
        var game = this._gameExist(chapter.game);

        var history = new GameHistory();
        history.game = game.id;
        history.chapter = id;
        history.time = Date.now();
        history.id = this.historySize;

        user.gameHistory.unshift(this.historySize);

        while (true) {
            if (chapter.lastSelect === -1) {
                break;
            }
            var lastSelect = this.select.get(chapter.lastSelect);
            lastSelect.selectNumber++;
            this.select.set(lastSelect.id, lastSelect);
            chapter = this.chapter.get(lastSelect.fromChapter);
        }

        this.history.set(history.id, history);
        this.historySize++;
        this.user.set(from, user);
    },

    likeChapter: function (id) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        var chapter = this._chapterExist(id);
        var index = chapter.like.indexOf(from);
        if (index === -1) {
            chapter.like.unshift(from);
        } else {
            chapter.like.splice(index, 1);
        }
        this.chapter.set(id, chapter);
    },

    unlikeChapter: function (id) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        var chapter = this._chapterExist(id);
        var index = chapter.unlike.indexOf(from);
        if (index === -1) {
            chapter.unlike.unshift(from);
        } else {
            chapter.unlike.splice(index, 1);
        }
        this.chapter.set(id, chapter);
    },

    likeGame: function (id) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        var game = this._gameExist(id);
        var index = game.like.indexOf(from);
        if (index === -1) {
            game.like.unshift(from);
            user.likeGame.unshift(id);
        } else {
            user.likeGame.splice(user.likeGame.indexOf(id),1);
            game.like.splice(index, 1);
        }

        this.user.set(from,user);
        this.game.set(id, game);
    },

    unlikeGame: function (id) {
        var from = Blockchain.transaction.from;
        var user = this._userExist(from);
        var game = this._gameExist(id);
        var index = game.unlike.indexOf(from);
        if (index === -1) {
            game.unlike.unshift(from);
        } else {
            game.unlike.splice(index, 1);
        }
        this.game.set(id, game);
    },

    replyHistory: function (id){
        var chapter = this._chapterExist(id);
        var array = [];
        while(chapter){
            var select = this.select.get(chapter.lastSelect);
            var data = new Object();
            data.chapterDes = chapter.text;
            data.chapterImg = chapter.img;
            if(select){
                data.selectDes = select.description;
                data.selectImg = select.img;
                chapter = this.chapter.get(select.fromChapter);
                array.unshift(data);
            }else{
                array.unshift(data);
                break;
            }
        }
        return array;
    },

    _getRandom: function (max) {
        var r = Math.random() * (max);
        var re = Math.round(r);
        re = Math.min(re, max);
        return re;
    },

    _hotSort(select1, select2) {
        var chapter1 = this.chapter.get(select1.toChapter);
        var chapter2 = this.chapter.get(select2.toChapter);
        var select1Num = select1.selectNumber + chapter1.like.length - chapter1.unlike.length;
        var select2Num = select2.selectNumber + chapter2.like.length - chapter2.unlike.length;
        return select1Num - select2Num;
    },

    _remove: function (array, obj) {
        var index = array.indexOf(obj);
        if (index != -1) {
            array.splice(index, 1);
        }
    },

    _pagingMaker: function (begin, end, size) {
        if (begin > end || begin < 0 || begin > size) {
            throw new Error("size error");
        }
        return end > size ? size : end;
    },

    _userExist: function (from) {
        var user = this.user.get(from);
        if (!user) {
            user = new User();
            user.name = "user"+this.userSize;
            user.avatar = "";
            user.gameHistory = [];
            user.danmu = [];
            user.likeGame = [];
            user.myGame = [];
            user.myEditGame = [];
            this.userSize++;
            this.user.set(from,user);
        }

        return user;
    },

    _chapterExist: function (id) {
        var chapter = this.chapter.get(id);
        if (!chapter) {
            throw new Error("no such chapter");
        }
        return chapter;
    },

    _gameExist: function (id) {
        var game = this.game.get(id);
        if (!game) {
            throw new Error("no such game");
        }
        return game;
    }
}

module.exports = Galgame;