"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReportIssueDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReportIssueDialog({ open, onOpenChange }: ReportIssueDialogProps) {
  const [scooterId, setScooterId] = useState("")
  const [issueType, setIssueType] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  const handleClose = () => {
    onOpenChange(false)

    // Reset state when dialog is closed
    setTimeout(() => {
      setSuccess(false)
      setScooterId("")
      setIssueType("")
      setDescription("")
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{success ? "Issue Reported Successfully!" : "Report a Scooter Issue"}</DialogTitle>
          <DialogDescription>
            {success
              ? "Your issue has been reported and will be addressed by our engineers."
              : "Let us know about any problems with a scooter."}
          </DialogDescription>
        </DialogHeader>

        {!success ? (
          <>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="scooterId">Scooter ID</Label>
                <Input
                  id="scooterId"
                  placeholder="e.g. SC-1001"
                  value={scooterId}
                  onChange={(e) => setScooterId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issueType">Issue Type</Label>
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger id="issueType">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mechanical">Mechanical Issue</SelectItem>
                    <SelectItem value="electrical">Electrical/Battery Issue</SelectItem>
                    <SelectItem value="cosmetic">Cosmetic Damage</SelectItem>
                    <SelectItem value="software">App/Software Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe the issue in detail"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Report"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="space-y-4 py-4">
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-md">
              <p>Thank you for reporting this issue.</p>
              <p className="mt-2">Our engineering team has been notified and will address it promptly.</p>
            </div>

            <DialogFooter>
              <Button onClick={handleClose}>Close</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
