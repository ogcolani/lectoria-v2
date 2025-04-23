
import { simulateNetworkDelay } from '@/utils/helpers';

interface EmailParams {
  recipientName: string;
  recipientEmail: string;
  orderDetails: {
    heroName: string;
    format: string;
    pdfUrl: string | null;
  };
}

/**
 * Simule l'envoi d'un email de confirmation
 * Cette fonction est conçue pour être facilement remplacée par une intégration avec SendGrid ou Mailjet
 */
export const sendConfirmationEmail = async (params: EmailParams): Promise<boolean> => {
  console.log('Simulating email sending:', params);
  
  // Simuler un délai réseau pour l'expérience utilisateur
  await simulateNetworkDelay(1000);
  
  // Construire le contenu de l'email (pour la simulation)
  const emailContent = {
    to: params.recipientEmail,
    subject: `Commande confirmée : Histoire personnalisée de ${params.orderDetails.heroName}`,
    body: `
      Bonjour ${params.recipientName},
      
      Nous vous remercions pour votre commande d'un livre personnalisé pour ${params.orderDetails.heroName}.
      
      Format: ${params.orderDetails.format === 'pdf' ? 'PDF Digital' : 
               params.orderDetails.format === 'premium' ? 'Pack Premium' : 'Livre papier'}
      
      ${params.orderDetails.pdfUrl ? `Vous pouvez télécharger votre PDF ici: ${params.orderDetails.pdfUrl}` : ''}
      
      ${params.orderDetails.format !== 'pdf' ? 'Votre livre sera expédié dans les 2 jours ouvrés.' : ''}
      
      Cordialement,
      L'équipe Lectoria
    `
  };
  
  console.log('Email content prepared:', emailContent);
  
  // Dans une implémentation réelle, nous appellerions un service comme SendGrid ou Mailjet
  // Pour l'instant, nous simulons un succès
  return true;
};

/**
 * Préparation pour l'intégration future avec SendGrid ou Mailjet
 * Commenté pour l'instant car nous utilisons la simulation
 */
/*
export const sendEmailWithService = async (params: EmailParams) => {
  try {
    // Cette partie serait généralement gérée par une fonction edge/serverless
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    const result = await response.json();
    
    return result.success;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
*/
