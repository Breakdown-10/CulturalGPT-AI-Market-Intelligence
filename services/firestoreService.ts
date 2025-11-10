import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Types
export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  createdAt: Timestamp;
  subscription?: 'free' | 'pro' | 'enterprise';
}

export interface AnalysisReport {
  id: string;
  userId: string;
  brandName: string;
  targetMarket: string;
  createdAt: Timestamp;
  status: 'pending' | 'completed' | 'failed';
  data?: {
    culturalAlignment?: number;
    insights?: string[];
    recommendations?: string[];
    risks?: string[];
    strategy?: string;
  };
}

// User Profile Operations
export const createUserProfile = async (uid: string, email: string, name: string) => {
  const userRef = doc(db, 'users', uid);
  const userData: UserProfile = {
    uid,
    email,
    name,
    createdAt: Timestamp.now(),
    subscription: 'free'
  };
  await setDoc(userRef, userData);
  return userData;
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, updates);
};

// Analysis Report Operations
export const createAnalysisReport = async (
  userId: string,
  brandName: string,
  targetMarket: string
): Promise<string> => {
  const reportsRef = collection(db, 'reports');
  const newReportRef = doc(reportsRef);
  
  const reportData: AnalysisReport = {
    id: newReportRef.id,
    userId,
    brandName,
    targetMarket,
    createdAt: Timestamp.now(),
    status: 'pending'
  };
  
  await setDoc(newReportRef, reportData);
  return newReportRef.id;
};

export const updateAnalysisReport = async (
  reportId: string,
  updates: Partial<AnalysisReport>
) => {
  const reportRef = doc(db, 'reports', reportId);
  await updateDoc(reportRef, updates);
};

export const getAnalysisReport = async (reportId: string): Promise<AnalysisReport | null> => {
  const reportRef = doc(db, 'reports', reportId);
  const reportSnap = await getDoc(reportRef);
  
  if (reportSnap.exists()) {
    return reportSnap.data() as AnalysisReport;
  }
  return null;
};

export const getUserReports = async (userId: string): Promise<AnalysisReport[]> => {
  const reportsRef = collection(db, 'reports');
  const q = query(
    reportsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as AnalysisReport);
};

export const deleteAnalysisReport = async (reportId: string) => {
  const reportRef = doc(db, 'reports', reportId);
  await deleteDoc(reportRef);
};
