
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;
  
  if (!bookingData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Booking Information Not Found | Málaga Driver Hub</title>
          <meta name="description" content="Booking information not found. Please return to our homepage to book your private driver in Málaga." />
        </Helmet>
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">No Booking Information Found</h1>
            <p className="mb-6 text-muted-foreground">
              We couldn't find any booking information. This might happen if you accessed this page directly.
            </p>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const bookingDate = new Date(bookingData.dateTime);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Booking Confirmed | Private Driver Service in Málaga</title>
        <meta name="description" content="Your private driver booking in Málaga has been confirmed. Details about your airport transfer or custom tour are available in your confirmation." />
      </Helmet>
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6 bg-accent">
        <motion.div 
          className="glass-card rounded-2xl p-8 max-w-2xl w-full mx-auto shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Private Driver Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for booking with Málaga Driver Hub. Our professional drivers will provide you with safe and reliable transportation services.
            </p>
          </div>
          
          <div className="bg-background rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Private Driver Booking Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Pickup Location</p>
                <p className="font-medium">{bookingData.pickupLocation}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dropoff Location</p>
                <p className="font-medium">{bookingData.dropoffLocation}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium">{format(bookingDate, 'PPP')} at {format(bookingDate, 'p')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Passengers</p>
                <p className="font-medium">{bookingData.passengers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-background rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{bookingData.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{bookingData.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{bookingData.phone}</p>
              </div>
              {bookingData.specialRequests && (
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Special Requests</p>
                  <p className="font-medium">{bookingData.specialRequests}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              A confirmation email has been sent to {bookingData.email}. 
              If you have any questions about your private driver service, please contact us at +34 600 000 000.
            </p>
            <Button onClick={() => navigate('/')} size="lg">
              Return to Home
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
