import { transactions } from "./state.js";

export let currency = "USD";

export let rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.87
};

export function setCurrency(newCurrency) {
  currency = newCurrency;
}

export function setRates(newRates) {
  rates = newRates;
}

export function convertAmount(amount) {
  return amount * rates[currency];
}

export function renderTransactions(records) {

  const tableBody =
    document.getElementById("tableBody");

  tableBody.innerHTML = "";

  records.forEach(record => {

    const row =
      document.createElement("tr");

    row.innerHTML = `
      <td data-label="Description">
        ${record.description}
      </td>

      <td data-label="Amount">
        ${convertAmount(record.amount).toFixed(2)}
        ${currency}
      </td>

      <td data-label="Category">
        ${record.category}
      </td>

      <td data-label="Date">
        ${record.date}
      </td>

      <td data-label="Actions">

        <button
          class="edit-btn"
          data-id="${record.id}">
          Edit
        </button>

        <button
          class="delete-btn"
          data-id="${record.id}">
          Delete
        </button>

      </td>
    `;

    tableBody.appendChild(row);

  });

}

export function updateDashboard(budget = 0) {

  const totalTransactions =
    document.getElementById(
      "totalTransactions"
    );

  const totalSpending =
    document.getElementById(
      "totalSpending"
    );

  const topCategory =
    document.getElementById(
      "topCategory"
    );

  const budgetStatus =
    document.getElementById(
      "budgetStatus"
    );

  totalTransactions.textContent =
    transactions.length;

  const total =
    transactions.reduce(
      (sum,item)=>
      sum + Number(item.amount),
      0
    );

  totalSpending.textContent =
    `${convertAmount(total).toFixed(2)} ${currency}`;

  const counts = {};

  transactions.forEach(item => {

    counts[item.category] =
      (counts[item.category] || 0) + 1;

  });

  let top = "None";
  let max = 0;

  for (let cat in counts) {

    if (counts[cat] > max) {

      max = counts[cat];
      top = cat;

    }

  }

  topCategory.textContent = top;

  if (budget > 0) {

    const remaining =
      budget - total;

    if (remaining >= 0) {

      budgetStatus.textContent =
        `Remaining: ${remaining.toFixed(2)} USD`;

    } else {

      budgetStatus.textContent =
        `Over Budget: ${Math.abs(
          remaining
        ).toFixed(2)} USD`;

    }

  }

  drawTrendChart();

}

export function drawTrendChart() {

  const chart =
    document.getElementById(
      "trendChart"
    );

  chart.innerHTML = "";

  const today =
    new Date();

  for (let i = 6; i >= 0; i--) {

    const date =
      new Date(today);

    date.setDate(
      today.getDate() - i
    );

    const dateString =
      date.toISOString()
      .split("T")[0];

    const total =
      transactions
      .filter(
        t => t.date === dateString
      )
      .reduce(
        (sum,item)=>
        sum + Number(item.amount),
        0
      );

    const bar =
      document.createElement("div");

    bar.className =
      "chart-bar";

    bar.style.width =
      `${Math.max(total*5,20)}px`;

    bar.textContent =
      `${dateString} - ${total}`;

    chart.appendChild(bar);

  }

}
