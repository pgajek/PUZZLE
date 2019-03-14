class Puzzle {
    constructor(number, id) {
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
        this.createPuzzle(number, id);
    }
    createPuzzle(number, id) {
        this.div.classList.add('fill');
        this.div.dataset.puzzleNr = number;
        this.div.draggable = true;
        // document.querySelector('.puzzleBox').appendChild(this.div);
        this.div.addEventListener('dragstart', this.dragStart);
        this.div.addEventListener('touch', this.dragStart);
        this.div.addEventListener('dragend', this.dragEnd);
        this.div.addEventListener('touchend', this.dragEnd);
        this.div.style.backgroundImage = this.puzzleSets[id][number];
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
        this.emptiesClear();
        this.emptiesBindEvents();

    };
    emptiesClear() {
        for (let empty of this.empties) {
            empty.innerHTML = '';
        }
    }
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
    constructor(id) {
        this.puzzleBox = document.querySelector('.puzzleBox');
        this.dragedPuzzle = null;
        this.board = new Board();
        this.puzzles = [];
        this.clear();
        this.createPuzzles(id);
    }
    clear() {
        this.puzzleBox.innerHTML = '';
    }
    createPuzzles(id) {
        for (let i = 0; i < 9; i++) {
            const puzzle = new Puzzle(i, id);
            this.puzzles.push(puzzle.div);
        }
        this.puzzles.sort(() => Math.random() - 0.5);
        this.puzzles.sort(() => Math.random() - 0.5);
        for (let puzzle of this.puzzles) {
            document.querySelector('.puzzleBox').appendChild(puzzle);
        }
    }


}

// const game = new Game(0);
function createGame() {

    main.style.display = 'flex';
    divBtns.style.display = 'none';
    if (this.id === 'bt1') {
        game = new Game(0);
    } else if (this.id === 'bt2') {
        game = new Game(1);
    } else if (this.id === 'bt3') {
        game = new Game(2);
    }
}
const stepBack = document.querySelector('.stepBack');
let game;
const buttons = document.querySelectorAll('.imageBtn');
const divBtns = document.querySelector('.images');
const main = document.querySelector('.main');
for (let btn of buttons) {
    btn.addEventListener('click', createGame);
}
stepBack.addEventListener('click', function () {
    main.style.display = 'none';
    divBtns.style.display = 'flex';
})