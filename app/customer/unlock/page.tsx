"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Bike, ArrowLeft, QrCode, KeyRound, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QRScanner } from "@/components/qr-scanner"

export default function UnlockScooter() {
  const [unlockMethod, setUnlockMethod] = useState("credentials")
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [unlockSuccess, setUnlockSuccess] = useState(false)
  const [scooterId, setScooterId] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleCredentialUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call to unlock scooter
    setTimeout(() => {
      setUnlockSuccess(true)
    }, 1000)
  }

  const handleQRScan = (data: string) => {
    console.log("QR Code scanned:", data)
    // In a real app, this would process the QR code data
    // For this demo, we'll simulate a successful unlock
    setTimeout(() => {
      setShowQRScanner(false)
      setUnlockSuccess(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Bike className="h-6 w-6 text-emerald-600" />
            <span>ScooterShare</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/customer/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Unlock Scooter</h1>
        </div>

        {unlockSuccess ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-600">
                <CheckCircle className="h-6 w-6" />
                Scooter Unlocked Successfully
              </CardTitle>
              <CardDescription>Your scooter is now ready to use</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-emerald-50 p-4 rounded-lg text-emerald-800">
                <p>
                  You have successfully unlocked the scooter. Enjoy your ride and remember to follow all safety
                  guidelines.
                </p>
                <p className="mt-2">
                  When you're done, please return the scooter to a designated parking area and lock it using the app or
                  QR code.
                </p>
              </div>

              <div className="flex justify-center">
                <Button asChild>
                  <Link href="/customer/dashboard">Return to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : showQRScanner ? (
          <QRScanner onScan={handleQRScan} onClose={() => setShowQRScanner(false)} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Unlock a Scooter</CardTitle>
              <CardDescription>Choose your preferred method to unlock a scooter</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={unlockMethod} onValueChange={setUnlockMethod}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="credentials" className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    <span>Credentials</span>
                  </TabsTrigger>
                  <TabsTrigger value="qrcode" className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    <span>QR Code</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="credentials" className="mt-0">
                  <form onSubmit={handleCredentialUnlock} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="scooterId">Scooter ID</Label>
                      <Input
                        id="scooterId"
                        placeholder="Enter scooter ID (e.g. SC-1001)"
                        value={scooterId}
                        onChange={(e) => setScooterId(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Unlock Scooter
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="qrcode" className="mt-0">
                  <div className="text-center py-8 space-y-4">
                    <QrCode className="h-16 w-16 text-gray-300 mx-auto" />
                    <div>
                      <h3 className="font-medium text-lg">Scan QR Code on Scooter</h3>
                      <p className="text-gray-500 mt-1">
                        Point your camera at the QR code located on the scooter to unlock it
                      </p>
                    </div>
                    <Button onClick={() => setShowQRScanner(true)} className="mt-4">
                      Open Camera
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
