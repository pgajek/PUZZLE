class Puzzle {
    constructor(number) {
        this.div = document.createElement('div');
        this.puzzleSets = [
            [
                "url('img/puzzle1.png')",
                "url('img/puzzle2.png')",
                "url('img/puzzle3.png')",
                "url('img/puzzle4.png')",
                "url('img/puzzle5.png')",
                "url('img/puzzle6.png')",
                "url('img/puzzle7.png')",
                "url('img/puzzle8.png')",
                "url('img/puzzle9.png')",
            ],
            [
                "url('img/1witcher.png')",
                "url('img/2witcher.png')",
                "url('img/3witcher.png')",
                "url('img/4witcher.png')",
                "url('img/5witcher.png')",
                "url('img/6witcher.png')",
                "url('img/7witcher.png')",
                "url('img/8witcher.png')",
                "url('img/9witcher.png')",
            ],
            [
                "url('img/char1.png')",
                "url('img/char2.png')",
                "url('img/char3.png')",
                "url('img/char4.png')",
                "url('img/char5.png')",
                "url('img/char6.png')",
                "url('img/char7.png')",
                "url('img/char8.png')",
                "url('img/char9.png')",
            ]
        ];
        this.createPuzzle(number);
    }
    createPuzzle(number) {
        this.div.classList.add('fill');
        this.div.dataset.puzzleNr = number;
        this.div.draggable = true;
        document.querySelector('.puzzleBox').appendChild(this.div);
        this.div.addEventListener('dragstart', this.dragStart);
        this.div.addEventListener('dragend', this.dragEnd);
        this.div.style.backgroundImage = this.puzzleSets[0][number];
    };
    dragStart() {
        this.className += ' hold';
        setTimeout(() => (this.className = 'invisible'), 0);
        game.dragedPuzzle = this;
    };
    dragEnd() {
        this.className = 'fill';
        game.dragedPuzzle = null;

    };
}
// BOARD**********************************************************************************
class Board {
    constructor() {
        this.board = document.querySelector('.imageBox');
        this.empties = document.querySelectorAll('.imageBox div');
        this.emptyNr = 0;
        this.emptiesBindEvents();
    };
    emptiesBindEvents() {
        for (const empty of this.empties) {
            empty.addEventListener('dragover', this.dragOver);
            empty.addEventListener('dragenter', this.dragEnter);
            empty.addEventListener('dragleave', this.dragLeave);
            empty.addEventListener('drop', this.dragDrop);
            empty.dataset.emptyNr = this.emptyNr;
            this.emptyNr++;
        };
    }
    dragOver(e) {
        e.preventDefault();
    };
    dragEnter(e) {
        e.preventDefault();
        this.className += ' hovered';
    };
    dragLeave() {
        this.className = 'empty';
    };
    dragDrop() {
        this.className = 'empty';
        if (!this.hasChildNodes()) {
            this.appendChild(game.dragedPuzzle);
        }
        game.dragedPuzzle.className = 'fill';
        if (this.dataset.emptyNr === game.dragedPuzzle.dataset.puzzleNr) {
            game.dragedPuzzle.draggable = false;
        }

    };
}
// MAIN GAME CLASS *****************************************************************
class Game {
    constructor() {

        this.dragedPuzzle = null;
        this.board = new Board();
        this.createPuzzles();
    }
    createPuzzles() {
        for (let i = 0; i < 9; i++) {
            new Puzzle(i);
        }
    }


}

const game = new Game();