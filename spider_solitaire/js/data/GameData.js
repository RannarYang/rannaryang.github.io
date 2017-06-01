/*
* name;
*/
var Grade;
(function (Grade) {
    Grade[Grade["EASY"] = 1] = "EASY";
    Grade[Grade["NATURAL"] = 2] = "NATURAL";
    Grade[Grade["DIFFICULT"] = 4] = "DIFFICULT";
})(Grade || (Grade = {}));
var GameData = (function () {
    function GameData() {
    }
    GameData.init = function (grade) {
        if (grade === void 0) { grade = null; }
        this.n = grade ? grade : this.n;
        this.completeNum = 0;
        this.commandArr = [];
        for (var i = 1; i <= 8; i++) {
            for (var j = 1; j <= 13; j++) {
                this.cards[(i - 1) * 13 + j - 1] = new Card((i % this.n + 1), j);
            }
        }
        this.cards.sort(function () { return 0.5 - Math.random(); });
    };
    GameData.addCommand = function (command) {
        this.commandArr.push(command);
    };
    GameData.popCommand = function () {
        return this.commandArr.pop();
    };
    return GameData;
}());
GameData.completeNum = 0;
GameData.cards = [];
GameData.n = 1;
GameData.commandArr = [];
GameData.stageWidth = 1024;
GameData.stageHeight = 742;
//# sourceMappingURL=GameData.js.map