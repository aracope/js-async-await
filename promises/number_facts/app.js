function clearFacts() {
    document.getElementById("facts-list").innerHTML = "";
}

function displayFacts(facts) {
    const list = document.getElementById("facts-list");
    clearFacts();
    facts.forEach(fact => {
        const li = document.createElement("li");
        li.textContent = fact;
        list.appendChild(li);
    });
}

function fetchSingleFact() {
    fetch("http://numbersapi.com/42?json")
        .then(response => response.json())
        .then(data => displayFacts([data.text]))
        .catch(error => console.error("Error fetching fact:", error));
}

function fetchMultipleFacts() {
    fetch("http://numbersapi.com/42,7,13?json")
        .then(response => response.json())
        .then(data => displayFacts(Object.values(data)))
        .catch(error => console.error("Error fetching facts:", error));
}

function fetchFourFacts() {
    const requests = Array(4).fill(fetch("http://numbersapi.com/42?json").then(res => res.json()));
    Promise.all(requests)
        .then(results => displayFacts(results.map(result => result.text)))
        .catch(error => console.error("Error fetching facts:", error));
}