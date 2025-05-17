"use client"

import { useState } from "react"
import Link from "next/link"
import { Bike, LogOut, ArrowLeft, BarChart3, LineChart, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminReports() {
  const [reportType, setReportType] = useState("daily")
  const [dateRange, setDateRange] = useState("last7days")

  // Mock admin data
  const admin = {
    name: "Admin User",
    initials: "AU",
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
          <h1 className="text-2xl font-bold">Data Visualization Reports</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Scooter Usage Reports</CardTitle>
            <CardDescription>Generate visual reports to analyze scooter usage patterns and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Usage</SelectItem>
                    <SelectItem value="weekly">Weekly Usage</SelectItem>
                    <SelectItem value="location">Usage by Location</SelectItem>
                    <SelectItem value="revenue">Revenue Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="last3months">Last 3 Months</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="chart">Chart View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>

              <TabsContent value="chart" className="space-y-4">
                <div className="bg-white p-4 border rounded-lg">
                  <h3 className="font-medium mb-4">
                    {reportType === "daily"
                      ? "Daily Scooter Usage"
                      : reportType === "weekly"
                        ? "Weekly Scooter Usage"
                        : reportType === "location"
                          ? "Usage by Location"
                          : "Revenue Analysis"}
                  </h3>

                  {/* Chart visualization based on report type */}
                  {reportType === "daily" && <DailyUsageChart />}
                  {reportType === "weekly" && <WeeklyUsageChart />}
                  {reportType === "location" && <LocationUsageChart />}
                  {reportType === "revenue" && <RevenueChart />}
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Export as PNG
                  </Button>
                  <Button>
                    <LineChart className="mr-2 h-4 w-4" />
                    Generate Report PDF
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="table">
                <div className="bg-white p-4 border rounded-lg">
                  <h3 className="font-medium mb-4">
                    {reportType === "daily"
                      ? "Daily Scooter Usage Data"
                      : reportType === "weekly"
                        ? "Weekly Scooter Usage Data"
                        : reportType === "location"
                          ? "Usage by Location Data"
                          : "Revenue Analysis Data"}
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border px-4 py-2 text-left">
                            {reportType === "location" ? "Location" : "Date"}
                          </th>
                          <th className="border px-4 py-2 text-left">Total Rides</th>
                          <th className="border px-4 py-2 text-left">Total Duration (min)</th>
                          <th className="border px-4 py-2 text-left">Revenue ($)</th>
                          <th className="border px-4 py-2 text-left">Avg. Ride Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportType === "daily" && <DailyUsageTableData />}
                        {reportType === "weekly" && <WeeklyUsageTableData />}
                        {reportType === "location" && <LocationUsageTableData />}
                        {reportType === "revenue" && <RevenueTableData />}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button>
                    <LineChart className="mr-2 h-4 w-4" />
                    Export as CSV
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Insights</CardTitle>
              <CardDescription>Key metrics and trends from the data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <h4 className="font-medium text-emerald-700 mb-2">Peak Usage Times</h4>
                  <p className="text-sm text-emerald-600">
                    Highest usage occurs between 8:00-9:00 AM and 5:00-6:00 PM on weekdays, suggesting commuter usage
                    patterns.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-700 mb-2">Popular Locations</h4>
                  <p className="text-sm text-blue-600">
                    Downtown Station and University Campus are the most popular pickup locations, accounting for 45% of
                    all rides.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-medium text-amber-700 mb-2">Revenue Growth</h4>
                  <p className="text-sm text-amber-600">
                    Revenue has increased by 23% compared to the previous period, with premium scooters driving higher
                    margins.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Actionable insights based on the data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                    <PieChart className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Optimize Fleet Distribution</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Increase scooter availability at Downtown Station and University Campus during peak hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                    <PieChart className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Maintenance Schedule</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Schedule preventative maintenance during low-usage periods (2:00-4:00 AM) to minimize impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                    <PieChart className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Pricing Strategy</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Consider implementing dynamic pricing during peak hours to optimize revenue and manage demand.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// Mock chart components
function DailyUsageChart() {
  return (
    <div className="h-80 w-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <BarChart3 className="h-10 w-10 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">Daily usage chart would render here</p>
        <p className="text-xs text-gray-400 mt-1">
          Showing ride counts, durations, and revenue for each day in the selected period
        </p>
      </div>
    </div>
  )
}

function WeeklyUsageChart() {
  return (
    <div className="h-80 w-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <LineChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">Weekly usage chart would render here</p>
        <p className="text-xs text-gray-400 mt-1">
          Showing aggregated weekly data with trend lines for the selected period
        </p>
      </div>
    </div>
  )
}

function LocationUsageChart() {
  return (
    <div className="h-80 w-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <PieChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">Location usage chart would render here</p>
        <p className="text-xs text-gray-400 mt-1">
          Showing distribution of rides across different locations with percentage breakdowns
        </p>
      </div>
    </div>
  )
}

function RevenueChart() {
  return (
    <div className="h-80 w-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <BarChart3 className="h-10 w-10 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">Revenue analysis chart would render here</p>
        <p className="text-xs text-gray-400 mt-1">
          Showing revenue trends, breakdown by scooter type, and comparison to previous periods
        </p>
      </div>
    </div>
  )
}

// Mock table data components
function DailyUsageTableData() {
  const data = [
    { date: "2025-05-01", rides: 124, duration: 2480, revenue: 620.0, avgDuration: 20 },
    { date: "2025-05-02", rides: 156, duration: 3120, revenue: 780.0, avgDuration: 20 },
    { date: "2025-05-03", rides: 98, duration: 2450, revenue: 612.5, avgDuration: 25 },
    { date: "2025-05-04", rides: 87, duration: 1740, revenue: 435.0, avgDuration: 20 },
    { date: "2025-05-05", rides: 142, duration: 3550, revenue: 887.5, avgDuration: 25 },
    { date: "2025-05-06", rides: 135, duration: 2700, revenue: 675.0, avgDuration: 20 },
    { date: "2025-05-07", rides: 128, duration: 2560, revenue: 640.0, avgDuration: 20 },
  ]

  return (
    <>
      {data.map((row, index) => (
        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
          <td className="border px-4 py-2">{row.date}</td>
          <td className="border px-4 py-2">{row.rides}</td>
          <td className="border px-4 py-2">{row.duration}</td>
          <td className="border px-4 py-2">${row.revenue.toFixed(2)}</td>
          <td className="border px-4 py-2">{row.avgDuration} min</td>
        </tr>
      ))}
    </>
  )
}

function WeeklyUsageTableData() {
  const data = [
    { date: "Week 1 (May 1-7)", rides: 870, duration: 18600, revenue: 4650.0, avgDuration: 21 },
    { date: "Week 2 (May 8-14)", rides: 920, duration: 19780, revenue: 4945.0, avgDuration: 22 },
    { date: "Week 3 (May 15-21)", rides: 845, duration: 17745, revenue: 4436.25, avgDuration: 21 },
    { date: "Week 4 (May 22-28)", rides: 912, duration: 20064, revenue: 5016.0, avgDuration: 22 },
  ]

  return (
    <>
      {data.map((row, index) => (
        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
          <td className="border px-4 py-2">{row.date}</td>
          <td className="border px-4 py-2">{row.rides}</td>
          <td className="border px-4 py-2">{row.duration}</td>
          <td className="border px-4 py-2">${row.revenue.toFixed(2)}</td>
          <td className="border px-4 py-2">{row.avgDuration} min</td>
        </tr>
      ))}
    </>
  )
}

function LocationUsageTableData() {
  const data = [
    { location: "Downtown Station", rides: 756, duration: 15120, revenue: 3780.0, avgDuration: 20 },
    { location: "University Campus", rides: 684, duration: 17100, revenue: 4275.0, avgDuration: 25 },
    { location: "Central Park", rides: 542, duration: 10840, revenue: 2710.0, avgDuration: 20 },
    { location: "Shopping Mall", rides: 423, duration: 8460, revenue: 2115.0, avgDuration: 20 },
    { location: "Main Street", rides: 387, duration: 7740, revenue: 1935.0, avgDuration: 20 },
    { location: "Train Station", rides: 355, duration: 7100, revenue: 1775.0, avgDuration: 20 },
  ]

  return (
    <>
      {data.map((row, index) => (
        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
          <td className="border px-4 py-2">{row.location}</td>
          <td className="border px-4 py-2">{row.rides}</td>
          <td className="border px-4 py-2">{row.duration}</td>
          <td className="border px-4 py-2">${row.revenue.toFixed(2)}</td>
          <td className="border px-4 py-2">{row.avgDuration} min</td>
        </tr>
      ))}
    </>
  )
}

function RevenueTableData() {
  const data = [
    { date: "2025-05-01", rides: 124, duration: 2480, revenue: 620.0, avgDuration: 20 },
    { date: "2025-05-02", rides: 156, duration: 3120, revenue: 780.0, avgDuration: 20 },
    { date: "2025-05-03", rides: 98, duration: 2450, revenue: 612.5, avgDuration: 25 },
    { date: "2025-05-04", rides: 87, duration: 1740, revenue: 435.0, avgDuration: 20 },
    { date: "2025-05-05", rides: 142, duration: 3550, revenue: 887.5, avgDuration: 25 },
    { date: "2025-05-06", rides: 135, duration: 2700, revenue: 675.0, avgDuration: 20 },
    { date: "2025-05-07", rides: 128, duration: 2560, revenue: 640.0, avgDuration: 20 },
  ]

  return (
    <>
      {data.map((row, index) => (
        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
          <td className="border px-4 py-2">{row.date}</td>
          <td className="border px-4 py-2">{row.rides}</td>
          <td className="border px-4 py-2">{row.duration}</td>
          <td className="border px-4 py-2">${row.revenue.toFixed(2)}</td>
          <td className="border px-4 py-2">{row.avgDuration} min</td>
        </tr>
      ))}
    </>
  )
}
