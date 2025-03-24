"use client"

import { useState, useEffect } from "react"
import { RefreshCcw, User, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function ClearanceDashboard({ userData = null }) {
  // Default user data if none is provided from database
  const [user, setUser] = useState(userData || { name: "Ronald Richards", id: "STD12345" })
  const [clearanceData, setClearanceData] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())
  const [tooltipVisible, setTooltipVisible] = useState({})

  // Function to fetch clearance data from API
  const fetchClearanceData = async () => {
    setIsLoading(true)
    try {
      // Fixed API endpoint to match the route we created
      const response = await fetch("/api/student/clearance")
      if (!response.ok) {
        throw new Error("Failed to fetch clearance data")
      }
      const data = await response.json()
      setClearanceData(data)
    } catch (error) {
      console.error("Error fetching clearance data:", error)
      // Fallback to initial data in case of error to prevent "No clearance data available"
      setClearanceData([
        { id: "1", office: "Head of Department", status: "--", lastUpdated: new Date() },
        { id: "2", office: "Bursary", status: "--", lastUpdated: new Date() },
        { id: "3", office: "Library", status: "--", lastUpdated: new Date() },
        { id: "4", office: "Bookshop", status: "--", lastUpdated: new Date() },
        { id: "5", office: "E.G WHITE", status: "--", lastUpdated: new Date() },
        { id: "6", office: "BUTH", status: "--", lastUpdated: new Date() },
        { id: "7", office: "Alumni", status: "--", lastUpdated: new Date() },
        { id: "8", office: "Security", status: "--", lastUpdated: new Date() },
        { id: "9", office: "VPSD", status: "--", lastUpdated: new Date() },
        { id: "10", office: "School Officer", status: "--", lastUpdated: new Date() },
        { id: "11", office: "Registrar", status: "--", lastUpdated: new Date() },
      ])
    } finally {
      setIsLoading(false)
      setLastRefreshed(new Date())
    }
  }

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your actual user data endpoint
        if (!userData) {
          const response = await fetch("/api/student/profile")
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

  // Check if all clearances are completed
  const allClearancesCompleted = clearanceData.length > 0 && clearanceData.every((item) => item.status === "Cleared")

  const handleRefresh = () => {
    setIsRefreshing(true)
    fetchClearanceData().finally(() => {
      setIsRefreshing(false)
    })
  }

  const handleRequestAll = async () => {
    try {
      // endpoint to create a new clearance request
      const response = await fetch("/api/clearance", {
        method: "POST",
      })

      if (response.ok) {
        // Refresh data after a short delay
        setTimeout(() => {
          fetchClearanceData()
        }, 1000)
      }
    } catch (error) {
      console.error("Error requesting clearance:", error)
    }
  }

  

  const formatLastUpdated = (date) => {
    const minutes = Math.round((date.getTime() - new Date().getTime()) / (1000 * 60))
    if (minutes === 0) return "just now"
    if (minutes > 0) return `in ${minutes} minutes`
    return `${Math.abs(minutes)} minutes ago`
  }

  const getStatusBadge = (status) => {
    switch (status) {
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
            <h2 className="text-xl font-semibold">Student Dashboard</h2>
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
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <div className="text-sm font-medium mb-1">Clearance Overview</div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                <span>Last updated: {formatLastUpdated(lastRefreshed)}</span>
              </div>
            </div>
            <div className="relative w-full bg-gray-300 rounded-full h-3">
              <div
                className="absolute top-0 left-0 bg-blue-900 h-3 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-right text-sm mt-1 font-medium">Progress: {progressPercentage}%</div>
          </div>

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
              <button
                className={`px-4 py-2 rounded-lg bg-blue-900 text-white w-full sm:w-auto ${allClearancesCompleted ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-800"}`}
                onClick={handleRequestAll}
                disabled={allClearancesCompleted}
              >
                {allClearancesCompleted ? "All Clearances Completed" : "Request Clearance"}
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
            </div>
          ) : clearanceData.length === 0 ? (
            <div className="bg-gray-100 p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No clearance data available</p>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-12 font-medium pb-2 mb-2 border-b">
                <span className="col-span-6 md:col-span-7 text-gray-700">Offices</span>
                <span className="col-span-6 md:col-span-5 text-gray-700 text-center">Status</span>
              </div>

              <div className="space-y-2">
                {clearanceData.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 py-3 bg-white rounded-lg shadow-sm items-center">
                    <div className="col-span-6 md:col-span-7 font-medium text-blue-900 relative">
                      <span
                        className="cursor-pointer truncate block px-3"
                        onMouseEnter={() => toggleTooltip(item.id)}
                        onMouseLeave={() => toggleTooltip(item.id)}
                      >
                        {item.office}
                      </span>
                      {tooltipVisible[item.id] && (
                        <div className="absolute z-10 px-2 py-1 text-xs bg-gray-800 text-white rounded shadow-lg -mt-1 ml-4">
                          Last updated: {new Date(item.lastUpdated).toLocaleTimeString()}
                        </div>
                      )}
                    </div>

                    <div className="col-span-6 md:col-span-5 flex justify-center items-center gap-3">
                      <div>{getStatusBadge(item.status)}</div>
                      {item.status === "Cleared" && (
                        <span className="text-green-600">
                          <CheckCircle className="h-5 w-5" />
                        </span>
                      )}
                      {item.status === "Processing" && (
                        <div className="animate-pulse">
                          <AlertCircle className="h-5 w-5 text-blue-500" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

