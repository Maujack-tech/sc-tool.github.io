// Preisliste für Waren je nach Stadt/Raumstation
const prices = {
    "Hurston": { "Titanium": 7.00, "Laranite": 25.00, "Agricium": 8.50, "Gold": 4.00 },
    "ArcCorp": { "Titanium": 7.20, "Laranite": 26.00, "Agricium": 8.70, "Gold": 4.10 },
    "mikroTech": { "Titanium": 6.80, "Laranite": 24.50, "Agricium": 8.30, "Gold": 3.90 },
    "Crusader": { "Titanium": 7.10, "Laranite": 25.50, "Agricium": 8.60, "Gold": 4.05 },
    "MIC L1": { "Titanium": 6.90, "Laranite": 25.00, "Agricium": 8.50, "Gold": 4.00 },
    "HUR L1": { "Titanium": 7.00, "Laranite": 25.20, "Agricium": 8.40, "Gold": 4.15 },
    "ARC L1": { "Titanium": 7.05, "Laranite": 25.30, "Agricium": 8.55, "Gold": 4.20 },
    "CRU L1": { "Titanium": 6.85, "Laranite": 24.70, "Agricium": 8.45, "Gold": 4.10 }
};

// Schiffs-Kapazitäten
const shipCapacities = {
    "Aurora": 20,
    "Cutlass Black": 30,
    "Andromeda": 133,
    "Caterpillar": 288,
    "Star Runner": 164,
    "Freelancer MAX": 120,
    "Vulture": 36
};

// Beispielhafte Reisezeiten zwischen den Standorten (in Minuten)
const travelTimes = {
    "Hurston-ArcCorp": 45,
    "Hurston-mikroTech": 50,
    "Hurston-Crusader": 55,
    "ArcCorp-mikroTech": 35,
    "ArcCorp-Crusader": 40,
    "mikroTech-Crusader": 30,
    "MIC L1-Hurston": 50,
    "MIC L1-ArcCorp": 45,
    "MIC L1-mikroTech": 20,
    "MIC L1-Crusader": 60, 
    // Weitere Routen können hinzugefügt werden
};

// Übersetzungen
const translations = {
    "de": {
        "header-title": "Star-Transport & Handelsrechner",
        "header-description": "Plane deine Routen und maximiere deinen Profit im Universum.",
        "from-label": "Von:",
        "to-label": "Nach:",
        "commodity-label": "Warenart:",
        "ship-label": "Schiff:",
        "calculate-button-text": "Route & Preis Berechnen",
        "back-button-text": "Zurück",
        "result-header": "Berechnung für",
        "ship-capacity": "Kapazität",
        "cost-price": "Kaufpreis",
        "sell-price": "Verkaufspreis",
        "total-cost": "Gesamtkosten",
        "total-revenue": "Gesamterlös",
        "profit": "Profit",
        "travel-time": "Reisezeit",
        "language-label": "Sprache:"
    },
    "en": {
        "header-title": "Star-Transport & Trade Calculator",
        "header-description": "Plan your routes and maximize your profit in the Universe.",
        "from-label": "From:",
        "to-label": "To:",
        "commodity-label": "Commodity:",
        "ship-label": "Ship:",
        "calculate-button-text": "Calculate Route & Price",
        "back-button-text": "Back",
        "result-header": "Calculation for",
        "ship-capacity": "Capacity",
        "cost-price": "Cost Price",
        "sell-price": "Sell Price",
        "total-cost": "Total Cost",
        "total-revenue": "Total Revenue",
        "profit": "Profit",
        "travel-time": "Travel Time",
        "language-label": "Language:"
    }
};

// Sprachumschaltung
document.getElementById('language-select').addEventListener('change', (event) => {
    const language = event.target.value;
    applyTranslations(language);
});

function applyTranslations(language) {
    const translationsForLang = translations[language];
    document.getElementById('header-title').textContent = translationsForLang['header-title'];
    document.getElementById('header-description').textContent = translationsForLang['header-description'];
    document.getElementById('from-label').textContent = translationsForLang['from-label'];
    document.getElementById('to-label').textContent = translationsForLang['to-label'];
    document.getElementById('commodity-label').textContent = translationsForLang['commodity-label'];
    document.getElementById('ship-label').textContent = translationsForLang['ship-label'];
    document.getElementById('calculate-button-text').textContent = translationsForLang['calculate-button-text'];
    document.getElementById('back-button-text').textContent = translationsForLang['back-button-text'];
    document.getElementById('language-label').textContent = translationsForLang['language-label'];
}

// Berechnung der Route
function calculateRoute() {
    const fromLocation = document.getElementById('from-location').value;
    const toLocation = document.getElementById('to-location').value;
    const commodity = document.getElementById('commodity').value;
    const ship = document.getElementById('ship').value;

    if (!fromLocation || !toLocation || !commodity || !ship) {
        alert("Please select all fields.");
        return;
    }

    if (!prices[fromLocation] || !prices[toLocation] || !shipCapacities[ship]) {
        alert("Invalid location or ship selected.");
        return;
    }

    const fromPrice = prices[fromLocation][commodity] || 0;
    const toPrice = prices[toLocation][commodity] || 0;
    const shipCapacity = shipCapacities[ship] || 0;

    // Berechnung des Kaufpreises und des Gewinns
    const costPrice = fromPrice;
    const sellPrice = toPrice;
    const quantity = shipCapacity;
    const totalCost = (costPrice * quantity).toFixed(2);
    const totalRevenue = (sellPrice * quantity).toFixed(2);
    const profit = (totalRevenue - totalCost).toFixed(2);

    // Berechnung der Reisezeit
    const routeKey = `${fromLocation}-${toLocation}`;
    const travelTimeMinutes = travelTimes[routeKey] || travelTimes[`${toLocation}-${fromLocation}`] || 60; // Standard 60 Minuten, falls Route nicht gefunden
    const travelTime = `${Math.floor(travelTimeMinutes / 60)} Stunden ${travelTimeMinutes % 60} Minuten`;

    const language = document.getElementById('language-select').value;
    const translationsForLang = translations[language];

    const resultBox = document.getElementById('result');
    resultBox.innerHTML = `
        <strong>${translationsForLang['result-header']} ${commodity} ${translationsForLang['from-label']} ${fromLocation} ${translationsForLang['to-label']} ${toLocation}:</strong><br>
        <strong>${translationsForLang['ship-label']}:</strong> ${ship} (${translationsForLang['ship-capacity']}: ${shipCapacity} SCU)<br>
        <strong>${translationsForLang['cost-price']}:</strong> ${costPrice} UEC per unit<br>
        <strong>${translationsForLang['sell-price']}:</strong> ${sellPrice} UEC per unit<br>
        <strong>${translationsForLang['total-cost']}:</strong> ${totalCost} UEC<br>
        <strong>${translationsForLang['total-revenue']}:</strong> ${totalRevenue} UEC<br>
        <strong>${translationsForLang['profit']}:</strong> ${profit} UEC<br>
        <strong>${translationsForLang['travel-time']}:</strong> ${travelTime}
    `;
}
