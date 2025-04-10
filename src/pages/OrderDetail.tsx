
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ArrowLeft, Clock, FileText, Download, Paperclip } from "lucide-react";
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

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, isLoading } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const order = orders.find((o) => o.id === id);

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

  if (isLoading) {
    return (
      <AuthLayout>
        <MainLayout>
          <div className="flex items-center justify-center p-8">
            <Clock className="h-8 w-8 animate-spin text-primary" />
          </div>
        </MainLayout>
      </AuthLayout>
    );
  }

  if (!order) {
    return (
      <AuthLayout>
        <MainLayout>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Order not found</h3>
            <p className="text-muted-foreground mb-4">
              The order you're looking for doesn't exist or you may not have permissions to view it.
            </p>
            <Button onClick={() => navigate("/orders")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to orders
            </Button>
          </div>
        </MainLayout>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-8"
                  onClick={() => navigate("/orders")}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                {order.title}
              </h1>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={getStatusColor(order.status)}
                >
                  {statusDisplayMap[order.status]}
                </Badge>
                <span className="text-muted-foreground">
                  Order ID: {order.id}
                </span>
              </div>
            </div>
            <Button onClick={() => navigate("/orders/new")}>Create New Order</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Description</h3>
                    <p>{order.description}</p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-2">Service Type</h3>
                      <p>{serviceTypeDisplayMap[order.serviceType]}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Created On</h3>
                      <p>{format(new Date(order.createdAt), "PPP")}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h3 className="font-medium mb-4">Project Brief</h3>
                    <div className="space-y-4">
                      {Object.entries(order.briefingData).map(([key, value]) => (
                        <div key={key} className="grid gap-1">
                          <p className="text-sm text-muted-foreground capitalize">
                            {key.replace(/_/g, " ")}
                          </p>
                          <p>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reference Files</CardTitle>
                </CardHeader>
                <CardContent>
                  {order.files.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">
                      No reference files provided
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {order.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between rounded-md border p-3"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {file.type.startsWith("image/") ? (
                                <img
                                  src={file.url}
                                  alt={file.name}
                                  className="h-10 w-10 object-cover rounded"
                                />
                              ) : (
                                <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                                  <Paperclip className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={file.url} download={file.name}>
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {order.deliveryFiles.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Files</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.deliveryFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between rounded-md border p-3 bg-muted/50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {file.type.startsWith("image/") ? (
                                <img
                                  src={file.url}
                                  alt={file.name}
                                  className="h-10 w-10 object-cover rounded"
                                />
                              ) : (
                                <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                                  <FileText className="h-4 w-4 text-primary" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={file.url} download={file.name}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {order.adminComments.length > 0 ? (
                      order.adminComments.map((comment) => (
                        <div key={comment.id} className="space-y-1">
                          <div className="bg-muted p-3 rounded-lg">
                            <p>{comment.text}</p>
                          </div>
                          <p className="text-xs text-muted-foreground text-right">
                            {format(new Date(comment.createdAt), "PPp")}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted-foreground py-4">
                        No updates yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="relative border-l border-muted-foreground/20">
                    <li className="mb-6 ml-6">
                      <div className="absolute -left-3 flex items-center justify-center rounded-full border border-white bg-primary p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground"></div>
                      </div>
                      <h3 className="font-semibold">Order Placed</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(order.createdAt), "PPp")}
                      </p>
                    </li>
                    {order.status !== "RECEIVED" && (
                      <li className="mb-6 ml-6">
                        <div className="absolute -left-3 flex items-center justify-center rounded-full border border-white bg-primary p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground"></div>
                        </div>
                        <h3 className="font-semibold">In Production</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(
                            new Date(order.createdAt.getTime() + 86400000),
                            "PPp"
                          )}
                        </p>
                      </li>
                    )}
                    {(order.status === "IN_REVIEW" || order.status === "DELIVERED") && (
                      <li className="mb-6 ml-6">
                        <div className="absolute -left-3 flex items-center justify-center rounded-full border border-white bg-primary p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground"></div>
                        </div>
                        <h3 className="font-semibold">In Review</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(
                            new Date(order.createdAt.getTime() + 3 * 86400000),
                            "PPp"
                          )}
                        </p>
                      </li>
                    )}
                    {order.status === "DELIVERED" && (
                      <li className="ml-6">
                        <div className="absolute -left-3 flex items-center justify-center rounded-full border border-white bg-green-600 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground"></div>
                        </div>
                        <h3 className="font-semibold">Delivered</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(
                            new Date(order.createdAt.getTime() + 5 * 86400000),
                            "PPp"
                          )}
                        </p>
                      </li>
                    )}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export default OrderDetail;
