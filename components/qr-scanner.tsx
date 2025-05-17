"use client"

import { useState, useEffect } from "react"
import { Camera, QrCode, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface QRScannerProps {
  onScan: (data: string) => void
  onClose: () => void
  title?: string
  description?: string
}

export function QRScanner({
  onScan,
  onClose,
  title = "Scan QR Code",
  description = "Position the QR code within the frame to scan",
}: QRScannerProps) {
  const [scanning, setScanning] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)

  // Simulate QR code scanning
  useEffect(() => {
    if (scanning) {
      // In a real implementation, this would use a camera API to scan QR codes
      // For this demo, we'll simulate a successful scan after a delay
      const timer = setTimeout(() => {
        // Simulate a successful scan with a mock QR code data
        const mockQRData = "scooter:unlock:SC-1002"
        setScanning(false)
        onScan(mockQRData)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [scanning, onScan])

  // Simulate requesting camera permission
  useEffect(() => {
    // In a real implementation, this would request camera permission
    // For this demo, we'll simulate permission being granted
    setCameraPermission(true)
  }, [])

  const handleRetry = () => {
    setError(null)
    setScanning(true)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {cameraPermission === false ? (
          <div className="text-center py-8">
            <Camera className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Camera access is required to scan QR codes</p>
            <Button onClick={handleRetry}>Grant Permission</Button>
          </div>
        ) : (
          <div className="relative">
            {/* Camera preview placeholder */}
            <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
              {scanning ? (
                <>
                  <div className="absolute inset-0 border-2 border-dashed border-emerald-500 m-8 rounded-lg"></div>
                  <Camera className="h-16 w-16 text-gray-300" />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-500 h-1 w-32 animate-pulse rounded-full"></div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <QrCode className="h-16 w-16 text-emerald-500 mx-auto mb-2" />
                  <p className="text-emerald-600 font-medium">QR Code Detected!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        {!scanning && <Button onClick={handleRetry}>Scan Again</Button>}
      </CardFooter>
    </Card>
  )
}
