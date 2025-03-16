import { useState } from "react"
import {
  RefreshCcw,
  User,
  CheckCircle,
  LogOut,
  Check,
  X,
  Search,
  Users,
  GraduationCap,
  FileCheck,
  Clock,
  Settings,
  BarChart3,
  Download,
} from "lucide-react"

// Initial data for staff members
const initialStaffData = [
  {
    id: "STF001",
    name: "Ronald Richards",
    department: "Head of Department",
    email: "ronald.r@example.edu",
    role: "Admin",
    lastActive: new Date(),
  },
  {
    id: "STF002",
    name: "Jane Cooper",
    department: "Bursary",
    email: "jane.c@example.edu",
    role: "Staff",
    lastActive: new Date(Date.now() - 86400000),
  },
  {
    id: "STF003",
    name: "Esther Howard",
    department: "Library",
    email: "esther.h@example.edu",
    role: "Staff",
    lastActive: new Date(Date.now() - 172800000),
  },
  {
    id: "STF004",
    name: "Cameron Williamson",
    department: "Bookshop",
    email: "cameron.w@example.edu",
    role: "Staff",
    lastActive: new Date(Date.now() - 259200000),
  },
  {
    id: "STF005",
    name: "Brooklyn Simmons",
    department: "E.G WHITE",
    email: "brooklyn.s@example.edu",
    role: "Staff",
    lastActive: new Date(Date.now() - 345600000),
  },
]

// Initial data for student clearances
const initialStudentData = [
  {
    id: "1",
    name: "Stephen Luca",
    matric: "21/0001",
    status: "Approved",
    department: "Computer Science",
    progress: 100,
    lastUpdated: new Date(),
  },
  {
    id: "2",
    name: "Ajayi Opemipo Esther",
    matric: "21/0002",
    status: "Pending",
    department: "Electrical Engineering",
    progress: 60,
    lastUpdated: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    name: "Emelifonwu William Samuel",
    matric: "21/0003",
    status: "Rejected",
    department: "Mechanical Engineering",
    progress: 40,
    lastUpdated: new Date(Date.now() - 172800000),
  },
  {
    id: "4",
    name: "John Doe",
    matric: "21/0004",
    status: "In Progress",
    department: "Civil Engineering",
    progress: 75,
    lastUpdated: new Date(Date.now() - 259200000),
  },
  {
    id: "5",
    name: "Jane Smith",
    matric: "21/0005",
    status: "Not Started",
    department: "Computer Science",
    progress: 0,
    lastUpdated: null,
  },
  {
    id: "6",
    name: "Alice Johnson",
    matric: "21/0006",
    status: "Approved",
    department: "Electrical Engineering",
    progress: 100,
    lastUpdated: new Date(Date.now() - 345600000),
  },
  {
    id: "7",
    name: "Bob Wilson",
    matric: "21/0007",
    status: "In Progress",
    department: "Mechanical Engineering",
    progress: 30,
    lastUpdated: new Date(Date.now() - 432000000),
  },
  {
    id: "8",
    name: "Carol Brown",
    matric: "21/0008",
    status: "Pending",
    department: "Civil Engineering",
    progress: 90,
    lastUpdated: new Date(Date.now() - 518400000),
  },
  {
    id: "9",
    name: "David Clark",
    matric: "21/0009",
    status: "Rejected",
    department: "Computer Science",
    progress: 50,
    lastUpdated: new Date(Date.now() - 604800000),
  },
  {
    id: "10",
    name: "Eva Davis",
    matric: "21/0010",
    status: "Approved",
    department: "Electrical Engineering",
    progress: 100,
    lastUpdated: new Date(Date.now() - 691200000),
  },
]

// Initial data for departments
const initialDepartmentData = [
  { id: "DEPT001", name: "Head of Department", totalStudents: 120, pendingClearances: 25, completedClearances: 95 },
  { id: "DEPT002", name: "Bursary", totalStudents: 450, pendingClearances: 78, completedClearances: 372 },
  { id: "DEPT003", name: "Library", totalStudents: 450, pendingClearances: 42, completedClearances: 408 },
  { id: "DEPT004", name: "Bookshop", totalStudents: 450, pendingClearances: 15, completedClearances: 435 },
  { id: "DEPT005", name: "E.G WHITE", totalStudents: 450, pendingClearances: 63, completedClearances: 387 },
  { id: "DEPT006", name: "BUTH", totalStudents: 450, pendingClearances: 51, completedClearances: 399 },
  { id: "DEPT007", name: "Alumni", totalStudents: 450, pendingClearances: 37, completedClearances: 413 },
  { id: "DEPT008", name: "Security", totalStudents: 450, pendingClearances: 29, completedClearances: 421 },
]

// Recent activity data
const initialActivityData = [
  {
    id: "ACT001",
    user: "Ronald Richards",
    action: "Approved clearance",
    target: "Stephen Luca (21/0001)",
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: "ACT002",
    user: "Jane Cooper",
    action: "Rejected clearance",
    target: "Emelifonwu William (21/0003)",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "ACT003",
    user: "Stephen Luca",
    action: "Submitted clearance",
    target: "Bursary Department",
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: "ACT004",
    user: "Esther Howard",
    action: "Added comment",
    target: "Ajayi Opemipo (21/0002)",
    timestamp: new Date(Date.now() - 10800000),
  },
  {
    id: "ACT005",
    user: "System",
    action: "Generated reports",
    target: "All departments",
    timestamp: new Date(Date.now() - 14400000),
  },
  {
    id: "ACT006",
    user: "Brooklyn Simmons",
    action: "Updated profile",
    target: "Staff account",
    timestamp: new Date(Date.now() - 18000000),
  },
  {
    id: "ACT007",
    user: "Admin",
    action: "Added new staff",
    target: "Cameron Williamson",
    timestamp: new Date(Date.now() - 86400000),
  },
]

export default function Admin({ userData = null }) {
  // Default user data if none is provided from database
  const [user, setUser] = useState(userData || { name: "Admin User", id: "ADMIN001", role: "Super Admin" })
  const [staffData, setStaffData] = useState(initialStaffData)
  const [studentData, setStudentData] = useState(initialStudentData)
  const [departmentData, setDepartmentData] = useState(initialDepartmentData)
  const [activityData, setActivityData] = useState(initialActivityData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [actionReason, setActionReason] = useState("")
  const [showReasonInput, setShowReasonInput] = useState(false)

  // Calculate dashboard metrics
  const totalStudents = studentData.length
  const totalStaff = staffData.length
  const totalDepartments = departmentData.length
  const pendingClearances = studentData.filter(
    (student) => student.status === "Pending" || student.status === "In Progress",
  ).length
  const approvedClearances = studentData.filter((student) => student.status === "Approved").length
  const rejectedClearances = studentData.filter((student) => student.status === "Rejected").length
  const notStartedClearances = studentData.filter((student) => student.status === "Not Started").length

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out...")
    setProfileDropdownOpen(false)
  }

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setLastRefreshed(new Date())
      setIsRefreshing(false)
    }, 1000)
  }

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Format time ago for activity feed
  const formatTimeAgo = (date) => {
    if (!date) return "N/A"

    const seconds = Math.floor((new Date() - new Date(date)) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + " years ago"

    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"

    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"

    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"

    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + " minutes ago"

    return Math.floor(seconds) + " seconds ago"
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-600 text-white">Approved</span>
      case "Rejected":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-600 text-white">Rejected</span>
      case "Pending":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500 text-white">Pending</span>
      case "In Progress":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500 text-white">In Progress</span>
      case "Not Started":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-400 text-white">Not Started</span>
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full border border-gray-400 text-gray-500">
            Unknown
          </span>
        )
    }
  }

  // Filter students based on search and filters
  const filteredStudents = studentData.filter((student) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = filterStatus === "all" || student.status === filterStatus

    // Department filter
    const matchesDepartment = filterDepartment === "all" || student.department === filterDepartment

    return matchesSearch && matchesStatus && matchesDepartment
  })

  // Confirm action (approve, reject, etc.)
  const confirmStudentAction = (id, action) => {
    setSelectedItemId(id)
    setConfirmAction(action)
    setShowConfirmModal(true)
  }

  // Handle confirmation
  const handleConfirm = () => {
    if (confirmAction === "approve") {
      // Update student status to approved
      setStudentData((prevData) =>
        prevData.map((student) =>
          student.id === selectedItemId
            ? { ...student, status: "Approved", progress: 100, lastUpdated: new Date() }
            : student,
        ),
      )
      setShowConfirmModal(false)
    } else if (confirmAction === "reject") {
      setShowReasonInput(true)
    } else if (confirmAction === "reset") {
      // Reset student clearance status
      setStudentData((prevData) =>
        prevData.map((student) =>
          student.id === selectedItemId
            ? { ...student, status: "Not Started", progress: 0, lastUpdated: new Date() }
            : student,
        ),
      )
      setShowConfirmModal(false)
    }
  }

  // Handle action with reason
  const handleActionWithReason = () => {
    if (actionReason.trim()) {
      if (confirmAction === "reject") {
        // Update student status to rejected with reason
        setStudentData((prevData) =>
          prevData.map((student) =>
            student.id === selectedItemId
              ? {
                  ...student,
                  status: "Rejected",
                  lastUpdated: new Date(),
                  rejectReason: actionReason,
                }
              : student,
          ),
        )
      }

      // Add to activity log
      const student = studentData.find((s) => s.id === selectedItemId)
      if (student) {
        const newActivity = {
          id: `ACT${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(3, "0")}`,
          user: user.name,
          action: confirmAction === "reject" ? "Rejected clearance" : "Added comment",
          target: `${student.name} (${student.matric})`,
          timestamp: new Date(),
        }
        setActivityData((prev) => [newActivity, ...prev])
      }

      // Reset states
      setShowConfirmModal(false)
      setShowReasonInput(false)
      setActionReason("")
      setSelectedItemId(null)
      setConfirmAction(null)
    }
  }

  // Close modal
  const closeModal = () => {
    setShowConfirmModal(false)
    setShowReasonInput(false)
    setActionReason("")
    setSelectedItemId(null)
    setConfirmAction(null)
  }

  // Get selected student name
  const getSelectedStudentName = () => {
    const student = studentData.find((s) => s.id === selectedItemId)
    return student ? student.name : ""
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-gray-700 font-medium block">{user.name}</span>
                <span className="text-gray-500 text-sm">{user.role}</span>
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
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </button>
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
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              className={`px-3 py-4 text-sm font-medium ${activeTab === "dashboard" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`px-3 py-4 text-sm font-medium ${activeTab === "students" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("students")}
            >
              Students
            </button>
            <button
              className={`px-3 py-4 text-sm font-medium ${activeTab === "staff" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("staff")}
            >
              Staff
            </button>
            <button
              className={`px-3 py-4 text-sm font-medium ${activeTab === "departments" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("departments")}
            >
              Departments
            </button>
            <button
              className={`px-3 py-4 text-sm font-medium ${activeTab === "reports" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("reports")}
            >
              Reports
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
              <button
                className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 flex items-center justify-center ${isRefreshing ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-100"}`}
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Refreshing..." : "Refresh Data"}
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Students</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalStudents}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Approved Clearances</p>
                    <p className="text-2xl font-semibold text-gray-900">{approvedClearances}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Pending Clearances</p>
                    <p className="text-2xl font-semibold text-gray-900">{pendingClearances}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Staff</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalStaff}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity and Department Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {activityData.slice(0, 5).map((activity) => (
                      <li key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {activity.action.includes("Approved") ? (
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                          ) : activity.action.includes("Rejected") ? (
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                              <X className="h-4 w-4 text-red-600" />
                            </div>
                          ) : activity.action.includes("Submitted") ? (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <FileCheck className="h-4 w-4 text-blue-600" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.user} <span className="font-normal text-gray-500">{activity.action}</span>{" "}
                            {activity.target}
                          </p>
                          <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-center">
                    <button className="text-sm text-blue-600 hover:text-blue-800">View all activity</button>
                  </div>
                </div>
              </div>

              {/* Department Summary */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Department Summary</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {departmentData.slice(0, 5).map((dept) => (
                      <li key={dept.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                          <span className="text-xs text-gray-500">
                            {dept.completedClearances}/{dept.totalStudents}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(dept.completedClearances / dept.totalStudents) * 100}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-center">
                    <button
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => setActiveTab("departments")}
                    >
                      View all departments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Student Clearances</h2>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex space-x-2">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Not Started">Not Started</option>
                  </select>

                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Matric No.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Progress
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Updated
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 font-medium">{student.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.matric}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(student.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[100px]">
                            <div
                              className={`h-2.5 rounded-full ${
                                student.progress === 100
                                  ? "bg-green-600"
                                  : student.progress > 70
                                    ? "bg-blue-600"
                                    : student.progress > 30
                                      ? "bg-yellow-500"
                                      : "bg-red-600"
                              }`}
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">{student.progress}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.lastUpdated ? formatDate(student.lastUpdated) : "Not started"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button
                              className="text-green-600 hover:text-green-900"
                              onClick={() => confirmStudentAction(student.id, "approve")}
                            >
                              <Check className="h-5 w-5" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => confirmStudentAction(student.id, "reject")}
                            >
                              <X className="h-5 w-5" />
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-900"
                              onClick={() => confirmStudentAction(student.id, "reset")}
                            >
                              <RefreshCcw className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                        No students found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Staff Tab */}
        {activeTab === "staff" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Staff Management</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add New Staff</button>
            </div>

            {/* Staff Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Staff
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Active
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staffData.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">{staff.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                            <div className="text-sm text-gray-500">{staff.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{staff.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{staff.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            staff.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {staff.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(staff.lastActive)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Deactivate</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === "departments" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Department Overview</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Generate Report</button>
            </div>

            {/* Departments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentData.map((dept) => (
                <div key={dept.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">{dept.name}</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Total Students</p>
                        <p className="text-xl font-semibold">{dept.totalStudents}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Completed</p>
                        <p className="text-xl font-semibold text-green-600">{dept.completedClearances}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-xl font-semibold text-yellow-500">{dept.pendingClearances}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(dept.completedClearances / dept.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Reports & Analytics</h2>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>

            {/* Reports Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Clearance Status Distribution</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    {/* Simulated chart - in a real app, use a chart library */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Approved</span>
                          <span>
                            {approvedClearances} students ({Math.round((approvedClearances / totalStudents) * 100)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: `${(approvedClearances / totalStudents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Pending</span>
                          <span>
                            {pendingClearances} students ({Math.round((pendingClearances / totalStudents) * 100)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div
                            className="bg-yellow-500 h-2.5 rounded-full"
                            style={{ width: `${(pendingClearances / totalStudents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Rejected</span>
                          <span>
                            {rejectedClearances} students ({Math.round((rejectedClearances / totalStudents) * 100)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div
                            className="bg-red-600 h-2.5 rounded-full"
                            style={{ width: `${(rejectedClearances / totalStudents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Not Started</span>
                          <span>
                            {notStartedClearances} students ({Math.round((notStartedClearances / totalStudents) * 100)}
                            %)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div
                            className="bg-gray-400 h-2.5 rounded-full"
                            style={{ width: `${(notStartedClearances / totalStudents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Department Completion Rate</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    {/* Simulated chart - in a real app, use a chart library */}
                    <div className="space-y-4">
                      {departmentData.slice(0, 5).map((dept) => (
                        <div key={dept.id}>
                          <div className="flex justify-between text-sm">
                            <span>{dept.name}</span>
                            <span>{Math.round((dept.completedClearances / dept.totalStudents) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${(dept.completedClearances / dept.totalStudents) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {confirmAction === "approve"
                ? `Are you sure you want to approve ${getSelectedStudentName()}?`
                : confirmAction === "reject"
                  ? `Are you sure you want to reject ${getSelectedStudentName()}?`
                  : `Are you sure you want to reset ${getSelectedStudentName()}'s clearance?`}
            </h3>

            {showReasonInput ? (
              <div className="mb-4">
                <label htmlFor="actionReason" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter reason for rejection:
                </label>
                <textarea
                  id="actionReason"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder="Please provide a reason..."
                ></textarea>
              </div>
            ) : null}

            <div className="flex justify-end space-x-3 mt-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={closeModal}
              >
                Cancel
              </button>

              {showReasonInput ? (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  onClick={handleActionWithReason}
                  disabled={!actionReason.trim()}
                >
                  Submit
                </button>
              ) : (
                <button
                  className={`px-4 py-2 rounded-md text-white ${
                    confirmAction === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : confirmAction === "reject"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

