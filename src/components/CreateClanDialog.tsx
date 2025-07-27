
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Info, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateClanDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateClanDialog: React.FC<CreateClanDialogProps> = ({ 
  isOpen, 
  onClose
}) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your clan.",
        variant: "destructive"
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your clan.",
        variant: "destructive"
      });
      return;
    }

    if (tags.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one tag for your clan.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send the clan data to the server
    console.log('Creating clan:', { name, description, rules, tags });
    
    toast({
      title: "Success",
      description: "Your clan has been created successfully!",
    });
    
    // Reset form and close dialog
    setName('');
    setDescription('');
    setRules('');
    setTags([]);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-brand-600" />
            Create a New Clan
          </DialogTitle>
          <DialogDescription>
            Create a dedicated community space around a specific topic or interest.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="clan-name">Clan Name</Label>
            <Input
              id="clan-name"
              placeholder="Give your clan a descriptive name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clan-description">Description</Label>
            <Textarea
              id="clan-description"
              placeholder="Describe what your clan is about..."
              className="min-h-[80px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clan-rules">Community Rules (optional)</Label>
            <Textarea
              id="clan-rules"
              placeholder="Enter rules for your clan, one per line..."
              className="min-h-[80px]"
              value={rules}
              onChange={(e) => setRules(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              Clear rules help maintain a healthy and focused community.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clan-tags">Tags (required)</Label>
            <div className="flex">
              <Input
                id="clan-tags"
                placeholder="Add related topics (press Enter to add)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="mr-2"
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {tags.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Tags help others discover your clan. At least one tag is required.
              </p>
            )}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">As a clan creator, you'll have access to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Moderate posts and comments</li>
                <li>Pin important discussions</li>
                <li>Customize clan appearance</li>
                <li>Add additional moderators</li>
                <li>Set and enforce community rules</li>
              </ul>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create Clan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClanDialog;
