
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search, Plus, FileText, Filter } from "lucide-react";
import { OrderStatus, ServiceType } from "@/types";

const statusDisplayMap: Record<OrderStatus, string> = {
  RECEIVED: "Received",
  IN_PRODUCTION: "In Production",
  IN_REVIEW: "In Review",
  DELIVERED: "Delivered",
  REJECTED: "Rejected"
};

const serviceTypeDisplayMap: Record<ServiceType, string> = {
  POST: "Social Media Post",
  WEBSITE: "Website Design",
  LOGO: "Logo Design",
  BRANDING: "Brand Identity",
  SOCIAL_MEDIA: "Social Media Kit",
  OTHER: "Other"
};

const Orders = () => {
  const { orders, isLoading } = useOrders();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = search === "" || 
      order.title.toLowerCase().includes(search.toLowerCase()) ||
      order.description.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === null || order.status === statusFilter;
    const matchesType = typeFilter === null || order.serviceType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <AuthLayout>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
              <p className="text-muted-foreground">
                View and track all your design requests
              </p>
            </div>
            <Button onClick={() => navigate("/orders/new")}>
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </div>

          <div className="bg-card rounded-lg shadow">
            <div className="p-4 border-b">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="relative w-full sm:w-auto sm:flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-8"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="w-full sm:w-[180px]">
                    <Select
                      onValueChange={(value) => 
                        setStatusFilter(value === "all" ? null : value as OrderStatus)
                      }
                    >
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <span>
                            {statusFilter ? statusDisplayMap[statusFilter as OrderStatus] : "All Status"}
                          </span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {Object.entries(statusDisplayMap).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full sm:w-[180px]">
                    <Select
                      onValueChange={(value) => 
                        setTypeFilter(value === "all" ? null : value as ServiceType)
                      }
                    >
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <span>
                            {typeFilter ? serviceTypeDisplayMap[typeFilter as ServiceType] : "All Types"}
                          </span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {Object.entries(serviceTypeDisplayMap).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No orders found</h3>
                <p className="text-muted-foreground mb-4">
                  {search || statusFilter || typeFilter
                    ? "Try adjusting your filters"
                    : "Create your first design request"}
                </p>
                {!search && !statusFilter && !typeFilter && (
                  <Button onClick={() => navigate("/orders/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Order
                  </Button>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {order.title}
                      </TableCell>
                      <TableCell>
                        {serviceTypeDisplayMap[order.serviceType]}
                      </TableCell>
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
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export default Orders;
