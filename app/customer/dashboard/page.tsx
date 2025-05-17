"use client"

import { useState } from "react"
import Link from "next/link"
import { Bike, LogOut, History, CreditCard, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScooterList } from "@/components/scooter-list"
import { TopUpDialog } from "@/components/top-up-dialog"
import { ReportIssueDialog } from "@/components/report-issue-dialog"
import { ActiveBookings } from "@/components/active-bookings"

export default function CustomerDashboard() {
  const [showTopUpDialog, setShowTopUpDialog] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("scooters")

  // Mock user data
  const user = {
    name: "John Doe",
    balance: 25.5,
    initials: "JD",
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Bike className="h-6 w-6 text-emerald-600" />
            <span>ScooterShare</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
              Balance: ${user.balance.toFixed(2)}
            </div>

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline font-medium">{user.name}</span>
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
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowTopUpDialog(true)}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Top Up Balance
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowReportDialog(true)}>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Report an Issue
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/customer/history">
                    <History className="mr-2 h-4 w-4" />
                    View History
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">My Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant={activeTab === "bookings" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setActiveTab("bookings")}
                >
                  View My Bookings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="scooters">Available Scooters</TabsTrigger>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              </TabsList>

              <TabsContent value="scooters">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Scooters</CardTitle>
                    <CardDescription>Find and book a scooter near you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all">
                      <TabsList className="mb-4">
                        <TabsTrigger value="all">All Scooters</TabsTrigger>
                        <TabsTrigger value="nearby">Nearby</TabsTrigger>
                        <TabsTrigger value="highPower">High Power</TabsTrigger>
                      </TabsList>

                      <TabsContent value="all" className="mt-0">
                        <ScooterList />
                      </TabsContent>
                      <TabsContent value="nearby" className="mt-0">
                        <ScooterList filter="nearby" />
                      </TabsContent>
                      <TabsContent value="highPower" className="mt-0">
                        <ScooterList filter="highPower" />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>Manage your active scooter bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActiveBookings />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <TopUpDialog open={showTopUpDialog} onOpenChange={setShowTopUpDialog} />
      <ReportIssueDialog open={showReportDialog} onOpenChange={setShowReportDialog} />
    </div>
  )
}
