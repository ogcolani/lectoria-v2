
import React, { useState, useRef } from 'react';
import { FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImagePlus, Loader2, Upload } from 'lucide-react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { analyzePhoto } from '@/services/photoAnalysisService';
import { useToast } from '@/components/ui/use-toast';

interface PhotoUploadProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ setValue }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (file: File) => {
    if (!file) return;

    try {
      setIsUploading(true);
      // Créer l'URL de prévisualisation
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      
      // Analyser la photo
      const analysisResults = await analyzePhoto(preview);
      console.log('Résultats de l\'analyse:', analysisResults);
      
      // Mettre à jour le formulaire avec les résultats
      setValue('hasGlasses', analysisResults.hasGlasses);
      setValue('heroGender', analysisResults.gender);

      toast({
        title: "Photo analysée avec succès",
        description: "Les caractéristiques du personnage ont été mises à jour.",
      });
      
    } catch (error) {
      console.error('Erreur lors du traitement de la photo:', error);
      toast({
        title: "Erreur lors de l'analyse",
        description: "Impossible d'analyser la photo. Vous pouvez toujours personnaliser manuellement.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileChange(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await handleFileChange(file);
    } else {
      toast({
        title: "Format non supporté",
        description: "Veuillez déposer une image (JPG, PNG, etc.)",
        variant: "destructive",
      });
    }
  };

  return (
    <FormItem className="space-y-4">
      <div className="space-y-2">
        <FormLabel>Photo de référence</FormLabel>
        <FormDescription>
          Importez une photo pour que l'IA personnalise automatiquement votre personnage
        </FormDescription>
      </div>

      <Card 
        className={`p-4 ${isDragging ? 'border-2 border-purple-500 bg-purple-50' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-48 rounded-lg object-cover"
              />
            ) : (
              <div 
                className="h-48 w-full max-w-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center p-4">
                  <Upload className="mx-auto h-8 w-8 text-purple-400" />
                  <p className="mt-2 text-sm text-gray-700 font-medium">Glissez une photo ici</p>
                  <p className="text-xs text-gray-500">ou cliquez pour en sélectionner une</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="bg-white hover:bg-purple-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <ImagePlus className="mr-2 h-4 w-4" />
                  {previewUrl ? 'Changer la photo' : 'Importer une photo'}
                </>
              )}
            </Button>
            <input
              ref={fileInputRef}
              id="photo-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </Card>
    </FormItem>
  );
};

export default PhotoUpload;
