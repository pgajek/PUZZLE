// const div = document.querySelector('div');
// let divX = 150;
// let divY = 50;
// let drawActive = false;

// let insertDivX;
// let insertDivY;


// div.style.left = divX + 'px';
// div.style.top = divY + 'px';
// div.addEventListener('mousedown', (e) => {
//     div.style.backgroundColor = 'gray';
//     drawActive = true;

//     insertDivX = e.offsetX;
//     insertDivY = e.offsetY;

// });
// div.addEventListener('mousemove', (e) => {
//     if (drawActive) {
//         divX = e.clientX - insertDivX;
//         divY = e.clientY - insertDivY;
//         div.style.left = `${divX}px`;
//         div.style.top = `${divY}px`;
//     }
// });
// div.addEventListener('mouseup', () => {
//     div.style.backgroundColor = 'royalblue';
//     drawActive = false;
// });

const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');
//Fill listener
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);
// loop for empties
for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}
//drag functions
function dragStart() {
    this.className += ' hold';
    setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
    this.className = 'fill';
}

function dragOver(e) {
    e.preventDefault();

}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';

}

function dragLeave() {
    this.className = 'empty';

}

function dragDrop() {
    this.className = 'empty';
    this.appendChild(fill);
    fill.setAttribute('draggable', 'false');
}