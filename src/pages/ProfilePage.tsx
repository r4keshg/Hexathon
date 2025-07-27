// src/components/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User, Mail, Key, Lock, Upload, PenSquare, Check, Loader2
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/use-auth';
import { updatePassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/lib/firebaseConfig';

const ProfilePage: React.FC = () => {
  const { user, updateProfile, isLoading: authLoading } = useAuth();

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('Full-stack developer with a passion for learning and teaching.');
  const [avatarUrl, setAvatarUrl] = useState('/placeholder.svg');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || '');
      setName(user.displayName || '');
      setEmail(user.email || '');
      setAvatarUrl(user.photoURL || '/placeholder.svg');
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile({ displayName: name });
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
    }
    if (!user) return;
    setIsUpdating(true);
    try {
      await updatePassword(user, newPassword);
      toast({ title: "Password updated", description: "Your password has been changed successfully." });
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({ title: "Error updating password", description: error.message, variant: "destructive" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setIsUploading(true);
    try {
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      await updateProfile({ photoURL: downloadURL });
      setAvatarUrl(downloadURL);
      toast({ title: "Avatar updated", description: "Your profile picture has been updated successfully." });
    } catch (error: any) {
      toast({ title: "Error uploading avatar", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  if (authLoading) return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-2xl font-semibold mb-4">You are not logged in</h2>
        <Button onClick={() => document.dispatchEvent(new CustomEvent('open-auth-dialog'))}>Login / Sign Up</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-50">My Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700">
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PenSquare className="h-4 w-4" />}
                  <input id="avatar-upload" type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} disabled={isUploading} />
                </label>
              </div>
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-gray-500 text-sm">@{username}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 text-center">{bio}</p>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                        Change Password
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;