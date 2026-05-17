function getNumber(id) {
    const el = document.getElementById(id);
    if (!el || el.value === "") return null;
    return Number(el.value);
}

function calculateUnits() {

    const amount = getNumber("totalAmount");

    if (!amount || amount <= 0) {
        document.getElementById("resultOutput").innerHTML =
            "<li><strong>Error:</strong> Please enter a valid total investment amount.</li>";
        return;
    }

    const prices = {
        nifty: getNumber("priceNifty"),
        mid: getNumber("priceMid"),
        junior: getNumber("priceJunior"),
        invit: getNumber("priceInvit"),
        reit1: getNumber("priceReit1"),
        reit2: getNumber("priceReit2") // optional
    };

    const allocation = {
        nifty: 0.30,
        mid: 0.30,
        junior: 0.20,
        invit: 0.10,
        reit1: 0.05,
        reit2: 0.05
    };

    let outputHtml = "";
    let totalAllocated = 0;

    for (const key in allocation) {

        if (prices[key] === null || prices[key] <= 0) {
            outputHtml += `<li><strong>${key.toUpperCase()}</strong>: Skipped (no price)</li>`;
            continue;
        }

        const investAmount = amount * allocation[key];
        const units = Math.floor(investAmount / prices[key]);

        totalAllocated += units * prices[key];

        outputHtml += `
            <li>
                <strong>${key.toUpperCase()}</strong> →
                ${units} units (₹${investAmount.toFixed(0)})
            </li>
        `;
    }

    const leftover = amount - totalAllocated;

    outputHtml += `
        <li style="margin-top:8px;color:#9ca3af;">
            <strong>Unallocated Cash:</strong> ₹${leftover.toFixed(0)}
        </li>
    `;

    document.getElementById("resultOutput").innerHTML = outputHtml;
}
