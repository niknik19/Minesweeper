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
            vCellCount : 40, // vertical cells count
            hCellCount : 40, // horizantal cells count
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
        this.minesCount = options.minesCount || options.minesCount;
        this.hostGameElement = document.getElementById(hostGameElementId);
        
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
            }
        };
        
        this.rightClick = function(cellCoord) {
        };
        
        this.leftClick = function(cellCoord) {           
            gameSelf.revealCell(cellCoord);
            
            if(gameSelf.isWin()) {
                gameSelf.showWin();
            } else if (gameSelf.isLose()) {
                gameSelf.showLose();
            } 
            
        };
        
        this.revealCell = function(cellCoord) {
            alert ("X: " + cellCoord.X + ", Y: " + cellCoord.Y);
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
            
        this.getCellCoord = function(event) {
            var totalOffsetX = 0;
            var totalOffsetY = 0;
            var elementX = 0;
            var elementY = 0;
            var currentElement = this;

            do {
                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
            }
            while(currentElement = currentElement.offsetParent)

            elementX = event.pageX - totalOffsetX;
            elementY = event.pageY - totalOffsetY;

            return { 
                X: Math.floor( elementX / gameSelf.cellWidth), 
                Y: Math.floor( elementY / gameSelf.cellHeight)
            };
        };
        
        this.init = function () {  
            
            gameSelf.hostGameElement.addEventListener("click", function(event) {
                var cellCoord = gameSelf.getCellCoord.call(this, event);
                
                if (gameSelf.utils.isRightMB(event)) {
                    gameSelf.rightClick(cellCoord);
                } else { 
                    gameSelf.leftClick(cellCoord);
                }
            });
            
            for (var i = 0; i < gameSelf.hCellCount; i++){
                for (var j = 0; j < gameSelf.vCellCount; j++) {
                    var divCell = document.createElement('div');
                    divCell.className = "cell cell-hidden";
                    
                    divCell.style.width = gameSelf.cellWidth + "px";
                    divCell.style.height = gameSelf.cellHeight + "px";
                    divCell.style.left = gameSelf.cellWidth * i + "px";
                    divCell.style.top = gameSelf.cellHeight * j + "px";

                    
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