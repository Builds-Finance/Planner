function calculateUnits() {
    const amount = Number(document.getElementById("totalAmount").value);

    const prices = {
        nifty: Number(document.getElementById("priceNifty").value),
        mid: Number(document.getElementById("priceMid").value),
        junior: Number(document.getElementById("priceJunior").value),
        invit: Number(document.getElementById("priceInvit").value),
        reit: Number(document.getElementById("priceReit").value)
    };

    const allocation = {
        nifty: 0.40,
        mid: 0.25,
        junior: 0.15,
        invit: 0.10,
        reit: 0.10
    };

    let outputHtml = "";

    for (const key in allocation) {
        if (!prices[key] || prices[key] <= 0) {
            outputHtml += `<li>${key.toUpperCase()}: Invalid price</li>`;
            continue;
        }

        const investAmount = amount * allocation[key];
        const units = Math.floor(investAmount / prices[key]);

        outputHtml += `
            <li>
                <strong>${key.toUpperCase()}</strong> →
                ${units} units (₹${investAmount.toFixed(0)})
            </li>
        `;
    }

    document.getElementById("resultOutput").innerHTML = outputHtml;
}
