import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const logAdminAction = async (userEmail: string, action: string) => {
  try {
    await addDoc(collection(db, 'adminLogs'), {
      userEmail,
      action,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error logging admin action:', error);
  }
};
