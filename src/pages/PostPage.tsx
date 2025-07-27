
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, MessageSquare, Share, BookmarkPlus, Reply, Shield, MoreHorizontal } from 'lucide-react';

// Mock post data
const mockPost = {
  id: '1',
  title: 'How to approach learning JavaScript in 2023?',
  content: `I've recently decided to pursue web development and I'm starting with JavaScript. There's so much information out there that it's overwhelming.

  Should I start with vanilla JS or jump straight into a framework? What resources would you recommend for a complete beginner? Any roadmap suggestions would be greatly appreciated!
  
  Also, how important is it to understand computer science fundamentals before diving deeper into JavaScript?`,
  author: 'webLearner',
  authorImage: '',
  clan: 'Web Development',
  clanId: '1',
  upvotes: 42,
  comments: 12,
  tags: ['JavaScript', 'Web Development', 'Learning'],
  createdAt: '2023-06-15T10:30:00Z',
};

// Mock comments
const mockComments = [
  {
    id: '1',
    author: 'devExpert',
    authorImage: '',
    content: 'Start with vanilla JS for sure. Understanding the fundamentals will make learning frameworks much easier later on.',
    createdAt: '2023-06-15T11:15:00Z',
    upvotes: 18,
    downvotes: 1,
    replies: [
      {
        id: '1-1',
        author: 'webLearner',
        authorImage: '',
        content: 'Thanks for the advice! Any specific resources you\'d recommend?',
        createdAt: '2023-06-15T11:45:00Z',
        upvotes: 3,
        downvotes: 0,
      },
      {
        id: '1-2',
        author: 'devExpert',
        authorImage: '',
        content: 'JavaScript.info and MDN docs are excellent free resources. "Eloquent JavaScript" is also a great book to start with.',
        createdAt: '2023-06-15T12:30:00Z',
        upvotes: 12,
        downvotes: 0,
      }
    ]
  },
  {
    id: '2',
    author: 'jsTeacher',
    authorImage: '',
    content: 'Computer science fundamentals are helpful but not strictly necessary when starting out. Focus on learning JavaScript well first, then gradually incorporate CS concepts as you progress.',
    createdAt: '2023-06-15T13:20:00Z',
    upvotes: 24,
    downvotes: 2,
    replies: []
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
};

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [showReplyInput, setShowReplyInput] = useState<Record<string, boolean>>({});
  
  const handleComment = () => {
    // In a real app, this would send the comment to the server
    console.log('Submitting comment:', commentText);
    setCommentText('');
  };
  
  const handleReply = (commentId: string) => {
    // In a real app, this would send the reply to the server
    console.log('Replying to comment', commentId, 'with text:', replyText[commentId]);
    setReplyText(prev => ({ ...prev, [commentId]: '' }));
    setShowReplyInput(prev => ({ ...prev, [commentId]: false }));
  };
  
  const toggleReplyInput = (commentId: string) => {
    setShowReplyInput(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <Link to="/tribe" className="text-brand-600 hover:text-brand-800 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Tribe
        </Link>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{mockPost.title}</CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback>{mockPost.author[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">Posted by <span className="font-medium">{mockPost.author}</span></span>
                <span className="mx-2">•</span>
                <Link to={`/clan/${mockPost.clanId}`} className="flex items-center text-sm text-brand-600 hover:underline">
                  <Shield className="h-3 w-3 mr-1" />
                  {mockPost.clan}
                </Link>
                <span className="mx-2">•</span>
                <span className="text-sm">{formatDate(mockPost.createdAt)}</span>
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none text-gray-700 whitespace-pre-line">
            {mockPost.content}
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {mockPost.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-gray-50">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="flex space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-600">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{mockPost.upvotes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-600">
              <ThumbsDown className="h-4 w-4 mr-1" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-500">
              <BookmarkPlus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {mockComments.length} Comments
        </h3>
        
        <div className="mb-6">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleComment} 
              disabled={!commentText.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          {mockComments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex items-start mb-2">
                <Avatar className="h-8 w-8 mr-3 mt-1">
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium">{comment.author}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="h-8 text-gray-500 hover:text-brand-600">
                      <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                      <span className="text-xs">{comment.upvotes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-gray-500 hover:text-brand-600">
                      <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                      <span className="text-xs">{comment.downvotes}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-gray-500 hover:text-brand-600"
                      onClick={() => toggleReplyInput(comment.id)}
                    >
                      <Reply className="h-3.5 w-3.5 mr-1" />
                      <span className="text-xs">Reply</span>
                    </Button>
                  </div>
                  
                  {showReplyInput[comment.id] && (
                    <div className="mt-3">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyText[comment.id] || ''}
                        onChange={(e) => setReplyText(prev => ({ ...prev, [comment.id]: e.target.value }))}
                        className="mb-2 text-sm"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleReplyInput(comment.id)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleReply(comment.id)}
                          disabled={!replyText[comment.id]?.trim()}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-11 mt-4 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                      <div className="flex items-start">
                        <Avatar className="h-7 w-7 mr-2 mt-1">
                          <AvatarFallback>{reply.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-sm">{reply.author}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                          </div>
                          <p className="text-sm text-gray-700">{reply.content}</p>
                          <div className="mt-1 flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="h-7 text-gray-500 hover:text-brand-600">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span className="text-xs">{reply.upvotes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-gray-500 hover:text-brand-600">
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              <span className="text-xs">{reply.downvotes}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
