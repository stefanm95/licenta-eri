import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import CustomConfirmationModal from "./CustomConfirmationModal";

import "./TransactionCard.module.css";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const TransactionCard = ({ transaction }) => {
  const { deleteDocument, response, fetchTransactions } =
    useFirestore("transactions");
  
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { user } = useAuthContext();

  const handleDelete = async () => {
    setIsConfirmationOpen(true); // Open the confirmation modal
  };

  const confirmDelete = async () => {
    await deleteDocument(transaction.id);
    console.log(transaction.id);
    if (response.success) {
      fetchTransactions();
    }
    setIsConfirmationOpen(false); // Close the confirmation modal
  };

  const cancelDelete = () => {
    setIsConfirmationOpen(false); // Close the confirmation modal
  };
  return (
    <>
    <CustomConfirmationModal
        open={isConfirmationOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this transaction?"
      />
    <Card sx={{ minWidth: 450 }}>
      <CardContent style={{ background: "#effaf0", marginTop: "4px", width: "auto", borderRadius: "5px" }}>
        {/* Wrap name and link in a single div */}
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            style={{ marginRight: "10px" }}
          >
            {transaction.name}
          </Typography>
          {/* Link to the transaction detail page */}
          <Typography variant="body1" coldor="primary">
            <Link to={`/transaction/${transaction.id}`}>View Details</Link>
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Typography variant="body2">{transaction.city}</Typography>
          <Typography variant="body1" color="primary">
            <button onClick={handleDelete} disabled={!user} hidden={!user}>Delete</button>
          </Typography>
        </div>
      </CardContent>
    </Card>
    </>
  );
};

export default TransactionCard;
