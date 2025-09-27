import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import { 
  User, 
  Phone, 
  MapPin, 
  Plus, 
  Trash2, 
  CheckCircle,
  Sprout,
  ArrowRight,
  ArrowLeft,
  Shield
} from 'lucide-react';

interface PhoneNumber {
  number: string;
  isWhatsApp: boolean;
  isPrimary: boolean;
}

interface FarmLocation {
  name: string;
  district: string;
  sector: string;
}

interface FarmerData {
  nationalId: string;
  firstName: string;
  lastName: string;
  phoneNumbers: PhoneNumber[];
  email: string;
  farmLocations: FarmLocation[];
  verified: boolean;
}

export function FarmerRegistration() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [farmerData, setFarmerData] = useState<FarmerData>({
    nationalId: '',
    firstName: '',
    lastName: '',
    phoneNumbers: [{ number: '', isWhatsApp: false, isPrimary: true }],
    email: '',
    farmLocations: [{ name: '', district: '', sector: '' }],
    verified: false
  });

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;



  const rwandanDistricts = [
    'Nyarugenge', 'Gasabo', 'Kicukiro', 'Nyanza', 'Gisagara', 'Nyaruguru',
    'Huye', 'Nyamagabe', 'Ruhango', 'Muhanga', 'Kamonyi', 'Karongi',
    'Rutsiro', 'Rubavu', 'Nyabihu', 'Ngororero', 'Rusizi', 'Nyamasheke',
    'Rulindo', 'Gakenke', 'Musanze', 'Burera', 'Gicumbi', 'Rwamagana',
    'Nyagatare', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Bugesera'
  ];

  const addPhoneNumber = () => {
    setFarmerData(prev => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, { number: '', isWhatsApp: false, isPrimary: false }]
    }));
  };

  const removePhoneNumber = (index: number) => {
    if (farmerData.phoneNumbers.length > 1) {
      setFarmerData(prev => ({
        ...prev,
        phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index)
      }));
    }
  };

  const updatePhoneNumber = (index: number, field: keyof PhoneNumber, value: string | boolean) => {
    setFarmerData(prev => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.map((phone, i) => {
        if (i === index) {
          return { ...phone, [field]: value };
        }
        // If setting this phone as primary, unset others
        if (field === 'isPrimary' && value === true) {
          return { ...phone, isPrimary: false };
        }
        return phone;
      })
    }));
  };



  const addFarmLocation = () => {
    setFarmerData(prev => ({
      ...prev,
      farmLocations: [...prev.farmLocations, { name: '', district: '', sector: '' }]
    }));
  };

  const removeFarmLocation = (index: number) => {
    if (farmerData.farmLocations.length > 1) {
      setFarmerData(prev => ({
        ...prev,
        farmLocations: prev.farmLocations.filter((_, i) => i !== index)
      }));
    }
  };

  const updateFarmLocation = (index: number, field: keyof FarmLocation, value: string) => {
    setFarmerData(prev => ({
      ...prev,
      farmLocations: prev.farmLocations.map((location, i) => 
        i === index ? { ...location, [field]: value } : location
      )
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return farmerData.nationalId && farmerData.firstName && farmerData.lastName && 
               farmerData.phoneNumbers.length > 0 && farmerData.phoneNumbers[0].number;
      case 2:
        return farmerData.farmLocations.length > 0 && farmerData.farmLocations[0].name && 
               farmerData.farmLocations[0].district && farmerData.farmLocations[0].sector;
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
    // Handle form submission here
    alert('Registration submitted successfully! You will be redirected to verification.');
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
                <Label htmlFor="nationalId" className="flex items-center space-x-2">
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
                <Label htmlFor="firstName" className="flex items-center space-x-2">
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
                <Label htmlFor="lastName" className="flex items-center space-x-2">
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{t.phoneNumber}</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addPhoneNumber}
                  className="text-[#007749] border-[#007749] hover:bg-[#007749] hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {t.add} {t.phoneNumber}
                </Button>
              </div>

              {farmerData.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-3 p-4 border rounded-lg">
                  <div className="flex-1">
                    <Input
                      placeholder="+250 788 123 456"
                      value={phone.number}
                      onChange={(e) => updatePhoneNumber(index, 'number', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`whatsapp-${index}`}
                        checked={phone.isWhatsApp}
                        onCheckedChange={(checked) => updatePhoneNumber(index, 'isWhatsApp', checked as boolean)}
                      />
                      <Label htmlFor={`whatsapp-${index}`} className="text-sm">WhatsApp</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`primary-${index}`}
                        checked={phone.isPrimary}
                        onCheckedChange={(checked) => updatePhoneNumber(index, 'isPrimary', checked as boolean)}
                      />
                      <Label htmlFor={`primary-${index}`} className="text-sm">Primary</Label>
                    </div>
                    {farmerData.phoneNumbers.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePhoneNumber(index)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 text-[#007749] mx-auto mb-3" />
              <h3 className="text-xl font-semibold">{t.farmLocations}</h3>
              <p className="text-gray-600">Tell us about your farming locations</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center space-x-2">
                  <Sprout className="w-4 h-4" />
                  <span>{t.farmLocations}</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addFarmLocation}
                  className="text-[#007749] border-[#007749] hover:bg-[#007749] hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Farm
                </Button>
              </div>

              {farmerData.farmLocations.map((location, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Farm Name</Label>
                      <Input
                        placeholder="e.g., Main Farm, Coffee Plantation"
                        value={location.name}
                        onChange={(e) => updateFarmLocation(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>District</Label>
                      <Select
                        value={location.district}
                        onValueChange={(value) => updateFarmLocation(index, 'district', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          {rwandanDistricts.map((district) => (
                            <SelectItem key={district} value={district}>{district}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Sector</Label>
                    <Input
                      placeholder="e.g., Matimba"
                      value={location.sector}
                      onChange={(e) => updateFarmLocation(index, 'sector', e.target.value)}
                    />
                  </div>

                  {farmerData.farmLocations.length > 1 && (
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFarmLocation(index)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Farm
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>


          </div>
        );

      case 3:
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
                  <p><strong>Phone:</strong> {farmerData.phoneNumbers[0].number}</p>
                  {farmerData.email && <p><strong>Email:</strong> {farmerData.email}</p>}
                </CardContent>
              </Card>



              <Card className="border-[#FFD100]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-900 flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{t.farmLocations}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  {farmerData.farmLocations.map((location, index) => (
                    <p key={index}>
                      <strong>{location.name}:</strong> {location.district} District, {location.sector} Sector
                    </p>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Alert className="border-[#007749] bg-green-50">
              <Shield className="h-4 w-4 text-[#007749]" />
              <AlertDescription className="text-[#007749]">
                <strong>Next Steps:</strong> After submission, our team will verify your information 
                within 24-48 hours. You'll receive an SMS notification once verification is complete.
              </AlertDescription>
            </Alert>
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
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
              className="bg-[#007749] hover:bg-green-700 flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
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

        {/* Support Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? Call our farmer support line: 
            <span className="font-semibold text-[#00AEEF]"> +250 788 123 456</span>
          </p>
        </div>
      </div>
    </div>
  );
}