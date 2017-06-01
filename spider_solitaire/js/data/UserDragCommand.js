/*
* name;
*/
var UserDragCommand = (function () {
    function UserDragCommand(row, col, nowCol) {
        // 判断是否有翻牌
        this.isFlip = false;
        // 判断是否有收牌
        this.isChangeCard = false;
        this.isChangeFlip = false;
        this.row = row;
        this.col = col;
        this.nowCol = nowCol;
    }
    UserDragCommand.init = function (cardManageView, cardLists, blankViews, cardViews, destView, fapaiView) {
        this.cardManageView = cardManageView;
        this.cardLists = cardLists;
        this.blankViews = blankViews;
        this.cardViews = cardViews;
        this.destView = destView;
        this.fapaiView = fapaiView;
    };
    UserDragCommand.prototype.execute = function () {
        // 执行移动操作
        var row = this.row;
        var col = this.col;
        var nowCol = this.nowCol;
        var moveCardNum = this.moveCardNum = UserDragCommand.cardLists[col].length - row;
        var lastCardView;
        var upCardNum = 1;
        if (!UserDragCommand.cardLists[nowCol].length) {
            lastCardView = UserDragCommand.blankViews.getChildAt(nowCol);
            upCardNum = 0;
        }
        else {
            lastCardView = UserDragCommand.cardLists[nowCol][UserDragCommand.cardLists[nowCol].length - 1];
        }
        // 移动的牌
        for (var i = 0; i < moveCardNum; i++) {
            var cardViewNow = UserDragCommand.cardLists[col][i + row];
            cardViewNow.row = lastCardView.getRow() + 1;
            cardViewNow.col = lastCardView.getCol();
            cardViewNow.x = lastCardView.getX();
            cardViewNow.y = lastCardView.getY() + (upCardNum + i) * 20;
            UserDragCommand.cardLists[lastCardView.getCol()].push(cardViewNow);
            UserDragCommand.cardViews.addChild(cardViewNow);
        }
        UserDragCommand.cardLists[col].splice(row);
        // 确定是否可以收牌
        this.changeCard(nowCol);
        if (UserDragCommand.cardLists[col].length) {
            var lastCard = UserDragCommand.cardLists[col][UserDragCommand.cardLists[col].length - 1];
            if (lastCard.isShow === false) {
                lastCard.flip();
                this.lastCard = lastCard;
                this.isFlip = true;
            }
        }
        UserDragCommand.cardManageView.changeOperator(col);
        UserDragCommand.cardManageView.changeOperator(nowCol);
    };
    UserDragCommand.prototype.undo = function () {
        var col = this.nowCol;
        var nowCol = this.col;
        var moveCardNum = this.moveCardNum;
        console.log('this.cardLists: ', UserDragCommand.cardLists);
        if (this.isChangeCard) {
            if (this.isChangeFlip) {
                this.changeLastCard.unFlip();
            }
            // 把牌还原
            this.unChangeCard(col);
        }
        var upCardNum2 = 0;
        if (this.isFlip) {
            this.lastCard.unFlip();
            upCardNum2 = 10;
        }
        var row = UserDragCommand.cardLists[this.nowCol].length - this.moveCardNum;
        var lastCardView;
        var upCardNum = 1;
        if (!UserDragCommand.cardLists[nowCol].length) {
            lastCardView = UserDragCommand.blankViews.getChildAt(nowCol);
            upCardNum = 0;
        }
        else {
            lastCardView = UserDragCommand.cardLists[nowCol][UserDragCommand.cardLists[nowCol].length - 1];
        }
        // 移动的牌
        console.log('moveCardNum......', moveCardNum);
        for (var i = 0; i < moveCardNum; i++) {
            var cardViewNow = UserDragCommand.cardLists[col][i + row];
            cardViewNow.row = lastCardView.getRow() + 1;
            cardViewNow.col = lastCardView.getCol();
            cardViewNow.x = lastCardView.getX();
            cardViewNow.y = lastCardView.getY() + (upCardNum + i) * 20 - upCardNum2;
            UserDragCommand.cardLists[lastCardView.getCol()].push(cardViewNow);
            UserDragCommand.cardViews.addChild(cardViewNow);
        }
        UserDragCommand.cardLists[col].splice(row);
        UserDragCommand.cardManageView.changeOperator(col);
        UserDragCommand.cardManageView.changeOperator(nowCol);
    };
    UserDragCommand.prototype.changeCard = function (col) {
        var shouPaiNum = 13;
        // 判断是否可以收牌
        var card = UserDragCommand.cardLists[col][UserDragCommand.cardLists[col].length - 1];
        if (card.cardNum === 1) {
            for (var i = UserDragCommand.cardLists[col].length - 2; i >= 0; i--) {
                if (UserDragCommand.cardLists[col][i].cardType === card.cardType && UserDragCommand.cardLists[col][i].cardNum === card.cardNum + (UserDragCommand.cardLists[col].length - 1 - i)) {
                    if (UserDragCommand.cardLists[col][i].cardNum === shouPaiNum) {
                        this.isChangeCard = true;
                        // 可以收牌
                        for (var j = 0; j < shouPaiNum; j++) {
                            var cardView = UserDragCommand.cardLists[col][UserDragCommand.cardLists[col].length - 1 - j];
                            cardView.x = 30 + GameData.completeNum * 10;
                            cardView.y = 0;
                            UserDragCommand.destView.addChild(cardView);
                        }
                        UserDragCommand.cardLists[col].splice(UserDragCommand.cardLists[col].length - shouPaiNum);
                        if (UserDragCommand.cardLists[col].length) {
                            var lastCard = UserDragCommand.cardLists[col][UserDragCommand.cardLists[col].length - 1];
                            if (lastCard.isShow === false) {
                                this.isChangeFlip = true;
                                this.changeLastCard = lastCard;
                                lastCard.flip();
                            }
                        }
                        GameData.completeNum++;
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
        }
    };
    UserDragCommand.prototype.unChangeCard = function (col) {
        var showPaiNum = 13;
        var destView = UserDragCommand.destView;
        var cardList = UserDragCommand.cardLists[col];
        var lastCardView = cardList[cardList.length - 1];
        var upCardNum = 15;
        if (!lastCardView) {
            upCardNum = 0;
        }
        else if (!lastCardView.isShow) {
            upCardNum = 5;
        }
        for (var i = 0; i < showPaiNum; i++) {
            var cardView = destView.removeChildAt(destView.numChildren - 1);
            cardView.x = lastCardView.x;
            cardView.y = lastCardView.y + upCardNum + i * 20;
            UserDragCommand.cardViews.addChild(cardView);
            cardList.push(cardView);
        }
        GameData.completeNum--;
    };
    return UserDragCommand;
}());
UserDragCommand.cardLists = [];
//# sourceMappingURL=UserDragCommand.js.map