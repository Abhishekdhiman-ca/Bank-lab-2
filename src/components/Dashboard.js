import React, { useState, useEffect } from "react";
import "./Dashboard.css"; // Import the custom CSS
import { Carousel, Modal, Button } from "react-bootstrap";
import A from "./../img bank.jpg";
import B from "./../img bank.jpg";
import C from "./../img bank.jpg";

const url = "https://json-storage-api.p.rapidapi.com/datalake";
const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "737b5b8023msh5dc8759b04faf33p1be655jsn98f86fc2f298",
  "X-RapidAPI-Host": "json-storage-api.p.rapidapi.com",
};

// Static account number
const accountNumber = localStorage.getItem("accountNumber");
const accountId = "USERID-" + accountNumber;

const Dashboard = () => {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [transactionType, setTransactionType] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  const storeTransaction = async (transaction) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          "@context": [
            "http://schema4i.org/Thing.jsonld",
            "http://schema4i.org/Action.jsonld",
            "http://schema4i.org/CreateAction.jsonld",
          ],
          "@type": "CreateAction",
          Result: {
            "@context": [
              "http://schema4i.org/DataLakeItem.jsonld",
              "http://schema4i.org/UserAccount.jsonld",
              "http://schema4i.org/OfferForPurchase.jsonld",
              "http://schema4i.org/Offer.jsonld",
              "http://schema4i.org/Organization.jsonld",
              "http://schema4i.org/PostalAddress.jsonld",
            ],
            "@type": "DataLakeItem",
            Name: "Transaction",
            Creator: {
              "@type": "UserAccount",
              Identifier: accountId, // Use static account number
            },
            About: {
              "@type": "Organization",
            },
            Amount: transaction.amount,
            Balance: transaction.balance,
            Type: transaction.type,
            SerialNumber: transaction.serial, // Add serial number to the transaction
          },
        }),
      });

      const data = await response.json();
      console.log(data);
      // After each transaction, load the latest transactions to update the balance
      loadTransactions();
    } catch (error) {
      console.error("Error storing transaction:", error);
    }
  };

  const loadTransactions = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          "@context": [
            "http://schema4i.org/Thing.jsonld",
            "http://schema4i.org/Action.jsonld",
            "http://schema4i.org/SearchAction.jsonld",
          ],
          "@type": "SearchAction",
          Object: {
            "@context": [
              "http://schema4i.org/Thing.jsonld",
              "http://schema4i.org/Filter",
              "http://schema4i.org/DataLakeItem",
              "http://schema4i.org/UserAccount",
            ],
            "@type": "Filter",
            FilterItem: {
              "@type": "DataLakeItem",
              Creator: {
                "@type": "UserAccount",
                Identifier: accountId, // Use static account number
              },
            },
          },
        }),
      });

      const data = await response.json();
      const result = data.Result.ItemListElement.map((item) => item.Item);
      // Sort transactions by serial number in ascending order
      result.sort((a, b) => a.SerialNumber - b.SerialNumber);
      setTransactions(result);
      if (result.length > 0) {
        // Update balance to the latest transaction's balance
        const latestBalance = result[result.length - 1].Balance;
        setBalance(latestBalance);
        if (latestBalance < 0) {
          setErrorMessage("Insufficient balance for withdrawal");
        } else {
          setErrorMessage("");
        }
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  };

  const clearTransactions = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          "@context": [
            "http://schema4i.org/Thing.jsonld",
            "http://schema4i.org/Action.jsonld",
            "http://schema4i.org/DeleteAction.jsonld",
          ],
          "@type": "DeleteAction",
          Object: {
            "@context": [
              "http://schema4i.org/Thing.jsonld",
              "http://schema4i.org/Filter",
              "http://schema4i.org/DataLakeItem",
              "http://schema4i.org/UserAccount",
            ],
            "@type": "Filter",
            FilterItem: {
              "@type": "DataLakeItem",
              Creator: {
                "@type": "UserAccount",
                Identifier: accountId, // Use static account number
              },
            },
          },
        }),
      });

      const data = await response.json();
      console.log(data);
      setTransactions([]);
      setBalance(0);
      setErrorMessage("");
    } catch (error) {
      console.error("Error clearing transactions:", error);
    }
  };

  const handleConfirmTransaction = async () => {
    if (transactionType === "Withdraw" && amount > balance) {
      setErrorMessage("Insufficient balance for withdrawal");
      setShowModal(false);
      return;
    }

    const newBalance =
      transactionType === "Deposit"
        ? balance + parseFloat(amount)
        : balance - parseFloat(amount);

    await storeTransaction({
      amount: parseFloat(amount),
      balance: newBalance,
      type: transactionType,
      serial: transactions.length + 1,
    });

    setBalance(newBalance); // Update balance state
    setAmount(0); // Reset input field
    setShowModal(false); // Close the modal
    loadTransactions(); // Reload transactions to update balance
  };

  const handleTransactionClick = (type) => {
    setTransactionType(type);
    setShowModal(true);
  };

  return (
    <div className="transection-area container mt-5">
      <div className="row justify-content-center">
        <div className="dashboard-container">
          <Carousel className="carousel-container">
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-img"
                src={A}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img   className="d-block w-100 carousel-img" src={B} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img   className="d-block w-100 carousel-img" src={C} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
          <h1 className="text-center">
            {" "}
            <span className="span">Transaction</span> App
          </h1>

          <div className="form-group text-center">
            <input
              className="form-control"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <div className="btn-group mt-3" role="group">
              <button
                className="btn btn-primary btn-sm custom-button"
                onClick={() => handleTransactionClick("Deposit")}
              >
                Deposit
              </button>
              <button
                className="btn btn-primary btn-sm custom-button"
                onClick={() => handleTransactionClick("Withdraw")}
              >
                Withdraw
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-center">Current Balance: ${balance}</h2>
            {errorMessage && (
              <p className="text-center text-danger">{errorMessage}</p>
            )}
          </div>
          <div className="text-center">
            <h2>Transactions:</h2>
            <div className="btn-group mb-3" role="group">
              <button
                className="btn btn-primary btn-sm custom-button"
                onClick={loadTransactions}
              >
                Load Transactions
              </button>
              <button
                className="btn btn-primary btn-sm custom-button"
                onClick={clearTransactions}
              >
                Clear Transactions
              </button>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Current Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.SerialNumber}</td>
                    <td>{transaction.Type}</td>
                    <td>${transaction.Amount}</td>
                    <td>${transaction.Balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm {transactionType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {transactionType.toLowerCase()} ${amount}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmTransaction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
