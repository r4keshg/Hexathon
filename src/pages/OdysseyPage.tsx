import React, { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, Users, Clock, Award, Calendar, 
  Plus, Check, Star, Youtube, 
  FileText, BarChart2, PenTool, User, Shield,
  Settings, ArrowRight, Flame, Lightbulb, Trash,
  Trophy, CheckCircle, TrendingUp, Zap
} from "lucide-react";
import StreakCalendar from "@/components/StreakCalendar";
import QuoteDisplay from "@/components/QuoteDisplay";
import CourseForm from "@/components/CourseForm";
import { useAuth } from '@/hooks/use-auth';
import { triggerOdysseyConfetti } from '@/utils/confetti';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  modules: number;
  image: string;
  tags: string[];
  status: 'not-started' | 'in-progress' | 'completed';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
}

const OdysseyPage: React.FC = () => {
  // State from the first file for its Tabs (Dashboard, My Courses, Create Course, Admin Panel)
  const [activeTab, setActiveTab] = useState("dashboard");
  // Authentication and profile from the second file
  const { user, profile } = useAuth();

  // Trigger new updated confetti style on page load
  useEffect(() => {
    triggerOdysseyConfetti();
  }, []);

  // Sample courses data (file2)
  const sampleCourses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming with JavaScript',
      progress: 100,
      modules: 10,
      image: '/placeholder.svg',
      tags: ['Beginner', 'Programming', 'JavaScript'],
      status: 'completed'
    },
    {
      id: '2',
      title: 'Web Development Fundamentals',
      description: 'Master HTML, CSS and JavaScript',
      progress: 60,
      modules: 12,
      image: '/placeholder.svg',
      tags: ['Web', 'HTML', 'CSS'],
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'React for Beginners',
      description: 'Build modern UIs with React',
      progress: 25,
      modules: 8,
      image: '/placeholder.svg',
      tags: ['React', 'Frontend', 'JavaScript'],
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Data Structures & Algorithms',
      description: 'Essential computer science concepts',
      progress: 0,
      modules: 15,
      image: '/placeholder.svg',
      tags: ['Computer Science', 'Algorithms'],
      status: 'not-started'
    },
    {
      id: '5',
      title: 'Machine Learning Foundations',
      description: 'Introduction to ML concepts and tools',
      progress: 0,
      modules: 10,
      image: '/placeholder.svg',
      tags: ['AI', 'Python', 'Data Science'],
      status: 'not-started'
    }
  ];

  // Sample achievements (file2)
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed your first course',
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      unlocked: true,
      date: '2023-06-15'
    },
    {
      id: '2',
      title: 'Consistent Learner',
      description: 'Maintained a 7-day streak',
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      unlocked: true,
      date: '2023-07-02'
    },
    {
      id: '3',
      title: 'Knowledge Seeker',
      description: 'Completed 5 courses',
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      unlocked: false
    },
    {
      id: '4',
      title: 'Community Contributor',
      description: 'Published 3 blog posts',
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      unlocked: false
    }
  ];

  const completedCourses = sampleCourses.filter(course => course.status === 'completed');
  const ongoingCourses = sampleCourses.filter(course => course.status === 'in-progress');
  const popularCourses = [...sampleCourses].sort(() => Math.random() - 0.5).slice(0, 3);

  // CourseCard component from file2
  const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          {course.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {course.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={course.status === 'completed' ? 'outline' : 'default'}>
          {course.status === 'not-started'
            ? 'Start Learning'
            : course.status === 'in-progress'
            ? 'Continue Learning'
            : 'Review Course'}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-16">
      {/* -------------------- File1 Section -------------------- */}
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 bg-gradient-to-r from-brand-50 to-white p-6 rounded-lg border border-brand-100">
          <QuoteDisplay />
          <h1 className="text-3xl font-bold mt-4 text-brand-600">Welcome to your Odyssey</h1>
          <p className="text-gray-600">Your personal learning dashboard and control center</p>
        </div>
        
        <Tabs defaultValue="dashboard" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">
              <User className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="courses">
              <BookOpen className="h-4 w-4 mr-2" />
              My Courses
            </TabsTrigger>
            <TabsTrigger value="create">
              <PenTool className="h-4 w-4 mr-2" />
              Create Course
            </TabsTrigger>
            <TabsTrigger value="admin">
              <Shield className="h-4 w-4 mr-2" />
              Admin Panel
            </TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Award className="h-5 w-5 mr-2 text-brand-600" />
                    Coins Earned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">458</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Flame className="h-5 w-5 mr-2 text-orange-500" />
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">5 days</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="h-5 w-5 mr-2 text-brand-600" />
                    Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">8</p>
                  <p className="text-xs text-gray-500">3 in progress, 5 completed</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="h-5 w-5 mr-2 text-brand-600" />
                    Clan Admin
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">2</p>
                  <p className="text-xs text-gray-500">Web Dev, Python Masters</p>
                </CardContent>
              </Card>
            </div>

            {/* Streak Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-brand-600" />
                  Your Activity Streak
                </CardTitle>
                <CardDescription>Track your daily learning consistency</CardDescription>
              </CardHeader>
              <CardContent>
                <StreakCalendar />
              </CardContent>
              <CardFooter>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-sm bg-gray-200 mr-1"></div>
                    <span>Inactive</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-sm bg-brand-200 mr-1"></div>
                    <span>Light activity</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-sm bg-brand-400 mr-1"></div>
                    <span>Active</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-sm bg-brand-600 mr-1"></div>
                    <span>Very active</span>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Achievements & Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-brand-600" />
                  Achievements & Badges
                </CardTitle>
                <CardDescription>Rewards for your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center p-4 border rounded-lg bg-brand-50">
                    <div className="h-16 w-16 rounded-full bg-brand-100 flex items-center justify-center mb-2">
                      <Flame className="h-8 w-8 text-brand-600" />
                    </div>
                    <p className="font-medium text-center">7-Day Streak</p>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      <Flame className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="font-medium text-center text-gray-500">30-Day Streak</p>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg bg-brand-50">
                    <div className="h-16 w-16 rounded-full bg-brand-100 flex items-center justify-center mb-2">
                      <Award className="h-8 w-8 text-brand-600" />
                    </div>
                    <p className="font-medium text-center">Course Master</p>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg bg-brand-50">
                    <div className="h-16 w-16 rounded-full bg-brand-100 flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-brand-600" />
                    </div>
                    <p className="font-medium text-center">Clan Leader</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-brand-600" />
                  Current Courses
                </CardTitle>
                <CardDescription>Your active learning paths</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Advanced Web Development</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Updated 2 days ago</span>
                        </div>
                      </div>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                    <Progress value={65} className="h-2 mb-2" />
                    <div className="text-sm text-gray-500">65% complete - 3/5 modules</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Continue <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Data Science Fundamentals</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Updated yesterday</span>
                        </div>
                      </div>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                    <Progress value={25} className="h-2 mb-2" />
                    <div className="text-sm text-gray-500">25% complete - 1/4 modules</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Continue <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">View All Courses</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent
                </Button>
                <Button variant="outline" size="sm">
                  <Check className="h-4 w-4 mr-2" />
                  Completed
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                    <Youtube className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">
                        Course Title {i}
                      </CardTitle>
                      {i <= 3 ? (
                        <Badge variant="secondary">In Progress</Badge>
                      ) : (
                        <Badge>Completed</Badge>
                      )}
                    </div>
                    <CardDescription>Course description and overview</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <Progress value={i <= 3 ? 30 * i : 100} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm">
                      <span>{i <= 3 ? `${30 * i}% complete` : "Completed"}</span>
                      <span>{Math.ceil(i/2)}/4 modules</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      {i <= 3 ? "Continue Course" : "Review Course"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Create Course Tab */}
          <TabsContent value="create" className="space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create a New Course</h2>
            </div>
            <CourseForm />
          </TabsContent>
          
          {/* Admin Panel Tab */}
          <TabsContent value="admin" className="space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Admin Panel</h2>
            </div>
            
            <Tabs defaultValue="clans" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="clans">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Clans
                </TabsTrigger>
                <TabsTrigger value="content">
                  <FileText className="h-4 w-4 mr-2" />
                  Moderate Content
                </TabsTrigger>
                <TabsTrigger value="stats">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Platform Stats
                </TabsTrigger>
              </TabsList>
              
              {/* Clans Management */}
              <TabsContent value="clans" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Clan Administration</CardTitle>
                    <CardDescription>Manage the clans you've created</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Clan Name</TableHead>
                          <TableHead>Members</TableHead>
                          <TableHead>Posts</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Web Dev Masters</TableCell>
                          <TableCell>152</TableCell>
                          <TableCell>38</TableCell>
                          <TableCell>2 months ago</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Manage</Button>
                              <Button variant="outline" size="sm">Settings</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Python Enthusiasts</TableCell>
                          <TableCell>94</TableCell>
                          <TableCell>27</TableCell>
                          <TableCell>3 weeks ago</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Manage</Button>
                              <Button variant="outline" size="sm">Settings</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Clan
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Clan Activities</CardTitle>
                    <CardDescription>Recent posts and member requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src="/placeholder.svg" alt="User" />
                            <AvatarFallback>U1</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">New member request</p>
                            <p className="text-sm text-gray-500">UserName123 wants to join Web Dev Masters</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Accept</Button>
                          <Button variant="outline" size="sm">Decline</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src="/placeholder.svg" alt="User" />
                            <AvatarFallback>U2</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Post reported</p>
                            <p className="text-sm text-gray-500">Post "JavaScript Tips" has been reported 3 times</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Review</Button>
                          <Button variant="outline" size="sm" className="text-red-500">Hide</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Content Moderation */}
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Moderation</CardTitle>
                    <CardDescription>Review and moderate reported content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Content</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Reports</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">JavaScript Tips & Tricks</TableCell>
                          <TableCell>Post</TableCell>
                          <TableCell>3</TableCell>
                          <TableCell>user123</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                <Trash className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">React vs Vue 2023</TableCell>
                          <TableCell>Discussion</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>dev_pro</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                <Trash className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Platform Stats */}
              <TabsContent value="stats" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">1,245</p>
                      <p className="text-sm text-green-600">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Active Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">32</p>
                      <p className="text-sm text-green-600">+3 new this month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tribe Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">857</p>
                      <p className="text-sm text-gray-500">posts this month</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Overview</CardTitle>
                    <CardDescription>Key metrics of your platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-lg">
                      <p className="text-gray-500">Analytics charts will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>

      {/* -------------------- File2 Section -------------------- */}
      <div className="container mx-auto py-6 px-4 md:px-6">
        {/* Welcome section based on authentication */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {user ? `Welcome back, ${profile?.username || 'Learner'}!` : 'Start Your Learning Journey'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {user 
              ? `Continue your learning journey. Current streak: ${profile?.streak_days || 0} days` 
              : 'Track your progress, earn achievements, and join a community of learners'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main content area */}
          <div className="md:col-span-3 space-y-8">
            {/* Course sections */}
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sampleCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="ongoing" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ongoingCourses.length > 0 ? (
                    ongoingCourses.map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">You have no ongoing courses.</p>
                      <Button className="mt-4">Explore Courses</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedCourses.length > 0 ? (
                    completedCourses.map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">You haven't completed any courses yet.</p>
                      <Button className="mt-4">Start Learning</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="popular" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {user && profile ? (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Rank</p>
                      <p className="font-medium">{profile.rank}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Coins</p>
                      <p className="font-medium">{profile.coins}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="font-medium">{profile.completed_courses} courses</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Blogs Published</p>
                    <p className="font-medium">{profile.created_blogs}</p>
                  </div>
                  {profile.is_clan_admin && (
                    <Badge className="mt-2" variant="outline">Clan Admin</Badge>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Why Join vSkill?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-brand-500" />
                    <span>Track your learning progress</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-brand-500" />
                    <span>Earn achievements and badges</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-brand-500" />
                    <span>Build consistent learning habits</span>
                  </div>
                  <Button className="w-full" onClick={() => document.dispatchEvent(new CustomEvent('open-auth-dialog'))}>
                    Create Account
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Activity Streaks</CardTitle>
              </CardHeader>
              <CardContent>
                <StreakCalendar />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={`flex items-start p-2 rounded-md ${
                      achievement.unlocked 
                        ? 'bg-gray-50 dark:bg-gray-800' 
                        : 'opacity-50'
                    }`}
                  >
                    <div className="mr-3">{achievement.icon}</div>
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                      {achievement.unlocked && achievement.date && (
                        <p className="text-xs text-gray-400 mt-1">Unlocked: {new Date(achievement.date).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OdysseyPage;
