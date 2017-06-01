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
var BlankView = (function (_super) {
    __extends(BlankView, _super);
    function BlankView(col) {
        var _this = _super.call(this) || this;
        _this._col = col;
        _this.init();
        return _this;
    }
    BlankView.prototype.colDetection = function (sprite) {
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
    BlankView.prototype.canMove = function () {
        return true;
    };
    BlankView.prototype.init = function () {
        //自定义路径
        var arc = 3;
        var width = 71;
        var height = 96;
        var path = [
            ["moveTo", 0, 0],
            ["arcTo", width, 0, width, arc, arc],
            ["arcTo", width, height, width - arc, height, arc],
            ["arcTo", 0, height, 0, height - arc, arc],
            ["arcTo", 0, 0, arc, 0, arc],
        ];
        //绘制圆角矩形
        this.graphics.drawPath(0, 0, path, { fillStyle: "#ffffff", lineColor: "#ffffff", lineWidth: 2 });
    };
    BlankView.prototype.getX = function () {
        return this.x;
    };
    BlankView.prototype.getY = function () {
        return this.y;
    };
    BlankView.prototype.getCol = function () {
        return this._col;
    };
    BlankView.prototype.getRow = function () {
        return -1;
    };
    return BlankView;
}(Laya.Sprite));
//# sourceMappingURL=BlankView.js.map