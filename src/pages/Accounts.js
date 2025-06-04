import { useEffect, useState } from "react";
import AccountTable from "../components/AccountTable";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Accounts = () => {
  const [user] = useAuthState(auth);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // get all the docs from collections
    fetchAccounts();
  }, [user]);

  const addAccount = async (account, many) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/accounts`),
        account
      );
      if (!many) toast.success("Account Added!");
      setAccounts([...accounts, account]);
    } catch (err) {
      if (!many) toast.error("Couldn't add account");
    }
  };


  const fetchAccounts = async () => {
    if (user) {
      const dataRef = query(collection(db, `users/${user.uid}/accounts`));
      const querySnapshot = await getDocs(dataRef);
      let accountArray = [];
      querySnapshot.forEach((doc) => {
        accountArray.push({ ...doc.data(), id: doc.id });
      });
      setAccounts(accountArray);
      toast.success("Accounts Fetched!");
    }
  };



  return (
    <>
      <AccountTable accounts={accounts} addAccount={addAccount} fetchAccounts={fetchAccounts}></AccountTable>
    </>
  )
}

export default Accounts;