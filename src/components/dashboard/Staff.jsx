import { useState, useEffect } from "react"
import { RefreshCcw, User, CheckCircle, AlertCircle } from "lucide-react"

// Initial data with "--" as default status
const initialClearanceData = [
  { id: "1", student: "Stephen Luca", status: "--", actionStatus: null, lastUpdated: new Date() },
  { id: "2", student: "Ajayi Opemipo Esther", status: "--", actionStatus: null, lastUpdated: new Date() },
  { id: "3", student: "Emelifonwu William Samuel", status: "--", actionStatus: null, lastUpdated: new Date() },
  { id: "4", student: "21/0004", status: "--", actionStatus: null, lastUpdated: new Date() },
  { id: "5", student: "21/0005", status: "--", actionStatus: null, lastUpdated: new Date() },
  { id: "6", student: "21/0006", status: "--", actionStatus: null, lastUpdated: new Date() },
  { id: "7", student: "21/0007", status: "--", actionStatus: null, lastUpdated: new Date() },
  { id: "8", student: "21/0008", status: "--", actionStatus: null, lastUpdated: new Date() },
  { id: "9", student: "21/0009", status: "--", actionStatus: null, lastUpdated: new Date() },
  { id: "10", student: "21/0010", status: "--", actionStatus: null, lastUpdated: new Date() },
  { id: "11", student: "21/0011", status: "--", actionStatus: null, lastUpdated: new Date() },
]

export default function ClearanceDashboard({ userData = null }) {
  // Default user data if none is provided from database
  const [user, setUser] = useState(userData || { name: "Ronald Richards", id: "STF12345" })
  const [clearanceData, setClearanceData] = useState(initialClearanceData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())
  const [tooltipVisible, setTooltipVisible] = useState({})

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

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-semibold">Staff Dashboard</h2>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="text-gray-700 font-medium block">Welcome, {user.name}</span>
                <span className="text-gray-500 text-sm">{user.id}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
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
              <span className="col-span-5 md:col-span-6 text-gray-700">Student</span>
              <span className="col-span-4 md:col-span-3 text-gray-700 text-center">Action</span>
              <span className="col-span-3 text-right text-gray-700">Status</span>
            </div>

            <div className="space-y-2">
              {clearanceData.map((item) => (
                <div key={item.id} className="grid grid-cols-12 py-3 bg-white rounded-lg shadow-sm items-center">
                  <div className="col-span-5 md:col-span-6 font-medium text-gray-700 relative">
                    <span
                      className="cursor-pointer truncate block px-3"
                      onMouseEnter={() => toggleTooltip(item.id)}
                      onMouseLeave={() => toggleTooltip(item.id)}
                    >
                      {item.student}
                    </span>
                    {tooltipVisible[item.id] && (
                      <div className="absolute z-10 px-2 py-1 text-xs bg-gray-800 text-white rounded shadow-lg -mt-1 ml-4">
                        Last updated: {item.lastUpdated.toLocaleTimeString()}
                      </div>
                    )}
                  </div>

                  <div className="col-span-4 md:col-span-3 text-center">
                    {item.actionStatus === "approved" ? (
                      <span className="px-3 py-1 text-sm rounded bg-green-600 text-white flex items-center justify-center mx-auto w-24">
                        <CheckCircle className="h-4 w-4 mr-1" /> Approved
                      </span>
                    ) : item.actionStatus === "rejected" ? (
                      <span className="px-3 py-1 text-sm rounded bg-red-600 text-white flex items-center justify-center mx-auto w-24">
                        <AlertCircle className="h-4 w-4 mr-1" /> Rejected
                      </span>
                    ) : (
                      <div className="flex justify-center space-x-2">
                        <button
                          className="px-3 py-1 text-sm rounded text-green-600 border-green-600 border-[1px] hover:bg-green-100"
                          onClick={() => handleApprove(item.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-1 text-sm rounded text-red-600 border-red-600 border-[1px] hover:bg-red-100"
                          onClick={() => handleReject(item.id)}
                        >
                          Reject
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
    </div>
  )
}

