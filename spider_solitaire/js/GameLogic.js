/*
* name;
*/
var GameLogic = (function () {
    function GameLogic() {
        Laya.init(GameData.stageWidth, GameData.stageHeight);
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        laya.utils.Stat.show(0, 0);
        Laya.stage.frameRate = "mouse";
        Laya.stage.bgColor = '#00701A';
        this.load();
    }
    GameLogic.prototype.load = function () {
        var res = [
            { url: "res/atlas/cards.json", type: Laya.Loader.ATLAS },
            { url: "res/atlas/menu.json", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(res, null, Laya.Handler.create(this, this.onLoaded, null, false));
    };
    GameLogic.prototype.onLoaded = function (data) {
        if (data === 1) {
            Laya.timer.once(1000, this, this.init);
        }
    };
    GameLogic.prototype.init = function () {
        GameData.init(Grade.EASY);
        var cardManageView = this.cardManageView = new CardManageView();
        cardManageView.on(CardManageViewEvent.YOU_WIN, this, this.youWin);
        cardManageView.y = 40;
        Laya.stage.addChild(cardManageView);
        // add menu
        var menuView = this.menuView = new MenuView();
        menuView.on(MenuViewEvent.TAP_REPLAY_BTN, this, this.tap_replay);
        menuView.on(MenuViewEvent.TAP_STEPBACKWARD_BTN, this, this.tap_stepBackward);
        menuView.on(MenuViewEvent.TAP_TIPS_BTN, this, this.tap_tips);
        menuView.on(MenuViewEvent.TAP_EASY_BTN, this, this.tap_easy);
        menuView.on(MenuViewEvent.TAP_NATURAL_BTN, this, this.tap_natural);
        menuView.on(MenuViewEvent.TAP_DIFFICULT_BTN, this, this.tap_difficult);
        Laya.stage.addChild(menuView);
        var youWinView = this.youWinView = new YouWinView();
        youWinView.y = 40;
        youWinView.visible = false;
        Laya.stage.addChild(youWinView);
    };
    GameLogic.prototype.tap_replay = function () {
        GameData.init();
        this.replay();
    };
    GameLogic.prototype.tap_stepBackward = function () {
        var command = GameData.popCommand();
        command && command.undo();
    };
    GameLogic.prototype.tap_tips = function () {
        this.cardManageView.showTips();
    };
    GameLogic.prototype.tap_easy = function () {
        GameData.init(Grade.EASY);
        this.replay();
    };
    GameLogic.prototype.tap_natural = function () {
        GameData.init(Grade.NATURAL);
        this.replay();
    };
    GameLogic.prototype.tap_difficult = function () {
        GameData.init(Grade.DIFFICULT);
        this.replay();
    };
    GameLogic.prototype.replay = function () {
        this.youWinView.visible = false;
        Laya.stage.removeChild(this.cardManageView);
        var cardManageView = this.cardManageView = new CardManageView();
        cardManageView.y = 40;
        Laya.stage.addChild(cardManageView);
    };
    GameLogic.prototype.youWin = function () {
        this.youWinView.visible = true;
    };
    return GameLogic;
}());
new GameLogic();
//# sourceMappingURL=GameLogic.js.map