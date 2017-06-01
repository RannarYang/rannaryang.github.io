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
var MenuBtn = (function (_super) {
    __extends(MenuBtn, _super);
    function MenuBtn(label) {
        var _this = _super.call(this) || this;
        _this.labelStr = '';
        _this.labelStr = label;
        _this.init();
        return _this;
    }
    MenuBtn.prototype.init = function () {
        this.y = 5;
        var hoverRect = this.hoverRect = new Laya.Sprite();
        hoverRect.graphics.drawRect(0, 0, 80, 30, 'rgba(0,0,0,0.5)');
        this.hoverRect.alpha = 0;
        this.addChild(hoverRect);
        var label = this.label = new Laya.Label(this.labelStr);
        label.fontSize = 18;
        label.width = 80;
        label.height = 30;
        label.align = 'center';
        label.valign = 'middle';
        this.width = 80;
        this.height = 30;
        this.addChild(label);
        this.on(Laya.Event.MOUSE_OVER, this, this.mouseOver);
        this.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
    };
    MenuBtn.prototype.mouseOver = function () {
        this.hoverRect.alpha = 0.5;
        this.label.color = '#fff';
    };
    MenuBtn.prototype.mouseOut = function () {
        this.hoverRect.alpha = 0;
        this.label.color = '#000';
    };
    return MenuBtn;
}(Laya.Sprite));
//# sourceMappingURL=MenuBtn.js.map