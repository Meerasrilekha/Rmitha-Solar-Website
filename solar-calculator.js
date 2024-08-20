document.getElementById('calculate-button').addEventListener('click', function() {
    const panelCapacity = parseFloat(document.getElementById('panel-capacity').value);
    const roofArea = parseFloat(document.getElementById('roof-area').value);
    const budget = parseFloat(document.getElementById('budget').value);
    const state = document.getElementById('state').value;
    const customerCategory = document.getElementById('customer-category').value;
    const electricityCost = parseFloat(document.getElementById('electricity-cost').value);
    const includeLoan = document.getElementById('include-loan').checked;
    let loanAmount = 0;
    let loanTerm = 0;
    let interestRate = 0;

    if (includeLoan) {
        loanAmount = parseFloat(document.getElementById('loan-amount').value);
        loanTerm = parseFloat(document.getElementById('loan-term').value);
        interestRate = parseFloat(document.getElementById('interest-rate').value);
    }

    // Validate required fields
    if (isNaN(panelCapacity) || isNaN(roofArea) || isNaN(budget) || isNaN(electricityCost)) {
        alert("Please fill in all required fields correctly.");
        return;
    }

    // Calculate maximum possible panel capacity based on roof area
    const maxPanelCapacity = roofArea * 0.15; 

    // Calculate cost per kW based on the budget and desired panel capacity
    const costPerKW = budget / panelCapacity;

    // Calculate the total estimated cost
    let totalCost = panelCapacity * costPerKW;

    let loanCost = 0;
    if (includeLoan && !isNaN(loanAmount) && !isNaN(loanTerm) && !isNaN(interestRate)) {
        // Calculate monthly loan repayment using the formula for an amortizing loan
        const monthlyInterestRate = interestRate / 12 / 100;
        const numberOfPayments = loanTerm * 12;
        loanCost = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
        totalCost += loanCost * numberOfPayments;
    }

    // Display results
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = `
        <h3>Calculation Results:</h3>
        <p>Maximum Possible Panel Capacity Based on Roof Area: ${maxPanelCapacity.toFixed(2)} kW</p>
        <p>Total Estimated Cost: Rs ${totalCost.toFixed(2)}</p>
        ${includeLoan ? `<p>Monthly Loan Repayment: Rs ${loanCost.toFixed(2)}</p>` : ''}
    `;
});
