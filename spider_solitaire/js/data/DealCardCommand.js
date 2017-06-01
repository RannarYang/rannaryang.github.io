/*
* name;
*/
var DealCardCommand = (function () {
    function DealCardCommand(index) {
        this.index = index;
    }
    DealCardCommand.init = function (cardManageView, cardLists, cardViews, fapaiView) {
        this.cardManageView = cardManageView;
        this.cardLists = cardLists;
        this.cardViews = cardViews;
        this.fapaiView = fapaiView;
    };
    DealCardCommand.prototype.execute = function () {
        var index = this.index;
        var x = 20;
        var i = 6 + index;
        var col = index === 4 ? 4 : 10;
        for (var j = 0; j < col; j++) {
            var n = i * 10 + j;
            var cardData = GameData.cards[n];
            var cardView = new CardView(cardData);
            cardView.x = x;
            cardView.y = DealCardCommand.cardLists[j][DealCardCommand.cardLists[j].length - 1].y + 15;
            cardView.col = j;
            cardView.row = DealCardCommand.cardLists[j].length;
            cardView.flip();
            DealCardCommand.cardLists[j].push(cardView);
            DealCardCommand.cardViews.addChild(cardView);
            x += 101;
        }
        DealCardCommand.fapaiView.removeChildAt(DealCardCommand.fapaiView.numChildren - 1);
        if (DealCardCommand.fapaiView.numChildren) {
            DealCardCommand.fapaiView.getChildAt(DealCardCommand.fapaiView.numChildren - 1).once(Laya.Event.CLICK, this, DealCardCommand.cardManageView.fapai.bind(DealCardCommand.cardManageView), [index + 1]);
        }
        DealCardCommand.cardManageView.showEnableOperator();
    };
    DealCardCommand.prototype.undo = function () {
        var index = this.index;
        var i = 6 + index;
        var col = index === 4 ? 4 : 10;
        for (var j = 0; j < col; j++) {
            var cardView = DealCardCommand.cardLists[j].pop();
            DealCardCommand.cardViews.removeChild(cardView);
        }
        if (DealCardCommand.fapaiView.numChildren) {
            DealCardCommand.fapaiView.getChildAt(DealCardCommand.fapaiView.numChildren - 1).offAll();
        }
        var cardBack = new Laya.Sprite();
        cardBack.loadImage("cards/rear.png");
        cardBack.x = 10 * index;
        DealCardCommand.fapaiView.addChild(cardBack);
        DealCardCommand.fapaiView.getChildAt(DealCardCommand.fapaiView.numChildren - 1).once(Laya.Event.CLICK, this, DealCardCommand.cardManageView.fapai.bind(DealCardCommand.cardManageView), [index]);
        DealCardCommand.cardManageView.showEnableOperator();
    };
    return DealCardCommand;
}());
DealCardCommand.cardLists = [];
//# sourceMappingURL=DealCardCommand.js.map