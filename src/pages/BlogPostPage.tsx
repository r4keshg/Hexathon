
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ThumbsUp, MessageSquare, Bookmark, Share, 
  Clock, Calendar, ChevronUp, ChevronDown, Reply, Flag
} from 'lucide-react';

// Mock data for a single blog post
const mockBlog = {
  id: '1',
  title: 'Getting Started with React: A Beginner\'s Guide',
  content: `
    <p>React is a popular JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience. React allows developers to create large web applications that can update and render efficiently in response to data changes.</p>
    
    <h2>Why React?</h2>
    <p>React was created by Jordan Walke, a software engineer at Facebook, and was first deployed on Facebook's News Feed in 2011 and later on Instagram in 2012. It was open-sourced at JSConf US in May 2013.</p>
    
    <p>React offers several advantages over other frameworks:</p>
    <ul>
      <li>Component-Based Architecture</li>
      <li>Virtual DOM for Better Performance</li>
      <li>Unidirectional Data Flow</li>
      <li>Strong Community Support</li>
      <li>React Native for Mobile Development</li>
    </ul>
    
    <h2>Setting Up Your First React Project</h2>
    <p>The easiest way to get started with React is to use Create React App, a command-line tool that helps you set up a new React project without having to configure build tools like webpack or Babel.</p>
    
    <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>
    
    <p>This will create a new React application in a folder called "my-app", install all the necessary dependencies, and start a development server on http://localhost:3000.</p>
    
    <h2>Creating Your First Component</h2>
    <p>React is all about components. A component is a self-contained module that renders some output. We can write a simple React component as follows:</p>
    
    <pre><code>import React from 'react';

function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}&lt;/h1&gt;;
}

export default Welcome;</code></pre>
    
    <p>This is a function component because it's written as a JavaScript function. React also supports class components, which were more common in older React applications.</p>
    
    <h2>Conclusion</h2>
    <p>This has been a brief introduction to React. There's much more to learn, including state management, lifecycle methods, hooks, and context. But hopefully, this has given you a starting point for your React journey.</p>
  `,
  author: {
    name: 'Alex Johnson',
    avatar: '/placeholder.svg',
    bio: 'Frontend Developer & React Enthusiast',
    followers: 1243
  },
  publishedDate: 'May 15, 2023',
  readTime: '8 min read',
  tags: ['React', 'JavaScript', 'Web Development', 'Frontend'],
  imageUrl: '/placeholder.svg',
  likes: 124,
  comments: [
    {
      id: 'c1',
      author: {
        name: 'Sarah Chen',
        avatar: '/placeholder.svg'
      },
      content: 'Great article! I\'ve been trying to learn React for a while now, and this is the clearest explanation I\'ve found so far.',
      timestamp: '3 days ago',
      likes: 15,
      replies: [
        {
          id: 'r1',
          author: {
            name: 'Alex Johnson',
            avatar: '/placeholder.svg',
            isAuthor: true
          },
          content: 'Thanks Sarah! I\'m glad you found it helpful.',
          timestamp: '2 days ago',
          likes: 5
        },
        {
          id: 'r2',
          author: {
            name: 'Miguel Hernandez',
            avatar: '/placeholder.svg'
          },
          content: 'I agree! Very clear and concise.',
          timestamp: '1 day ago',
          likes: 3
        }
      ]
    },
    {
      id: 'c2',
      author: {
        name: 'John Doe',
        avatar: '/placeholder.svg'
      },
      content: 'I would add that using hooks makes state management much easier in functional components.',
      timestamp: '2 days ago',
      likes: 8,
      replies: []
    }
  ]
};

const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [commentText, setCommentText] = useState('');
  const blog = mockBlog; // In a real app, you would fetch the blog by postId
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting comment:', commentText);
    // Add comment logic here
    setCommentText('');
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/blog" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 flex items-center">
          <span className="mr-2">←</span> Back to Blogs
        </Link>
      </div>
      
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">{blog.title}</h1>
        
        <div className="flex items-center mb-6">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
            <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-sm font-medium">{blog.author.name}</p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {blog.publishedDate}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {blog.readTime}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm">Follow</Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map(tag => (
            <Badge key={tag} variant="outline" className="bg-gray-50 dark:bg-gray-800">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="mb-6">
          <img 
            src={blog.imageUrl} 
            alt={blog.title}
            className="w-full h-auto rounded-lg object-cover aspect-video"
          />
        </div>
        
        <div className="mb-8" dangerouslySetInnerHTML={{ __html: blog.content }} />
        
        <div className="flex justify-between items-center border-t border-b py-4 mb-8">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{blog.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{blog.comments.length}</span>
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">About the Author</h2>
          <div className="flex items-start">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
              <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{blog.author.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{blog.author.bio}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{blog.author.followers} followers</p>
            </div>
          </div>
        </div>
      </article>
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6">Comments ({blog.comments.length})</h2>
        
        <form onSubmit={handleSubmitComment} className="mb-8">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[120px] mb-3"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!commentText.trim()}>
              Post Comment
            </Button>
          </div>
        </form>
        
        <div className="space-y-6">
          {blog.comments.map(comment => (
            <Card key={comment.id} className="overflow-visible">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{comment.author.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                <div className="flex items-center mt-3 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">{comment.likes}</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-sm">
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>
                
                {comment.replies.length > 0 && (
                  <div className="mt-4 pl-6 border-l-2 border-gray-100 dark:border-gray-800 space-y-4">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="pt-2">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                              <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center">
                                <p className="text-sm font-medium">{reply.author.name}</p>
                                {reply.author.isAuthor && (
                                  <Badge variant="outline" className="ml-2 text-xs py-0 px-1 bg-brand-50 text-brand-700 border-brand-200">
                                    Author
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{reply.timestamp}</p>
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{reply.content}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                            <span className="text-xs">{reply.likes}</span>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
