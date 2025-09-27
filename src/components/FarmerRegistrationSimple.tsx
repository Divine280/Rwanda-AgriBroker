import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { User, Sprout, CheckCircle } from 'lucide-react';

interface FarmerData {
  nationalId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function FarmerRegistrationSimple() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [farmerData, setFarmerData] = useState<FarmerData>({
    nationalId: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const totalSteps = 2;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return farmerData.nationalId && farmerData.firstName && farmerData.lastName;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    alert('Registration submitted successfully!');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-[#007749] mx-auto mb-3" />
              <h3 className="text-xl font-semibold">{t.personalInformation}</h3>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nationalId">
                  <span>{t.nationalId}</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nationalId"
                  placeholder="e.g., 1199780123456789"
                  value={farmerData.nationalId}
                  onChange={(e) => setFarmerData(prev => ({ ...prev, nationalId: e.target.value }))}
                  maxLength={16}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName">
                  <span>{t.firstName}</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="Jean"
                  value={farmerData.firstName}
                  onChange={(e) => setFarmerData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  <span>{t.lastName}</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Baptiste"
                  value={farmerData.lastName}
                  onChange={(e) => setFarmerData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.email} (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jean.baptiste@example.com"
                  value={farmerData.email}
                  onChange={(e) => setFarmerData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="w-12 h-12 text-[#007749] mx-auto mb-3" />
              <h3 className="text-xl font-semibold">{t.reviewSubmit}</h3>
              <p className="text-gray-600">Please review your information before submitting</p>
            </div>

            <div className="space-y-4">
              <Card className="border-[#007749]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-[#007749] flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{t.personalInformation}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p><strong>Name:</strong> {farmerData.firstName} {farmerData.lastName}</p>
                  <p><strong>National ID:</strong> {farmerData.nationalId}</p>
                  {farmerData.email && <p><strong>Email:</strong> {farmerData.email}</p>}
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
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-[#007749] rounded-lg p-3">
              <Sprout className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Join as a Farmer</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Welcome to AgriConnect Rwanda! Complete your registration to start connecting 
            with buyers and growing your agricultural business.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
            <Badge className="bg-[#007749] text-white">
              {Math.round(progressPercentage)}% Complete
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Main Form */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6 md:p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <span>Previous</span>
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
              className="bg-[#007749] hover:bg-green-700 flex items-center space-x-2"
            >
              <span>Next</span>
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!validateStep(currentStep)}
              className="bg-[#007749] hover:bg-green-700 flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Submit Registration</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}