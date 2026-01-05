document.addEventListener("DOMContentLoaded", () => {
  // STATE
  let transactions = [];

  // ELEMENTS
  const balanceEl = document.getElementById("balance");
  const incomeEl = document.getElementById("income-amount");
  const expenseEl = document.getElementById("expense-amount");
  const listEl = document.getElementById("transaction-list");

  const amountForm = document.getElementById("transaction-amount");
  const removeForm = document.getElementById("transaction-remove");

  const updateDescriptionInput =
    document.querySelector(".update-transaction #description");
  const amountInput = document.getElementById("add-amount");

  const removeDescriptionInput =
    document.querySelector(".remove-transactions #description");

  // UPDATE TOTALS
  function updateTotals() {
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.amount > 0) income += t.amount;
      else expense += t.amount;
    });

    const balance = income + expense;

    balanceEl.textContent = `$${balance.toFixed(2)}`;
    incomeEl.textContent = `$${income.toFixed(2)}`;
    expenseEl.textContent = `$${Math.abs(expense).toFixed(2)}`;
  }

  // RENDER LIST
  function renderTransactions() {
    listEl.innerHTML = "";

    transactions.forEach(t => {
      const li = document.createElement("li");
      li.textContent = `${t.description}: $${t.amount.toFixed(2)}`;
      li.style.color = t.amount < 0 ? "var(--expense)" : "var(--income)";
      listEl.appendChild(li);
    });
  }

  function refreshUI() {
    renderTransactions();
    updateTotals();
  }

  // ADD / UPDATE TRANSACTION
  amountForm.addEventListener("submit", e => {
    e.preventDefault();

    const description = updateDescriptionInput.value.trim();
    const amount = Number(amountInput.value);

    if (!description || isNaN(amount)) return;

    const existing = transactions.find(
      t => t.description.toLowerCase() === description.toLowerCase()
    );

    if (existing) {
      existing.amount += amount;
    } else {
      transactions.push({ description, amount });
    }

    updateDescriptionInput.value = "";
    amountInput.value = "";

    refreshUI();
  });

  // REMOVE TRANSACTION
  removeForm.addEventListener("submit", e => {
    e.preventDefault();

    const description = removeDescriptionInput.value.trim();
    if (!description) return;

    transactions = transactions.filter(
      t => t.description.toLowerCase() !== description.toLowerCase()
    );

    removeDescriptionInput.value = "";
    refreshUI();
  });

  // INIT
  refreshUI();
});
