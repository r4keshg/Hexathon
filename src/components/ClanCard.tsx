
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Shield } from 'lucide-react';

interface ClanProps {
  clan: {
    id: string;
    name: string;
    description: string;
    members: number;
    posts: number;
    tags: string[];
    isJoined: boolean;
  };
}

const ClanCard: React.FC<ClanProps> = ({ clan }) => {
  const [isJoined, setIsJoined] = React.useState(clan.isJoined);
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <Link to={`/clan/${clan.id}`}>
              <CardTitle className="text-xl hover:text-brand-600 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-brand-600" />
                {clan.name}
              </CardTitle>
            </Link>
          </div>
          <Button 
            variant={isJoined ? "outline" : "default"} 
            size="sm"
            onClick={() => setIsJoined(!isJoined)}
          >
            {isJoined ? 'Joined' : 'Join'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700">
          {clan.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {clan.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-gray-50">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between w-full text-sm text-gray-500">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{clan.members.toLocaleString()} members</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{clan.posts.toLocaleString()} posts</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClanCard;
