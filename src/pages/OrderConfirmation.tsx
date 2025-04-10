
import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <MainLayout>
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 space-y-8">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Order Successfully Submitted!</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Thank you for your order. Our team will review your request and begin working on it shortly. You can track the status of your order in your dashboard.
              </p>
            </div>

            <div className="bg-muted p-6 rounded-lg max-w-md mx-auto">
              <h2 className="font-semibold text-lg mb-4">What's Next?</h2>
              <ol className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">1</span>
                  </div>
                  <p>Our team will review your order details</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">2</span>
                  </div>
                  <p>We'll update the status to "In Production" once work begins</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">3</span>
                  </div>
                  <p>You'll receive updates through your dashboard as the project progresses</p>
                </li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
              <Button onClick={() => navigate("/orders/new")} variant="outline">
                Create Another Order
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export default OrderConfirmation;
