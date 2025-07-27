import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, Bookmark, ThumbsUp, MessageSquare, Share, Plus, Image as ImageIcon
} from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import CreateBlogDialog from '@/components/CreateBlogDialog';

// Mock data for blogs
const mockBlogs = [
  {
    id: '1',
    title: 'Getting Started with React: A Beginner\'s Guide',
    summary: 'Learn the basics of React and start building your first components.',
    content: 'React is a popular JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience. React allows developers to create large web applications that can update and render efficiently in response to data changes...',
    author: {
      name: 'Ramalingam',
      avatar: '/placeholder.svg',
      bio: 'Frontend Developer & React Enthusiast'
    },
    publishedDate: 'May 15, 2023',
    readTime: '8 min read',
    tags: ['React', 'JavaScript', 'Web Development'],
    imageUrl: '/placeholder.svg',
    likes: 124,
    comments: 18,
    bookmarks: 32
  },
  {
    id: '2',
    title: 'Advanced TypeScript Techniques Every Developer Should Know',
    summary: 'Take your TypeScript skills to the next level with these advanced patterns and practices.',
    content: 'TypeScript has become the go-to language for many developers looking to add type safety to their JavaScript applications. In this article, we\'ll explore some advanced TypeScript techniques that can help you write more maintainable and robust code...',
    author: {
      name: 'Dr. Borah',
      avatar: '/placeholder.svg',
      bio: 'TypeScript Expert & Software Architect'
    },
    publishedDate: 'June 22, 2023',
    readTime: '12 min read',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    imageUrl: '/placeholder.svg',
    likes: 89,
    comments: 14,
    bookmarks: 45
  },
  {
    id: '3',
    title: 'Building Responsive UIs with Tailwind CSS',
    summary: 'Learn how to leverage Tailwind CSS to create beautiful, responsive user interfaces.',
    content: 'Tailwind CSS is a utility-first CSS framework that has gained immense popularity in recent years. Unlike traditional CSS frameworks like Bootstrap or Foundation, Tailwind doesn\'t provide predefined components. Instead, it gives you a set of utility classes that you can use to build your own custom designs...',
    author: {
      name: 'Dr. Vaigaran',
      avatar: '/placeholder.svg',
      bio: 'UI Designer & CSS Specialist'
    },
    publishedDate: 'July 5, 2023',
    readTime: '10 min read',
    tags: ['CSS', 'Tailwind', 'Design', 'UI/UX'],
    imageUrl: '/placeholder.svg',
    likes: 156,
    comments: 27,
    bookmarks: 64
  }
];

const BlogPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">101-Blogs</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Share knowledge, explore ideas, and learn from the community
        </p>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search blogs by title, author, or tag..."
            className="pl-10"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => setIsCreateBlogOpen(true)} 
          className="shrink-0"
        >
          <Plus className="mr-2 h-4 w-4" />
          Write a Blog
        </Button>
      </div>
      
      <Tabs defaultValue="featured">
        <TabsList className="mb-6">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured" className="space-y-8">
          {/* Featured Blog - Larger Card */}
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <img 
                  src={mockBlogs[0].imageUrl} 
                  alt={mockBlogs[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-6 md:p-0 md:pr-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {mockBlogs[0].tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/blog/${mockBlogs[0].id}`}>
                    <h2 className="text-2xl font-bold mb-2 hover:text-brand-600 dark:hover:text-brand-400">
                      {mockBlogs[0].title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {mockBlogs[0].content}
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={mockBlogs[0].author.avatar} alt={mockBlogs[0].author.name} />
                      <AvatarFallback>{mockBlogs[0].author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{mockBlogs[0].author.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {mockBlogs[0].publishedDate} · {mockBlogs[0].readTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex space-x-3">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{mockBlogs[0].likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-600" asChild>
                        <Link to={`/blog/${mockBlogs[0].id}`}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{mockBlogs[0].comments}</span>
                        </Link>
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Other Featured Blogs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBlogs.slice(1).map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="latest" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </TabsContent>
        
        <TabsContent value="popular" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...mockBlogs].sort((a, b) => b.likes - a.likes).map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </TabsContent>
      </Tabs>
      
      {/* Blog Creation Dialog */}
      <CreateBlogDialog 
        isOpen={isCreateBlogOpen} 
        onClose={() => setIsCreateBlogOpen(false)} 
      />
    </div>
  );
};

export default BlogPage;
