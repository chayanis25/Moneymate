let income = 0;
let expenses = [];
let chart;

// Save income and create automatic budget
function saveIncome() {
    income = Number(document.getElementById("income").value);

    if (income <= 0) {
        alert("Please enter your income.");
        return;
    }

    document.getElementById("balance").innerHTML =
        "Balance: RM" + income;

    createBudget();
    updateReport();
    updateAdvice();
}


// Automatic 50/30/20 style budget
function createBudget() {
    let rent = income * 0.30;
    let food = income * 0.20;
    let savings = income * 0.20;
    let transport = income * 0.10;
    let entertainment = income * 0.10;

    document.getElementById("budgetList").innerHTML = `
        <li>Rent : RM${rent.toFixed(2)}</li>
        <li>Food : RM${food.toFixed(2)}</li>
        <li>Savings : RM${savings.toFixed(2)}</li>
        <li>Transport : RM${transport.toFixed(2)}</li>
        <li>Entertainment : RM${entertainment.toFixed(2)}</li>
    `;

    createChart([
        rent,
        food,
        savings,
        transport,
        entertainment
    ]);
}


// Add expense
function addExpense() {

    let name = document.getElementById("expenseName").value;
    let amount = Number(document.getElementById("expenseAmount").value);
    let category = document.getElementById("expenseCategory").value;

    if (!name || amount <= 0) {
        alert("Please enter expense details.");
        return;
    }

    expenses.push({
        name: name,
        amount: amount,
        category: category
    });

    showExpenses();
    updateReport();
    updateAdvice();
}


// Show expense list
function showExpenses() {

    let list = document.getElementById("expenseList");

    list.innerHTML = "";

    expenses.forEach(expense => {

        let item = document.createElement("li");

        item.innerHTML =
        expense.name + " - RM" +
        expense.amount +
        " (" + expense.category + ")";

        list.appendChild(item);

    });
}


// Monthly report
function updateReport() {

    let totalExpense = expenses.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    let balance = income - totalExpense;

    document.getElementById("reportIncome").innerHTML =
        "RM" + income;

    document.getElementById("reportExpense").innerHTML =
        "RM" + totalExpense;

    document.getElementById("reportBalance").innerHTML =
        "RM" + balance;

    document.getElementById("balance").innerHTML =
        "Balance: RM" + balance;
}


// AI Coach message
function updateAdvice() {

    let totalExpense = expenses.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    let message =
        "Good job! Keep tracking your money.";

    if (totalExpense > income * 0.8) {
        message =
        "Warning: You are spending too much this month.";
    }

    document.getElementById("advice").innerHTML =
        message;
}


// Chart
function createChart(values) {

    let ctx = document
    .getElementById("budgetChart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [
                "Rent",
                "Food",
                "Savings",
                "Transport",
                "Entertainment"
            ],

            datasets: [{
                data: values
            }]

        }

    });

}
