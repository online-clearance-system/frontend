"use client"

import { useState, useEffect } from "react"
import { RefreshCcw, User, Clock, CheckCircle, AlertCircle } from "lucide-react"

// Initial data with "--" as default status
const initialClearanceData = [
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
]

export default function ClearanceDashboard({ userData = null }) {
  // Default user data if none is provided from database
  const [user, setUser] = useState(userData || { name: "Ronald Richards", id: "STD12345" })
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
            id: "STD12345",
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

  const formatLastUpdated = (date) => {
    const minutes = Math.round((date.getTime() - new Date().getTime()) / (1000 * 60))
    if (minutes === 0) return "just now"
    if (minutes > 0) return `in ${minutes} minutes`
    return `${Math.abs(minutes)} minutes ago`
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Cleared":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500 text-white">Cleared</span>
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
                className={`px-4 py-2 rounded-lg bg-blue-900 text-white w-full sm:w-auto ${clearanceData.every((item) => item.status !== "--") ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-800"}`}
                onClick={handleRequestAll}
                disabled={clearanceData.every((item) => item.status !== "--")}
              >
                Request Clearance (All)
              </button>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-12 font-medium pb-2 mb-2 border-b">
              <span className="col-span-5 md:col-span-6 text-gray-700">Offices</span>
              <span className="col-span-4 md:col-span-3 text-gray-700 text-center">Status</span>
              <span className="col-span-3 text-right text-gray-700">Action</span>
            </div>

            <div className="space-y-2">
              {clearanceData.map((item) => (
                <div key={item.id} className="grid grid-cols-12 py-3 bg-white rounded-lg shadow-sm items-center">
                  <div className="col-span-5 md:col-span-6 font-medium text-blue-900 relative">
                    <span
                      className="cursor-pointer truncate block px-3"
                      onMouseEnter={() => toggleTooltip(item.id)}
                      onMouseLeave={() => toggleTooltip(item.id)}
                    >
                      {item.office}
                    </span>
                    {tooltipVisible[item.id] && (
                      <div className="absolute z-10 px-2 py-1 text-xs bg-gray-800 text-white rounded shadow-lg -mt-1 ml-4">
                        Last updated: {item.lastUpdated.toLocaleTimeString()}
                      </div>
                    )}
                  </div>

                  <div className="col-span-4 md:col-span-3 text-center">{getStatusBadge(item.status)}</div>

                  <div className="col-span-3 text-right px-3">
                    {item.status === "--" ? (
                      <button
                        className="px-3 py-1 text-sm rounded border border-blue-900 text-blue-900 hover:bg-blue-50"
                        onClick={() => handleRequestSingle(item.id)}
                      >
                        Request
                      </button>
                    ) : item.status === "Cleared" ? (
                      <span className="inline-block text-green-500">
                        <CheckCircle className="h-5 w-5" />
                      </span>
                    ) : (
                      <div className="flex justify-end">
                        <div className="animate-pulse">
                          <AlertCircle className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

