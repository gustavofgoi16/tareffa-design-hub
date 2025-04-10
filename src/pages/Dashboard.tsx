
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Clock, CheckCircle, Loader2, BarChart } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const { user } = useAuth();
  const { orders, isLoading } = useOrders();
  const navigate = useNavigate();

  // Count orders by status
  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get the latest orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      RECEIVED: "bg-blue-100 text-blue-800",
      IN_PRODUCTION: "bg-amber-100 text-amber-800",
      IN_REVIEW: "bg-purple-100 text-purple-800",
      DELIVERED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800"
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    const statusIcons: Record<string, React.ReactNode> = {
      RECEIVED: <Clock className="h-4 w-4" />,
      IN_PRODUCTION: <Loader2 className="h-4 w-4 animate-spin" />,
      IN_REVIEW: <BarChart className="h-4 w-4" />,
      DELIVERED: <CheckCircle className="h-4 w-4" />,
    };
    return statusIcons[status] || null;
  };

  if (!user) {
    return null;
  }

  return (
    <AuthLayout>
      <MainLayout>
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name}</h1>
            <p className="text-muted-foreground">
              Here's an overview of your design orders
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
                <CardTitle className="text-sm font-medium">In Production</CardTitle>
                <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ordersByStatus.IN_PRODUCTION || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Delivered</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ordersByStatus.DELIVERED || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.plan}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Your most recent design requests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : recentOrders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center space-y-3 py-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">No orders yet</p>
                      <p className="text-xs text-muted-foreground">Create your first design request</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center space-x-4 rounded-md border p-4"
                      >
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{order.title}</p>
                            <Badge
                              variant="outline"
                              className={getStatusColor(order.status)}
                            >
                              <span className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {order.status.replace("_", " ")}
                              </span>
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Created on {format(new Date(order.createdAt), "PP")}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/orders")}
                >
                  View All Orders
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Create a new design request</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Button
                  className="w-full justify-start"
                  onClick={() => navigate("/orders/new")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Design Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export default Dashboard;
