
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, HelpCircle, Lock } from 'lucide-react';

const plans = [
  {
    name: 'BASIC',
    description: 'For individuals and small projects',
    price: '$49',
    features: [
      'Up to 5 design requests per month',
      '48-hour turnaround time',
      '1 design at a time',
      'Web & social media designs',
    ],
    limitations: ['No logo or branding projects', 'No unlimited revisions'],
  },
  {
    name: 'STANDARD',
    description: 'Most popular for growing businesses',
    price: '$99',
    features: [
      'Up to 15 design requests per month',
      '24-hour turnaround time',
      '2 designs at a time',
      'All design categories',
      '2 revision rounds included',
    ],
    recommended: true,
  },
  {
    name: 'PREMIUM',
    description: 'For agencies and large businesses',
    price: '$199',
    features: [
      'Unlimited design requests',
      'Priority 12-hour turnaround',
      '3 designs at a time',
      'All design categories',
      'Unlimited revision rounds',
      'Dedicated account manager',
    ],
  },
];

const Plan = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <AuthLayout>
      <MainLayout>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
            <p className="text-muted-foreground">
              Choose the perfect plan for your design needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => {
              const isCurrentPlan = user.plan === plan.name;
              
              return (
                <Card key={plan.name} className={`flex flex-col ${plan.recommended ? 'border-primary/50 shadow-md' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </div>
                      {plan.recommended && (
                        <Badge variant="default" className="bg-primary">
                          Popular
                        </Badge>
                      )}
                      {isCurrentPlan && (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Current
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations && plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-center text-muted-foreground">
                          <Lock className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant={isCurrentPlan ? "outline" : plan.recommended ? "default" : "outline"}
                      className="w-full"
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <div className="bg-muted/50 rounded-lg p-6 border mt-8">
            <div className="flex items-start space-x-4">
              <HelpCircle className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Need help choosing a plan?</h3>
                <p className="text-muted-foreground mb-4">
                  Our team is ready to help you find the perfect fit for your design needs. Don't hesitate to reach out.
                </p>
                <Button variant="outline">Contact Us</Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export default Plan;
