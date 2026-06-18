import { validateTransaction } from "./validators.js";
import { saveData, loadData } from "./storage.js";

import {
  transactions,
  addTransaction,
  removeTransaction,
  updateTransaction
} from "./state.js";

import { regexSearch } from "./search.js";

import {
  renderTransactions,
  updateDashboard,
  setCurrency,
  setRates,
  rates
} from "./ui.js";

/* --------------------------
   Global State
--------------------------- */

let editingId = null;

let budget =
  Number(
    localStorage.getItem("budget")
  ) || 0;

/* --------------------------
   Initial Load
--------------------------- */

renderTransactions(transactions);
updateDashboard(budget);

/* --------------------------
   Mobile Menu
--------------------------- */

document
.getElementById("menuBtn")
.addEventListener("click", () => {

  document
  .getElementById("navMenu")
  .classList.toggle("show");

});

/* --------------------------
   Add / Edit Transaction
--------------------------- */

const form =
document.getElementById(
  "transactionForm"
);

form.addEventListener(
"submit",
function(e){

  e.preventDefault();

  clearErrors();

  const data = {

    description:
      document
      .getElementById(
        "description"
      )
      .value
      .trim(),

    amount:
      document
      .getElementById(
        "amount"
      )
      .value
      .trim(),

    category:
      document
      .getElementById(
        "category"
      )
      .value,

    date:
      document
      .getElementById(
        "date"
      )
      .value
  };

  const errors =
    validateTransaction(data);

  if(
    Object.keys(errors).length
  ){

    for(
      const field in errors
    ){

      const element =
      document.getElementById(
        field + "Error"
      );

      if(element){

        element.textContent =
        errors[field];

      }

    }

    return;
  }

  if(editingId){

    updateTransaction(
      editingId,
      {
        ...data,
        amount:
        Number(data.amount)
      }
    );

    editingId = null;

  }else{

    addTransaction({

      id:
      "txn_" + Date.now(),

      ...data,

      amount:
      Number(data.amount),

      createdAt:
      new Date()
      .toISOString(),

      updatedAt:
      new Date()
      .toISOString()

    });

  }

  saveData(transactions);

  renderTransactions(
    transactions
  );

  updateDashboard(
    budget
  );

  form.reset();

});
/* --------------------------
   Clear Errors
--------------------------- */

function clearErrors(){

  document
  .querySelectorAll("small")
  .forEach(item=>{

    item.textContent = "";

  });

}

/* --------------------------
   Table Buttons
--------------------------- */

document
.getElementById("tableBody")
.addEventListener(
"click",
function(e){

  const id =
  e.target.dataset.id;

  if(
    e.target.classList
    .contains("delete-btn")
  ){

    if(
      confirm(
        "Delete transaction?"
      )
    ){

      removeTransaction(id);

      saveData(
        transactions
      );

      renderTransactions(
        transactions
      );

      updateDashboard(
        budget
      );

    }

  }

  if(
    e.target.classList
    .contains("edit-btn")
  ){

    const transaction =
    transactions.find(
      t => t.id === id
    );

    if(!transaction){
      return;
    }

    editingId = id;

    document
    .getElementById(
      "description"
    )
    .value =
    transaction.description;

    document
    .getElementById(
      "amount"
    )
    .value =
    transaction.amount;

    document
    .getElementById(
      "category"
    )
    .value =
    transaction.category;

    document
    .getElementById(
      "date"
    )
    .value =
    transaction.date;

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  }

});

/* --------------------------
   Regex Search
--------------------------- */

document
.getElementById(
"regexSearch"
)
.addEventListener(
"input",
function(){

  const pattern =
  this.value;

  if(
    pattern === ""
  ){

    renderTransactions(
      transactions
    );

    return;
  }

  const results =
  regexSearch(
    transactions,
    pattern,

    document
    .getElementById(
      "ignoreCase"
    )
    .checked
  );

  if(results){

    renderTransactions(
      results
    );

  }

});

/* --------------------------
   Sorting
--------------------------- */

document
.getElementById(
"sortDescription"
)
.addEventListener(
"click",
()=>{

  transactions.sort(
    (a,b)=>

    a.description
    .localeCompare(
      b.description
    )

  );

  renderTransactions(
    transactions
  );

});

document
.getElementById(
"sortAmount"
)
.addEventListener(
"click",
()=>{

  transactions.sort(
    (a,b)=>
    a.amount -
    b.amount
  );

  renderTransactions(
    transactions
  );

});

document
.getElementById(
"sortDate"
)
.addEventListener(
"click",
()=>{

  transactions.sort(
    (a,b)=>

    new Date(a.date)
    -
    new Date(b.date)

  );

  renderTransactions(
    transactions
  );

});

/* --------------------------
   Budget Cap
--------------------------- */

document
.getElementById(
"saveBudget"
)
.addEventListener(
"click",
()=>{

  budget =
  Number(
    document
    .getElementById(
      "budgetCap"
    )
    .value
  );

  localStorage.setItem(
    "budget",
    budget
  );

  updateDashboard(
    budget
  );

});

/* --------------------------
   Currency Settings
--------------------------- */

document
.getElementById(
"saveRates"
)
.addEventListener(
"click",
()=>{

  const newRates = {

    USD:1,

    EUR:Number(
      document
      .getElementById(
        "eurRate"
      )
      .value
    ),

    GBP:Number(
      document
      .getElementById(
        "gbpRate"
      )
      .value
    )

  };

  setRates(
    newRates
  );

  setCurrency(

    document
    .getElementById(
      "currency"
    )
    .value

  );

  localStorage.setItem(
    "rates",
    JSON.stringify(
      newRates
    )
  );

  localStorage.setItem(
    "currency",

    document
    .getElementById(
      "currency"
    )
    .value
  );

  renderTransactions(
    transactions
  );

  updateDashboard(
    budget
  );

});

/* --------------------------
   Export JSON
--------------------------- */

document
.getElementById(
"exportJson"
)
.addEventListener(
"click",
()=>{

  const blob =
  new Blob(

    [
      JSON.stringify(
        transactions,
        null,
        2
      )
    ],

    {
      type:
      "application/json"
    }

  );

  const url =
  URL.createObjectURL(
    blob
  );

  const link =
  document.createElement(
    "a"
  );

  link.href = url;

  link.download =
  "transactions.json";

  link.click();

});

/* --------------------------
   Import JSON
--------------------------- */

document
.getElementById(
"importJson"
)
.addEventListener(
"change",
function(){

  const file =
  this.files[0];

  if(!file){
    return;
  }

  const reader =
  new FileReader();

  reader.onload =
  function(e){

    try{

      const imported =
      JSON.parse(
        e.target.result
      );

      if(
        !Array.isArray(
          imported
        )
      ){

        throw Error();

      }

      transactions.length = 0;

      imported.forEach(
        item =>

        transactions.push(
          item
        )
      );

      saveData(
        transactions
      );

      renderTransactions(
        transactions
      );

      updateDashboard(
        budget
      );

    }
    catch{

      alert(
        "Invalid JSON"
      );

    }

  };

  reader.readAsText(
    file
  );

});
