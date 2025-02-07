document.addEventListener("DOMContentLoaded", () => {
  const expenseFormInput = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateAmount();

  renderDisplay();
  updateTotal();

  expenseFormInput.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim()); //input is generally string so convert to float

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };

      expenses.push(newExpense);
      saveToLocal();
      renderDisplay();
      updateTotal();

      //clear inputs after button press

      expenseAmountInput.value = "";
      expenseNameInput.value = "";
    }
  });

  function renderDisplay() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.name} - $${expense.amount.toFixed(2)}
        <button data-id = "${expense.id}">Delete</button>
        `;
      expenseList.appendChild(li);
    });
  }

  function calculateAmount() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0); //method of iteration,frequentrly used
  }

  function saveToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses)); //stores in local storage
  }

  function updateTotal() {
    totalAmount = calculateAmount();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));

      expenses = expenses.filter((expense) => expense.id !== expenseId);

      saveToLocal();
      renderDisplay();
      updateTotal();
    }
  });
});
