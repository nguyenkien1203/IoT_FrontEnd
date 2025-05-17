"use client"

import { useState } from "react"
import { Battery, MapPin, Bike, Calendar } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock scooter data
const mockScooters = [
  {
    id: "SC-1001",
    make: "Xiaomi Pro 2",
    color: "Black",
    location: "Central Park",
    power: 85,
    costPerMinute: 0.25,
    status: "Available",
  },
  {
    id: "SC-1002",
    make: "Segway Ninebot",
    color: "White",
    location: "Downtown Station",
    power: 92,
    costPerMinute: 0.3,
    status: "Available",
  },
  {
    id: "SC-1003",
    make: "Xiaomi Essential",
    color: "Gray",
    location: "University Campus",
    power: 65,
    costPerMinute: 0.2,
    status: "Available",
  },
  {
    id: "SC-1004",
    make: "Segway Max",
    color: "Black",
    location: "Main Street",
    power: 78,
    costPerMinute: 0.28,
    status: "Available",
  },
  {
    id: "SC-1005",
    make: "Xiaomi Pro 3",
    color: "Blue",
    location: "Shopping Mall",
    power: 90,
    costPerMinute: 0.32,
    status: "Available",
  },
]

interface ScooterListProps {
  filter?: string
}

export function ScooterList({ filter = "all" }: ScooterListProps) {
  const [selectedScooter, setSelectedScooter] = useState<any>(null)
  const [showBookDialog, setShowBookDialog] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Search state
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("12:00")
  const [duration, setDuration] = useState("30")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Filter scooters based on the selected filter
  const filteredScooters = mockScooters.filter((scooter) => {
    if (filter === "all") return true
    if (filter === "nearby") return ["Central Park", "Downtown Station"].includes(scooter.location)
    if (filter === "highPower") return scooter.power >= 80
    return true
  })

  // Display either search results or filtered scooters
  const displayedScooters = isSearching ? searchResults : filteredScooters

  const handleBook = (scooter: any) => {
    setSelectedScooter(scooter)
    setShowBookDialog(true)
    setBookingSuccess(false)
  }

  const confirmBooking = () => {
    // In a real app, this would call an API to book the scooter
    setTimeout(() => {
      setBookingSuccess(true)
    }, 1000)
  }

  const handleSearch = () => {
    // In a real app, this would call an API to search for available scooters
    // For now, we'll simulate a search by filtering the mock data
    setIsSearching(true)

    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, just return all scooters as "available"
      setSearchResults(filteredScooters)
    }, 500)
  }

  const resetSearch = () => {
    setIsSearching(false)
    setSearchResults([])
  }

  // Generate time options for the select dropdown
  const generateTimeOptions = () => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        options.push(`${formattedHour}:${formattedMinute}`)
      }
    }
    return options
  }

  // Generate duration options (in minutes)
  const durationOptions = ["15", "30", "45", "60", "90", "120", "180"]

  return (
    <div>
      {/* Search Panel */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-medium mb-4">Search Available Scooters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Picker */}
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time" className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {generateTimeOptions().map((timeOption) => (
                  <SelectItem key={timeOption} value={timeOption}>
                    {timeOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration Picker */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration" className="w-full">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option} minutes
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          {isSearching && (
            <Button variant="outline" onClick={resetSearch}>
              Reset Search
            </Button>
          )}
          <Button onClick={handleSearch}>Search Available Scooters</Button>
        </div>
      </div>

      {/* Search Results or Regular List */}
      {isSearching && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">
            Available Scooters for {date ? format(date, "PPP") : "Today"} at {time} ({duration} minutes)
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Showing {searchResults.length} available scooters for your selected time and duration.
          </p>
        </div>
      )}

      {displayedScooters.length > 0 ? (
        <div className="space-y-4">
          {displayedScooters.map((scooter) => (
            <div
              key={scooter.id}
              className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Bike className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium">{scooter.make}</h3>
                  <div className="text-sm text-gray-500">
                    ID: {scooter.id} • {scooter.color}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {scooter.location}
                </div>

                <div className="flex items-center gap-1 text-sm">
                  <Battery className="h-4 w-4 text-gray-400" />
                  {scooter.power}%
                </div>

                <Badge variant="outline" className="text-emerald-600">
                  ${scooter.costPerMinute.toFixed(2)}/min
                </Badge>
              </div>

              <Button onClick={() => handleBook(scooter)}>Book Now</Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {isSearching
            ? "No scooters available for the selected time and duration."
            : "No scooters available with the selected filter."}
        </div>
      )}

      {/* Booking Dialog */}
      <Dialog open={showBookDialog} onOpenChange={setShowBookDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{bookingSuccess ? "Booking Confirmed!" : "Book a Scooter"}</DialogTitle>
            <DialogDescription>
              {bookingSuccess
                ? "Your scooter has been booked successfully. The booking has been added to your Google Calendar."
                : "Confirm your booking details below."}
            </DialogDescription>
          </DialogHeader>

          {!bookingSuccess ? (
            <>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Scooter Details</Label>
                  <div className="border rounded-md p-3">
                    <div className="font-medium">{selectedScooter?.make}</div>
                    <div className="text-sm text-gray-500">
                      ID: {selectedScooter?.id} • {selectedScooter?.color}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">Location: {selectedScooter?.location}</div>
                    <div className="text-sm text-gray-500">Cost: ${selectedScooter?.costPerMinute.toFixed(2)}/min</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bookingDate">Booking Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal" id="bookingDate">
                        <Calendar className="mr-2 h-4 w-4" />
                        {isSearching && date ? format(date, "PPP") : format(new Date(), "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={isSearching && date ? date : new Date()}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bookingTime">Start Time</Label>
                    <Select defaultValue={isSearching ? time : "12:00"}>
                      <SelectTrigger id="bookingTime">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateTimeOptions().map((timeOption) => (
                          <SelectItem key={timeOption} value={timeOption}>
                            {timeOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bookingDuration">Duration (minutes)</Label>
                    <Select defaultValue={isSearching ? duration : "30"}>
                      <SelectTrigger id="bookingDuration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durationOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Estimated Cost</Label>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span>${selectedScooter?.costPerMinute.toFixed(2)}/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{isSearching ? duration : "30"} minutes</span>
                    </div>
                    <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                      <span>Total:</span>
                      <span>
                        ${(selectedScooter?.costPerMinute * (isSearching ? Number.parseInt(duration) : 30)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowBookDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmBooking}>Confirm Booking</Button>
              </DialogFooter>
            </>
          ) : (
            <div className="space-y-4 py-4">
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-md">
                <p>
                  Your booking for {selectedScooter?.make} (ID: {selectedScooter?.id}) has been confirmed.
                </p>
                <p className="mt-2">Date: {isSearching && date ? format(date, "PPP") : format(new Date(), "PPP")}</p>
                <p>
                  Time: {isSearching ? time : "12:00"} for {isSearching ? duration : "30"} minutes
                </p>
                <p className="mt-2">Please use your credentials to unlock the scooter when you arrive.</p>
              </div>

              <DialogFooter>
                <Button onClick={() => setShowBookDialog(false)}>Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
