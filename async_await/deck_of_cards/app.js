let deckId = '';

// Initialize the deck
function initializeNewDeck() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id;
            console.log('New deck created:', deckId);
            document.getElementById('draw-button').disabled = false;
        })
        .catch(error => console.error('Error creating deck:', error));
}

// Shuffle the deck
function shuffleFullDeck() {
    if (!deckId) {
        initializeNewDeck();
    } else {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
            .then(() => {
                console.log('Deck shuffled!');
            })
            .catch(error => console.error('Error shuffling deck:', error));
    }
}

// Reshuffle the remaining cards in the deck
function reshuffleRemainingCards() {
    if (!deckId) {
        initializeNewDeck();
    } else {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`)
            .then(() => {
                console.log('Deck reshuffled!');
            })
            .catch(error => console.error('Error reshuffling deck:', error));
    }
}

// Draw a card and display it
function drawCardFromDeck() {
    if (!deckId) {
        initializeNewDeck();
    }

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            const card = data.cards[0];
            if (!card) {
                console.log('No more cards left!');
                return;
            }

            const cardArea = document.getElementById('card-area');
            const cardImage = document.createElement('img');
            cardImage.src = card.image;
            cardImage.classList.add('pile-card');

            // Random angle between -15 and 15
            const angle = Math.random() * 30 - 15; 

            // Slight X-axis shift for variety
            const x = Math.random() * 30 - 15; 

            // Slight Y-axis shift for variety
            const y = Math.random() * 30 - 15; 

            // Position in the center of the card-area
            cardImage.style.position = 'absolute';
            cardImage.style.top = '50%';
            cardImage.style.left = '50%';
            cardImage.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(${x}px, ${y}px)`;

            // Append card to the pile
            cardArea.appendChild(cardImage);

            // Check if no cards remain
            if (data.remaining === 0) {
                document.getElementById('draw-button').disabled = true;
                console.log('No more cards in the deck!');
            }
        })
        .catch(error => console.error('Error drawing the card:', error));
}

// Reset the game
function resetGame() {
    const cardArea = document.getElementById('card-area');
    // Clear all cards
    cardArea.innerHTML = ''; 
    // Create a fresh deck
    initializeNewDeck();
}

// Event Listeners
document.getElementById('draw-button').addEventListener('click', drawCardFromDeck);
document.getElementById('shuffle-button').addEventListener('click', shuffleFullDeck);
document.getElementById('reshuffle-button').addEventListener('click', reshuffleRemainingCards);
document.getElementById('reset-button').addEventListener('click', resetGame);

// Initialize the deck on page load
window.onload = initializeNewDeck;





