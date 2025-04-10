
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useOrders } from "@/context/OrderContext";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ArrowLeft, Clock, FileText, Download, Paperclip, Upload, User, Send } from "lucide-react";
import { File as FileType, OrderStatus } from "@/types";

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "RECEIVED", label: "Received" },
  { value: "IN_PRODUCTION", label: "In Production" },
  { value: "IN_REVIEW", label: "In Review" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "REJECTED", label: "Rejected" },
];

const AdminOrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, isLoading, updateOrderStatus, addComment, addDeliveryFile } = useOrders();
  const navigate = useNavigate();
  const [uploadingFiles, setUploadingFiles] = useState(false);
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const order = orders.find((o) => o.id === id);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!order || !e.target.files || e.target.files.length === 0) return;

    setUploadingFiles(true);
    
    // In a real app, you would upload these files to a server or service
    // For now, we'll just simulate the upload and create File objects
    const fileList = e.target.files;
    const file = fileList[0];
    
    const newFile: FileType = {
      id: `delivery-${Date.now()}`,
      name: file.name,
      url: URL.createObjectURL(file), // In a real app, this would be the URL from your upload service
      size: file.size,
      type: file.type,
      createdAt: new Date(),
    };
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await addDeliveryFile(order.id, newFile);
    setUploadingFiles(false);
  };

  const onStatusChange = async (status: OrderStatus) => {
    if (!order) return;
    await updateOrderStatus(order.id, status);
  };

  const onCommentSubmit = async (data: { comment: string }) => {
    if (!order || !data.comment.trim()) return;
    
    await addComment(order.id, data.comment);
    reset();
  };

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
      <AuthLayout adminOnly>
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
      <AuthLayout adminOnly>
        <MainLayout>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Order not found</h3>
            <p className="text-muted-foreground mb-4">
              The order you're looking for doesn't exist or you may not have access to it.
            </p>
            <Button onClick={() => navigate("/admin/orders")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to orders
            </Button>
          </div>
        </MainLayout>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout adminOnly>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-8"
                  onClick={() => navigate("/admin/orders")}
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
                  {statusOptions.find(s => s.value === order.status)?.label}
                </Badge>
                <span className="text-muted-foreground">
                  Order ID: {order.id}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 rounded-md bg-muted/50 p-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Demo User</p>
                      <p className="text-sm text-muted-foreground">demo@tareffa.com</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      View Profile
                    </Button>
                  </div>
                
                  <div className="space-y-2">
                    <h3 className="font-medium">Description</h3>
                    <p>{order.description}</p>
                  </div>
                  
                  <Separator className="my-4" />

                  <div>
                    <h3 className="font-medium mb-4">Project Brief</h3>
                    <div className="space-y-4">
                      {Object.entries(order.briefingData).map(([key, value]) => (
                        value && (
                          <div key={key} className="grid gap-1">
                            <p className="text-sm text-muted-foreground capitalize">
                              {key.replace(/_/g, " ")}
                            </p>
                            <p>{value}</p>
                          </div>
                        )
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

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.deliveryFiles.length > 0 && (
                      <div className="space-y-4">
                        {order.deliveryFiles.map((file) => (
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
                            <Button variant="ghost" size="sm" asChild>
                              <a href={file.url} download={file.name}>
                                <Download className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                      <p className="text-sm text-center text-muted-foreground mb-2">
                        Upload files to deliver to the client
                      </p>
                      <Button
                        type="button"
                        onClick={() => document.getElementById("delivery-upload")?.click()}
                        disabled={uploadingFiles}
                      >
                        {uploadingFiles ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Files
                          </>
                        )}
                      </Button>
                      <input
                        id="delivery-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Update Status</h3>
                    <Select 
                      defaultValue={order.status} 
                      onValueChange={(value) => onStatusChange(value as OrderStatus)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Order Timeline</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Created</span>
                        <span>{format(new Date(order.createdAt), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Last Updated</span>
                        <span>
                          {format(
                            order.adminComments.length > 0
                              ? new Date(
                                  order.adminComments[order.adminComments.length - 1].createdAt
                                )
                              : new Date(order.createdAt),
                            "MMM d, yyyy"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                      {order.adminComments.length > 0 ? (
                        order.adminComments.map((comment) => (
                          <div key={comment.id} className="space-y-1">
                            <div className="bg-primary/10 p-3 rounded-lg">
                              <p>{comment.text}</p>
                            </div>
                            <p className="text-xs text-muted-foreground text-right">
                              {format(new Date(comment.createdAt), "PPp")} - Admin
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-muted-foreground py-4">
                          No comments yet
                        </div>
                      )}
                    </div>
                    
                    <form onSubmit={handleSubmit(onCommentSubmit)} className="space-y-3">
                      <Textarea
                        placeholder="Add a comment or update for the client..."
                        {...register("comment", { required: true })}
                      />
                      <Button type="submit" className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Send Update
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export default AdminOrderDetail;
