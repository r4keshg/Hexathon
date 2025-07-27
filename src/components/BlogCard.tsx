
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, Bookmark } from 'lucide-react';

interface BlogProps {
  blog: {
    id: string;
    title: string;
    summary: string;
    content: string;
    author: {
      name: string;
      avatar: string;
      bio: string;
    };
    publishedDate: string;
    readTime: string;
    tags: string[];
    imageUrl: string;
    likes: number;
    comments: number;
    bookmarks: number;
  };
}

const BlogCard: React.FC<BlogProps> = ({ blog }) => {
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src={blog.imageUrl} 
          alt={blog.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="bg-gray-50 dark:bg-gray-800">
              {tag}
            </Badge>
          ))}
        </div>
        <Link to={`/blog/${blog.id}`}>
          <h3 className="text-xl font-bold hover:text-brand-600 dark:hover:text-brand-400 line-clamp-2">
            {blog.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {blog.publishedDate} · {blog.readTime}
        </p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
          {blog.summary}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
            <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{blog.author.name}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-500 px-2">
            <ThumbsUp className="h-4 w-4" />
            <span className="ml-1 text-xs">{blog.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 px-2" asChild>
            <Link to={`/blog/${blog.id}`}>
              <MessageSquare className="h-4 w-4" />
              <span className="ml-1 text-xs">{blog.comments}</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 px-2">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
