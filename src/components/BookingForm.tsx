
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Clock, MapPin, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const locations = [
  "Málaga Airport",
  "Málaga City Center",
  "Torremolinos",
  "Benalmádena",
  "Fuengirola",
  "Marbella",
  "Puerto Banús",
  "Estepona",
  "Mijas",
  "Nerja",
  "Ronda"
];

const timeSlots = Array.from({ length: 24 * 4 }, (_, i) => {
  const hour = Math.floor(i / 4);
  const minute = (i % 4) * 15;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

const BookingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: new Date(),
    time: '12:00',
    passengers: '1',
    name: '',
    email: '',
    phone: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleChange = (field: string, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Submitted",
      description: "We've received your booking request. We'll contact you shortly to confirm your reservation.",
    });
    console.log("Booking data:", formData);
  };
  
  return (
    <section id="booking" className="py-24 bg-accent">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider text-primary-foreground bg-primary rounded-full">Book Your Ride</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Premium Transportation?
          </h2>
          <p className="text-lg text-muted-foreground">
            Complete the form below to book your private driver in Málaga.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-10">
            <div className="flex mb-8 justify-between relative">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all",
                      currentStep === step 
                        ? "bg-primary text-white" 
                        : currentStep > step 
                          ? "bg-green-500 text-white" 
                          : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {step}
                  </div>
                  <span className="text-sm font-medium hidden md:block">
                    {step === 1 ? "Ride Details" : step === 2 ? "Select Time" : "Contact Info"}
                  </span>
                </div>
              ))}
              
              {/* Progress line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-secondary">
                <div 
                  className="h-full bg-primary transition-all duration-300" 
                  style={{ width: `${(currentStep - 1) * 50}%` }}
                ></div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="pickupLocation" className="text-sm font-medium flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        Pickup Location
                      </label>
                      <Select 
                        value={formData.pickupLocation} 
                        onValueChange={(value) => handleChange('pickupLocation', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select pickup location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="dropoffLocation" className="text-sm font-medium flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        Dropoff Location
                      </label>
                      <Select 
                        value={formData.dropoffLocation} 
                        onValueChange={(value) => handleChange('dropoffLocation', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select dropoff location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="passengers" className="text-sm font-medium">
                        Number of Passengers
                      </label>
                      <Select 
                        value={formData.passengers} 
                        onValueChange={(value) => handleChange('passengers', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select number of passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    className="w-full rounded-lg"
                    onClick={nextStep}
                    disabled={!formData.pickupLocation || !formData.dropoffLocation}
                  >
                    Continue to Date & Time
                  </Button>
                </motion.div>
              )}
              
              {currentStep === 2 && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        Pickup Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {formData.date ? (
                              format(formData.date, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 pointer-events-auto">
                          <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={(date) => date && handleChange('date', date)}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className="rounded-md border p-3"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        Pickup Time
                      </label>
                      <Select 
                        value={formData.time} 
                        onValueChange={(value) => handleChange('time', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select pickup time" />
                        </SelectTrigger>
                        <SelectContent className="max-h-80">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="rounded-lg"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      className="rounded-lg"
                      onClick={nextStep}
                    >
                      Continue
                    </Button>
                  </div>
                </motion.div>
              )}
              
              {currentStep === 3 && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Booking Summary</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="text-muted-foreground">Pickup:</div>
                      <div>{formData.pickupLocation}</div>
                      
                      <div className="text-muted-foreground">Dropoff:</div>
                      <div>{formData.dropoffLocation}</div>
                      
                      <div className="text-muted-foreground">Date:</div>
                      <div>{format(formData.date, 'PP')}</div>
                      
                      <div className="text-muted-foreground">Time:</div>
                      <div>{formData.time}</div>
                      
                      <div className="text-muted-foreground">Passengers:</div>
                      <div>{formData.passengers}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="rounded-lg"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="rounded-lg"
                      disabled={!formData.name || !formData.email || !formData.phone}
                    >
                      <Send className="mr-2 h-4 w-4" /> Confirm Booking
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
