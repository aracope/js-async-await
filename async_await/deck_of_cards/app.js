// Deck Management
let deckId = '';
let remainingCards = 0;

// API Functions
// Fetches a new shuffled deck from the API
async function fetchDeck() {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    return await response.json();
}

// Shuffles the current deck, either fully or remaining cards
async function fetchShuffle(full = true) {
    const url = full ? `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/` : `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`;
    await fetch(url);
}

// Draws one card from the current deck
async function fetchDraw() {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    return await response.json();
}

// Deck Actions
// Initializes a new deck and displays a message
async function initializeDeck() {
    try {
        const data = await fetchDeck();
        deckId = data.deck_id;
        remainingCards = data.remaining;
        clearCardArea();
        displayMessage('New deck created and shuffled!');
        toggleButtons(false);
    } catch (error) { handleError('Error initializing deck.'); }
}

// Shuffles the entire deck (new deck)
async function shuffleFullDeck() {
    try {
        await initializeDeck();
        displayMessage('New full deck created and shuffled!');
    } catch (error) { handleError('Error shuffling deck.'); }
}

// Shuffles remaining cards if available
async function reshuffleRemainingCards() {
    try {
        if (!deckId) return displayMessage('No cards to reshuffle!');

        if (remainingCards === 0) {
            displayMessage('No cards to reshuffle!');
        } else {
            await fetchShuffle(false);
            displayMessage('Remaining cards reshuffled!');
        }
    } catch (error) { handleError('Error reshuffling remaining cards.'); }
}

// Draws a card and displays it
async function drawCard() {
    try {
        if (!deckId) await initializeDeck();

        const data = await fetchDraw();
        remainingCards = data.remaining;

        if (remainingCards === 0) {
            displayMessage('No cards left to draw!');
        }

        if (data.cards.length > 0) displayCard(data.cards[0]);

    } catch (error) {
        handleError('Error drawing card.'); }
}

// UI Functions
// Clears the card display area
function clearCardArea() {
    document.getElementById('card-area').innerHTML = '';
}

// Enables or disables buttons
function toggleButtons(disable) {
    document.getElementById('draw-button').disabled = disable;
    document.getElementById('reshuffle-button').disabled = disable;
}

// Displays a drawn card visually
function displayCard(card) {
    const cardArea = document.getElementById('card-area');
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardImage.classList.add('pile-card');

    const angle = Math.random() * 30 - 15;
    const x = Math.random() * 30 - 15;
    const y = Math.random() * 30 - 15;

    cardImage.style.position = 'absolute';
    cardImage.style.top = '50%';
    cardImage.style.left = '50%';
    cardImage.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(${x}px, ${y}px)`;

    cardArea.appendChild(cardImage);
}

// Displays messages with an optional timeout
function displayMessage(message, duration = 3000) {
    const messageArea = document.getElementById('message-area');
    messageArea.textContent = message;

    clearTimeout(messageArea.timeoutId);

    if (duration) {
        messageArea.timeoutId = setTimeout(() => {
            messageArea.textContent = '';
        }, duration);
    }
}

// Handles error messages
function handleError(errorMessage) {
    displayMessage(errorMessage);
}

// Event Listeners
window.onload = initializeDeck;
document.getElementById('draw-button').addEventListener('click', drawCard);
document.getElementById('shuffle-button').addEventListener('click', shuffleFullDeck);
document.getElementById('reshuffle-button').addEventListener('click', reshuffleRemainingCards);
