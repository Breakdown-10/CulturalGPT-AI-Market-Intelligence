import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import {
  getUserReports,
  createAnalysisReport,
  updateAnalysisReport,
  deleteAnalysisReport,
  AnalysisReport
} from '../services/firestoreService';

export const useReports = () => {
  const [reports, setReports] = useState<AnalysisReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    const user = auth.currentUser;
    if (!user) {
      setReports([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userReports = await getUserReports(user.uid);
      setReports(userReports);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const createReport = async (brandName: string, targetMarket: string): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    try {
      const reportId = await createAnalysisReport(user.uid, brandName, targetMarket);
      await fetchReports(); // Refresh the list
      return reportId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create report');
      console.error('Error creating report:', err);
      return null;
    }
  };

  const updateReport = async (reportId: string, updates: Partial<AnalysisReport>) => {
    try {
      await updateAnalysisReport(reportId, updates);
      await fetchReports(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update report');
      console.error('Error updating report:', err);
    }
  };

  const deleteReport = async (reportId: string) => {
    try {
      await deleteAnalysisReport(reportId);
      await fetchReports(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete report');
      console.error('Error deleting report:', err);
    }
  };

  return {
    reports,
    loading,
    error,
    createReport,
    updateReport,
    deleteReport,
    refreshReports: fetchReports
  };
};
