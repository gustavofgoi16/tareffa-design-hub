
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  Clock, 
  CheckCircle, 
  Loader2, 
  BarChart, 
  Filter,
  Star,
  Calendar,
  MoreHorizontal
} from "lucide-react";
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-medium">Projetos</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
            <Button onClick={() => navigate("/orders/new")} className="flex items-center gap-1.5">
              <PlusCircle className="h-4 w-4" />
              Criar projeto
            </Button>
          </div>
        </div>

        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="border-b py-3 px-4 flex items-center text-sm font-medium text-muted-foreground">
            <div className="w-1/2">Título</div>
            <div className="w-1/6 text-center">Status</div>
            <div className="w-1/6 text-center">Prioridade</div>
            <div className="w-1/6 text-center">Data Estimada</div>
            <div className="w-1/6 text-center">Progresso</div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-lg font-semibold">Nenhum projeto encontrado</h3>
              <p className="text-muted-foreground mb-4 mt-2">
                Crie seu primeiro projeto de design
              </p>
              <Button onClick={() => navigate("/orders/new")}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Projeto
              </Button>
            </div>
          ) : (
            <div>
              {orders.map((order, index) => (
                <div 
                  key={order.id}
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className={`flex items-center py-3 px-4 hover:bg-muted/50 cursor-pointer ${index !== orders.length - 1 ? 'border-b' : ''}`}
                >
                  <div className="w-1/2 flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center">
                      <CheckCircle className="h-3.5 w-3.5 text-muted-foreground/30" />
                    </div>
                    <div>
                      <div className="font-medium">{order.title}</div>
                      <div className="text-xs text-muted-foreground">Criado em {format(new Date(order.createdAt), "dd/MM/yyyy")}</div>
                    </div>
                  </div>
                  <div className="w-1/6 flex justify-center">
                    <Badge
                      variant="outline"
                      className={getStatusColor(order.status)}
                    >
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status === "RECEIVED" ? "Recebido" :
                          order.status === "IN_PRODUCTION" ? "Em produção" :
                          order.status === "IN_REVIEW" ? "Em revisão" :
                          order.status === "DELIVERED" ? "Entregue" : 
                          order.status === "REJECTED" ? "Rejeitado" : order.status}
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

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Atividade Recente</h2>
            <Button variant="ghost" size="sm">
              Ver tudo
            </Button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div 
                key={order.id}
                className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium">{order.title}</div>
                  <Badge variant="outline" className={getStatusColor(order.status)}>
                    {order.status === "RECEIVED" ? "Recebido" :
                     order.status === "IN_PRODUCTION" ? "Em produção" :
                     order.status === "IN_REVIEW" ? "Em revisão" :
                     order.status === "DELIVERED" ? "Entregue" : 
                     order.status === "REJECTED" ? "Rejeitado" : order.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {order.description}
                </p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Atualizado {format(new Date(order.createdAt), "dd/MM/yyyy")}</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export default Dashboard;
