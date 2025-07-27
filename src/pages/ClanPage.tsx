
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Users, PlusCircle, Shield, Settings, Info, Book, 
  MessageSquare, Calendar, Share, Bell, BellOff 
} from 'lucide-react';
import PostCard from '@/components/PostCard';
import CreatePostDialog from '@/components/CreatePostDialog';

// Mock clan data
const mockClan = {
  id: '1',
  name: 'Web Development',
  description: 'A community dedicated to all aspects of web development, from learning the basics to discussing advanced techniques and frameworks.',
  members: 1240,
  posts: 315,
  created: '2022-03-15',
  tags: ['JavaScript', 'HTML', 'CSS', 'React', 'Vue', 'Angular', 'Node.js', 'Frontend', 'Backend'],
  rules: [
    'Be respectful and constructive with feedback',
    'No spam or self-promotion without context',
    'Use appropriate tags for your posts',
    'Search before posting to avoid duplicates',
    'Format code snippets properly'
  ],
  moderators: ['webGuru', 'devMaster', 'codingCoach'],
  isJoined: true,
  isAdmin: false
};

// Mock posts data
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
    title: 'React 18 new features - what are you most excited about?',
    content: 'React 18 brings a lot of new features and improvements. Let\'s discuss what we\'re most excited about!',
    author: 'reactFan',
    clan: 'Web Development',
    upvotes: 35,
    comments: 8,
    tags: ['React', 'JavaScript', 'Frontend'],
    timeAgo: '1 day ago',
    isPinned: false
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox - when to use which?',
    content: 'I still struggle with deciding when to use CSS Grid and when to use Flexbox. Any guidelines?',
    author: 'cssNewbie',
    clan: 'Web Development',
    upvotes: 28,
    comments: 15,
    tags: ['CSS', 'Layout', 'Web Development'],
    timeAgo: '2 days ago',
    isPinned: false
  },
];

const ClanPage = () => {
  const { clanId } = useParams<{ clanId: string }>();
  const [searchValue, setSearchValue] = useState('');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(mockClan.isJoined);
  const [isNotified, setIsNotified] = useState(true);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/tribe" className="text-brand-600 hover:text-brand-800 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Tribe
        </Link>
      </div>
      
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-brand-100 rounded-lg p-3">
              <Shield className="h-8 w-8 text-brand-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                {mockClan.name}
              </h1>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span>{mockClan.members.toLocaleString()} members</span>
                <span className="mx-2">•</span>
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{mockClan.posts.toLocaleString()} posts</span>
                <span className="mx-2">•</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span>Created {new Date(mockClan.created).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsNotified(!isNotified)}
            >
              {isNotified ? (
                <Bell className="h-4 w-4 mr-1" />
              ) : (
                <BellOff className="h-4 w-4 mr-1" />
              )}
              {isNotified ? 'Notifications on' : 'Notifications off'}
            </Button>
            <Button 
              variant={isJoined ? "outline" : "default"} 
              size="sm"
              onClick={() => setIsJoined(!isJoined)}
            >
              {isJoined ? 'Leave Clan' : 'Join Clan'}
            </Button>
            {mockClan.isAdmin && (
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Manage
              </Button>
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            {mockClan.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {mockClan.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-gray-50">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="sticky top-20 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  About this Clan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Clan Rules</h4>
                  <ul className="text-sm space-y-2">
                    {mockClan.rules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="font-medium mr-2">{index + 1}.</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Moderators</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockClan.moderators.map((mod) => (
                      <Badge key={mod} variant="secondary">
                        {mod}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Helpful links and resources for web development:
                </p>
                <ul className="text-sm space-y-2">
                  <li>
                    <a href="#" className="text-brand-600 hover:underline">MDN Web Docs</a>
                  </li>
                  <li>
                    <a href="#" className="text-brand-600 hover:underline">Web Dev Roadmap 2023</a>
                  </li>
                  <li>
                    <a href="#" className="text-brand-600 hover:underline">Frontend Masters</a>
                  </li>
                  <li>
                    <a href="#" className="text-brand-600 hover:underline">CSS Tricks</a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-9 order-1 lg:order-2">
          <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search in this clan..."
                className="pl-10"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => setIsCreatePostOpen(true)} 
              className="shrink-0"
              disabled={!isJoined}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </div>
          
          <Tabs defaultValue="posts">
            <TabsList className="mb-6">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="space-y-6">
              {!isJoined && (
                <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-center">
                  <p className="text-gray-600 mb-2">Join this clan to create posts and participate in discussions.</p>
                  <Button onClick={() => setIsJoined(true)}>Join Clan</Button>
                </div>
              )}
              
              {mockPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>
            
            <TabsContent value="popular" className="space-y-6">
              {mockPosts
                .sort((a, b) => b.upvotes - a.upvotes)
                .map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
            </TabsContent>
            
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Web Development Resources</CardTitle>
                  <CardDescription>
                    A curated collection of useful resources for web developers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {['Documentation', 'Tutorials', 'Tools', 'Communities'].map((category) => (
                      <Card key={category}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {[1, 2, 3].map((i) => (
                              <li key={i} className="flex items-start">
                                <a href="#" className="text-brand-600 hover:underline">
                                  Sample {category.toLowerCase()} resource {i}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Dialogs */}
      <CreatePostDialog 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)} 
        clans={[mockClan]}
        defaultClanId={clanId}
      />
    </div>
  );
};

export default ClanPage;
