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
var MenuView = (function (_super) {
    __extends(MenuView, _super);
    function MenuView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    MenuView.prototype.init = function () {
        this.replayBtn = new MenuBtn('开局');
        this.replayBtn.x = 20;
        this.replayBtn.on(Laya.Event.CLICK, this, this.tapReplayBtn);
        this.addChild(this.replayBtn);
        this.stepBackwardBtn = new MenuBtn('后退一步');
        this.stepBackwardBtn.x = 120;
        this.stepBackwardBtn.on(Laya.Event.CLICK, this, this.tapStepBackwardBtn);
        this.addChild(this.stepBackwardBtn);
        this.tipsBtn = new MenuBtn('提示');
        this.tipsBtn.x = 220;
        this.tipsBtn.on(Laya.Event.CLICK, this, this.tapTipsBtn);
        this.addChild(this.tipsBtn);
        this.easyBtn = new MenuBtn('单花色');
        this.easyBtn.x = 320;
        this.easyBtn.on(Laya.Event.CLICK, this, this.tapEasyBtn);
        this.addChild(this.easyBtn);
        this.naturalBtn = new MenuBtn('双花色');
        this.naturalBtn.x = 420;
        this.naturalBtn.on(Laya.Event.CLICK, this, this.tapNaturalBtn);
        this.addChild(this.naturalBtn);
        this.difficultBtn = new MenuBtn('四花色');
        this.difficultBtn.x = 520;
        this.difficultBtn.on(Laya.Event.CLICK, this, this.tapDifficultBtn);
        this.addChild(this.difficultBtn);
    };
    MenuView.prototype.tapReplayBtn = function () {
        this.event(MenuViewEvent.TAP_REPLAY_BTN);
    };
    MenuView.prototype.tapStepBackwardBtn = function () {
        this.event(MenuViewEvent.TAP_STEPBACKWARD_BTN);
    };
    MenuView.prototype.tapTipsBtn = function () {
        this.event(MenuViewEvent.TAP_TIPS_BTN);
    };
    MenuView.prototype.tapEasyBtn = function () {
        this.event(MenuViewEvent.TAP_EASY_BTN);
    };
    MenuView.prototype.tapNaturalBtn = function () {
        this.event(MenuViewEvent.TAP_NATURAL_BTN);
    };
    MenuView.prototype.tapDifficultBtn = function () {
        this.event(MenuViewEvent.TAP_DIFFICULT_BTN);
    };
    return MenuView;
}(ui.MenuUI));
//# sourceMappingURL=MenuView.js.map