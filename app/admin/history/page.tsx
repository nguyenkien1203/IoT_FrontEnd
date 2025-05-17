"use client"

import { useState } from "react"
import Link from "next/link"
import { Bike, LogOut, ArrowLeft, Search, Calendar, MapPin, Battery, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

// Mock usage history data
const mockUsageHistory = [
  {
    id: "U001",
    customerId: "C001",
    customerName: "John Doe",
    scooterId: "SC-1001",
    scooterMake: "Xiaomi Pro 2",
    scooterColor: "Black",
    startTime: "2025-05-15T10:30:00",
    endTime: "2025-05-15T11:15:00",
    startLocation: "Central Park",
    endLocation: "Downtown Station",
    duration: 45,
    cost: 8.75,
    powerUsed: 15,
  },
  {
    id: "U002",
    customerId: "C002",
    customerName: "Jane Smith",
    scooterId: "SC-1042",
    scooterMake: "Segway Ninebot",
    scooterColor: "White",
    startTime: "2025-05-14T14:20:00",
    endTime: "2025-05-14T15:05:00",
    startLocation: "University Campus",
    endLocation: "Main Street",
    duration: 45,
    cost: 7.5,
    powerUsed: 12,
  },
  {
    id: "U003",
    customerId: "C001",
    customerName: "John Doe",
    scooterId: "SC-1015",
    scooterMake: "Xiaomi Essential",
    scooterColor: "Gray",
    startTime: "2025-05-12T09:00:00",
    endTime: "2025-05-12T09:30:00",
    startLocation: "Train Station",
    endLocation: "Office Park",
    duration: 30,
    cost: 5.25,
    powerUsed: 8,
  },
  {
    id: "U004",
    customerId: "C003",
    customerName: "Michael Johnson",
    scooterId: "SC-1003",
    scooterMake: "Xiaomi Essential",
    scooterColor: "Gray",
    startTime: "2025-05-15T13:10:00",
    endTime: "2025-05-15T13:55:00",
    startLocation: "Shopping Mall",
    endLocation: "University Campus",
    duration: 45,
    cost: 6.75,
    powerUsed: 10,
  },
  {
    id: "U005",
    customerId: "C004",
    customerName: "Sarah Williams",
    scooterId: "SC-1002",
    scooterMake: "Segway Ninebot",
    scooterColor: "White",
    startTime: "2025-05-13T16:30:00",
    endTime: "2025-05-13T17:15:00",
    startLocation: "Downtown Station",
    endLocation: "Central Park",
    duration: 45,
    cost: 9.0,
    powerUsed: 14,
  },
  {
    id: "U006",
    customerId: "C002",
    customerName: "Jane Smith",
    scooterId: "SC-1005",
    scooterMake: "Xiaomi Pro 3",
    scooterColor: "Blue",
    startTime: "2025-05-11T11:45:00",
    endTime: "2025-05-11T12:30:00",
    startLocation: "Main Street",
    endLocation: "Shopping Mall",
    duration: 45,
    cost: 8.25,
    powerUsed: 13,
  },
  {
    id: "U007",
    customerId: "C005",
    customerName: "David Brown",
    scooterId: "SC-1004",
    scooterMake: "Segway Max",
    scooterColor: "Black",
    startTime: "2025-05-10T08:15:00",
    endTime: "2025-05-10T09:00:00",
    startLocation: "Office Park",
    endLocation: "Train Station",
    duration: 45,
    cost: 7.75,
    powerUsed: 11,
  },
  {
    id: "U008",
    customerId: "C001",
    customerName: "John Doe",
    scooterId: "SC-1001",
    scooterMake: "Xiaomi Pro 2",
    scooterColor: "Black",
    startTime: "2025-05-09T17:30:00",
    endTime: "2025-05-09T18:15:00",
    startLocation: "University Campus",
    endLocation: "Downtown Station",
    duration: 45,
    cost: 8.75,
    powerUsed: 15,
  },
]

// Mock customer data for filtering
const mockCustomers = [
  { id: "all", name: "All Customers" },
  { id: "C001", name: "John Doe" },
  { id: "C002", name: "Jane Smith" },
  { id: "C003", name: "Michael Johnson" },
  { id: "C004", name: "Sarah Williams" },
  { id: "C005", name: "David Brown" },
]

export default function AdminUsageHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [sortBy, setSortBy] = useState("date-desc")

  // Mock admin data
  const admin = {
    name: "Admin User",
    initials: "AU",
  }

  // Filter usage history based on search query, selected customer, and date range
  const filteredHistory = mockUsageHistory.filter((usage) => {
    // Filter by search query
    const matchesSearch =
      usage.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usage.scooterId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usage.scooterMake.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usage.startLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usage.endLocation.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by selected customer
    const matchesCustomer = selectedCustomer === "all" || usage.customerId === selectedCustomer

    // Filter by date range
    let matchesDateRange = true
    if (dateRange.from) {
      const usageDate = new Date(usage.startTime)
      matchesDateRange = usageDate >= dateRange.from
      if (dateRange.to) {
        matchesDateRange = matchesDateRange && usageDate <= dateRange.to
      }
    }

    return matchesSearch && matchesCustomer && matchesDateRange
  })

  // Sort filtered history
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    switch (sortBy) {
      case "date-asc":
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      case "date-desc":
        return new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      case "duration-asc":
        return a.duration - b.duration
      case "duration-desc":
        return b.duration - a.duration
      case "cost-asc":
        return a.cost - b.cost
      case "cost-desc":
        return b.cost - a.cost
      default:
        return new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    }
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCustomer("all")
    setDateRange({ from: undefined, to: undefined })
    setSortBy("date-desc")
  }

  // Export data as CSV
  const exportCSV = () => {
    // In a real implementation, this would generate and download a CSV file
    alert("Exporting data as CSV...")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Bike className="h-6 w-6 text-emerald-600" />
            <span>ScooterShare</span>
            <Badge variant="outline" className="ml-2">
              Admin
            </Badge>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{admin.initials}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline font-medium">{admin.name}</span>
            </div>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <LogOut className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Scooter Usage History</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usage History</CardTitle>
            <CardDescription>View detailed history of all scooter usage</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by customer, scooter, or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCustomers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Date (Newest first)</SelectItem>
                    <SelectItem value="date-asc">Date (Oldest first)</SelectItem>
                    <SelectItem value="duration-desc">Duration (Highest first)</SelectItem>
                    <SelectItem value="duration-asc">Duration (Lowest first)</SelectItem>
                    <SelectItem value="cost-desc">Cost (Highest first)</SelectItem>
                    <SelectItem value="cost-asc">Cost (Lowest first)</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={resetFilters}>
                  <Filter className="mr-2 h-4 w-4" />
                  Reset
                </Button>

                <Button variant="outline" onClick={exportCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mb-4 text-sm text-gray-500">
              Showing {sortedHistory.length} of {mockUsageHistory.length} usage records
              {selectedCustomer !== "all" && (
                <span>
                  {" "}
                  for{" "}
                  <span className="font-medium">
                    {mockCustomers.find((c) => c.id === selectedCustomer)?.name || ""}
                  </span>
                </span>
              )}
              {dateRange.from && (
                <span>
                  {" "}
                  from{" "}
                  <span className="font-medium">
                    {format(dateRange.from, "LLL dd, y")}
                    {dateRange.to && ` to ${format(dateRange.to, "LLL dd, y")}`}
                  </span>
                </span>
              )}
            </div>

            {/* Usage History Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-4 py-2 text-left">ID</th>
                    <th className="border px-4 py-2 text-left">Customer</th>
                    <th className="border px-4 py-2 text-left">Scooter</th>
                    <th className="border px-4 py-2 text-left">Date</th>
                    <th className="border px-4 py-2 text-left">Time</th>
                    <th className="border px-4 py-2 text-left">Duration</th>
                    <th className="border px-4 py-2 text-left">Route</th>
                    <th className="border px-4 py-2 text-left">Cost</th>
                    <th className="border px-4 py-2 text-left">Power Used</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedHistory.length > 0 ? (
                    sortedHistory.map((usage, index) => (
                      <tr key={usage.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-4 py-2">{usage.id}</td>
                        <td className="border px-4 py-2">
                          <div className="font-medium">{usage.customerName}</div>
                          <div className="text-xs text-gray-500">{usage.customerId}</div>
                        </td>
                        <td className="border px-4 py-2">
                          <div>{usage.scooterMake}</div>
                          <div className="text-xs text-gray-500">
                            {usage.scooterId} • {usage.scooterColor}
                          </div>
                        </td>
                        <td className="border px-4 py-2">{formatDate(usage.startTime)}</td>
                        <td className="border px-4 py-2">
                          {formatTime(usage.startTime)} - {formatTime(usage.endTime)}
                        </td>
                        <td className="border px-4 py-2">{usage.duration} min</td>
                        <td className="border px-4 py-2">
                          <div className="flex items-center gap-1 text-xs">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            {usage.startLocation} → {usage.endLocation}
                          </div>
                        </td>
                        <td className="border px-4 py-2">${usage.cost.toFixed(2)}</td>
                        <td className="border px-4 py-2">
                          <div className="flex items-center gap-1 text-xs">
                            <Battery className="h-3 w-3 text-gray-400" />
                            {usage.powerUsed}%
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="border px-4 py-8 text-center text-gray-500">
                        No usage history found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Usage Statistics */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Rides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sortedHistory.length}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedCustomer !== "all"
                      ? `By ${mockCustomers.find((c) => c.id === selectedCustomer)?.name}`
                      : "Across all customers"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${sortedHistory.reduce((sum, usage) => sum + usage.cost, 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Avg: $
                    {(sortedHistory.reduce((sum, usage) => sum + usage.cost, 0) / (sortedHistory.length || 1)).toFixed(
                      2,
                    )}
                    /ride
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {sortedHistory.reduce((sum, usage) => sum + usage.duration, 0)} min
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Avg:{" "}
                    {Math.round(
                      sortedHistory.reduce((sum, usage) => sum + usage.duration, 0) / (sortedHistory.length || 1),
                    )}{" "}
                    min/ride
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
