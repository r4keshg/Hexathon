import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: any;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.profiles?.avatar_url || "https://github.com/shadcn.png"} alt={post.profiles?.username || "User"} />
            <AvatarFallback>{post.profiles?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              By {post.profiles?.username || 'User'} - {new Date(post.created_at).toLocaleDateString()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
        <div className="mt-4">
          {post.tags && post.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        <Link to={`/post/${post.id}`}>
          View Comments ({post.comments ? post.comments.length : 0})
        </Link>
        {post.comments && post.comments.map((comment: any) => (
          <div key={comment.id} className="border-t pt-3 mt-3">
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {comment.profiles ? comment.profiles.username : 'User'}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm mt-1">{comment.content}</p>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
