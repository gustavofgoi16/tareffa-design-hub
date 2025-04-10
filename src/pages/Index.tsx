
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  Award, 
  Infinity,
  Palette, 
  PenTool, 
  Eye, 
  FilePresentation, 
  Smartphone, 
  Workflow, 
  FolderArchive,
  AlignLeft
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Streamlined Design Services for Your Business
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-lg">
                Request professional designs anytime with our efficient service platform. Submit, track, and receive high-quality designs in one place.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
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
              <div className="rounded-lg bg-white/10 backdrop-blur-sm p-6 shadow-lg">
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

      {/* Key Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Discover Tareffa's Key Benefits</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              {
                title: "Unlimited Requests",
                icon: <Infinity className="h-8 w-8 mb-4" />
              },
              {
                title: "Faster Turnaround",
                icon: <Clock className="h-8 w-8 mb-4" />
              },
              {
                title: "Unlimited Revisions",
                icon: <CheckCircle className="h-8 w-8 mb-4" />
              },
              {
                title: "Dedicated Team",
                icon: <Users className="h-8 w-8 mb-4" />
              },
              {
                title: "Top 1% Designers",
                icon: <Award className="h-8 w-8 mb-4" />
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4"
              >
                {benefit.icon}
                <h3 className="font-medium text-lg">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How A Tareffa Subscription Works</h2>
            <p className="text-lg text-gray-600">
              Experience Seamless Design with Tareffa Subscription Model
            </p>
            <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                number: "01",
                title: "Submit Your Design Request",
                description:
                  "Submit requests via KIMP360's AI-guided form. Your Project Manager will review and update you on next steps."
              },
              {
                number: "02",
                title: "Work With Your Design Team",
                description:
                  "Your Project Manager and dedicated design team will work on your requests, keep you updated, and submit designs for your feedback."
              },
              {
                number: "03",
                title: "Review, Approve, Repeat",
                description:
                  "Review designs on KIMP360, provide feedback via comments, annotations or screen recordings. And then continue to submit unlimited new requests."
              }
            ].map((step, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="absolute -top-5 left-6 bg-black text-white text-xl font-bold py-1 px-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mt-4 mb-3">{step.title}</h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Design Services Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Unlock Unlimited Design Potential for Your Business</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Graphic Design",
                description: "We create graphics for branding and ad campaigns to amplify marketing efforts.",
                icon: <Palette className="h-8 w-8" />
              },
              {
                title: "Custom Illustrations",
                description: "Get custom illustrations from logos to experimental marketing concepts.",
                icon: <PenTool className="h-8 w-8" />
              },
              {
                title: "Visual Identity",
                description: "Don't have a visual identity? Let us know what you'd like and we'll create one for you.",
                icon: <Eye className="h-8 w-8" />
              },
              {
                title: "Presentations",
                description: "We create engaging designs for everything from pitch decks to corporate presentations.",
                icon: <FilePresentation className="h-8 w-8" />
              },
              {
                title: "Web & App Designs",
                description: "Stunning designs for user-friendly web and mobile applications.",
                icon: <Smartphone className="h-8 w-8" />
              }
            ].map((service, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 text-black">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 flex-grow">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Tareffa360 Platform Section */}
      <div className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Introducing TAREFFA360</h2>
            <p className="text-xl">
              Unlimited Designs, Effortless Management.<br />
              That's the TAREFFA Promise.
            </p>
            <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {[
              {
                title: "Streamlined Workflow with KIMP360",
                description: "KIMP360 is an AI-powered platform simplifying design requests with easy workflows, efficient feedback, and seamless organization to elevate projects effortlessly and enhance collaboration always.",
                icon: <Workflow className="h-10 w-10" />
              },
              {
                title: "Faster Design Management",
                description: "Make, manage, and collaborate on design requests quickly and easily in one centralized location. Get a 360° view, organized your way.",
                icon: <Clock className="h-10 w-10" />
              },
              {
                title: "Design Better, As A Team",
                description: "Invite as many collaborators as you'd like to help you make and manage design requests on KIMP360 with your Dedicated Design Team.",
                icon: <Users className="h-10 w-10" />
              },
              {
                title: "Brand Assets, In One Place",
                description: "Don't lose more time explaining your brand. Upload all your assets, and then attach them with just a few clicks when creating new design requests.",
                icon: <FolderArchive className="h-10 w-10" />
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex gap-6"
              >
                <div className="bg-white/10 p-3 rounded-lg h-fit">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your design process?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600">
            Join Tareffa today and experience unlimited design services with our professional team.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="bg-black text-white hover:bg-black/90"
          >
            Get Started Today
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-bold">Tareffa Design Hub</p>
              <p className="text-gray-600">Professional design services on demand</p>
            </div>
            <div className="flex gap-8">
              <div>
                <h3 className="font-semibold mb-2">Company</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-black">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black">Careers</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Legal</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-black">Privacy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Tareffa Design Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
