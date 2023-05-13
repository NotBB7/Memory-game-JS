const cardsArray = [
    {'name': 'Xayah', 'img': 'assets/image/Xayah.jpg',},
    {'name': 'Rakan', 'img': 'assets/image/Rakan.jpg',},
    {'name': 'Warwick', 'img': 'assets/image/warwick.jpg',},
    {'name': 'Volibear', 'img': 'assets/image/Volibear.jpg',},
    {'name': 'Nocturne', 'img': 'assets/image/Nocturne.jpg',},
    {'name': 'Malzahar', 'img': 'assets/image/Malzahar.jpg',},
    {'name': 'Garen', 'img': 'assets/image/Garen.jpg',},
    {'name': 'Wukong', 'img': 'assets/image/Wukong.jpg',},
    {'name': 'Aphelios', 'img': 'assets/image/Aphelios.jpg',},
    {'name': 'Sorake', 'img': 'assets/image/Soraka.jpg',},
    {'name': 'Yuumi', 'img': 'assets/image/Yuumi.jpg',},
    {'name': 'Annie', 'img': 'assets/image/Annie.jpg',},
];

const gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(()=>{
    return 0.5 - Math.random();
})

const game = document.getElementById('game-board');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (let i=0; i < gameGrid.length; i++ ){
    let card = document.createElement("div");
    card.classList.add('card');
    card.dataset.name = gameGrid[i].name

    //Recto de la varte
    let front = document.createElement('div');
    front.classList.add('front');

    //Verso de la carte
    let back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}
let firstGuess = '';
let secondGuess = '';

let count = 0;

let previousTarget = null;
let delay = 1200;



let match = function () {
    let selected = document.querySelectorAll('.selected');
    for (let i=0; i < selected.length; i++){
        selected[i].classList.add('match')
    }
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll('.selected');
    for (let i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};


grid.addEventListener('click', (event) => {
    let clicked = event.target;
    if(clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')){
        return;
    }

    if(count < 2){
        count ++;
        if (count === 1){
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else{
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }

        if(firstGuess !== '' && secondGuess !== ''){
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            }else {
                setTimeout(resetGuesses, delay);
            }
        }

        previousTarget = clicked;
    }
});