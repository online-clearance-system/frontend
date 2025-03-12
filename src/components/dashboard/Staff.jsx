"use client"

import { useState, useEffect } from "react"
import { RefreshCcw, User, CheckCircle, AlertCircle, LogOut, Check, X } from "lucide-react"

// Initial data with "--" as default status and both name and matric
const initialClearanceData = [
  {
    id: "1",
    name: "Stephen Luca",
    matric: "21/0001",
    status: "--",
    actionStatus: null,
    lastUpdated: new Date(),
    rejectReason: "",
  },
  {
    id: "2",
    name: "Ajayi Opemipo Esther",
    matric: "21/0002",
    status: "--",
    actionStatus: null,
    lastUpdated: new Date(),
    rejectReason: "",
  },
  {
    id: "3",
    name: "Emelifonwu William Samuel",
    matric: "21/0003",
    status: "--",
    actionStatus: null,
    lastUpdated: new Date(),
    rejectReason: "",
  },
  {
    id: "4",
    name: "John Doe",
    matric: "21/0004",
    status: "--",
    actionStatus: null,
    lastUpdated: new Date(),
    rejectReason: "",
  },
  {
    id: "5",
    name: "Jane Smith",
    matric: "21/0005",
    status: "--",
    actionStatus: null,
    lastUpdated: new Date(),
    rejectReason: "",
  },
  {
    id: "6",
    name: "Alice Johnson",
    matric: "21/0006",
    status: "--",
    actionStatus: null,
    lastUpdated: new Date(),
    rejectReason: "",
  },
  {
    id: "7",
    name: "Bob Wilson",
    matric: "21/0007",
    status: "--",
    actionStatus: null,
    lastUpdated: new Date(),
    rejectReason: "",
  },
  {
    id: "8",
    name: "Carol Brown",
    matric: "21/0008",
    status: "--",
    actionStatus: null,
    lastUpdated: new Date(),
    rejectReason: "",
  },
  {
    id: "9",
    name: "David Clark",
    matric: "21/0009",
    status: "--",
    actionStatus: null,
    lastUpdated: new Date(),
    rejectReason: "",
  },
  {
    id: "10",
    name: "Eva Davis",
    matric: "21/0010",
    status: "--",
    actionStatus: null,
    lastUpdated: new Date(),
    rejectReason: "",
  },
  {
    id: "11",
    name: "Frank Miller",
    matric: "21/0011",
    status: "--",
    actionStatus: null,
    lastUpdated: new Date(),
    rejectReason: "",
  },
]

export default function ClearanceDashboard({ userData = null }) {
  // Default user data if none is provided from database
  const [user, setUser] = useState(userData || { name: "Ronald Richards", id: "STF12345" })
  const [clearanceData, setClearanceData] = useState(initialClearanceData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())
  const [tooltipVisible, setTooltipVisible] = useState({})
  // Add useState for profile dropdown
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  // States for confirmation modals
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null) // "approve" or "reject"
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [showReasonInput, setShowReasonInput] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  // Add a function to handle logout
  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...")
    // For demo purposes, just close the dropdown
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
  const handleRejectWithReason = () => {
    if (rejectReason.trim()) {
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

  // Simulate fetching user data from database
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchUserData = async () => {
      try {
        // Simulating API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // If userData prop is not provided, we could fetch from an API here
        if (!userData) {
          // Simulated database response
          const mockDatabaseResponse = {
            name: "Ronald Richards",
            id: "STF12345",
            email: "ronald.richards@example.edu",
          }
          setUser(mockDatabaseResponse)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [userData])

  // Calculate progress percentage - only count items that are "Cleared"
  const clearedCount = clearanceData.filter((item) => item.status === "Cleared").length
  const progressPercentage = Math.round((clearedCount / clearanceData.length) * 100)

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setClearanceData([...initialClearanceData])
      setLastRefreshed(new Date())
      setIsRefreshing(false)
    }, 1000)
  }

  const handleRequestAll = () => {
    setClearanceData((prevData) =>
      prevData.map((item) =>
        item.status === "--" ? { ...item, status: "Processing", lastUpdated: new Date() } : item,
      ),
    )

    // Simulate processing time for each item
    clearanceData.forEach((item, index) => {
      if (item.status === "--") {
        setTimeout(
          () => {
            setClearanceData((prevData) => {
              const newData = [...prevData]
              const itemIndex = newData.findIndex((i) => i.id === item.id)
              if (itemIndex !== -1) {
                newData[itemIndex] = {
                  ...newData[itemIndex],
                  status: "Cleared",
                  lastUpdated: new Date(),
                }
              }
              return newData
            })
          },
          2000 + index * 1000,
        ) // Stagger the updates
      }
    })
  }

  const handleRequestSingle = (id) => {
    setClearanceData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, status: "Processing", lastUpdated: new Date() } : item)),
    )

    // Simulate processing time
    setTimeout(() => {
      setClearanceData((prevData) => {
        const newData = [...prevData]
        const itemIndex = newData.findIndex((i) => i.id === id)
        if (itemIndex !== -1) {
          newData[itemIndex] = {
            ...newData[itemIndex],
            status: "Cleared",
            lastUpdated: new Date(),
          }
        }
        return newData
      })
    }, 2000)
  }

  const handleApprove = (id) => {
    setClearanceData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, actionStatus: "approved", status: "Approved", lastUpdated: new Date() } : item,
      ),
    )
  }

  const handleReject = (id) => {
    setClearanceData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, actionStatus: "rejected", status: "Rejected", lastUpdated: new Date() } : item,
      ),
    )
  }

  const formatLastUpdated = (date) => {
    const minutes = Math.round((date.getTime() - new Date().getTime()) / (1000 * 60))
    if (minutes === 0) return "just now"
    if (minutes > 0) return `in ${minutes} minutes`
    return `${Math.abs(minutes)} minutes ago`
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

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Keep header section unchanged */}
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

          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-12 font-medium pb-2 mb-2 border-b">
              <span className="col-span-3 md:col-span-4 text-gray-700">Name</span>
              <span className="col-span-2 md:col-span-2 text-gray-700">Matric No.</span>
              <span className="col-span-4 md:col-span-3 text-gray-700 text-center">Action</span>
              <span className="col-span-3 text-right text-gray-700">Status</span>
            </div>

            <div className="space-y-2">
              {clearanceData.map((item) => (
                <div key={item.id} className="grid grid-cols-12 py-3 bg-white rounded-lg shadow-sm items-center">
                  <div className="col-span-3 md:col-span-4 font-medium text-gray-700">
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
                  rows="3"
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
                  className={`px-4 py-2 rounded-md text-white ${
                    confirmAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
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
    </div>
  )
}

