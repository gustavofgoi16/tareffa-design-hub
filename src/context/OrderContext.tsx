
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Order, ServiceType, OrderStatus, File, Comment } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface OrderContextProps {
  orders: Order[];
  isLoading: boolean;
  createOrder: (orderData: Partial<Order>) => Promise<Order>;
  getOrders: () => Promise<Order[]>;
  getOrderById: (id: string) => Promise<Order | undefined>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<Order>;
  addComment: (orderId: string, text: string) => Promise<Order>;
  addDeliveryFile: (orderId: string, file: File) => Promise<Order>;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

// Mock data - would be replaced by API calls in a real application
const MOCK_ORDERS: Order[] = [
  {
    id: "order-123",
    title: "Instagram Post Design",
    description: "Need a professional post for product launch",
    serviceType: "POST",
    status: "IN_PRODUCTION",
    files: [
      {
        id: "file-1",
        name: "reference.jpg",
        url: "/placeholder.svg",
        size: 1024,
        type: "image/jpeg",
        createdAt: new Date()
      }
    ],
    clientId: "user-123",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    adminComments: [
      {
        id: "comment-1",
        text: "Design in progress, will have first draft by tomorrow",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        userId: "admin-123"
      }
    ],
    deliveryFiles: [],
    briefingData: {
      brand_colors: "#ff5500, #0055ff",
      target_audience: "Young professionals",
      message: "Product launch announcement"
    }
  },
  {
    id: "order-456",
    title: "Logo Redesign",
    description: "Need a modern update to our existing logo",
    serviceType: "LOGO",
    status: "DELIVERED",
    files: [
      {
        id: "file-2",
        name: "old_logo.png",
        url: "/placeholder.svg",
        size: 2048,
        type: "image/png",
        createdAt: new Date()
      }
    ],
    clientId: "user-123",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    deliveryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    adminComments: [
      {
        id: "comment-2",
        text: "Final logo delivered, please let us know if you need any adjustments",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        userId: "admin-123"
      }
    ],
    deliveryFiles: [
      {
        id: "delivery-1",
        name: "final_logo.zip",
        url: "/placeholder.svg",
        size: 5120,
        type: "application/zip",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ],
    briefingData: {
      current_brand_colors: "#336699, #ffffff",
      desired_style: "Modern, minimalist",
      industry: "Technology"
    }
  }
];

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async (): Promise<Order[]> => {
    setIsLoading(true);
    try {
      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrders(MOCK_ORDERS);
      return MOCK_ORDERS;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (id: string): Promise<Order | undefined> => {
    setIsLoading(true);
    try {
      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 300));
      return orders.find(order => order.id === id);
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    setIsLoading(true);
    try {
      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        title: orderData.title || "",
        description: orderData.description || "",
        serviceType: orderData.serviceType || "OTHER",
        status: "RECEIVED",
        files: orderData.files || [],
        clientId: orderData.clientId || "",
        createdAt: new Date(),
        adminComments: [],
        deliveryFiles: [],
        briefingData: orderData.briefingData || {}
      };
      
      setOrders([newOrder, ...orders]);
      toast({
        title: "Order Created",
        description: "Your order has been successfully created",
        variant: "default",
      });
      
      return newOrder;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create order",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus): Promise<Order> => {
    setIsLoading(true);
    try {
      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const updatedOrders = orders.map(order => 
        order.id === id ? { ...order, status } : order
      );
      
      setOrders(updatedOrders);
      
      const updatedOrder = updatedOrders.find(order => order.id === id);
      if (!updatedOrder) throw new Error("Order not found");
      
      toast({
        title: "Status Updated",
        description: `Order status changed to ${status}`,
        variant: "default",
      });
      
      return updatedOrder;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (orderId: string, text: string): Promise<Order> => {
    setIsLoading(true);
    try {
      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        text,
        createdAt: new Date(),
        userId: "admin-123" // Would come from auth context in real app
      };
      
      const updatedOrders = orders.map(order => 
        order.id === orderId 
          ? { ...order, adminComments: [...order.adminComments, newComment] } 
          : order
      );
      
      setOrders(updatedOrders);
      
      const updatedOrder = updatedOrders.find(order => order.id === orderId);
      if (!updatedOrder) throw new Error("Order not found");
      
      return updatedOrder;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addDeliveryFile = async (orderId: string, file: File): Promise<Order> => {
    setIsLoading(true);
    try {
      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const updatedOrders = orders.map(order => 
        order.id === orderId 
          ? { ...order, deliveryFiles: [...order.deliveryFiles, file] } 
          : order
      );
      
      setOrders(updatedOrders);
      
      const updatedOrder = updatedOrders.find(order => order.id === orderId);
      if (!updatedOrder) throw new Error("Order not found");
      
      toast({
        title: "File Added",
        description: "Delivery file has been added to the order",
        variant: "default",
      });
      
      return updatedOrder;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add delivery file",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OrderContext.Provider 
      value={{ 
        orders, 
        isLoading, 
        createOrder, 
        getOrders, 
        getOrderById, 
        updateOrderStatus, 
        addComment, 
        addDeliveryFile 
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
