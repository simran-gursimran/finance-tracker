import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Modal from "antd/es/modal/Modal";
import AddExpense from "../components/Modals/addExpense";
import AddIncome from "../components/Modals/addIncome";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../components/TransactionsTable";
import ChartComponent from "../components/Charts";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  // all trasactions storing this array after that fetching into doc
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [activeTab, setActiveTab] = useState("TRANSACTIONS")

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const handleActiveTabChange = (activeTab) => {
    setActiveTab(activeTab);
  }

  // Adding a income and expense on the firebase new collection in diffrent uid
  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("DD-MM-YYYY"),
      amount: parseFloat(values.amount),
      name: values.name,
      account: values.account,
    };
    setTransactions([...transactions, newTransaction]);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
  };

  const addTransaction = async (transaction, many) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      if (!many) toast.success("Transaction Added!");
      // adding new transaction after that previous transactions
      setTransactions([...transactions, transaction]);
      calculateBalance();
      fetchTransactions();
    } catch (err) {
      if (!many) toast.error("Couldn't add transaction");
    }
  };

  const fetchTransactions = async () => {
    if (user) {
      const accountDataRef = query(collection(db, `users/${user.uid}/accounts`));
      const accountquerySnapshot = await getDocs(accountDataRef);
      let accountArray = [];
      accountquerySnapshot.forEach((doc) => {
        accountArray.push({ ...doc.data(), id: doc.id });
      });
      setAccounts(accountArray);
      const dataRef = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(dataRef);
      let transactionArray = [];
      querySnapshot.forEach((doc) => {
        transactionArray.push({ ...doc.data(), account: accountArray.find(account => account.id === doc.data().account)?.name, id: doc.id });
      });

      setTransactions(transactionArray);
      toast.success("Transaction Fetched!");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  // Calculate the inital FaBalanceScale, income and expenses
  const calculateBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += parseFloat(transaction.amount);
      } else {
        totalExpense += parseFloat(transaction.amount);
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
    setCurrentBalance(totalIncome - totalExpense);
  };

  return (
    <div>
      <NavBar activeTab={activeTab} handleActiveTabChange={handleActiveTabChange}>
        <>
          <Cards
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            income={income}
            expense={expense}
            currentBalance={currentBalance}
          />
          <Modal open={isIncomeModalVisible} onCancel={handleIncomeCancel}>
            Income
          </Modal>
          <Modal open={isExpenseModalVisible} onCancel={handleExpenseCancel}>
            Expense
          </Modal>
          <AddExpense
            accounts={accounts}
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncome
            accounts={accounts}
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          {activeTab === "CHARTS" ?
            <div className="chart container">
              {transactions.length !== 0 ? (
                <div className="line-chart">
                  <ChartComponent transactions={transactions} />
                </div>
              ) : (
                <div className="no-transaction">
                  <h2>No Transactions Avalaible</h2>
                  <img
                    src={process.env.PUBLIC_URL + "/coin.gif"}
                    alt="No-transaction-img"
                  />
                </div>
              )}
            </div>
            : <></>}
          {activeTab === "TRANSACTIONS" ?
            <TransactionsTable
              transactions={transactions}
              addTransaction={addTransaction}
              fetchTransactions={fetchTransactions}
            /> : <></>
          }
        </>
      </NavBar>
    </div>
  );
};

export default Dashboard;
