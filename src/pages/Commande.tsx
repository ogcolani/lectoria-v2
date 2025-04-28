
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { useLectoriaStore } from '@/store/useLectoriaStore';
import OrderDetails from '@/components/order/OrderDetails';
import { Form } from '@/components/ui/form';
import DeliveryForm from '@/components/order/DeliveryForm';
import PaymentSummary from '@/components/order/PaymentSummary';
import { handlePayment } from '@/services/paymentService';
import { useToast } from '@/components/ui/use-toast';
import { sendConfirmationEmail } from '@/services/emailService';
import { generatePDFfromStory } from '@/services/pdfService';

// Order form validation schema
export const orderFormSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  format: z.enum(['pdf', 'papier', 'premium'], { 
    required_error: "Veuillez sélectionner un format" 
  }),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }).superRefine((data, ctx) => {
    // Conditional validation: address required if format != pdf
    const needsAddress = useFormData?.format !== 'pdf';
    if (needsAddress) {
      if (!data.street || data.street.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "L'adresse est requise et doit contenir au moins 5 caractères",
          path: ['street'],
        });
      }
      if (!data.city || data.city.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La ville est requise",
          path: ['city'],
        });
      }
      if (!data.postalCode || data.postalCode.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Le code postal est requis",
          path: ['postalCode'],
        });
      }
      if (!data.country || data.country.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Le pays est requis",
          path: ['country'],
        });
      }
    }
  }),
});

// Variable to store form data value for conditional validation
let useFormData: z.infer<typeof orderFormSchema> | null = null;

type OrderFormValues = z.infer<typeof orderFormSchema>;

const Commande = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { fullStory, heroName, illustrationUrl, illustrations, setProgress } = useLectoriaStore();
  
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      format: 'papier',
      address: {
        street: '',
        city: '',
        postalCode: '',
        country: 'France',
      },
    },
  });
  
  // Watch format field changes
  const watchFormat = form.watch('format');
  useFormData = form.getValues();
  
  React.useEffect(() => {
    // Update progress for this step
    setProgress(90);
    // Force revalidation when format changes
    form.trigger();
  }, [setProgress, watchFormat, form]);
  
  const onSubmit = async (data: OrderFormValues) => {
    try {
      // Simulate payment process
      const paymentResult = await handlePayment({
        amount: watchFormat === 'pdf' ? 9.99 : (watchFormat === 'premium' ? 29.99 : 19.99),
        currency: 'EUR',
        description: `Livre personnalisé - ${heroName}`,
        customerEmail: data.email,
        customerName: `${data.firstName} ${data.lastName}`
      });
      
      if (paymentResult.success) {
        // Generate PDF if needed
        const pdfUrl = watchFormat === 'pdf' || watchFormat === 'premium' 
          ? await generatePDFfromStory(fullStory, heroName, illustrations || [illustrationUrl])
          : null;
        
        // Send confirmation email
        await sendConfirmationEmail({
          recipientName: data.firstName,
          recipientEmail: data.email,
          orderDetails: {
            heroName,
            format: watchFormat,
            pdfUrl
          }
        });
        
        // Save order data in store if needed
        
        // Redirect to confirmation page
        navigate('/commande-confirmee', { 
          state: { 
            orderData: data, 
            format: watchFormat, 
            pdfUrl 
          } 
        });
      } else {
        toast({
          title: "Erreur de paiement",
          description: paymentResult.error || "Une erreur s'est produite lors du paiement",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Erreur lors du processus de commande:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du traitement de votre commande",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Finaliser ta commande
          </span>
        </h1>
        
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
            <span>Étape 6 sur 6</span>
            <span>{90}% complété</span>
          </div>
          <Progress value={90} className="h-2 bg-gray-200" />
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    Informations personnelles
                  </h2>
                  <DeliveryForm 
                    control={form.control} 
                    showAddressFields={watchFormat !== 'pdf'} 
                    errors={form.formState.errors}
                  />
                </div>
              </div>
              
              <div className="md:col-span-1">
                <OrderDetails />
                <PaymentSummary format={watchFormat} isSubmitting={form.formState.isSubmitting} />
              </div>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Commande;
