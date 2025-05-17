"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Bike, Calendar, Clock, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock booking data
const mockBookings = [
  {
    id: "BK-1001",
    scooterId: "SC-1001",
    scooterMake: "Xiaomi Pro 2",
    scooterColor: "Black",
    location: "Central Park",
    date: "2025-05-05",
    startTime: "14:30",
    duration: 45,
    cost: 11.25,
  },
  {
    id: "BK-1002",
    scooterId: "SC-1003",
    scooterMake: "Xiaomi Essential",
    scooterColor: "Gray",
    location: "University Campus",
    date: "2025-05-06",
    startTime: "09:00",
    duration: 30,
    cost: 6.0,
  },
  {
    id: "BK-1003",
    scooterId: "SC-1005",
    scooterMake: "Xiaomi Pro 3",
    scooterColor: "Blue",
    location: "Shopping Mall",
    date: "2025-05-08",
    startTime: "16:15",
    duration: 60,
    cost: 19.2,
  },
]

export function ActiveBookings() {
  const [bookings, setBookings] = useState(mockBookings)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [cancellationSuccess, setCancellationSuccess] = useState(false)
  const [recentlyCancelled, setRecentlyCancelled] = useState<string | null>(null)

  const handleCancelBooking = (booking: any) => {
    setSelectedBooking(booking)
    setShowCancelDialog(true)
    setCancellationSuccess(false)
  }

  const confirmCancellation = () => {
    // In a real app, this would call an API to cancel the booking
    setTimeout(() => {
      setCancellationSuccess(true)
      // Remove the booking from the list
      setRecentlyCancelled(selectedBooking.id)
      setBookings(bookings.filter((booking) => booking.id !== selectedBooking.id))
    }, 1000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "EEE, MMM d, yyyy")
  }

  const calculateEndTime = (startTime: string, durationMinutes: number) => {
    const [hours, minutes] = startTime.split(":").map(Number)
    let endHours = hours + Math.floor((minutes + durationMinutes) / 60)
    const endMinutes = (minutes + durationMinutes) % 60

    if (endHours >= 24) {
      endHours = endHours - 24
    }

    return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Active Bookings</h2>

      {recentlyCancelled && (
        <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200 mb-4">
          <AlertDescription>Booking {recentlyCancelled} has been successfully cancelled.</AlertDescription>
        </Alert>
      )}

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Bike className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{booking.scooterMake}</h3>
                    <div className="text-sm text-gray-500">
                      ID: {booking.scooterId} • {booking.scooterColor}
                    </div>
                  </div>
                </div>

                <Badge variant="outline" className="text-emerald-600 bg-emerald-50">
                  ${booking.cost.toFixed(2)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{formatDate(booking.date)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>
                    {booking.startTime} - {calculateEndTime(booking.startTime, booking.duration)}({booking.duration}{" "}
                    min)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{booking.location}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleCancelBooking(booking)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel Booking
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 border rounded-lg">You have no active bookings.</div>
      )}

      {/* Cancel Booking Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{cancellationSuccess ? "Booking Cancelled" : "Cancel Booking"}</DialogTitle>
            <DialogDescription>
              {cancellationSuccess
                ? "Your booking has been cancelled successfully. The event has been removed from your Google Calendar."
                : "Are you sure you want to cancel this booking?"}
            </DialogDescription>
          </DialogHeader>

          {!cancellationSuccess ? (
            <>
              <div className="space-y-4 py-4">
                <div className="border rounded-md p-3">
                  <div className="font-medium">{selectedBooking?.scooterMake}</div>
                  <div className="text-sm text-gray-500">
                    ID: {selectedBooking?.scooterId} • {selectedBooking?.scooterColor}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Date: {selectedBooking && formatDate(selectedBooking.date)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Time: {selectedBooking?.startTime} ({selectedBooking?.duration} min)
                  </div>
                  <div className="text-sm text-gray-500">Location: {selectedBooking?.location}</div>
                </div>

                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
                  <p>Cancelling this booking will make the scooter available for other users.</p>
                  <p className="mt-1">Your account will not be charged for this booking.</p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                  Keep Booking
                </Button>
                <Button variant="destructive" onClick={confirmCancellation}>
                  Cancel Booking
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="space-y-4 py-4">
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-md">
                <p>Your booking for {selectedBooking?.scooterMake} has been cancelled.</p>
                <p className="mt-2">The scooter is now available for other users.</p>
              </div>

              <DialogFooter>
                <Button onClick={() => setShowCancelDialog(false)}>Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
