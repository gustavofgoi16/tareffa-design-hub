
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/90 to-accent/90 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Streamlined Design Services for Your Business
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-lg">
                Request professional designs anytime with our efficient service platform. Submit, track, and receive high-quality designs in one place.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg bg-white/10 backdrop-blur-sm p-6 shadow-lg animate-slide-in">
                <img
                  src="/placeholder.svg"
                  alt="Tareffa Design Hub Platform"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our design request platform simplifies the process of getting professional designs for your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Submit Your Request",
                description:
                  "Fill out our intuitive form with your design needs and upload any reference materials.",
              },
              {
                title: "2. Track Progress",
                description:
                  "Follow the status of your design from your dashboard as our team works on your request.",
              },
              {
                title: "3. Receive & Review",
                description:
                  "Download your completed designs and request revisions if needed.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the perfect subscription plan for your design needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "$49",
                description: "For individuals and small projects",
                features: [
                  "Up to 5 design requests per month",
                  "48-hour turnaround time",
                  "1 design at a time",
                ],
              },
              {
                name: "Standard",
                price: "$99",
                description: "Most popular for growing businesses",
                features: [
                  "Up to 15 design requests per month",
                  "24-hour turnaround time",
                  "2 designs at a time",
                  "All design categories",
                ],
                recommended: true,
              },
              {
                name: "Premium",
                price: "$199",
                description: "For agencies and large businesses",
                features: [
                  "Unlimited design requests",
                  "Priority 12-hour turnaround",
                  "3 designs at a time",
                  "All design categories",
                  "Unlimited revision rounds",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-card rounded-lg border p-6 flex flex-col ${
                  plan.recommended
                    ? "border-primary/50 shadow-md relative"
                    : ""
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                      Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.recommended ? "default" : "outline"}
                  className="w-full mt-auto"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-bold text-primary">Tareffa Design Hub</p>
              <p className="text-muted-foreground">Professional design services on demand</p>
            </div>
            <div className="flex gap-8">
              <div>
                <h3 className="font-semibold mb-2">Company</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Legal</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Tareffa Design Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
