
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash, Youtube, FileText, Check } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { db } from "@/lib/firebaseConfig"; // Assuming you're using Firestore
import { collection , addDoc } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";
import { triggerCreationConfetti } from '@/utils/confetti';

interface CourseFormProps {
  onSuccess?: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [modules, setModules] = useState([{ 
    title: '', 
    content: '',
    youtubeUrl: '',
    quizQuestions: [] as {question: string, options: string[], correctAnswer: number}[]
  }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddModule = () => {
    setModules([...modules, { 
      title: '', 
      content: '',
      youtubeUrl: '',
      quizQuestions: []
    }]);
  };

  const handleRemoveModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const handleModuleChange = (index: number, field: string, value: string) => {
    const updatedModules = [...modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setModules(updatedModules);
  };

  const handleAddQuestion = (moduleIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].quizQuestions.push({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
    setModules(updatedModules);
  };

  const handleQuestionChange = (
    moduleIndex: number, 
    questionIndex: number, 
    field: string, 
    value: string | number,
    optionIndex?: number
  ) => {
    const updatedModules = [...modules];
    if (field === 'option' && typeof optionIndex === 'number') {
      updatedModules[moduleIndex].quizQuestions[questionIndex].options[optionIndex] = value as string;
    } else if (field === 'correctAnswer') {
      updatedModules[moduleIndex].quizQuestions[questionIndex].correctAnswer = value as number;
    } else {
      updatedModules[moduleIndex].quizQuestions[questionIndex][field as 'question'] = value as string;
    }
    setModules(updatedModules);
  };

  const validateYoutubeUrl = (url: string): string => {
    if (!url.trim()) return '';
    
    // Handle various YouTube URL formats
    let videoId = '';
    
    // Format 1: youtube.com/watch?v=VIDEO_ID
    const regExp1 = /^.*youtube\.com\/watch\?v=([^&]+).*/;
    // Format 2: youtu.be/VIDEO_ID
    const regExp2 = /^.*youtu\.be\/([^?]+).*/;
    // Format 3: youtube.com/embed/VIDEO_ID
    const regExp3 = /^.*youtube\.com\/embed\/([^?]+).*/;
    
    let match = url.match(regExp1);
    
    if (match && match[1]) {
      videoId = match[1];
    } else {
      match = url.match(regExp2);
      if (match && match[1]) {
        videoId = match[1];
      } else {
        match = url.match(regExp3);
        if (match && match[1]) {
          videoId = match[1];
        }
      }
    }
    
    // If we found a valid video ID, return the proper embed URL
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // If it's not recognized as a YouTube URL, return empty
    // This allows the form validation to catch it
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user) {
    toast({
      title: "Authentication Required",
      description: "Please log in to create courses",
      variant: "destructive",
    });
    return;
  }

  if (!title.trim() || !description.trim() || tags.length === 0) {
    toast({
      title: "Error",
      description: "Please fill in all required fields",
      variant: "destructive",
    });
    return;
  }

  if (modules.some(module => !module.title.trim())) {
    toast({
      title: "Error",
      description: "All modules must have a title",
      variant: "destructive",
    });
    return;
  }

  const courseRef = await addDoc(collection(db, "courses"), {
  title,
  description,
  tags,
  created_by: user.uid,
  created_at: new Date().toISOString(),
  status: "published"  // <-- NEW
});


  for (const module of modules) {
    if (module.youtubeUrl.trim() && !validateYoutubeUrl(module.youtubeUrl)) {
      toast({
        title: "Error",
        description: `Invalid YouTube URL in module "${module.title}"`,
        variant: "destructive",
      });
      return;
    }
  }

  setIsSubmitting(true);

  try {
    // 1. Create the course
    const courseRef = await addDoc(collection(db, "courses"), {
      title,
      description,
      tags,
      created_by: user.uid,
      created_at: new Date().toISOString()
    });

    // 2. Create modules inside a subcollection
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const processedYoutubeUrl = validateYoutubeUrl(module.youtubeUrl);

      const moduleRef = await addDoc(
        collection(db, "courses", courseRef.id, "modules"),
        {
          title: module.title,
          content: module.content,
          youtube_url: processedYoutubeUrl,
          position: i + 1
        }
      );

      // 3. Add quiz questions for this module
      for (const question of module.quizQuestions) {
        await addDoc(
          collection(db, "courses", courseRef.id, "modules", moduleRef.id, "quiz"),
          {
            question: question.question,
            options: question.options,
            correct_answer: question.correctAnswer
          }
        );
      }
    }

    toast({
      title: "Course Created",
      description: "Your course has been published successfully",
    });
    triggerCreationConfetti();

    // Reset form
    setTitle("");
    setDescription("");
    setTags([]);
    setCurrentTag("");
    setModules([
      { title: "", content: "", youtubeUrl: "", quizQuestions: [] }
    ]);

    if (onSuccess) onSuccess();
  } catch (error: any) {
    console.error("Error creating course:", error);
    toast({
      title: "Error",
      description: error.message || "Failed to create course",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};




  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag) {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Preview YouTube video URLs
  const renderYouTubePreview = (url: string) => {
    const embedUrl = validateYoutubeUrl(url);
    if (!embedUrl) return null;
    
    return (
      <div className="mt-2">
        <p className="text-xs text-gray-500 mb-1">Preview:</p>
        <div className="aspect-video w-full max-w-[300px] border border-gray-200 rounded">
          <iframe
            src={embedUrl}
            title="YouTube video preview"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="course-title">Course Title</Label>
            <Input 
              id="course-title" 
              placeholder="Enter course title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="course-description">Course Description</Label>
            <Textarea 
              id="course-description" 
              placeholder="Describe what students will learn" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="course-tags">Tags</Label>
            <div className="flex">
              <Input 
                id="course-tags" 
                placeholder="Add tags (e.g., 'javascript', 'web development')" 
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 mr-2"
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Course Modules</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add modules to structure your course content
        </p>
      </div>
      
      {modules.map((module, moduleIndex) => (
        <Card key={moduleIndex} className="mb-8 border-brand-100">
          <CardHeader className="bg-brand-50 rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Module {moduleIndex + 1}</CardTitle>
              {modules.length > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleRemoveModule(moduleIndex)}
                  className="h-8 text-red-500"
                >
                  <Trash className="h-4 w-4 mr-1" /> Remove
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor={`module-title-${moduleIndex}`}>Module Title</Label>
              <Input 
                id={`module-title-${moduleIndex}`} 
                placeholder="Module title" 
                value={module.title}
                onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`module-content-${moduleIndex}`}>Content</Label>
              <Textarea 
                id={`module-content-${moduleIndex}`} 
                placeholder="Module content and description" 
                rows={4}
                value={module.content}
                onChange={(e) => handleModuleChange(moduleIndex, 'content', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`module-youtube-${moduleIndex}`} className="flex items-center">
                <Youtube className="h-4 w-4 mr-1" /> YouTube Video URL
              </Label>
              <Input 
                id={`module-youtube-${moduleIndex}`} 
                placeholder="https://youtube.com/watch?v=..." 
                value={module.youtubeUrl}
                onChange={(e) => handleModuleChange(moduleIndex, 'youtubeUrl', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Add a YouTube video to complement your module content
              </p>
              {module.youtubeUrl && renderYouTubePreview(module.youtubeUrl)}
            </div>
            
            {/* Quiz Section */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Module Quiz Questions</h4>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAddQuestion(moduleIndex)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Question
                </Button>
              </div>
              
              {module.quizQuestions.length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No quiz questions yet.</p>
                  <p className="text-sm text-gray-400">Add questions to test knowledge at the end of this module.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {module.quizQuestions.map((question, qIndex) => (
                    <div key={qIndex} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium">Question {qIndex + 1}</h5>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            const updatedModules = [...modules];
                            updatedModules[moduleIndex].quizQuestions.splice(qIndex, 1);
                            setModules(updatedModules);
                          }}
                          className="h-8 text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`question-${moduleIndex}-${qIndex}`}>
                            Question
                          </Label>
                          <Input 
                            id={`question-${moduleIndex}-${qIndex}`} 
                            placeholder="Enter question" 
                            value={question.question}
                            onChange={(e) => handleQuestionChange(
                              moduleIndex, qIndex, 'question', e.target.value
                            )}
                            required
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label>Answer Options</Label>
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center">
                              <div 
                                className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center
                                  ${question.correctAnswer === oIndex ? 
                                    'bg-green-100 text-green-600 border border-green-200' : 
                                    'bg-gray-100 text-gray-400 border border-gray-200'}`}
                                onClick={() => handleQuestionChange(
                                  moduleIndex, qIndex, 'correctAnswer', oIndex
                                )}
                                role="button"
                                tabIndex={0}
                              >
                                {question.correctAnswer === oIndex && <Check className="h-3 w-3" />}
                              </div>
                              <Input 
                                placeholder={`Option ${oIndex + 1}`} 
                                value={option}
                                onChange={(e) => handleQuestionChange(
                                  moduleIndex, qIndex, 'option', e.target.value, oIndex
                                )}
                                className="flex-1"
                                required
                              />
                            </div>
                          ))}
                          <p className="text-xs text-gray-500">
                            Click the circle to mark the correct answer
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex gap-4 mb-8">
        <Button type="button" variant="outline" onClick={handleAddModule} className="flex-1">
          <Plus className="h-4 w-4 mr-2" /> Add Another Module
        </Button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border mb-8">
        <h3 className="font-medium mb-2">Ready to publish?</h3>
        <p className="text-sm text-gray-500 mb-4">
          Once published, your course will be available for students to enroll.
        </p>
        <div className="flex gap-4">
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish Course"}
          </Button>
          <Button type="button" variant="outline">Save as Draft</Button>
        </div>
      </div>
    </form>
  );
};

export default CourseForm;
