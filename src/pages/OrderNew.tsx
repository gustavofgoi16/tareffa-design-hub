
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowRight, UploadCloud } from "lucide-react";
import { File, Order, ServiceType } from "@/types";

interface FormValues {
  title: string;
  description: string;
  serviceType: ServiceType;
  // Step 2 fields (dynamic based on service type)
  brand_colors?: string;
  target_audience?: string;
  dimensions?: string;
  current_website?: string;
  logo_usage?: string;
  industry?: string;
  message?: string;
  platforms?: string;
}

const OrderNew = () => {
  const { user } = useAuth();
  const { createOrder, isLoading } = useOrders();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
  const selectedServiceType = watch("serviceType");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadingFiles(true);
      
      // In a real app, you would upload these files to a server or service
      // For now, we'll just simulate the upload and create File objects
      const files: File[] = Array.from(e.target.files).map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        url: URL.createObjectURL(file), // In a real app, this would be the URL from your upload service
        size: file.size,
        type: file.type,
        createdAt: new Date(),
      }));
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSelectedFiles([...selectedFiles, ...files]);
      setUploadingFiles(false);
    }
  };

  const removeFile = (id: string) => {
    setSelectedFiles(selectedFiles.filter(file => file.id !== id));
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (!user) return;
      
      const newOrder: Partial<Order> = {
        title: data.title,
        description: data.description,
        serviceType: data.serviceType,
        clientId: user.id,
        files: selectedFiles,
        briefingData: {
          // Include all relevant fields from step 2 based on service type
          brand_colors: data.brand_colors,
          target_audience: data.target_audience,
          dimensions: data.dimensions,
          current_website: data.current_website,
          logo_usage: data.logo_usage,
          industry: data.industry,
          message: data.message,
          platforms: data.platforms,
        }
      };
      
      await createOrder(newOrder);
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Render different form fields based on the service type
  const renderServiceTypeFields = () => {
    switch (selectedServiceType) {
      case "POST":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions/Format</Label>
              <Select {...register("dimensions")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dimensions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram_square">Instagram Square (1:1)</SelectItem>
                  <SelectItem value="instagram_story">Instagram Story (9:16)</SelectItem>
                  <SelectItem value="facebook">Facebook Post (16:9)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand_colors">Brand Colors (hex codes)</Label>
              <Input id="brand_colors" {...register("brand_colors")} placeholder="#ffffff, #000000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_audience">Target Audience</Label>
              <Input id="target_audience" {...register("target_audience")} placeholder="Young professionals" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Key Message</Label>
              <Textarea id="message" {...register("message")} placeholder="What's the main message for this post?" />
            </div>
          </>
        );
      case "WEBSITE":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="current_website">Current Website URL (if any)</Label>
              <Input id="current_website" {...register("current_website")} placeholder="https://example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry/Sector</Label>
              <Input id="industry" {...register("industry")} placeholder="Technology, Healthcare, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_audience">Target Audience</Label>
              <Input id="target_audience" {...register("target_audience")} placeholder="Young professionals" />
            </div>
            <div className="space-y-2">
              <Label>Website Purpose</Label>
              <RadioGroup defaultValue="information">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="information" id="information" />
                  <Label htmlFor="information">Information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ecommerce" id="ecommerce" />
                  <Label htmlFor="ecommerce">E-commerce</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="portfolio" id="portfolio" />
                  <Label htmlFor="portfolio">Portfolio</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="blog" id="blog" />
                  <Label htmlFor="blog">Blog</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        );
      case "LOGO":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry/Sector</Label>
              <Input id="industry" {...register("industry")} placeholder="Technology, Healthcare, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand_colors">Preferred Colors (hex codes)</Label>
              <Input id="brand_colors" {...register("brand_colors")} placeholder="#ffffff, #000000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo_usage">Logo Usage</Label>
              <Textarea
                id="logo_usage"
                {...register("logo_usage")}
                placeholder="Where will the logo be used? (web, print, signage, etc.)"
              />
            </div>
            <div className="space-y-2">
              <Label>Logo Style</Label>
              <RadioGroup defaultValue="modern">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="modern" id="modern" />
                  <Label htmlFor="modern">Modern/Minimalist</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="classic" id="classic" />
                  <Label htmlFor="classic">Classic/Traditional</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="playful" id="playful" />
                  <Label htmlFor="playful">Fun/Playful</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="luxury" id="luxury" />
                  <Label htmlFor="luxury">Luxury/Premium</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        );
      case "BRANDING":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry/Sector</Label>
              <Input id="industry" {...register("industry")} placeholder="Technology, Healthcare, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand_colors">Brand Colors (hex codes)</Label>
              <Input id="brand_colors" {...register("brand_colors")} placeholder="#ffffff, #000000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_audience">Target Audience</Label>
              <Input id="target_audience" {...register("target_audience")} placeholder="Young professionals" />
            </div>
            <div className="space-y-2">
              <Label>Brand Personality</Label>
              <RadioGroup defaultValue="professional">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional">Professional/Corporate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friendly" id="friendly" />
                  <Label htmlFor="friendly">Friendly/Approachable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="luxury" id="luxury" />
                  <Label htmlFor="luxury">Luxury/Premium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="innovative" id="innovative" />
                  <Label htmlFor="innovative">Innovative/Tech-forward</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        );
      case "SOCIAL_MEDIA":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="platforms">Platforms</Label>
              <Select {...register("platforms")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="all">All Platforms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand_colors">Brand Colors (hex codes)</Label>
              <Input id="brand_colors" {...register("brand_colors")} placeholder="#ffffff, #000000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_audience">Target Audience</Label>
              <Input id="target_audience" {...register("target_audience")} placeholder="Young professionals" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Key Message/Theme</Label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder="What's the main message or theme for these social media assets?"
              />
            </div>
          </>
        );
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="description">Additional Details</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Please describe what you need in detail"
              className="min-h-[150px]"
            />
          </div>
        );
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-container">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                placeholder="e.g., Instagram Post for Product Launch"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select
                onValueChange={(value) => {
                  // TypeScript needs a bit of help here
                  register("serviceType").onChange({
                    target: { value, name: "serviceType" },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
                defaultValue=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POST">Social Media Post</SelectItem>
                  <SelectItem value="WEBSITE">Website Design</SelectItem>
                  <SelectItem value="LOGO">Logo Design</SelectItem>
                  <SelectItem value="BRANDING">Brand Identity</SelectItem>
                  <SelectItem value="SOCIAL_MEDIA">Social Media Kit</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <p className="text-sm text-destructive">
                  {errors.serviceType.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Brief Description</Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Brief overview of what you need"
                className="min-h-[100px]"
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-container">
            <div className="space-y-1 mb-4">
              <h3 className="text-lg font-semibold">
                {selectedServiceType
                  ? selectedServiceType.replace("_", " ") + " Brief"
                  : "Project Brief"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Please provide more details specific to your project
              </p>
            </div>
            {renderServiceTypeFields()}
          </div>
        );
      case 3:
        return (
          <div className="step-container">
            <div className="space-y-1 mb-4">
              <h3 className="text-lg font-semibold">Upload Reference Files</h3>
              <p className="text-sm text-muted-foreground">
                Add any files that might help our designers (optional)
              </p>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-sm text-center text-muted-foreground mb-2">
                  Drag and drop files here or click to browse
                </p>
                <p className="text-xs text-center text-muted-foreground mb-4">
                  Supports images, PDFs, and design files (up to 10MB each)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  disabled={uploadingFiles}
                >
                  {uploadingFiles ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Choose Files"
                  )}
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uploaded Files</p>
                  <div className="space-y-2">
                    {selectedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between rounded-md border px-3 py-2"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex-shrink-0">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={file.url}
                                alt={file.name}
                                className="h-10 w-10 object-cover rounded"
                              />
                            ) : (
                              <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                                <span className="text-xs">{file.name.split('.').pop()}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm font-medium truncate max-w-[200px]">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout>
      <MainLayout>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">New Design Request</h1>
              <p className="text-muted-foreground">
                Create a new design order in a few simple steps
              </p>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      Step {currentStep} of 3: {currentStep === 1 ? "Basic Information" : currentStep === 2 ? "Project Brief" : "Upload Files"}
                    </CardTitle>
                    <CardDescription>
                      {currentStep === 1
                        ? "Provide basic information about your request"
                        : currentStep === 2
                        ? "Help us understand your project needs"
                        : "Add reference materials (optional)"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={`h-2 w-8 rounded ${currentStep === 1 ? "bg-primary" : "bg-muted"}`} />
                    <div className={`h-2 w-8 rounded ${currentStep === 2 ? "bg-primary" : "bg-muted"}`} />
                    <div className={`h-2 w-8 rounded ${currentStep === 3 ? "bg-primary" : "bg-muted"}`} />
                  </div>
                </div>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                  <div className="form-container">{renderStep()}</div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-6">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto"
                      disabled={
                        (currentStep === 1 &&
                          (!watch("title") || !watch("serviceType") || !watch("description")))
                      }
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-auto"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Order"
                      )}
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export default OrderNew;
