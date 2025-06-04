import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export const deleteAccountOnFirebase = async (userId, delteField) => {
  try {
    // Step 1: Get the document reference for the specific transaction in Firestore
    // using their uniqe doc id
    const accountRef = doc(
      db,
      `users/${userId}/accounts/${delteField.id}`
    );
    const accountDoc = await getDoc(accountRef); // Corrected: Use getDoc to fetch the transaction document
    if (accountRef.exists()) {
      // Step 2: Get the transaction data from the document
      const accountData = accountDoc.data();
      // Step 4: Update the transaction in Firestore
      await deleteDoc(accountRef, accountData);
      toast.success("Account data Deleted successfully.");
    } else {
      toast.error("Account not found in the database.");
    }
  } catch (error) {
    toast.error(error.message);
  }
};
