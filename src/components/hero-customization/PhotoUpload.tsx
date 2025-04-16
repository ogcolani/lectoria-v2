
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImagePlus, Loader2 } from 'lucide-react';
import { Control } from 'react-hook-form';

interface PhotoUploadProps {
  control: Control<any>;
}

const PhotoUpload: React.FC<PhotoUploadProps> = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      
      // TODO: Here we would process the image with AI
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FormItem className="space-y-4">
      <div className="space-y-2">
        <FormLabel>Photo de référence</FormLabel>
        <FormDescription>
          Importez une photo pour que l'IA s'en inspire pour créer le personnage
        </FormDescription>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex justify-center">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-48 rounded-lg object-cover"
              />
            ) : (
              <div className="h-48 w-full max-w-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <ImagePlus className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Aucune photo sélectionnée</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              disabled={isUploading}
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  <ImagePlus className="mr-2 h-4 w-4" />
                  {previewUrl ? 'Changer la photo' : 'Importer une photo'}
                </>
              )}
            </Button>
            <input
              id="photo-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </Card>
    </FormItem>
  );
};

export default PhotoUpload;
