// /*
// * name;
// */
// class CardManageView extends Laya.Sprite {
//     private cardLists: CardView[][] = [];
//     private cardViews: Laya.Sprite;
//     private dragViews: Laya.Sprite;
//     private destView: Laya.Sprite;
//     private fapaiView: Laya.Sprite;
//     constructor(){
//         super();
//         this.init();
//     }
//     private init() {
//         this.cardViews = new Laya.Sprite();
//         this.addChild(this.cardViews);
//         this.dragViews = new Laya.Sprite();
//         this.addChild(this.dragViews);
//         this.destView = new Laya.Sprite();
//         this.destView.y = 450;
//         this.addChild(this.destView);
//         this.fapaiView = new Laya.Sprite();
//         this.fapaiView.x = 883;
//         this.fapaiView.y = 580;
//         this.addChild(this.fapaiView);
//         // 显示在界面的牌
//         let x = 20;
//         let y = 5;
//         for (let i = 0; i < 6; i++) {
//             for (let j = 0; j < 10; j++) {
//                 this.cardLists[j] = this.cardLists[j] || [];
//                 let n = i * 10 + j;
//                 let cardData = GameData.cards[n];
//                 let cardView = new CardView(cardData);
//                 cardView.x = x;
//                 cardView.y = y;
//                 cardView.col = j;
//                 cardView.row = i;
//                 if (i === 5) {
//                     cardView.flip();
//                 }
//                 this.cardLists[j].push(cardView);
//                 this.cardViews.addChild(cardView);
//                 x += 101;
//             }
//             x = 20;
//             y += 5;
//         }
//         this.showEnableOperator();
//         // 未发的牌
//         for (let i = 3; i >= 0; i--) {
//             let cardBack = new Laya.Sprite();
//             cardBack.loadImage("cards/rear.png");
//             cardBack.x = 10 * i;
//             this.fapaiView.addChild(cardBack);
//         }
//         this.fapaiView.getChildAt(this.fapaiView.numChildren - 1).on(Laya.Event.CLICK, this, this.fapai, [0]);
//     }
//     private showEnableOperator() {
//         // 设置可移动的位置
//         for (let i = 0; i < 10; i++) {
//             this.changeOperator(i);
//         }
//     }
//     private changeOperator(i: number) {
//         let cardList = this.cardLists[i];
//         for (let j = cardList.length - 1; j >= 0; j--) {
//             let cardView = cardList[j];
//             cardView.disableDrag();
//         }
//         let cardListLen = cardList.length;
//         // 设置最后一个元素可拖动
//         // cardList[cardListLen - 1].disableDrag();
//         cardList[cardListLen - 1].on(CardViewEvent.STARTDRAG, this, this.drag);
//         cardList[cardListLen - 1].on(CardViewEvent.UNDRAG, this, this.unDrag);
//         cardList[cardListLen - 1].enableDrag();
//         let stop = false;
//         for (let j = cardList.length - 2; j >= 0; j--) {
//             let cardView = cardList[j];
//             // cardView.disableDrag();
//             if (stop === true) {
//                 continue;
//             }
//             // 设置是否可以拖动...
//             if (cardView.isShow && cardView.cardType === cardView.cardType && cardView.cardNum === cardList[j + 1].cardNum + 1) {
//                 console.log('..............', j);
//                 cardView.on(CardViewEvent.STARTDRAG, this, this.drag);
//                 cardView.on(CardViewEvent.UNDRAG, this, this.unDrag);
//                 cardView.enableDrag();
//             } else {
//                 // break;
//                 console.log('stop...............');
//                 stop = true;
//             }
//         }
//     }
//     private fapai(index) {
//         console.log(index);
//         // 发牌：
//         this.deal(index);
//         this.fapaiView.removeChildAt(this.fapaiView.numChildren - 1);
//         if(this.fapaiView.numChildren) {
//             this.fapaiView.getChildAt(this.fapaiView.numChildren - 1).once(Laya.Event.CLICK, this, this.fapai, [index + 1]);
//         }
//     }
//     private drag(cardView: CardView) {
//         console.log('drag................................');
//         this.dragViews.removeChildren();
//         this.dragViews.x = cardView.x;
//         this.dragViews.y = cardView.y;
//         // 把余下的装进
//         let cardList = this.cardLists[cardView.col];
//         for (let i = cardView.row; i < cardList.length; i++) {
//             cardList[i].x = 0;
//             cardList[i].y = (i-cardView.row) * 15;
//             this.dragViews.addChild(cardList[i]);
//         }
//         this.dragViews.startDrag();
//     }
//     private unDrag(cardView: CardView, stageX, stageY) {
//         this.dragViews.stopDrag();
//         let nowCol = (Math.floor((stageX - 20) / 101));
//         // 获得当前所在的列
//         let lastCardView = this.cardLists[nowCol][this.cardLists[nowCol].length - 1];
//         if (lastCardView.hitTestPoint(stageX, stageY)) {
//             if (lastCardView.cardType === cardView.cardType && lastCardView.cardNum === cardView.cardNum + 1) {
//                 // 可以移动
//                 let row = cardView.row;
//                 let col = cardView.col;
//                 // 移动的牌
//                 for (let i = row; i < this.cardLists[col].length; i++) {
//                     let cardViewNow = this.cardLists[col][i];
//                     cardViewNow.row = lastCardView.row + 1 + i - row;
//                     cardViewNow.col = lastCardView.col;
//                     cardViewNow.x = lastCardView.x;
//                     cardViewNow.y = lastCardView.y + (1 + i - row) * 15;
//                     this.cardLists[lastCardView.col].push(cardViewNow);
//                     this.cardViews.addChild(cardViewNow);
//                 }
//                 this.cardLists[col].splice(row);
//                 // 判断是否可以收牌
//                 let card = this.cardLists[col][this.cardLists[col].length - 1];
//                 if (card.cardNum === 1) {
//                     console.log(card.cardNum);
//                     for (let i = this.cardLists[col].length - 2; i >= 0; i--) {
//                         if (this.cardLists[col][i].cardType === card.cardType && this.cardLists[col][i].cardNum === card.cardNum + (this.cardLists[col].length - 1 - i)){
//                             console.log('this.cardLists[col][i].cardNum: ', this.cardLists[col][i].cardNum);
//                             if (this.cardLists[col][i].cardNum === 13) {
//                                 // 可以收牌
//                                 console.log('收牌收牌.......');
//                                 for (let j = 0; j < 13; j++) {
//                                     let cardView = this.cardLists[col][this.cardLists[col].length - 1 -j];
//                                     cardView.x = 0;
//                                     cardView.y = 0;
//                                     this.destView.addChild(cardView);
//                                 }
//                                 this.cardLists[col].splice(13);
//                             }
//                         } else {
//                             break;
//                         }
//                     }
//                 }
//                 if (this.cardLists[col].length) {
//                     let lastCard = this.cardLists[col][this.cardLists[col].length - 1];
//                     if (lastCard.isShow === false) {
//                         lastCard.flip();
//                     }
//                 }
//                 this.changeOperator(col);
//                 this.changeOperator(nowCol);
//                 return;
//             }
//         }
//         console.log('....................... return......................');
//         let row = cardView.row;
//         let col = cardView.col;
//         console.log('row: ', row);
//         console.log('col: ', col);
//         lastCardView = this.cardLists[col][row - 1];
//         if (lastCardView) {
//             console.log('lastCardView: ', lastCardView);
//             let firstYAdd = lastCardView.isShow ? 15 : 5;
//             // 移动的牌
//             for (let i = row; i < this.cardLists[col].length; i++) {
//                 let cardViewNow = this.cardLists[col][i];
//                 cardViewNow.row = lastCardView.row + 1 + i - row;
//                 cardViewNow.col = lastCardView.col;
//                 cardViewNow.x = lastCardView.x;
//                 cardViewNow.y = lastCardView.y + firstYAdd + (i - row) * 15;
//                 this.cardViews.addChild(cardViewNow);
//             }
//             this.changeOperator(col);
//         }
//     }
//     private deal(index) {
//         // 显示在界面的牌
//         let x = 20;
//         let i = 6 + index;
//         for (let j = 0; j < 10; j++) {
//             let n = i * 10 + j;
//             let cardData = GameData.cards[n];
//             let cardView = new CardView(cardData);
//             cardView.x = x;
//             cardView.y = this.cardLists[j][this.cardLists[j].length - 1].y + 15;
//             cardView.col = j;
//             cardView.row = i;
//             cardView.flip();
//             this.cardLists[j].push(cardView);
//             this.cardViews.addChild(cardView);
//             x += 101;
//         }
//         console.log(this.cardLists);
//         this.showEnableOperator();
//     }
// }
//# sourceMappingURL=CardManageView.1.js.map