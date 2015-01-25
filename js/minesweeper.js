(function() {
    
    var CELL_STATUS = {
        HIDDEN_EMPTY : -1,
        
        REVEALED_EMPTY_0 : 0, 
        REVEALED_EMPTY_1 : 1,
        REVEALED_EMPTY_2 : 2,
        REVEALED_EMPTY_3 : 3,
        REVEALED_EMPTY_4 : 4,
        REVEALED_EMPTY_5 : 5,
        REVEALED_EMPTY_6 : 6,
        REVEALED_EMPTY_7 : 7,
        REVEALED_EMPTY_8 : 8,
        
        HIDDEN_MINE : 10,
        CHECKED : 20,
        QUESTIONED: 30
    };
    
    function MinesweeperGame(hostGameElementId, options) {
        
        var gameSelf = this;  
        var defaultOptions = {
            vCellCount : 30, // vertical cells count
            hCellCount : 30, // horizantal cells count
            /*
                0 1 2 3 - > Horizantal
                1 * * * 
                2 * * * 
                3 * * * 
                |
                V
                Vertical
            */
            minesCount: 40
        };
        
        options = options || {};
                
        this.vCellCount = options.vCellCount || defaultOptions.vCellCount;
        this.hCellCount = options.hCellCount || defaultOptions.hCellCount;
        this.minesCount = options.minesCount || defaultOptions.minesCount;
        this.hostGameElement = document.getElementById(hostGameElementId);
        this.isGameboardInitialized = false;
        
        this.gameBoard = new Array(this.hCellCount);
        for (var i = 0; i < this.hCellCount; i++) {
            this.gameBoard[i] = new Array(this.vCellCount);
        }
         
        this.cellWidth = this.hostGameElement.offsetWidth / this.hCellCount;
        this.cellHeight = this.hostGameElement.offsetHeight / this.vCellCount;
        
        this.utils = {
            isRightMB : function(eventClick) {
                var isRightMB = false;
                var event = eventClick || window.event;

                if ("which" in event) { 
                    // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                    isRightMB = event.which == 3;
                } else if ("button" in event) {
                    // IE, Opera 
                    isRightMB = event.button == 2;
                }
                
                return isRightMB;
            },
            
            cellClick: function(event) {
                var cellCoord = { 
                    cellX : this.cellX,
                    cellY : this.cellY
                };
                
                if (gameSelf.utils.isRightMB(event)) {
                    gameSelf.rightClick(cellCoord);
                } else { 
                    gameSelf.leftClick(cellCoord);
                }
            }
        };
        
        this.rightClick = function(cellCoord) {
            gameSelf.revealCell(cellCoord);
        };
        
        this.initGameboard = function(choosenCellCoord) {
            var minesCreated = 0; 
            
            while (minesCreated < gameSelf.minesCount) {
                var proposedX = Math.floor(Math.random() * gameSelf.hCellCount);
                var proposedY = Math.floor(Math.random() * gameSelf.vCellCount);
                
                if (gameSelf.gameBoard[proposedX, proposedY].status !== CELL_STATUS.HIDDEN_MINE || 
                   ( choosenCellCoord.cellX !== proposedX && choosenCellCoord.cellY !== proposedY)){
                    gameSelf.status = CELL_STATUS.HIDDEN_MINE;
                    minesCreated += 1;
                    
                    gameSelf.gameBoard[proposedX][proposedY].status = CELL_STATUS.HIDDEN_MINE;
                    gameSelf.gameBoard[proposedX][proposedY].element.className = "cell mine-hidden";
                }
            }
            
            gameSelf.isGameboardInitialized = true;
        }
        
        this.leftClick = function(cellCoord) {           
            //gameSelf.revealCell(cellCoord);
            if (!gameSelf.isGameboardInitialized) {
                gameSelf.initGameboard();
            }
            
            
            
            if(gameSelf.isWin()) {
                gameSelf.showWin();
            } else if (gameSelf.isLose()) {
                gameSelf.showLose();
            } 
            
        };
        
        this.revealCell = function(cellCoord) {
            alert ("X: " + cellCoord.cellX + ", Y: " + cellCoord.cellY);
        };
        
        this.isWin = function() { 
            return false;
        };
        
        this.isLose = function() {
            return false;
        };
        
        this.showWin = function() {
        };
        
        this.showLose = function() {
        };
        
        this.draw = function(cellCoord) {
            
        };
            
//       this.getCellCoord = function(event) {
//            var totalOffsetX = 0;
//            var totalOffsetY = 0;
//            var elementX = 0;
//            var elementY = 0;
//            var currentElement = this;
//
//            do {
//                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
//                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
//            }
//            while(currentElement = currentElement.offsetParent)
//
//            elementX = event.pageX - totalOffsetX;
//            elementY = event.pageY - totalOffsetY;
//
//            return { 
//                X: Math.floor( elementX / gameSelf.cellWidth), 
//                Y: Math.floor( elementY / gameSelf.cellHeight)
//            };
//        };
         
//           return { 
//               X: Math.floor( event.pageX / gameSelf.cellWidth),
//               Y: Math.floor( event.pageY / gameSelf.cellHeight)
//           };
//       };
        
        this.init = function () {  
            
//            gameSelf.hostGameElement.addEventListener("click", function(event) {
//                var cellCoord = gameSelf.getCellCoord.call(this, event);
//                
//                if (gameSelf.utils.isRightMB(event)) {
//                    gameSelf.rightClick(cellCoord);
//                } else { 
//                    gameSelf.leftClick(cellCoord);
//                }
//            });
            
            for (var i = 0; i < gameSelf.hCellCount; i++){
                for (var j = 0; j < gameSelf.vCellCount; j++) {
                    var divCell = document.createElement('div');
                    divCell.className = "cell cell-hidden";
                    
                    divCell.style.width = gameSelf.cellWidth + "px";
                    divCell.style.height = gameSelf.cellHeight + "px";
                    divCell.style.left = gameSelf.cellWidth * i + "px";
                    divCell.style.top = gameSelf.cellHeight * j + "px";
                    divCell.cellX = i;
                    divCell.cellY = j;
                    divCell.addEventListener("click", gameSelf.utils.cellClick);

                    gameSelf.gameBoard[i][j] = { 
                        element: divCell, 
                        status: CELL_STATUS.HIDDEN_EMPTY
                    };
                    gameSelf.hostGameElement.appendChild(divCell);
                }
            }
            //gameSelf.draw();
        }
    };
    
    /*
            START THE GAME
    */
    var game = new MinesweeperGame("game");
    game.init();
}());