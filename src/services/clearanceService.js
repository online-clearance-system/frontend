import api from './api';

const clearanceService = {
  // Create a new clearance request
  createClearance: async (clearanceData) => {
    try {
      const response = await api.post('/api/clearance', clearanceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create clearance request' };
    }
  },

  // Get clearance by ID
  getClearanceById: async (id) => {
    try {
      const response = await api.get(`/api/clearance/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch clearance details' };
    }
  },

  // Approve clearance
  approveClearance: async (id, approverName) => {
    try {
      const response = await api.patch(`/api/clearance/${id}/approve`, { approverName });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to approve clearance' };
    }
  },

  // Deny clearance
  denyClearance: async (id, approverName, reason) => {
    try {
      const response = await api.patch(`/api/clearance/${id}/deny`, { approverName, reason });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to deny clearance' };
    }
  },

 
};

export default clearanceService;