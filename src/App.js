import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Load transactions from localStorage initially
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");

  // Save transactions to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!description || !amount || amount <= 0) {
      alert("Please enter valid details");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
    };

    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
    setType("Income");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <div className="balance">Balance: ₹ {balance}</div>

      <div className="summary">
        <div className="income">Income: ₹ {totalIncome}</div>
        <div className="expense">Expense: ₹ {totalExpense}</div>
      </div>

      {/* Form */}
      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      {/* Transaction List */}
      <div className="transaction-list">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="transaction-item"
            style={{
              borderLeft: t.type === "Income" ? "5px solid green" : "5px solid red",
            }}
          >
            <span>
              {t.description} - ₹ {t.amount} ({t.type})
            </span>
            <button onClick={() => deleteTransaction(t.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
