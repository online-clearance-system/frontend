"use client"

import { useState, useEffect } from "react"
import { RefreshCcw, User, CheckCircle, AlertCircle, LogOut, Check, X, AlertTriangle, Clock } from "lucide-react"

export default function StaffClearanceDashboard({ userData = null }) {
  // Default user data if none is provided from database
  const [user, setUser] = useState(userData || { name: "Ronald Richards", id: "STF12345" })
  const [clearanceData, setClearanceData] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())
  const [tooltipVisible, setTooltipVisible] = useState({})
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // States for confirmation modals
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null) // "approve" or "reject"
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [showReasonInput, setShowReasonInput] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  // State for student details modal
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  // Function to fetch clearance data from API
  const fetchClearanceData = async () => {
    setIsLoading(true)
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/staff/clearance")
      if (!response.ok) {
        throw new Error("Failed to fetch clearance data")
      }
      const data = await response.json()
      setClearanceData(data)
    } catch (error) {
      console.error("Error fetching clearance data:", error)
      // Fallback to initial data in case of error
      setClearanceData([])
    } finally {
      setIsLoading(false)
      setLastRefreshed(new Date())
    }
  }

  // Function to fetch a single clearance by ID
  const fetchClearanceById = async (id) => {
    try {
      const response = await fetch(`/api/clearance/${id}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json', 
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch clearance with ID ${id}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching clearance with ID ${id}:`, error);
      return null;
    }
  };
  

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Replace with your actual logout endpoint
      const response = await fetch("/api/logout", {
        method: "POST",
      })

      if (response.ok) {
        // Redirect to login page or perform other logout actions
        window.location.href = "/login"
      }
    } catch (error) {
      console.error("Error logging out:", error)
    }
    setProfileDropdownOpen(false)
  }

  // Function to open confirmation modal for approve
  const confirmApprove = (id) => {
    setSelectedItemId(id)
    setConfirmAction("approve")
    setShowConfirmModal(true)
  }

  // Function to open confirmation modal for reject
  const confirmReject = (id) => {
    setSelectedItemId(id)
    setConfirmAction("reject")
    setShowConfirmModal(true)
  }

  // Function to handle modal confirmation
  const handleConfirm = () => {
    if (confirmAction === "approve") {
      handleApprove(selectedItemId)
      setShowConfirmModal(false)
    } else if (confirmAction === "reject") {
      setShowReasonInput(true)
      // Don't close the modal yet, wait for reason input
    }
  }

  // Function to handle rejection with reason
  const handleRejectWithReason = async () => {
    if (rejectReason.trim() && selectedItemId) {
      try {
        // Endpoint to handle rejection
        const response = await fetch(`/api/clearance/${id}/deny`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: rejectReason,
          }),
        })

        if (response.ok) {
          // Update local state to reflect the change
          setClearanceData((prevData) =>
            prevData.map((item) =>
              item.id === selectedItemId
                ? {
                  ...item,
                  actionStatus: "rejected",
                  status: "Rejected",
                  lastUpdated: new Date(),
                  rejectReason: rejectReason,
                }
                : item,
            ),
          )
        } else {
          throw new Error("Failed to reject clearance")
        }
      } catch (error) {
        console.error("Error rejecting clearance:", error)
        // You could add error handling UI here
      }

      // Reset states
      setShowConfirmModal(false)
      setShowReasonInput(false)
      setRejectReason("")
      setSelectedItemId(null)
      setConfirmAction(null)
    }
  }

  // Function to close modal
  const closeModal = () => {
    setShowConfirmModal(false)
    setShowReasonInput(false)
    setRejectReason("")
    setSelectedItemId(null)
    setConfirmAction(null)
  }

  // Function to close details modal
  const closeDetailsModal = () => {
    setSelectedStudent(null)
  }

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with  actual user data endpoint
        if (!userData) {
          const response = await fetch("/api/staff/profile")
          if (response.ok) {
            const data = await response.json()
            setUser(data)
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
    fetchClearanceData() // Initial data fetch
  }, [userData])

  // Calculate progress percentage - only count items that are "Cleared"
  const clearedCount = clearanceData.filter((item) => item.status === "Cleared").length
  const progressPercentage = Math.round((clearedCount / clearanceData.length) * 100) || 0

  const handleRefresh = () => {
    setIsRefreshing(true)
    fetchClearanceData().finally(() => {
      setIsRefreshing(false)
    })
  }

  const handleApprove = async (id) => {
    try {
      // Replace with actual approve endpoint
      const response = await fetch(`/api/clearance/${id}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        // Update local state to reflect the change
        setClearanceData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, actionStatus: "approved", status: "Approved", lastUpdated: new Date() } : item,
          ),
        )
      } else {
        throw new Error("Failed to approve clearance")
      }
    } catch (error) {
      console.error("Error approving clearance:", error)
      // add error handling UI here
    }
  }

  const formatLastUpdated = (date) => {
    const minutes = Math.round((date.getTime() - new Date().getTime()) / (1000 * 60))
    if (minutes === 0) return "just now"
    if (minutes > 0) return `in ${minutes} minutes`
    return `${Math.abs(minutes)} minutes ago`
  }

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-600 text-white">Approved</span>
      case "Rejected":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-600 text-white">Rejected</span>
      case "Cleared":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-600 text-white">Cleared</span>
      case "Processing":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500 text-white">Pending</span>
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full border border-gray-400 text-gray-500">--</span>
        )
    }
  }

  const toggleTooltip = (id) => {
    setTooltipVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Get the selected student's name for the modal
  const getSelectedStudentName = () => {
    const student = clearanceData.find((item) => item.id === selectedItemId)
    return student ? student.name : ""
  }

  // Function to view student details
  const viewStudentDetails = (id) => {
    fetchStudentDetails(id)
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header section */}
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-semibold">Staff Dashboard</h2>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="text-gray-700 font-medium block">Welcome, {user.name}</span>
                <span className="text-gray-500 text-sm">{user.id}</span>
              </div>
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <User className="h-6 w-6 text-gray-600" />
                </div>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h3 className="text-lg font-semibold">Clearance Status</h3>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 flex items-center justify-center w-full sm:w-auto ${isRefreshing ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-100"}`}
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Refreshing..." : "Refresh List"}
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : clearanceData.length === 0 ? (
            <div className="bg-gray-100 p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No clearance data available</p>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-12 font-medium pb-2 mb-2 border-b">
                <span className="col-span-3 md:col-span-4 text-gray-700">Name</span>
                <span className="col-span-2 md:col-span-2 text-gray-700">Matric No.</span>
                <span className="col-span-4 md:col-span-3 text-gray-700 text-center">Action</span>
                <span className="col-span-3 text-right text-gray-700">Status</span>
              </div>

              <div className="space-y-2">
                {clearanceData.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 py-3 bg-white rounded-lg shadow-sm items-center hover:bg-gray-50"
                  >
                    <div
                      className="col-span-3 md:col-span-4 font-medium text-gray-700 cursor-pointer"
                      onClick={() => viewStudentDetails(item.id)}
                    >
                      <span className="truncate block px-3">{item.name}</span>
                    </div>
                    <div className="col-span-2 md:col-span-2 font-medium text-gray-700">
                      <span className="truncate block px-3">{item.matric}</span>
                    </div>

                    <div className="col-span-4 md:col-span-3 text-center">
                      {item.actionStatus === "approved" ? (
                        <span className="px-3 py-1 text-sm rounded text-green-600 flex items-center justify-center mx-auto">
                          <CheckCircle className="h-5 w-5" />
                        </span>
                      ) : item.actionStatus === "rejected" ? (
                        <span className="px-3 py-1 text-sm rounded text-red-600 flex items-center justify-center mx-auto">
                          <AlertCircle className="h-5 w-5" />
                        </span>
                      ) : (
                        <div className="flex justify-center space-x-4">
                          <button
                            className="text-green-600 hover:text-green-700 transition-colors"
                            onClick={() => confirmApprove(item.id)}
                          >
                            <Check className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-700 transition-colors"
                            onClick={() => confirmReject(item.id)}
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="col-span-3 text-right px-3">{getStatusBadge(item.status)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {confirmAction === "approve"
                ? `Are you sure you want to approve ${getSelectedStudentName()}?`
                : `Are you sure you want to reject ${getSelectedStudentName()}?`}
            </h3>

            {showReasonInput ? (
              <div className="mb-4">
                <label htmlFor="rejectReason" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter reason for rejection:
                </label>
                <textarea
                  id="rejectReason"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Please provide a reason for rejection..."
                ></textarea>
              </div>
            ) : null}

            <div className="flex justify-end space-x-3 mt-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={closeModal}
              >
                No
              </button>

              {showReasonInput ? (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  onClick={handleRejectWithReason}
                  disabled={!rejectReason.trim()}
                >
                  Submit
                </button>
              ) : (
                <button
                  className={`px-4 py-2 rounded-md text-white ${confirmAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                    }`}
                  onClick={handleConfirm}
                >
                  Yes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Student Clearance Details</h3>
              <button onClick={closeDetailsModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {isLoadingDetails ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"></div>
              </div>
            ) : (
              <div className="p-4">
                <div className="space-y-4">
                  {/* Student Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Student Information</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{selectedStudent.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Matric No.</p>
                        <p className="font-medium">{selectedStudent.matric}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-full">
                      {selectedStudent.status === "Cleared" || selectedStudent.status === "Approved" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : selectedStudent.status === "Processing" ? (
                        <AlertCircle className="h-5 w-5 text-blue-500" />
                      ) : selectedStudent.status === "Rejected" ? (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium">{selectedStudent.status}</p>
                    </div>
                  </div>

                  {/* Rejection Reason - Only show if status is Rejected */}
                  {selectedStudent.status === "Rejected" && selectedStudent.rejectReason && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-700">Reason for Rejection</p>
                          <p className="text-sm text-red-600">{selectedStudent.rejectReason}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Last Updated */}
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{formatDate(selectedStudent.lastUpdated)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  {selectedStudent.status !== "Approved" && selectedStudent.status !== "Rejected" && (
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        onClick={() => {
                          handleApprove(selectedStudent.id)
                          closeDetailsModal()
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={() => {
                          closeDetailsModal()
                          confirmReject(selectedStudent.id)
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  <div className="mt-2 flex justify-end">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                      onClick={closeDetailsModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

