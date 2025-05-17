"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Bike, ArrowLeft, Shield, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered")
  const userType = searchParams.get("type") || "customer"

  const [activeTab, setActiveTab] = useState(userType)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (registered === "true") {
      setSuccess("Registration successful! Please log in.")
    }
  }, [registered])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Basic validation
    if (!formData.username || !formData.password) {
      setError("Username and password are required")
      return
    }

    setLoading(true)

    // In a real implementation, this would send data to the backend
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect based on user type
      if (activeTab === "customer") {
        router.push("/customer/dashboard")
      } else if (activeTab === "admin") {
        router.push("/admin/dashboard")
      } else if (activeTab === "engineer") {
        router.push("/engineer/dashboard")
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-emerald-600">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Bike className="h-6 w-6 text-emerald-600" />
            <span className="font-bold">ScooterShare</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Log in to ScooterShare</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mx-6">
              <TabsTrigger value="customer" className="flex items-center gap-2">
                <Bike className="h-4 w-4" />
                <span className="hidden sm:inline">Customer</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </TabsTrigger>
              <TabsTrigger value="engineer" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                <span className="hidden sm:inline">Engineer</span>
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-6">
                {success && (
                  <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-emerald-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Log in"}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-emerald-600 hover:underline">
                    Register
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
