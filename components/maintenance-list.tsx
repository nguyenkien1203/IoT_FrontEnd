"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock maintenance data
const mockMaintenanceIssues = [
  {
    id: "ISSUE-001",
    scooterId: "SC-1004",
    make: "Segway Max",
    reportedBy: "John Doe",
    reportedAt: "2025-04-18T14:30:00",
    issueType: "mechanical",
    description: "Brakes not working properly, scooter doesn't stop quickly enough.",
    status: "pending",
    priority: "high",
  },
  {
    id: "ISSUE-002",
    scooterId: "SC-1005",
    make: "Xiaomi Pro 3",
    reportedBy: "Jane Smith",
    reportedAt: "2025-04-17T09:15:00",
    issueType: "electrical",
    description: "Battery drains very quickly, only lasts about 30 minutes of use.",
    status: "inProgress",
    priority: "medium",
  },
  {
    id: "ISSUE-003",
    scooterId: "SC-1008",
    make: "Segway Ninebot",
    reportedBy: "Mike Johnson",
    reportedAt: "2025-04-16T16:45:00",
    issueType: "software",
    description: "Display shows incorrect battery percentage, jumps from 50% to 10%.",
    status: "pending",
    priority: "low",
  },
  {
    id: "ISSUE-004",
    scooterId: "SC-1012",
    make: "Xiaomi Essential",
    reportedBy: "Sarah Williams",
    reportedAt: "2025-04-15T11:20:00",
    issueType: "cosmetic",
    description: "Handlebar grip is torn and coming loose.",
    status: "completed",
    priority: "low",
    resolvedAt: "2025-04-16T13:40:00",
    resolution: "Replaced handlebar grip with new one.",
  },
  {
    id: "ISSUE-005",
    scooterId: "SC-1007",
    make: "Segway Max",
    reportedBy: "David Brown",
    reportedAt: "2025-04-14T08:50:00",
    issueType: "mechanical",
    description: "Folding mechanism is stuck, cannot fold the scooter for transport.",
    status: "inProgress",
    priority: "high",
  },
]

interface MaintenanceListProps {
  status?: string
}

export function MaintenanceList({ status = "pending" }: MaintenanceListProps) {
  const [selectedIssue, setSelectedIssue] = useState<any>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [resolution, setResolution] = useState("")
  const [newStatus, setNewStatus] = useState("")

  // Filter issues based on the selected status
  const filteredIssues = mockMaintenanceIssues.filter((issue) => issue.status === status)

  const handleViewDetails = (issue: any) => {
    setSelectedIssue(issue)
    setShowDetailsDialog(true)
  }

  const handleUpdateStatus = (issue: any) => {
    setSelectedIssue(issue)
    setNewStatus(issue.status)
    setResolution(issue.resolution || "")
    setShowUpdateDialog(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getIssueTypeBadge = (type: string) => {
    switch (type) {
      case "mechanical":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Mechanical</Badge>
      case "electrical":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Electrical</Badge>
      case "software":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Software</Badge>
      case "cosmetic":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cosmetic</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
      case "low":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div>
      {filteredIssues.length > 0 ? (
        <div className="space-y-4">
          {filteredIssues.map((issue) => (
            <div key={issue.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    {issue.status === "pending" ? (
                      <AlertTriangle className="h-6 w-6 text-amber-500" />
                    ) : issue.status === "inProgress" ? (
                      <Clock className="h-6 w-6 text-blue-500" />
                    ) : (
                      <CheckCircle className="h-6 w-6 text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">Issue {issue.id}</h3>
                    <div className="text-sm text-gray-500">
                      Scooter: {issue.scooterId} • {issue.make}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  {getIssueTypeBadge(issue.issueType)}
                  {getPriorityBadge(issue.priority)}
                </div>
              </div>

              <div className="text-sm text-gray-600 line-clamp-2">{issue.description}</div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs text-gray-500">
                  Reported by {issue.reportedBy} on {formatDate(issue.reportedAt)}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(issue)}>
                    View Details
                  </Button>
                  {issue.status !== "completed" && (
                    <Button size="sm" onClick={() => handleUpdateStatus(issue)}>
                      Update Status
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">No maintenance issues with the selected status.</div>
      )}

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Issue Details</DialogTitle>
            <DialogDescription>Complete information about this maintenance issue</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="text-sm font-medium">Issue ID</div>
                <div className="text-sm">{selectedIssue?.id}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-medium">Scooter</div>
                <div className="text-sm">
                  {selectedIssue?.scooterId} ({selectedIssue?.make})
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-medium">Reported By</div>
                <div className="text-sm">{selectedIssue?.reportedBy}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-medium">Reported At</div>
                <div className="text-sm">{selectedIssue && formatDate(selectedIssue.reportedAt)}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-medium">Issue Type</div>
                <div className="text-sm">{selectedIssue?.issueType}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-medium">Priority</div>
                <div className="text-sm">{selectedIssue?.priority}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-medium">Status</div>
                <div className="text-sm">{selectedIssue?.status}</div>
              </div>

              {selectedIssue?.status === "completed" && (
                <>
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Resolved At</div>
                    <div className="text-sm">{selectedIssue && formatDate(selectedIssue.resolvedAt)}</div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Description</div>
              <div className="text-sm border rounded-md p-3 bg-gray-50">{selectedIssue?.description}</div>
            </div>

            {selectedIssue?.resolution && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Resolution</div>
                <div className="text-sm border rounded-md p-3 bg-gray-50">{selectedIssue.resolution}</div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Issue Status</DialogTitle>
            <DialogDescription>Change the status of this maintenance issue</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newStatus === "completed" && (
              <div className="space-y-2">
                <Label htmlFor="resolution">Resolution</Label>
                <Textarea
                  id="resolution"
                  placeholder="Describe how the issue was resolved"
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  rows={4}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowUpdateDialog(false)}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
