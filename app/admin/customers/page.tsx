"use client"

import { useState } from "react"
import Link from "next/link"
import { Bike, LogOut, ArrowLeft, Search, Plus, Pencil, Trash2, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock customer data
const mockCustomers = [
  {
    id: "C001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    balance: 25.5,
    registeredDate: "2025-01-15",
    totalRides: 12,
  },
  {
    id: "C002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    balance: 42.75,
    registeredDate: "2025-02-03",
    totalRides: 8,
  },
  {
    id: "C003",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@example.com",
    phone: "+1 (555) 456-7890",
    balance: 10.0,
    registeredDate: "2025-02-18",
    totalRides: 5,
  },
  {
    id: "C004",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.w@example.com",
    phone: "+1 (555) 789-0123",
    balance: 35.25,
    registeredDate: "2025-03-05",
    totalRides: 15,
  },
  {
    id: "C005",
    firstName: "David",
    lastName: "Brown",
    email: "david.b@example.com",
    phone: "+1 (555) 234-5678",
    balance: 5.5,
    registeredDate: "2025-03-22",
    totalRides: 3,
  },
]

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showTopUpDialog, setShowTopUpDialog] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Mock admin data
  const admin = {
    name: "Admin User",
    initials: "AU",
  }

  // Filter customers based on search query
  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEdit = (customer: any) => {
    setSelectedCustomer({ ...customer })
    setShowEditDialog(true)
  }

  const handleDelete = (customer: any) => {
    setSelectedCustomer(customer)
    setShowDeleteDialog(true)
  }

  const handleTopUp = (customer: any) => {
    setSelectedCustomer(customer)
    setShowTopUpDialog(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Bike className="h-6 w-6 text-emerald-600" />
            <span>ScooterShare</span>
            <Badge variant="outline" className="ml-2">
              Admin
            </Badge>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{admin.initials}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline font-medium">{admin.name}</span>
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
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Customer Management</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>View and manage customer accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-4 py-2 text-left">ID</th>
                    <th className="border px-4 py-2 text-left">Name</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Phone</th>
                    <th className="border px-4 py-2 text-left">Balance</th>
                    <th className="border px-4 py-2 text-left">Registered</th>
                    <th className="border px-4 py-2 text-left">Rides</th>
                    <th className="border px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer, index) => (
                      <tr key={customer.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-4 py-2">{customer.id}</td>
                        <td className="border px-4 py-2">
                          {customer.firstName} {customer.lastName}
                        </td>
                        <td className="border px-4 py-2">{customer.email}</td>
                        <td className="border px-4 py-2">{customer.phone}</td>
                        <td className="border px-4 py-2">${customer.balance.toFixed(2)}</td>
                        <td className="border px-4 py-2">{customer.registeredDate}</td>
                        <td className="border px-4 py-2">{customer.totalRides}</td>
                        <td className="border px-4 py-2">
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleEdit(customer)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleTopUp(customer)}>
                              <CreditCard className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-500"
                              onClick={() => handleDelete(customer)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="border px-4 py-8 text-center text-gray-500">
                        No customers found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Customer Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogDescription>Update customer information</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={selectedCustomer?.firstName || ""}
                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, firstName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={selectedCustomer?.lastName || ""}
                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={selectedCustomer?.email || ""}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={selectedCustomer?.phone || ""}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, phone: e.target.value })}
                />
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

        {/* Delete Customer Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>Are you sure you want to delete this customer?</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="border rounded-md p-3">
                <div className="font-medium">
                  {selectedCustomer?.firstName} {selectedCustomer?.lastName}
                </div>
                <div className="text-sm text-gray-500">ID: {selectedCustomer?.id}</div>
                <div className="text-sm text-gray-500">Email: {selectedCustomer?.email}</div>
                <div className="text-sm text-gray-500">Phone: {selectedCustomer?.phone}</div>
              </div>
              <p className="text-sm text-red-500 mt-4">This action cannot be undone.</p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setShowDeleteDialog(false)}>
                Delete Customer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Top Up Dialog */}
        <Dialog open={showTopUpDialog} onOpenChange={setShowTopUpDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Top Up Customer Balance</DialogTitle>
              <DialogDescription>Add funds to customer account</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="border rounded-md p-3">
                <div className="font-medium">
                  {selectedCustomer?.firstName} {selectedCustomer?.lastName}
                </div>
                <div className="text-sm text-gray-500">ID: {selectedCustomer?.id}</div>
                <div className="text-sm text-gray-500">Current Balance: ${selectedCustomer?.balance.toFixed(2)}</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topUpAmount">Amount to Add ($)</Label>
                <Input id="topUpAmount" type="number" min="0" step="0.01" defaultValue="10.00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topUpNote">Note (Optional)</Label>
                <Input id="topUpNote" placeholder="Reason for top up" />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTopUpDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowTopUpDialog(false)}>Add Funds</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Customer Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Create a new customer account</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newFirstName">First Name</Label>
                  <Input id="newFirstName" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newLastName">Last Name</Label>
                  <Input id="newLastName" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newEmail">Email</Label>
                <Input id="newEmail" type="email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPhone">Phone</Label>
                <Input id="newPhone" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newUsername">Username</Label>
                <Input id="newUsername" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Password</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialBalance">Initial Balance ($)</Label>
                <Input id="initialBalance" type="number" min="0" step="0.01" defaultValue="0.00" />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddDialog(false)}>Create Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
