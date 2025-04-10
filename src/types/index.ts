
export type UserRole = "CLIENT" | "ADMIN";
export type ServiceType = "POST" | "WEBSITE" | "LOGO" | "BRANDING" | "SOCIAL_MEDIA" | "OTHER";
export type OrderStatus = "RECEIVED" | "IN_PRODUCTION" | "IN_REVIEW" | "DELIVERED" | "REJECTED";
export type PlanType = "BASIC" | "STANDARD" | "PREMIUM" | "NONE";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: PlanType;
  role: UserRole;
  createdAt: Date;
}

export interface File {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
}

export interface Order {
  id: string;
  title: string;
  description: string;
  serviceType: ServiceType;
  status: OrderStatus;
  files: File[];
  clientId: string;
  createdAt: Date;
  deliveryDate?: Date;
  adminComments: Comment[];
  deliveryFiles: File[];
  briefingData: Record<string, any>;
}
