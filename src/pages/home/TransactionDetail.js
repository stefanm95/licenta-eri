import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

const TransactionDetail = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      setError(null);

      try {
        const transactionDoc = await projectFirestore
          .collection("transactions")
          .doc(id)
          .get();

        if (transactionDoc.exists) {
          setTransaction({ id: transactionDoc.id, ...transactionDoc.data() });
        } else {
          setError("Transaction not found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!transaction) {
    return <div>Transaction not found</div>;
  }
  return (
    <>
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      height: "auto",
      width: "auto",
      backgroundColor: "white",
      color: "black",
      textAlign: "center",
      padding: "20px",
      margin: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "150%",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Transaction Details
      </h2>
      <Link to="/" style={{ marginBottom: "20px", color: "#1f9751" }}>
        Back Home
      </Link>
    </div>
    <p style={{ marginBottom: "5px" }}>Name: {transaction.name}</p>
    <p style={{ marginBottom: "5px" }}>City: {transaction.city}</p>
    <p style={{ marginBottom: "5px" }}>Country: {transaction.country}</p>
    <p style={{ marginBottom: "5px" }}>Amount: {transaction.amount}</p>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <p
        style={{
          flex: "1",
          marginBottom: "20px",
          backgroundColor: "white",
          color: "black",
          textAlign: "center",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
          marginRight: "20px",
        }}
      >
        Description: {transaction.description}
      </p>
      <img
        src={transaction.imageUrl}
        alt={transaction.name}
        style={{
          flex: "2",
          width: "auto",
          height: "auto",
          maxWidth: "50%",
          maxHeight: "500px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
        }}
      />
    </div>
  </div>
    </>
  );
};

export default TransactionDetail;
