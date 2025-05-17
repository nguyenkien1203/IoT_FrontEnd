"use client"

import Link from "next/link"
import { Bike, ArrowLeft, Calendar, Clock, MapPin, Battery } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock history data
const usageHistory = [
  {
    id: "1",
    scooterId: "SC-1001",
    make: "Xiaomi Pro 2",
    color: "Black",
    startTime: "2025-04-15T10:30:00",
    endTime: "2025-04-15T11:15:00",
    startLocation: "Central Park",
    endLocation: "Downtown Station",
    cost: 8.75,
    powerUsed: 15,
  },
  {
    id: "2",
    scooterId: "SC-1042",
    make: "Segway Ninebot",
    color: "White",
    startTime: "2025-04-10T14:20:00",
    endTime: "2025-04-10T15:05:00",
    startLocation: "University Campus",
    endLocation: "Main Street",
    cost: 7.5,
    powerUsed: 12,
  },
  {
    id: "3",
    scooterId: "SC-1015",
    make: "Xiaomi Essential",
    color: "Gray",
    startTime: "2025-04-05T09:00:00",
    endTime: "2025-04-05T09:30:00",
    startLocation: "Train Station",
    endLocation: "Office Park",
    cost: 5.25,
    powerUsed: 8,
  },
]

export default function UsageHistory() {
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

  // Calculate duration between two times
  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime)
    const end = new Date(endTime)
    const durationMs = end.getTime() - start.getTime()
    const minutes = Math.floor(durationMs / 60000)

    return `${minutes} min`
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
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/customer/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Usage History</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Scooter Rides</CardTitle>
            <CardDescription>View details of your past scooter usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {usageHistory.length > 0 ? (
                usageHistory.map((ride) => (
                  <div key={ride.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{ride.make}</h3>
                        <div className="text-sm text-gray-500">
                          ID: {ride.scooterId} • {ride.color}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-emerald-600 bg-emerald-50">
                        ${ride.cost.toFixed(2)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="text-gray-500 flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Date
                        </div>
                        <div>{formatDate(ride.startTime)}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-gray-500 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Duration
                        </div>
                        <div>{calculateDuration(ride.startTime, ride.endTime)}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-gray-500 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          Route
                        </div>
                        <div>
                          {ride.startLocation} → {ride.endLocation}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-gray-500 flex items-center gap-1">
                          <Battery className="h-4 w-4" />
                          Power Used
                        </div>
                        <div>{ride.powerUsed}%</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">You haven't used any scooters yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
