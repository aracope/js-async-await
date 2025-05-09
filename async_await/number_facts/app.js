const favNumber = 42;
const baseURL = "http://numbersapi.com";

// Add event listeners to buttons
document.getElementById("single-fact-btn").addEventListener("click", fetchSingleFact);
document.getElementById("multiple-facts-btn").addEventListener("click", fetchMultipleFacts);
document.getElementById("four-facts-btn").addEventListener("click", fetchFourFacts);

// Fetch a single fact
async function fetchSingleFact() {
    try {
        const response = await fetch(`${baseURL}/${favNumber}?json`);
        const data = await response.json();
        displayFacts([data.text]);
    } catch (error) {
        console.error("Error fetching single fact:", error);
    }
}

// Fetch multiple facts for favorite numbers
async function fetchMultipleFacts() {
    const favNumbers = [7, 11, 22];
    try {
        const response = await fetch(`${baseURL}/${favNumbers.join(",")}?json`);
        const data = await response.json();
        displayFacts(Object.values(data));
    } catch (error) {
        console.error("Error fetching multiple facts:", error);
    }
}

// Fetch four facts independently for the same number
async function fetchFourFacts() {
    try {
        const requests = Array.from({ length: 4 }, () =>
            fetch(`${baseURL}/${favNumber}?json`).then(res => res.json())
        );

        const facts = await Promise.all(requests);
        displayFacts(facts.map(data => data.text));
    } catch (error) {
        console.error("Error fetching four facts:", error);
    }
}

// Function to clear and display facts
function displayFacts(facts) {
    const factsList = document.getElementById("facts-list");
    factsList.innerHTML = ""; // Clear previous facts
    facts.forEach(fact => {
        const li = document.createElement("li");
        li.textContent = fact;
        factsList.appendChild(li);
    });
}

