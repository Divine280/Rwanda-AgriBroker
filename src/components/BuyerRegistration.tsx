import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  MapPin, 
  Check,
  Package,
  Store
} from 'lucide-react';

interface BuyerData {
  // Personal Information
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  email: string;
  
  // Location
  province: string;
  district: string;
  sector: string;
  address: string;
  
  // Purchase Preferences
  productCategories: string[];
  estimatedMonthlyVolume: string;
  paymentMethods: string[];
}

const steps = [
  { id: 1, title: 'Personal Information', icon: User },
  { id: 2, title: 'Location & Delivery', icon: MapPin },
  { id: 3, title: 'Purchase Preferences', icon: Package },
  { id: 4, title: 'Review & Submit', icon: Check }
];

export function BuyerRegistration() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [buyerData, setBuyerData] = useState<BuyerData>({
    firstName: '',
    lastName: '',
    nationalId: '',
    phoneNumber: '',
    email: '',
    province: '',
    district: '',
    sector: '',
    address: '',
    productCategories: [],
    estimatedMonthlyVolume: '',
    paymentMethods: []
  });

  const updateBuyerData = (field: keyof BuyerData, value: any) => {
    setBuyerData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission here
    alert('Buyer registration submitted successfully! You will be redirected to verification.');
  };

  const progress = (currentStep / steps.length) * 100;

  const productCategories = [
    'Coffee', 'Tea', 'Maize', 'Rice', 'Beans', 'Potatoes', 
    'Bananas', 'Vegetables', 'Fruits', 'Dairy Products', 'Meat', 'Other'
  ];



  const paymentMethods = [
    'Bank Transfer', 'Mobile Money', 'Cash on Delivery', 'Credit Terms'
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t.firstName}</Label>
                <Input
                  id="firstName"
                  value={buyerData.firstName}
                  onChange={(e) => updateBuyerData('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t.lastName}</Label>
                <Input
                  id="lastName"
                  value={buyerData.lastName}
                  onChange={(e) => updateBuyerData('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nationalId">{t.nationalId}</Label>
              <Input
                id="nationalId"
                value={buyerData.nationalId}
                onChange={(e) => updateBuyerData('nationalId', e.target.value)}
                placeholder="Enter your national ID"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">{t.phoneNumber}</Label>
                <Input
                  id="phoneNumber"
                  value={buyerData.phoneNumber}
                  onChange={(e) => updateBuyerData('phoneNumber', e.target.value)}
                  placeholder="+250 xxx xxx xxx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={buyerData.email}
                  onChange={(e) => updateBuyerData('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Province</Label>
                <Select onValueChange={(value) => updateBuyerData('province', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kigali">Kigali</SelectItem>
                    <SelectItem value="Northern">Northern</SelectItem>
                    <SelectItem value="Southern">Southern</SelectItem>
                    <SelectItem value="Eastern">Eastern</SelectItem>
                    <SelectItem value="Western">Western</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>District</Label>
                <Input
                  value={buyerData.district}
                  onChange={(e) => updateBuyerData('district', e.target.value)}
                  placeholder="Enter district"
                />
              </div>
              <div className="space-y-2">
                <Label>Sector</Label>
                <Input
                  value={buyerData.sector}
                  onChange={(e) => updateBuyerData('sector', e.target.value)}
                  placeholder="Enter sector"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Delivery Address</Label>
              <Textarea
                value={buyerData.address}
                onChange={(e) => updateBuyerData('address', e.target.value)}
                placeholder="Enter detailed delivery address"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Product Categories of Interest</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {productCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      checked={buyerData.productCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateBuyerData('productCategories', [...buyerData.productCategories, category]);
                        } else {
                          updateBuyerData('productCategories', buyerData.productCategories.filter(c => c !== category));
                        }
                      }}
                    />
                    <Label className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Estimated Monthly Purchase Volume</Label>
              <Select onValueChange={(value) => updateBuyerData('estimatedMonthlyVolume', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select volume range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-1-ton">Less than 1 ton</SelectItem>
                  <SelectItem value="1-10-tons">1-10 tons</SelectItem>
                  <SelectItem value="10-50-tons">10-50 tons</SelectItem>
                  <SelectItem value="50-100-tons">50-100 tons</SelectItem>
                  <SelectItem value="more-than-100-tons">More than 100 tons</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <Label>Preferred Payment Methods</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox
                      checked={buyerData.paymentMethods.includes(method)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateBuyerData('paymentMethods', [...buyerData.paymentMethods, method]);
                        } else {
                          updateBuyerData('paymentMethods', buyerData.paymentMethods.filter(m => m !== method));
                        }
                      }}
                    />
                    <Label className="text-sm">{method}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-[#007749] rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Review Your Information</h3>
              <p className="text-gray-600">Please review all details before submitting your buyer registration.</p>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Name:</strong> {buyerData.firstName} {buyerData.lastName}</p>
                  <p><strong>National ID:</strong> {buyerData.nationalId}</p>
                  <p><strong>Phone:</strong> {buyerData.phoneNumber}</p>
                  <p><strong>Email:</strong> {buyerData.email}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Package className="w-5 h-5 mr-2" />
                    Purchase Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Product Categories:</strong> {buyerData.productCategories.join(', ')}</p>
                  <p><strong>Monthly Volume:</strong> {buyerData.estimatedMonthlyVolume}</p>
                  <p><strong>Payment Methods:</strong> {buyerData.paymentMethods.join(', ')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 mt-20 lg:mt-16">
          <div className="flex items-center justify-center space-x-2">
            <Store className="w-8 h-8 text-[#00AEEF]" />
            <h1 className="text-3xl font-bold text-gray-900">Buyer Registration</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our platform as a buyer to access quality agricultural products directly from Rwandan farmers.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-[#00AEEF]">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                step.id === currentStep
                  ? 'bg-[#00AEEF] text-white'
                  : step.id < currentStep
                  ? 'bg-[#007749] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <step.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{step.title}</span>
            </div>
          ))}
        </div>

        {/* Main Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6 text-[#00AEEF]" })}
              <span>{steps[currentStep - 1].title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <Separator />
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.previous}</span>
              </Button>

              {currentStep === steps.length ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-[#007749] hover:bg-green-700 text-white flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{t.submit}</span>
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="bg-[#00AEEF] hover:bg-blue-600 text-white flex items-center space-x-2"
                >
                  <span>{t.next}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}