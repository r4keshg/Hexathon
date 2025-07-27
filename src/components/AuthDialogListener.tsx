
import React, { useEffect, useState } from 'react';
import AuthDialog from './AuthDialog';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';

const AuthDialogListener: React.FC = () => {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { isSupabaseReady } = useAuth();

  useEffect(() => {
    const handleOpenDialog = () => {
      if (!isSupabaseReady) {
        toast({
          title: "Authentication disabled",
          description: "Authentication is currently disabled because Supabase is not configured. Please set the required environment variables.",
          variant: "destructive",
        });
        return;
      }
      
      setIsAuthDialogOpen(true);
    };

    // Listen for custom event to open auth dialog
    document.addEventListener('open-auth-dialog', handleOpenDialog);

    return () => {
      document.removeEventListener('open-auth-dialog', handleOpenDialog);
    };
  }, [isSupabaseReady]);

  return (
    <AuthDialog 
      isOpen={isAuthDialogOpen} 
      onClose={() => setIsAuthDialogOpen(false)} 
    />
  );
};

export default AuthDialogListener;
