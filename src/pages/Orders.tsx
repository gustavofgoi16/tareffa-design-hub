
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2, 
  Search, 
  Plus, 
  Filter, 
  CheckCircle,
  Clock,
  Calendar,
  Star,
  BarChart
} from "lucide-react";
import { OrderStatus, ServiceType } from "@/types";

const statusDisplayMap: Record<OrderStatus, string> = {
  RECEIVED: "Recebido",
  IN_PRODUCTION: "Em Produção",
  IN_REVIEW: "Em Revisão",
  DELIVERED: "Entregue",
  REJECTED: "Rejeitado"
};

const serviceTypeDisplayMap: Record<ServiceType, string> = {
  POST: "Post para Redes Sociais",
  WEBSITE: "Design de Website",
  LOGO: "Design de Logo",
  BRANDING: "Identidade Visual",
  SOCIAL_MEDIA: "Kit de Redes Sociais",
  OTHER: "Outro"
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
  
  const getStatusIcon = (status: string) => {
    const statusIcons: Record<string, React.ReactNode> = {
      RECEIVED: <Clock className="h-4 w-4" />,
      IN_PRODUCTION: <Loader2 className="h-4 w-4 animate-spin" />,
      IN_REVIEW: <BarChart className="h-4 w-4" />,
      DELIVERED: <CheckCircle className="h-4 w-4" />,
    };
    return statusIcons[status] || null;
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-medium">Meus Pedidos</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Visualize e acompanhe todos os seus pedidos de design
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/orders/new")} className="flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              Novo Pedido
            </Button>
          </div>
        </div>

        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar pedidos..."
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
                          {statusFilter ? statusDisplayMap[statusFilter as OrderStatus] : "Todos os Status"}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
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
                          {typeFilter ? serviceTypeDisplayMap[typeFilter as ServiceType] : "Todos os Tipos"}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Tipos</SelectItem>
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
              <h3 className="text-lg font-semibold">Nenhum pedido encontrado</h3>
              <p className="text-muted-foreground mb-4 mt-2">
                {search || statusFilter || typeFilter
                  ? "Tente ajustar seus filtros"
                  : "Crie seu primeiro pedido de design"}
              </p>
              {!search && !statusFilter && !typeFilter && (
                <Button onClick={() => navigate("/orders/new")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Pedido
                </Button>
              )}
            </div>
          ) : (
            <div>
              {filteredOrders.map((order, index) => (
                <div 
                  key={order.id}
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className={`flex items-center py-3 px-4 hover:bg-muted/50 cursor-pointer ${index !== filteredOrders.length - 1 ? 'border-b' : ''}`}
                >
                  <div className="w-1/2 flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center">
                      <CheckCircle className="h-3.5 w-3.5 text-muted-foreground/30" />
                    </div>
                    <div>
                      <div className="font-medium">{order.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {serviceTypeDisplayMap[order.serviceType]} • Criado em {format(new Date(order.createdAt), "dd/MM/yyyy")}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/6 flex justify-center">
                    <Badge
                      variant="outline"
                      className={getStatusColor(order.status)}
                    >
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {statusDisplayMap[order.status]}
                      </span>
                    </Badge>
                  </div>
                  <div className="w-1/6 flex justify-center">
                    {index === 0 ? (
                      <span className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                        Alta
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  <div className="w-1/6 flex justify-center">
                    {index === 0 ? (
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {format(new Date(), "dd/MM/yyyy")}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  <div className="w-1/6 flex justify-center">
                    <span className="text-sm font-medium">
                      {index % 3 === 0 ? "100%" : 
                       index % 3 === 1 ? "50%" : "0%"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export default Orders;
