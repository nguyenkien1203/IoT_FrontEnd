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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface TopUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TopUpDialog({ open, onOpenChange }: TopUpDialogProps) {
  const [amount, setAmount] = useState("10")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleTopUp = () => {
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
      setAmount("10")
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{success ? "Top Up Successful!" : "Top Up Your Account"}</DialogTitle>
          <DialogDescription>
            {success
              ? "Your account has been topped up successfully."
              : "Add funds to your account to book and use scooters."}
          </DialogDescription>
        </DialogHeader>

        {!success ? (
          <>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input id="amount" type="number" min="5" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apple" id="apple" />
                    <Label htmlFor="apple">Apple Pay</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleTopUp} disabled={loading}>
                {loading ? "Processing..." : `Top Up $${amount}`}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="space-y-4 py-4">
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-md">
              <p>Your account has been topped up with ${amount}.</p>
              <p className="mt-2">Your new balance will be reflected immediately.</p>
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
