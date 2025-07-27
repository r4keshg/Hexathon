
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Clan {
  id: string;
  name: string;
}

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  clans: Clan[];
  defaultClanId?: string;
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ 
  isOpen, 
  onClose, 
  clans,
  defaultClanId
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedClanId, setSelectedClanId] = useState(defaultClanId || '');
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
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your post.",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter content for your post.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedClanId) {
      toast({
        title: "Error",
        description: "Please select a clan for your post.",
        variant: "destructive"
      });
      return;
    }

    if (tags.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one tag for your post.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send the post data to the server
    console.log('Creating post:', { title, content, clanId: selectedClanId, tags });
    
    toast({
      title: "Success",
      description: "Your post has been created successfully!",
    });
    
    // Reset form and close dialog
    setTitle('');
    setContent('');
    setSelectedClanId(defaultClanId || '');
    setTags([]);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
          <DialogDescription>
            Share your knowledge, ask questions, or start a discussion.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="post-title">Title</Label>
            <Input
              id="post-title"
              placeholder="Enter a descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="post-clan">Clan</Label>
            <Select 
              value={selectedClanId} 
              onValueChange={setSelectedClanId}
              disabled={!!defaultClanId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a clan" />
              </SelectTrigger>
              <SelectContent>
                {clans.map((clan) => (
                  <SelectItem key={clan.id} value={clan.id}>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-brand-600" />
                      {clan.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="post-content">Content</Label>
            <Textarea
              id="post-content"
              placeholder="Share your thoughts or questions..."
              className="min-h-[150px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="post-tags">Tags (required)</Label>
            <div className="flex">
              <Input
                id="post-tags"
                placeholder="Add tags (press Enter to add)"
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
                At least one tag is required for your post.
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
