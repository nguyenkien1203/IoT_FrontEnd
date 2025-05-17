"use client"

import Link from "next/link"
import { Bike, LogOut, Wrench, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaintenanceList } from "@/components/maintenance-list"

export default function EngineerDashboard() {
  // Mock engineer data
  const engineer = {
    name: "Engineer User",
    initials: "EU",
  }

  // Mock statistics
  const stats = {
    totalIssues: 18,
    pendingIssues: 7,
    inProgressIssues: 5,
    resolvedIssues: 6,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Bike className="h-6 w-6 text-emerald-600" />
            <span>ScooterShare</span>
            <Badge variant="outline" className="ml-2">
              Engineer
            </Badge>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{engineer.initials}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline font-medium">{engineer.name}</span>
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
                <CardTitle className="text-lg">Engineer Panel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/engineer/issues">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    All Issues
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/engineer/completed">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Completed Repairs
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/engineer/tools">
                    <Wrench className="mr-2 h-4 w-4" />
                    Maintenance Tools
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Maintenance Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Issues</span>
                    <span className="font-medium">{stats.totalIssues}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Pending</span>
                    <span className="font-medium">{stats.pendingIssues}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">In Progress</span>
                    <span className="font-medium">{stats.inProgressIssues}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Resolved</span>
                    <span className="font-medium">{stats.resolvedIssues}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Queue</CardTitle>
                <CardDescription>Manage scooter maintenance and repairs</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pending">
                  <TabsList className="mb-4">
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <TabsContent value="pending" className="mt-0">
                    <MaintenanceList status="pending" />
                  </TabsContent>
                  <TabsContent value="inProgress" className="mt-0">
                    <MaintenanceList status="inProgress" />
                  </TabsContent>
                  <TabsContent value="completed" className="mt-0">
                    <MaintenanceList status="completed" />
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
