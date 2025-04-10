
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <AuthLayout>
      <MainLayout>
        <div className="space-y-6 max-w-2xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account and subscription settings
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex items-center justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                    <AvatarFallback className="text-2xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {user.plan} Plan
                    </Badge>
                    {user.role === "ADMIN" && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Admin
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline">Change Avatar</Button>
              </div>

              <Separator />

              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <Button>Update Profile</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>
                Manage your plan and subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold">{user.plan} Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.plan === 'STANDARD' ? 'Up to 15 design requests per month' : 
                     user.plan === 'PREMIUM' ? 'Unlimited design requests' : 
                     user.plan === 'BASIC' ? 'Up to 5 design requests per month' : 'No active subscription'}
                  </p>
                </div>
                <Button variant="outline">Change Plan</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Billing Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1 p-3 rounded-md border">
                    <p className="text-sm font-medium">Next billing date</p>
                    <p className="text-sm">May 12, 2025</p>
                  </div>
                  <div className="space-y-1 p-3 rounded-md border">
                    <p className="text-sm font-medium">Payment method</p>
                    <p className="text-sm">Visa ending in 4242</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost">Billing History</Button>
                  <Button variant="outline">Update Payment Method</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Update your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export default Profile;
