"use client"

import { Badge } from "@/components/ui/badge"

import Link from "next/link"
import { Bike, LogOut, Users, Settings, BarChart3, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScooterManagementList } from "@/components/scooter-management-list"

export default function AdminDashboard() {
  // Mock admin data
  const admin = {
    name: "Admin User",
    initials: "AU",
  }

  // Mock statistics
  const stats = {
    totalScooters: 120,
    activeScooters: 98,
    needRepair: 12,
    totalUsers: 450,
    activeBookings: 24,
    revenue: 1250.75,
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
        <div className="grid md:grid-cols-[250px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Admin Panel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/users">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/reports">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Reports
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/issues">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Reported Issues
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    System Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Scooters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalScooters}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.activeScooters} active • {stats.needRepair} need repair
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Registered Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-gray-500 mt-1">{stats.activeBookings} active bookings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.revenue.toFixed(2)}</div>
                  <p className="text-xs text-gray-500 mt-1">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Scooter Management */}
            <Card>
              <CardHeader>
                <CardTitle>Scooter Fleet Management</CardTitle>
                <CardDescription>Manage all scooters in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Scooters</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-0">
                    <ScooterManagementList />
                  </TabsContent>
                  <TabsContent value="active" className="mt-0">
                    <ScooterManagementList filter="active" />
                  </TabsContent>
                  <TabsContent value="maintenance" className="mt-0">
                    <ScooterManagementList filter="maintenance" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
