const cards = [
    { id: 1, img: '🍏' },
    { id: 2, img: '🍌' },
    { id: 3, img: '🍑' },
    { id: 4, img: '🍇' },
    { id: 5, img: '🍉' },
    { id: 6, img: '🍋' },
    { id: 7, img: '🍊' },
    { id: 8, img: '🍍' },

];

let gameCards = [...cards, ...cards];  // Duplicando as cartas para formar os pares
let flippedCards = [];
let matchedCards = [];

function shuffleCards() {
    gameCards.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';  // Limpa o tabuleiro antes de recriar
    gameCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', card.id);
        cardElement.innerHTML = `<img src="" alt="${card.img}" />`;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.querySelector('img').textContent = this.getAttribute('data-id');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.getAttribute('data-id') === card2.getAttribute('data-id')) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === gameCards.length) {
            setTimeout(() => alert('Você ganhou!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() {
    flippedCards = [];
    matchedCards = [];
    shuffleCards();
    createBoard();
}

shuffleCards();
createBoard();