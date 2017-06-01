var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var CardManageView = (function (_super) {
    __extends(CardManageView, _super);
    function CardManageView() {
        var _this = _super.call(this) || this;
        _this.cardLists = [];
        // tips
        _this.canDragCards = [];
        _this.canDragResults = null;
        _this.nowTipsNum = 0;
        // drag 的bug
        _this.isDrag = false;
        _this.init();
        return _this;
    }
    CardManageView.prototype.init = function () {
        this.blankViews = new Laya.Sprite();
        this.addChild(this.blankViews);
        this.cardViews = new Laya.Sprite();
        this.addChild(this.cardViews);
        this.dragViews = new Laya.Sprite();
        this.addChild(this.dragViews);
        this.destView = new Laya.Sprite();
        this.destView.y = 580;
        this.addChild(this.destView);
        this.fapaiView = new Laya.Sprite();
        this.fapaiView.x = 883;
        this.fapaiView.y = 580;
        this.addChild(this.fapaiView);
        UserDragCommand.init(this, this.cardLists, this.blankViews, this.cardViews, this.destView, this.fapaiView);
        DealCardCommand.init(this, this.cardLists, this.cardViews, this.fapaiView);
        // 加上空位
        var x = 20;
        var y = 5;
        for (var j = 0; j < 10; j++) {
            var blankView = new BlankView(j);
            blankView.x = x;
            blankView.y = y;
            this.blankViews.addChild(blankView);
            x += 101;
        }
        // 显示在界面的牌
        x = 20;
        y = 5;
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 10; j++) {
                this.cardLists[j] = this.cardLists[j] || [];
                var n = i * 10 + j;
                var cardData = GameData.cards[n];
                var cardView = new CardView(cardData);
                cardView.x = x;
                cardView.y = y;
                cardView.col = j;
                cardView.row = i;
                if (i === 5) {
                    cardView.flip();
                }
                this.cardLists[j].push(cardView);
                this.cardViews.addChild(cardView);
                x += 101;
            }
            x = 20;
            y += 5;
        }
        for (var i = 0; i < 10; i++) {
            this.canDragCards[i] = [];
        }
        this.showEnableOperator();
        // 未发的牌
        for (var i = 4; i >= 0; i--) {
            var cardBack = new Laya.Sprite();
            cardBack.loadImage("cards/rear.png");
            cardBack.x = 10 * i;
            this.fapaiView.addChild(cardBack);
        }
        this.fapaiView.getChildAt(this.fapaiView.numChildren - 1).on(Laya.Event.CLICK, this, this.fapai, [0]);
    };
    CardManageView.prototype.showTips = function () {
        console.log('showtips......................................');
        if (this.canDragResults === null) {
            this.canDragResults = [];
            for (var i = 0; i < 10; i++) {
                var lastCard = this.getLast(this.cardLists[i]);
                for (var j = 0; j < 10; j++) {
                    if (i === j)
                        continue;
                    for (var k = 0; k < this.canDragCards[j].length; k++) {
                        if (this.canDragCards[j][k].cardNum + 1 === lastCard.cardNum) {
                            this.canDragResults.push({ lastView: lastCard, nowView: this.canDragCards[j][k] });
                        }
                    }
                }
            }
        }
        // console.log(this.canDragResults);
        for (var i = 0; i < this.canDragResults.length; i++) {
            var canDragResult = this.canDragResults[i];
            console.log('lastCard:', canDragResult.lastView.cardType, canDragResult.lastView.cardNum);
            console.log('nowCard:', canDragResult.nowView.cardType, canDragResult.nowView.cardNum);
        }
        // 显示提示
        if (this.canDragResults.length) {
            if (this.nowTipsNum >= this.canDragResults.length) {
                this.nowTipsNum = 0;
            }
            this.showTipsAnim(this.canDragResults[this.nowTipsNum].lastView, this.canDragResults[this.nowTipsNum].nowView);
            this.nowTipsNum++;
        }
        else {
            // 没有提示
            console.log('没有可以移动的步数');
        }
    };
    CardManageView.prototype.showTipsAnim = function (lastView, nowView) {
        var cardList = this.cardLists[nowView.col];
        for (var i = nowView.row; i < cardList.length; i++) {
            this.blink(cardList[i]);
        }
        this.blink(lastView, 450);
    };
    CardManageView.prototype.blink = function (cardView, delay) {
        if (delay === void 0) { delay = 1; }
        Laya.Tween.to(cardView, { alpha: 0.5 }, 200, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            Laya.Tween.to(cardView, { alpha: 1 }, 200, Laya.Ease.linearNone);
        }), delay);
    };
    CardManageView.prototype.showEnableOperator = function () {
        // 设置可移动的位置
        for (var i = 0; i < 10; i++) {
            this.changeOperator(i);
        }
    };
    CardManageView.prototype.changeOperator = function (i) {
        var cardList = this.cardLists[i];
        var cardListLen = cardList.length;
        if (!cardListLen) {
            return;
        }
        for (var j = cardList.length - 1; j >= 0; j--) {
            var cardView = cardList[j];
            cardView.disableDrag();
        }
        this.canDragCards[i] = [];
        for (var j = cardList.length - 1; j >= 0; j--) {
            var cardView = cardList[j];
            // 设置是否可以拖动...
            if ((j === cardListLen - 1) ||
                (cardView.isShow && cardView.cardType === cardList[cardListLen - 1].cardType && cardView.cardNum === cardList[j + 1].cardNum + 1)) {
                cardView.on(CardViewEvent.STARTDRAG, this, this.drag);
                cardView.on(CardViewEvent.UNDRAG, this, this.unDrag);
                cardView.enableDrag();
                this.canDragCards[i].push(cardView);
            }
            else {
                break;
            }
        }
    };
    CardManageView.prototype.fapai = function (index) {
        // 发牌：
        if (this.hasBlankSeat()) {
            console.log('有空位不能发牌......');
            return;
        }
        // 显示在界面的牌
        var dealCardCommand = new DealCardCommand(index);
        GameData.commandArr.push(dealCardCommand);
        dealCardCommand.execute();
    };
    /**
     * 获取该列的最后一张牌
     */
    CardManageView.prototype.getLast = function (arr) {
        if (!arr.length)
            return null;
        return arr[arr.length - 1];
    };
    CardManageView.prototype.drag = function (cardView) {
        var _this = this;
        this.isDrag = true;
        this.dragViews.x = cardView.x;
        this.dragViews.y = cardView.y;
        // 把余下的装进
        var cardList = this.cardLists[cardView.col];
        for (var i = cardView.row; i < cardList.length; i++) {
            cardList[i].x = 0;
            cardList[i].y = (i - cardView.row) * 20;
            this.dragViews.addChild(cardList[i]);
        }
        this.dragViews.startDrag(new Laya.Rectangle(0, 0, GameData.stageWidth - CardView.cardWidth, GameData.stageHeight - CardView.cardHeight));
        this.dragViews.once(Laya.Event.DRAG_END, this, function (e) {
            // this.unDra
            // console.log()
            // console.log(e);
            _this.unDrag(cardView, _this.dragViews.x, _this.dragViews.y);
        });
    };
    CardManageView.prototype.unDrag = function (cardView, stageX, stageY) {
        if (!this.isDrag)
            return;
        console.log(stageX, stageY);
        this.isDrag = false;
        this.dragViews.stopDrag();
        var nowCol = Math.max((Math.floor((stageX - 20) / 101)), 0);
        var lastCardView;
        var upCardNum = 1;
        if (!this.cardLists[nowCol].length) {
            lastCardView = this.blankViews.getChildAt(nowCol);
            upCardNum = 0;
        }
        else {
            lastCardView = this.cardLists[nowCol][this.cardLists[nowCol].length - 1];
        }
        if (lastCardView.colDetection(this.dragViews) && lastCardView.canMove(cardView)) {
            this.canDragResults = null;
            // // 可以移动
            var col = cardView.col;
            // // 移动的牌
            var userDragCommand = new UserDragCommand(cardView.row, cardView.col, nowCol);
            userDragCommand.execute();
            GameData.commandArr.push(userDragCommand);
            // 判断是否赢
            if (this.isWin()) {
                this.event(CardManageViewEvent.YOU_WIN);
            }
            // 判断是否gameover
            if (this.isGameOver()) {
                console.log('GameOver');
            }
            return;
        }
        else {
            var row = cardView.row;
            var col = cardView.col;
            var firstYAdd = 0;
            if (row - 1 >= 0) {
                lastCardView = this.cardLists[col][row - 1];
                firstYAdd = lastCardView.isShow ? 20 : 5;
            }
            else {
                lastCardView = this.blankViews.getChildAt(col);
                firstYAdd = 0;
            }
            // 移动的牌
            for (var i = row; i < this.cardLists[col].length; i++) {
                var cardViewNow = this.cardLists[col][i];
                cardViewNow.row = lastCardView.getRow() + 1 + i - row;
                cardViewNow.col = lastCardView.getCol();
                cardViewNow.x = lastCardView.getX();
                cardViewNow.y = lastCardView.getY() + firstYAdd + (i - row) * 20;
                this.cardViews.addChild(cardViewNow);
            }
            this.changeOperator(col);
        }
    };
    CardManageView.prototype.hasBlankSeat = function () {
        for (var i = 0; i < 10; i++) {
            if (this.cardLists[i].length <= 0) {
                return true;
            }
        }
    };
    CardManageView.prototype.isWin = function () {
        return GameData.completeNum === 8;
    };
    CardManageView.prototype.isGameOver = function () {
        // 判断是否gameover
        if (this.fapaiView.numChildren)
            return false;
        // 判断是否还有相邻的
    };
    return CardManageView;
}(Laya.Sprite));
//# sourceMappingURL=CardManageView.js.map