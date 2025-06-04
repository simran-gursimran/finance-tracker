import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export const updateAccountOnFirebase = async (userId, updatedFields) => {
  try {
    // Step 1: Get the document reference for the specific transaction in Firestore
    // using their uniqe doc id
    const accountRef = doc(
      db,
      `users/${userId}/accounts/${updatedFields.id}`
    );
    const accountDoc = await getDoc(accountRef); // Corrected: Use getDoc to fetch the transaction document
    if (accountDoc.exists()) {
      // Step 2: Get the transaction data from the document
      const accountData = accountDoc.data();
      // Step 3: Update the desired fields of the transaction data with the new values
      const updatedAccount = { ...accountData, ...updatedFields };
      // Step 4: Update the transaction in Firestore
      await updateDoc(accountRef, updatedAccount);
      toast.success("Account data updated successfully.");
    } else {
      toast.error("Account not found in the database.");
    }
  } catch (error) {
    toast.error(error.message);
  }
};
