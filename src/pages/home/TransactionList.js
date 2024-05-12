import React, { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import TransactionCard from "../../components/TransactionCard";

// Import the fetchTransactions function

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCity, setFilteredCity] = useState("");
  const { fetchTransactions } = useFirestore("transactions");

  useEffect(() => {
    const fetchTransactionsData = async () => {
      try {
        const transactionsData = await fetchTransactions(); // Fetch transactions
        setTransactions(transactionsData);
        console.log("transaction data: ", transactionsData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchTransactionsData(); // Call the fetchTransactions function
  }, []);

  const handleCityFilter = (e) => {
    e.preventDefault();

    const value = e.target.value.toLowerCase();
    setFilteredCity(value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "auto",
        width: "95%",
        maxWidth: "auto",
        margin: "0 auto",
        marginTop: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
        padding: "20px",
        marginLeft: "10px",
        borderRadius: "10px",
        gap: "10px",
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <h2>Transactions</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <input
        type="text"
        placeholder="Search by city"
        value={filteredCity}
        onChange={handleCityFilter}
        onFocus={(e) => {
          e.target.style.border = '1px solid #1f9751'; // Change border color on focus
          e.target.style.boxShadow = '0px 0px 5px rgba(31, 151, 81, 0.5)'; // Add box shadow on focus
        }}
        onBlur={(e) => {
          e.target.style.border = '1px solid #ccc'; // Reset border color on blur
          e.target.style.boxShadow = 'none'; // Remove box shadow on blur
        }}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '300px',
          maxWidth: '100%',
          boxSizing: 'border-box',
          outline: 'none'
        }}
      />
      <ul>
        {transactions &&
          transactions
            .filter((transaction) =>
              transaction.city.toLowerCase().includes(filteredCity)
            )
            .map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
      </ul>
    </div>
  );
};

export default TransactionList;
