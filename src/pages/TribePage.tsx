import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Users, TrendingUp, Clock, Award, PlusCircle, 
  MessageSquare, ThumbsUp, BookmarkPlus, Shield, Hash 
} from 'lucide-react';
import CreatePostDialog from '@/components/CreatePostDialog';
import CreateClanDialog from '@/components/CreateClanDialog';
import PostCard from '@/components/PostCard';
import ClanCard from '@/components/ClanCard';

// Mock data
const mockPosts = [
  {
    id: '1',
    title: 'How to approach learning JavaScript in 2023?',
    content: 'I\'m new to web development and want to learn JavaScript. What\'s the best approach?',
    author: 'webLearner',
    clan: 'Web Development',
    upvotes: 42,
    comments: 12,
    tags: ['JavaScript', 'Web Development', 'Learning'],
    timeAgo: '2 hours ago',
    isPinned: true
  },
  {
    id: '2',
    title: 'Share your favorite design resources!',
    content: 'Looking for good design resources. Share your favorites!',
    author: 'designerPro',
    clan: 'UI/UX Design',
    upvotes: 28,
    comments: 15,
    tags: ['Design', 'Resources', 'UI/UX'],
    timeAgo: '5 hours ago',
    isPinned: false
  },
  {
    id: '3',
    title: 'Machine Learning vs. Deep Learning: When to use what?',
    content: 'Let\'s discuss when ML is sufficient and when you should use deep learning...',
    author: 'dataScientist',
    clan: 'Data Science',
    upvotes: 35,
    comments: 8,
    tags: ['Machine Learning', 'Deep Learning', 'AI'],
    timeAgo: '1 day ago',
    isPinned: false
  },
];

const mockClans = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Everything related to web development, from HTML basics to advanced frameworks.',
    members: 1240,
    posts: 315,
    tags: ['JavaScript', 'HTML', 'CSS', 'React', 'Vue'],
    isJoined: true
  },
  {
    id: '2',
    name: 'UI/UX Design',
    description: 'A community for UI/UX designers to share work, get feedback and discuss trends.',
    members: 968,
    posts: 213,
    tags: ['Design', 'UI', 'UX', 'Figma'],
    isJoined: false
  },
  {
    id: '3',
    name: 'Data Science',
    description: 'Discuss data science concepts, tools, and methodologies.',
    members: 1502,
    posts: 428,
    tags: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization'],
    isJoined: false
  },
];

const TribePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateClanOpen, setIsCreateClanOpen] = useState(false);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">vSkill Tribe</h1>
        <p className="mt-2 text-lg text-gray-600">
          Connect, learn, and grow with our community of learners
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/tribe">
                    <Users className="mr-2 h-4 w-4" />
                    All Tribe Content
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Popular
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Recent
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="mr-2 h-4 w-4" />
                  Featured
                </Button>
              </CardContent>
              <CardHeader className="pb-2">
                <CardTitle>My Clans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockClans
                  .filter(clan => clan.isJoined)
                  .map(clan => (
                    <Button key={clan.id} variant="ghost" className="w-full justify-start" asChild>
                      <Link to={`/clan/${clan.id}`}>
                        <Shield className="mr-2 h-4 w-4" />
                        {clan.name}
                      </Link>
                    </Button>
                  ))}
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-brand-600"
                  onClick={() => setIsCreateClanOpen(true)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Clan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-9">
          <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search posts, discussions, clans..."
                className="pl-10"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => setIsCreatePostOpen(true)} 
              className="shrink-0"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </div>
          
          <Tabs defaultValue="all-posts">
            <TabsList className="mb-6">
              <TabsTrigger value="all-posts">All Posts</TabsTrigger>
              <TabsTrigger value="explore-clans">Explore Clans</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all-posts" className="space-y-6">
              {mockPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>
            
            <TabsContent value="explore-clans" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockClans.map(clan => (
                <ClanCard key={clan.id} clan={clan} />
              ))}
            </TabsContent>
            
            <TabsContent value="popular" className="space-y-6">
              {mockPosts
                .sort((a, b) => b.upvotes - a.upvotes)
                .map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Dialogs */}
      <CreatePostDialog 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)} 
        clans={mockClans}
      />
      
      <CreateClanDialog
        isOpen={isCreateClanOpen}
        onClose={() => setIsCreateClanOpen(false)}
      />
    </div>
  );
};

export default TribePage;