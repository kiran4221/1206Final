document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const totalExpenses = document.getElementById('totalExpenses');

    let expenses = [];
    let totalAmount = 0;

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('expenseName').value;
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const date = document.getElementById('expenseDate').value;
        const category = document.getElementById('expenseCategory').value;

        if (!name || isNaN(amount) || amount <= 0 || !date || !category) {
            alert('Please fill in all fields with valid values.');
            return;
        }

        const expense = { name, amount, date, category };
        expenses.push(expense);
        renderExpense(expense);

        totalAmount += amount;
        totalExpenses.textContent = totalAmount.toFixed(2);

        expenseForm.reset();
    });

    function renderExpense(expense) {
        const listItem = document.createElement('li');
        listItem.classList.add('px-4', 'py-2', 'border-b');

        listItem.innerHTML = `
            <div class="flex justify-between">
                <div>${expense.name}</div>
                <div>${expense.amount.toFixed(2)}</div>
            </div>
            <div class="text-gray-600">${expense.date}</div>
        `;

        expenseList.appendChild(listItem);
    }
});
