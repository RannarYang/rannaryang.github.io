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
var CardView = (function (_super) {
    __extends(CardView, _super);
    function CardView(cardData) {
        var _this = _super.call(this) || this;
        _this._card = cardData;
        _this.init();
        return _this;
    }
    CardView.prototype.colDetection = function (sprite) {
        var x1 = sprite.x;
        var y1 = sprite.y;
        var x2 = sprite.x + CardView.cardWidth;
        var y2 = sprite.y + CardView.cardHeight;
        var x3 = this.x;
        var y3 = this.y;
        var x4 = this.x + CardView.cardWidth;
        var y4 = this.y + CardView.cardHeight;
        return !((x1 > x4 || x2 < x3) || (y1 > y4 || y2 < y3));
    };
    CardView.prototype.canMove = function (cardView) {
        console.log(this.cardNum, cardView.cardNum);
        return this.cardNum === cardView.cardNum + 1;
    };
    Object.defineProperty(CardView.prototype, "card", {
        get: function () {
            return this._card;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardView.prototype, "cardNum", {
        get: function () {
            return this.card.cardNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardView.prototype, "cardType", {
        get: function () {
            return this.card.cardType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardView.prototype, "col", {
        get: function () {
            return this._col;
        },
        set: function (col) {
            this._col = col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardView.prototype, "row", {
        get: function () {
            return this._row;
        },
        set: function (row) {
            this._row = row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardView.prototype, "isShow", {
        get: function () {
            return this._isShow;
        },
        enumerable: true,
        configurable: true
    });
    CardView.prototype.init = function () {
        this._isShow = false;
        this.loadImage("cards/rear.png");
    };
    CardView.prototype.flip = function () {
        this._isShow = true;
        this.texture = Laya.loader.getRes("cards/" + this.card.cardType + '-' + this.card.cardNum + '.png');
    };
    CardView.prototype.unFlip = function () {
        this._isShow = false;
        this.texture = Laya.loader.getRes("cards/rear.png");
    };
    CardView.prototype.disableDrag = function () {
        this.offAll();
    };
    CardView.prototype.enableDrag = function () {
        var _this = this;
        this.on(Laya.Event.MOUSE_DOWN, this, function (e) {
            _this.event(CardViewEvent.STARTDRAG, [_this]);
            _this.on(Laya.Event.MOUSE_UP, _this, _this.unDrag);
        });
    };
    CardView.prototype.unDrag = function (e) {
        this.off(Laya.Event.MOUSE_UP, this, this.unDrag);
        this.event(CardViewEvent.UNDRAG, [this, e.stageX, e.stageY]);
    };
    CardView.prototype.getX = function () {
        return this.x;
    };
    CardView.prototype.getY = function () {
        return this.y;
    };
    CardView.prototype.getRow = function () {
        return this.row;
    };
    CardView.prototype.getCol = function () {
        return this.col;
    };
    return CardView;
}(Laya.Sprite));
CardView.cardWidth = 71;
CardView.cardHeight = 96;
//# sourceMappingURL=CardView.js.map