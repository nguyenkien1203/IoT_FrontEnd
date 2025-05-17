"use client"

import { useState } from "react"
import Link from "next/link"
import { Bike, LogOut, ArrowLeft, MapPin, Navigation, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock reported scooter data
const reportedScooters = [
  {
    id: "SC-1004",
    make: "Segway Max",
    color: "Black",
    location: "Main Street",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    power: 45,
    issueType: "Mechanical",
    issueDescription: "Brakes not working properly, scooter doesn't stop quickly enough.",
    reportedBy: "John Doe",
    reportedAt: "2025-05-01T14:30:00",
    status: "To Be Repaired",
  },
  {
    id: "SC-1005",
    make: "Xiaomi Pro 3",
    color: "Blue",
    location: "Shopping Mall",
    coordinates: { lat: 37.7833, lng: -122.4167 },
    power: 72,
    issueType: "Electrical",
    issueDescription: "Battery drains very quickly, only lasts about 30 minutes of use.",
    reportedBy: "Jane Smith",
    reportedAt: "2025-05-02T09:15:00",
    status: "To Be Repaired",
  },
  {
    id: "SC-1008",
    make: "Segway Ninebot",
    color: "White",
    location: "University Campus",
    coordinates: { lat: 37.7694, lng: -122.4862 },
    power: 60,
    issueType: "Software",
    issueDescription: "Display shows incorrect battery percentage, jumps from 50% to 10%.",
    reportedBy: "Mike Johnson",
    reportedAt: "2025-05-03T16:45:00",
    status: "To Be Repaired",
  },
]

export default function EngineerMap() {
  const [selectedScooter, setSelectedScooter] = useState(reportedScooters[0])

  // Mock engineer data
  const engineer = {
    name: "Engineer User",
    initials: "EU",
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/engineer/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Scooter Location Map</h1>
        </div>

        <div className="grid md:grid-cols-[350px_1fr] gap-6">
          {/* Sidebar - Scooter List */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reported Scooters</CardTitle>
                <CardDescription>Scooters that need repair</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportedScooters.map((scooter) => (
                    <div
                      key={scooter.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedScooter.id === scooter.id ? "border-emerald-500 bg-emerald-50" : "hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedScooter(scooter)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{scooter.make}</h3>
                          <div className="text-sm text-gray-500">
                            ID: {scooter.id} • {scooter.color}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            scooter.issueType === "Mechanical"
                              ? "bg-blue-50 text-blue-700"
                              : scooter.issueType === "Electrical"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-purple-50 text-purple-700"
                          }
                        >
                          {scooter.issueType}
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm flex items-center text-gray-500">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {scooter.location}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Map and Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Location Map</CardTitle>
                <CardDescription>View scooter location on the map</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="map">
                  <TabsList className="mb-4">
                    <TabsTrigger value="map">Map View</TabsTrigger>
                    <TabsTrigger value="directions">Directions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="map" className="mt-0">
                    {/* Map Placeholder */}
                    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center relative">
                      <div className="text-center">
                        <MapPin className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Google Map would render here</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Showing location of scooter {selectedScooter.id} at {selectedScooter.location}
                        </p>
                      </div>

                      {/* Floating Action Button */}
                      <Button className="absolute bottom-4 right-4" size="lg">
                        <Navigation className="mr-2 h-4 w-4" />
                        Navigate to Scooter
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="directions" className="mt-0">
                    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Navigation className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Turn-by-turn directions would render here</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Directions to {selectedScooter.location} for scooter {selectedScooter.id}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scooter Details</CardTitle>
                <CardDescription>Information about the selected scooter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Scooter ID</h3>
                      <p>{selectedScooter.id}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Make & Color</h3>
                      <p>
                        {selectedScooter.make} • {selectedScooter.color}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p>{selectedScooter.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Battery Level</h3>
                      <p>{selectedScooter.power}%</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Reported By</h3>
                      <p>{selectedScooter.reportedBy}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Reported At</h3>
                      <p>{formatDate(selectedScooter.reportedAt)}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Issue Description</h3>
                    <p className="mt-1 p-3 bg-gray-50 rounded-md text-sm">{selectedScooter.issueDescription}</p>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <Button variant="outline">
                      <Wrench className="mr-2 h-4 w-4" />
                      Mark as Under Repair
                    </Button>
                    <Button>Report as Fixed</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
