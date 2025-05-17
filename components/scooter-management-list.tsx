"use client"

import { useState } from "react"
import { Battery, MapPin, Bike, Edit, Trash } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock scooter data for admin
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
    status: "To Be Repaired",
  },
  {
    id: "SC-1005",
    make: "Xiaomi Pro 3",
    color: "Blue",
    location: "Shopping Mall",
    power: 90,
    costPerMinute: 0.32,
    status: "Under Repair",
  },
]

interface ScooterManagementListProps {
  filter?: string
}

export function ScooterManagementList({ filter = "all" }: ScooterManagementListProps) {
  const [selectedScooter, setSelectedScooter] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Filter scooters based on the selected filter
  const filteredScooters = mockScooters.filter((scooter) => {
    if (filter === "all") return true
    if (filter === "active") return scooter.status === "Available"
    if (filter === "maintenance") return ["To Be Repaired", "Under Repair"].includes(scooter.status)
    return true
  })

  const handleEdit = (scooter: any) => {
    setSelectedScooter({ ...scooter })
    setShowEditDialog(true)
  }

  const handleDelete = (scooter: any) => {
    setSelectedScooter(scooter)
    setShowDeleteDialog(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{status}</Badge>
      case "To Be Repaired":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{status}</Badge>
      case "Under Repair":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div>
      {filteredScooters.length > 0 ? (
        <div className="space-y-4">
          {filteredScooters.map((scooter) => (
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

                <div>{getStatusBadge(scooter.status)}</div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(scooter)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="text-red-500" onClick={() => handleDelete(scooter)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">No scooters available with the selected filter.</div>
      )}

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Scooter</DialogTitle>
            <DialogDescription>Update the scooter information below.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make/Model</Label>
                <Input
                  id="make"
                  value={selectedScooter?.make || ""}
                  onChange={(e) => setSelectedScooter({ ...selectedScooter, make: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={selectedScooter?.color || ""}
                  onChange={(e) => setSelectedScooter({ ...selectedScooter, color: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={selectedScooter?.location || ""}
                onChange={(e) => setSelectedScooter({ ...selectedScooter, location: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="power">Power (%)</Label>
                <Input
                  id="power"
                  type="number"
                  min="0"
                  max="100"
                  value={selectedScooter?.power || ""}
                  onChange={(e) => setSelectedScooter({ ...selectedScooter, power: Number.parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costPerMinute">Cost Per Minute ($)</Label>
                <Input
                  id="costPerMinute"
                  type="number"
                  step="0.01"
                  min="0"
                  value={selectedScooter?.costPerMinute || ""}
                  onChange={(e) =>
                    setSelectedScooter({ ...selectedScooter, costPerMinute: Number.parseFloat(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={selectedScooter?.status || ""}
                onValueChange={(value) => setSelectedScooter({ ...selectedScooter, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Booked">Booked</SelectItem>
                  <SelectItem value="Occupying">Occupying</SelectItem>
                  <SelectItem value="To Be Repaired">To Be Repaired</SelectItem>
                  <SelectItem value="Under Repair">Under Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowEditDialog(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>Are you sure you want to remove this scooter from the system?</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="border rounded-md p-3">
              <div className="font-medium">{selectedScooter?.make}</div>
              <div className="text-sm text-gray-500">
                ID: {selectedScooter?.id} • {selectedScooter?.color}
              </div>
              <div className="text-sm text-gray-500 mt-2">Location: {selectedScooter?.location}</div>
            </div>
            <p className="text-sm text-red-500 mt-4">This action cannot be undone.</p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(false)}>
              Delete Scooter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
