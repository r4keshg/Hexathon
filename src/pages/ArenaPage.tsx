import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Compass, Play, FileText, CheckCircle, Plus } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import CourseForm from "@/components/CourseForm";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { triggerCourseCompletionConfetti } from "@/utils/confetti";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, doc, getDoc, updateDoc, addDoc, query, orderBy, where } from "firebase/firestore";

// Define the type for a module as it's stored in Firestore
type FirestoreModule = {
  id: string;
  title: string;
  content: string;
  youtube_url: string; // Stored as youtube_url in Firestore
  position: number;
  completedBy?: { [userId: string]: boolean }; // To track user-specific completion
  quizQuestions?: any[]; // To track quiz questions, fetched separately
};

type CourseItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  created_by: string;
  created_at: string;
  status: "published" | "draft";

  // These fields are not currently saved by CourseForm,
  // You will need to add inputs to CourseForm or provide default values
  instructor: { id: string; name: string };
  coverImage: string;
  rating: number; // e.g., default 0, can be updated later
  studentsCount: number; // e.g., default 0, can be updated later
  duration: string; // e.g., "5 hours" - should be added to CourseForm
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels"; // should be added to CourseForm
  category: string; // should be added to CourseForm
  isFeatured: boolean; // e.g., default false, admin-set
  isNew: boolean; // e.g., default true for a period, then false

  // Modules will be fetched and injected
  modules: (FirestoreModule & { isCompleted: boolean; type: "video" | "text" | "quiz" })[];
};


const ArenaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();

  // Firestore functions
  const getAllCourses = async (): Promise<CourseItem[]> => {
    const coursesQuery = query(
      collection(db, "courses"),
      where("status", "==", "published"),
      orderBy("created_at", "desc")
    );
    const querySnapshot = await getDocs(coursesQuery);
    
    const fetchedCourses: CourseItem[] = [];
    for (const docSnapshot of querySnapshot.docs) {
      const courseData = docSnapshot.data();
      const courseId = docSnapshot.id;

      // Fetch modules subcollection
      const modulesSnapshot = await getDocs(
        query(collection(db, "courses", courseId, "modules"), orderBy("position"))
      );
      const modules = modulesSnapshot.docs.map(moduleDoc => {
        const moduleData = moduleDoc.data() as FirestoreModule;
        // Determine type based on youtube_url or content
        const type: "video" | "text" | "quiz" = moduleData.youtube_url ? "video" : (moduleData.content ? "text" : "quiz");
        return {
          id: moduleDoc.id,
          ...moduleData,
          type: type, // Infer type from content
          isCompleted: user ? (moduleData.completedBy?.[user.uid] || false) : false, // Check if current user completed
          duration: "N/A" // You need to add duration to module creation in CourseForm if needed
        };
      });

      // Default/placeholder values for fields not yet captured by CourseForm
      fetchedCourses.push({
        id: courseId,
        ...courseData,
        instructor: { id: courseData.created_by, name: `User ${courseData.created_by.slice(0, 5)}` }, // Placeholder
        coverImage: "/placeholder.svg", // Placeholder
        rating: 0, // Placeholder
        studentsCount: 0, // Placeholder
        duration: "N/A", // Placeholder
        level: "All Levels", // Placeholder
        category: "General", // Placeholder
        isFeatured: false, // Placeholder
        isNew: true, // Placeholder (can be based on created_at for a short period)
        modules: modules // Injected modules
      } as CourseItem); // Cast to CourseItem
    }
    return fetchedCourses;
  };

  const getCourseById = async (id: string): Promise<CourseItem> => {
    const docRef = doc(db, "courses", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const courseData = docSnap.data();
      const courseId = docSnap.id;

      // Fetch modules subcollection
      const modulesSnapshot = await getDocs(
        query(collection(db, "courses", courseId, "modules"), orderBy("position"))
      );
      const modules = modulesSnapshot.docs.map(moduleDoc => {
        const moduleData = moduleDoc.data() as FirestoreModule;
        const type: "video" | "text" | "quiz" = moduleData.youtube_url ? "video" : (moduleData.content ? "text" : "quiz");
        return {
          id: moduleDoc.id,
          ...moduleData,
          type: type,
          isCompleted: user ? (moduleData.completedBy?.[user.uid] || false) : false,
          duration: "N/A" // You need to add duration to module creation in CourseForm if needed
        };
      });

      return {
        id: courseId,
        ...courseData,
        instructor: { id: courseData.created_by, name: `User ${courseData.created_by.slice(0, 5)}` },
        coverImage: "/placeholder.svg",
        rating: 0,
        studentsCount: 0,
        duration: "N/A",
        level: "All Levels",
        category: "General",
        isFeatured: false,
        isNew: true,
        modules: modules
      } as CourseItem;
    }
    throw new Error("Course not found");
  };

  const markModuleCompleted = async (courseId: string, moduleId: string, userId: string) => {
    const moduleRef = doc(db, "courses", courseId, "modules", moduleId);
    // Use FieldValue.arrayUnion or a map to track completion per user
    await updateDoc(moduleRef, {
      [`completedBy.${userId}`]: true // Mark as completed for this specific user
    });
    return true;
  };

  const getModuleComments = async (courseId: string, moduleId: string) => {
    const commentsSnapshot = await getDocs(
      query(collection(db, "courses", courseId, "modules", moduleId, "comments"), orderBy("createdAt", "desc"))
    );
    return commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  const addModuleComment = async (courseId: string, moduleId: string, userId: string, content: string) => {
    const newCommentData = { userId, content, createdAt: new Date().toISOString() };
    const docRef = await addDoc(collection(db, "courses", courseId, "modules", moduleId, "comments"), newCommentData);
    return { id: docRef.id, ...newCommentData };
  };

  // Load all courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        const dbCourses = await getAllCourses();
        setCourses(dbCourses);
      } catch (error) {
        console.error("Error loading courses:", error);
        toast({ title: "Error", description: "Failed to load courses.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    loadCourses();
  }, [user]); // Add user to dependency array to re-load courses if user changes (for completion status)

  // Select a course
  const handleCourseSelect = async (courseId: string) => {
    try {
      setIsLoading(true);
      const course = await getCourseById(courseId);
      setSelectedCourse(course);
      setSelectedModuleIndex(0);
      if (course.modules?.length > 0) loadModuleComments(courseId, course.modules[0].id);
      setActiveTab("course");
    } catch (error) {
      console.error("Error selecting course:", error);
      toast({ title: "Error", description: "Failed to load course details.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const loadModuleComments = async (courseId: string, moduleId: string) => {
    try {
      const moduleComments = await getModuleComments(courseId, moduleId);
      setComments(moduleComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  const handleModuleSelect = (index: number) => {
    if (!selectedCourse) return;
    setSelectedModuleIndex(index);
    // Reload comments for the newly selected module
    loadModuleComments(selectedCourse.id, selectedCourse.modules[index].id);
  };

  const handleCompleteModule = async () => {
    if (!user || !selectedCourse) {
      toast({ title: "Authentication Required", description: "Please log in to mark modules as complete.", variant: "destructive" });
      return;
    }
    const currentModule = selectedCourse.modules[selectedModuleIndex];
    if (!currentModule.id) {
        toast({ title: "Error", description: "Module ID is missing, cannot mark as complete.", variant: "destructive" });
        return;
    }
    
    try {
      await markModuleCompleted(selectedCourse.id, currentModule.id, user.uid);
      
      // Optimistically update UI
      const updatedModules = [...selectedCourse.modules];
      updatedModules[selectedModuleIndex] = { ...updatedModules[selectedModuleIndex], isCompleted: true };
      setSelectedCourse({ ...selectedCourse, modules: updatedModules });

      const allCompleted = updatedModules.every(module => module.isCompleted);
      if (allCompleted) {
        triggerCourseCompletionConfetti();
        toast({ title: "Course Completed!", description: "Congratulations on completing this course!" });
      } else {
        toast({ title: "Module Completed", description: "Great job! Keep going." });
      }
    } catch (error: any) {
      console.error("Error completing module:", error);
      toast({ title: "Error", description: error.message || "Failed to mark module as completed.", variant: "destructive" });
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedCourse || !newComment.trim()) {
      toast({ title: "Error", description: "Comment cannot be empty and you must be logged in.", variant: "destructive" });
      return;
    }
    const moduleId = selectedCourse.modules[selectedModuleIndex].id;
    if (!moduleId) {
        toast({ title: "Error", description: "Module ID is missing, cannot add comment.", variant: "destructive" });
        return;
    }

    try {
      const comment = await addModuleComment(selectedCourse.id, moduleId, user.uid, newComment);
      setComments([comment, ...comments]); // Add new comment to top
      setNewComment("");
      toast({ title: "Comment Posted", description: "Your comment has been added." });
    } catch (error: any) {
      console.error("Error adding comment:", error);
      toast({ title: "Error", description: error.message || "Failed to add comment.", variant: "destructive" });
    }
  };

  const formatYouTubeUrl = (url: string) => {
    if (!url) return "";
    // Regular expression to match various YouTube URL formats and extract the video ID
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    // Fallback for the specific googleusercontent.com format if that's what's stored
    const googleUserContentRegex = /googleusercontent\.com\/youtube\.com\/\d+\/([\w-]{11})/;
    const googleMatch = url.match(googleUserContentRegex);
    if (googleMatch && googleMatch[1]) {
      return `https://www.youtube.com/embed/${googleMatch[1]}`;
    }
    return ""; // Return empty string for invalid or unparseable URLs
  };


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Compass className="mr-2 h-8 w-8" /> Arena
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
          <TabsTrigger value="discover" className="text-lg">Discover</TabsTrigger>
          {selectedCourse && <TabsTrigger value="course" className="text-lg">Current Course</TabsTrigger>}
        </TabsList>

        {/* Discover Tab */}
        <TabsContent value="discover" className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Available Courses</h2>
            {user && (
              <Button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2">
                <Plus size={16} /> Create Course
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <AspectRatio ratio={16 / 9} className="bg-muted" />
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">No courses available yet. Create one!</p>
              ) : (
                courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <AspectRatio ratio={16 / 9}>
                      <img src={course.coverImage || "/placeholder.svg"} alt={course.title} className="object-cover w-full h-full" />
                    </AspectRatio>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        {course.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                      </div>
                      <CardDescription>By {course.instructor.name} • {course.modules?.length || 0} modules</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{course.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {course.tags?.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {course.duration} • {course.level}
                      </div>
                      <Button onClick={() => handleCourseSelect(course.id)}>View Course</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          )}
        </TabsContent>

        {/* Course Tab */}
        <TabsContent value="course">
          {selectedCourse && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
                    <CardDescription>By {selectedCourse.instructor.name} • {selectedCourse.level}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedCourse.modules[selectedModuleIndex] && (
                      <>
                        {selectedCourse.modules[selectedModuleIndex].type === 'video' && selectedCourse.modules[selectedModuleIndex].youtube_url ? (
                          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                            <iframe
                              src={formatYouTubeUrl(selectedCourse.modules[selectedModuleIndex].youtube_url)}
                              className="absolute top-0 left-0 w-full h-full"
                              allowFullScreen
                              title={selectedCourse.modules[selectedModuleIndex].title}
                            ></iframe>
                          </div>
                        ) : selectedCourse.modules[selectedModuleIndex].type === 'text' && selectedCourse.modules[selectedModuleIndex].content ? (
                          <div className="prose dark:prose-invert max-w-none">
                            <p>{selectedCourse.modules[selectedModuleIndex].content}</p>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">No content available for this module type.</div>
                        )}
                        <div className="flex justify-between items-center mt-6">
                          <div>
                            <h3 className="text-lg font-medium">{selectedCourse.modules[selectedModuleIndex].title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedCourse.modules[selectedModuleIndex].duration}</p>
                          </div>
                          {user && (
                            <Button
                              onClick={handleCompleteModule}
                              disabled={selectedCourse.modules[selectedModuleIndex].isCompleted}
                              className={selectedCourse.modules[selectedModuleIndex].isCompleted ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                              {selectedCourse.modules[selectedModuleIndex].isCompleted ? (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" /> Completed
                                </>
                              ) : (
                                "Mark as Completed"
                              )}
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Comments Section */}
                <Card>
                  <CardHeader><CardTitle className="text-xl">Discussion</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {user ? (
                      <form onSubmit={handleCommentSubmit} className="space-y-2">
                        <Textarea placeholder="Share your thoughts..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="min-h-24" />
                        <div className="flex justify-end">
                          <Button type="submit" disabled={!newComment.trim()}>Post Comment</Button>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <p>Please sign in to join the discussion</p>
                      </div>
                    )}
                    <div className="space-y-4 mt-6">
                      {comments.length > 0 ? comments.map((comment) => (
                        <div key={comment.id} className="border-b pb-4 last:border-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold">{comment.userId.charAt(0).toUpperCase()}</span>
                            </div>
                            <div>
                              <p className="font-medium">User {comment.userId.slice(0, 5)}</p>
                              <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <p className="text-sm ml-10">{comment.content}</p>
                        </div>
                      )) : (
                        <p className="text-center text-gray-500 italic">No comments yet.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader><CardTitle className="text-xl">Course Modules</CardTitle></CardHeader>
                  <CardContent>
                    {selectedCourse.modules.length > 0 ? (
                      selectedCourse.modules.map((module, index) => (
                        <div
                          key={module.id}
                          className={`p-3 rounded-lg cursor-pointer flex items-start gap-3 ${
                            selectedModuleIndex === index ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
                          } ${module.isCompleted ? "border-l-4 border-l-green-500" : ""}`}
                          onClick={() => handleModuleSelect(index)}
                        >
                          {module.type === "video" ? <Play className="h-5 w-5 mt-0.5 flex-shrink-0" /> : <FileText className="h-5 w-5 mt-0.5 flex-shrink-0" />}
                          <div className="flex-1">
                            <h3 className="font-medium">{module.title}</h3>
                            <p className="text-xs text-gray-500">{module.duration}</p>
                          </div>
                          {module.isCompleted && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />}
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 italic">No modules available for this course.</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-xl">About the Instructor</CardTitle></CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold">{selectedCourse.instructor.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedCourse.instructor.name}</h3>
                        <p className="text-sm text-gray-500">Course Creator</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Expert instructor with extensive experience in {selectedCourse.category}.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Course Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create a New Course</DialogTitle>
          </DialogHeader>
          <CourseForm onSuccess={() => { setIsCreateOpen(false); window.location.reload(); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArenaPage;