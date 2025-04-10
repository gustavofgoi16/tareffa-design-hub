
import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { format } from "date-fns";
import { BarChart, Clock, Users, CheckCheck } from "lucide-react";
import { OrderStatus } from "@/types";

const statusDisplayMap: Record<OrderStatus, string> = {
  RECEIVED: "Received",
  IN_PRODUCTION: "In Production",
  IN_REVIEW: "In Review",
  DELIVERED: "Delivered",
  REJECTED: "Rejected"
};

const serviceTypeDisplayMap = {
  POST: "Social Media Post",
  WEBSITE: "Website Design",
  LOGO: "Logo Design",
  BRANDING: "Brand Identity",
  SOCIAL_MEDIA: "Social Media Kit",
  OTHER: "Other"
};

const Admin = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  // Count orders by status
  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getStatusColor = (status: OrderStatus) => {
    const statusColors: Record<OrderStatus, string> = {
      RECEIVED: "bg-blue-100 text-blue-800",
      IN_PRODUCTION: "bg-amber-100 text-amber-800",
      IN_REVIEW: "bg-purple-100 text-purple-800",
      DELIVERED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800"
    };
    return statusColors[status];
  };

  return (
    <AuthLayout adminOnly>
      <MainLayout>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage design orders and track service performance
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ordersByStatus.RECEIVED || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Production</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ordersByStatus.IN_PRODUCTION || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Recent design requests to process</CardDescription>
                </div>
                <Button variant="outline" onClick={() => navigate("/admin/orders")}>
                  View all
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>Demo User</TableCell>
                        <TableCell className="font-medium">{order.title}</TableCell>
                        <TableCell>{serviceTypeDisplayMap[order.serviceType]}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(order.status)}
                          >
                            {statusDisplayMap[order.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(new Date(order.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/orders/${order.id}`)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Service Types</CardTitle>
                <CardDescription>Distribution of service requests</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="space-y-4">
                  {["POST", "WEBSITE", "LOGO", "BRANDING", "SOCIAL_MEDIA", "OTHER"].map(type => {
                    const count = orders.filter(order => order.serviceType === type).length;
                    const percentage = orders.length ? Math.round((count / orders.length) * 100) : 0;
                    
                    return (
                      <div key={type} className="flex items-center">
                        <div className="w-9 text-sm">{count}</div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {serviceTypeDisplayMap[type as keyof typeof serviceTypeDisplayMap]}
                          </p>
                          <div className="flex items-center">
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div
                                className="h-2 rounded-full bg-primary"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-muted-foreground">
                              {percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Tasks</CardTitle>
                <CardDescription>Most urgent actions needed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders
                    .filter(order => order.status === "RECEIVED")
                    .slice(0, 3)
                    .map(order => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{order.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(order.createdAt), "MMM d, yyyy")}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7"
                          onClick={() => navigate(`/admin/orders/${order.id}`)}
                        >
                          Process
                        </Button>
                      </div>
                    ))}
                  {orders.filter(order => order.status === "RECEIVED").length === 0 && (
                    <div className="flex items-center justify-center p-6 text-center">
                      <div>
                        <CheckCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">All caught up!</p>
                        <p className="text-xs text-muted-foreground">No new orders to process</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export default Admin;
