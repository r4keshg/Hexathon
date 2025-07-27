
import { supabase } from "@/integrations/supabase/client";

/**
 * Increments a user's completed courses count
 * 
 * @param userId The user's ID
 * @returns A promise that resolves when the operation is complete
 */
export const incrementCompletedCourses = async (userId: string): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        completed_courses: supabase.rpc('increment_completed_courses_count', { user_id: userId })
      })
      .eq('id', userId);
    
    if (error) {
      console.error('Error incrementing completed courses:', error);
      throw error;
    }
    console.log('Successfully incremented completed courses count');
  } catch (error) {
    console.error('Error in incrementCompletedCourses function:', error);
    // Fall back to direct increment if RPC fails
    try {
      // Get current count
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('completed_courses')
        .eq('id', userId)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Increment count
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          completed_courses: (profile?.completed_courses || 0) + 1 
        })
        .eq('id', userId);
      
      if (updateError) throw updateError;
      console.log('Successfully incremented completed courses count via fallback');
    } catch (fallbackError) {
      console.error('Error in fallback increment:', fallbackError);
    }
  }
};

/**
 * Creates a new course with modules
 * 
 * @param courseData The course data to create
 * @param userId The ID of the user creating the course
 * @returns The ID of the created course
 */
export const createCourse = async (courseData: any, userId: string): Promise<string> => {
  try {
    // Create the course
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert({
        title: courseData.title,
        description: courseData.description,
        tags: courseData.tags || [],
        created_by: userId
      })
      .select()
      .single();

    if (courseError) throw courseError;

    // Create the modules
    if (courseData.modules && courseData.modules.length > 0) {
      const modulesWithCourseId = courseData.modules.map((module: any, index: number) => ({
        course_id: course.id,
        title: module.title,
        content: module.type === 'text' ? module.content : null,
        youtube_url: module.type === 'video' ? module.content : null,
        position: index + 1
      }));

      const { error: modulesError } = await supabase
        .from('course_modules')
        .insert(modulesWithCourseId);

      if (modulesError) throw modulesError;
    }

    return course.id;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

/**
 * Fetches all courses with their modules
 * 
 * @returns An array of courses with modules
 */
export const getAllCourses = async () => {
  try {
    // Get all courses
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select(`
        *,
        profiles:created_by (
          username,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (coursesError) throw coursesError;
    
    // For each course, get its modules
    const coursesWithModules = await Promise.all(
      courses.map(async (course) => {
        const { data: modules, error: modulesError } = await supabase
          .from('course_modules')
          .select('*')
          .eq('course_id', course.id)
          .order('position', { ascending: true });
          
        if (modulesError) throw modulesError;
        
        // Format the modules to match our app's expected structure
        const formattedModules = modules.map(module => ({
          id: module.id,
          title: module.title,
          type: module.content ? 'text' : 'video',
          content: module.content || module.youtube_url,
          duration: '30 min', // Default duration
          isCompleted: false
        }));
        
        // Format the course to match our app's expected structure
        return {
          id: course.id,
          title: course.title,
          description: course.description,
          instructor: {
            id: course.created_by,
            name: course.profiles?.username || 'Instructor'
          },
          coverImage: "/placeholder.svg",
          rating: 4.5,
          studentsCount: 0,
          duration: `${formattedModules.length * 30} min`,
          level: "Beginner", // Default level
          category: course.tags[0] || "Web Development",
          tags: course.tags,
          isFeatured: false,
          isNew: true,
          modules: formattedModules,
          created_at: course.created_at
        };
      })
    );
    
    return coursesWithModules;
  } catch (error) {
    console.error('Error getting all courses:', error);
    throw error;
  }
};

/**
 * Gets a course by ID with its modules
 * 
 * @param courseId The ID of the course to get
 * @returns The course with its modules
 */
export const getCourseById = async (courseId: string) => {
  try {
    // Get the course
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select(`
        *,
        profiles:created_by (
          username,
          avatar_url
        )
      `)
      .eq('id', courseId)
      .single();

    if (courseError) throw courseError;
    
    // Get the course modules
    const { data: modules, error: modulesError } = await supabase
      .from('course_modules')
      .select('*')
      .eq('course_id', courseId)
      .order('position', { ascending: true });
      
    if (modulesError) throw modulesError;
    
    // Format the modules to match our app's expected structure
    const formattedModules = modules.map(module => ({
      id: module.id,
      title: module.title,
      type: module.content ? 'text' : 'video',
      content: module.content || module.youtube_url,
      duration: '30 min', // Default duration
      isCompleted: false
    }));
    
    // Format the course to match our app's expected structure
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      instructor: {
        id: course.created_by,
        name: course.profiles?.username || 'Instructor'
      },
      coverImage: "/placeholder.svg",
      rating: 4.5,
      studentsCount: 0,
      duration: `${formattedModules.length * 30} min`,
      level: "Beginner" as "Beginner" | "Intermediate" | "Advanced" | "All Levels",
      category: course.tags[0] || "Web Development",
      tags: course.tags,
      isFeatured: false,
      isNew: true,
      modules: formattedModules,
      created_at: course.created_at
    };
  } catch (error) {
    console.error('Error getting course by ID:', error);
    throw error;
  }
};

/**
 * Gets comments for a course module
 * 
 * @param moduleId The ID of the module to get comments for
 * @returns An array of comments
 */
export const getModuleComments = async (moduleId: string) => {
  try {
    const { data, error } = await supabase
      .from('course_comments')
      .select(`
        *,
        profiles:user_id (
          username,
          avatar_url
        )
      `)
      .eq('module_id', moduleId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data.map((comment) => ({
      id: comment.id,
      content: comment.content,
      user: {
        id: comment.user_id,
        name: comment.profiles?.username || 'User',
        avatar: comment.profiles?.avatar_url || null
      },
      createdAt: comment.created_at
    }));
  } catch (error) {
    console.error('Error getting module comments:', error);
    return [];
  }
};

/**
 * Adds a comment to a course module
 * 
 * @param moduleId The ID of the module to add a comment to
 * @param userId The ID of the user adding the comment
 * @param content The content of the comment
 * @returns The added comment
 */
export const addModuleComment = async (moduleId: string, userId: string, content: string) => {
  try {
    const { data, error } = await supabase
      .from('course_comments')
      .insert({
        module_id: moduleId,
        user_id: userId,
        content
      })
      .select(`
        *,
        profiles:user_id (
          username,
          avatar_url
        )
      `)
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      content: data.content,
      user: {
        id: data.user_id,
        name: data.profiles?.username || 'User',
        avatar: data.profiles?.avatar_url || null
      },
      createdAt: data.created_at
    };
  } catch (error) {
    console.error('Error adding module comment:', error);
    throw error;
  }
};

/**
 * Marks a module as completed for a user
 * 
 * @param moduleId The ID of the module to mark as completed
 * @param userId The ID of the user completing the module
 * @returns True if the module was marked as completed
 */
export const markModuleCompleted = async (moduleId: string, userId: string): Promise<boolean> => {
  try {
    // Check if there's already a progress record
    const { data: existingProgress, error: checkError } = await supabase
      .from('user_course_progress')
      .select('*')
      .eq('module_id', moduleId)
      .eq('user_id', userId)
      .single();
      
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows returned
      throw checkError;
    }
    
    const now = new Date().toISOString();
    
    if (existingProgress) {
      // Update existing progress if not already completed
      if (!existingProgress.completed) {
        const { error: updateError } = await supabase
          .from('user_course_progress')
          .update({
            completed: true,
            completed_at: now
          })
          .eq('id', existingProgress.id);
          
        if (updateError) throw updateError;
        
        // Check if this was the last module of the course
        const { data: courseModules, error: modulesError } = await supabase
          .from('course_modules')
          .select('course_id')
          .eq('id', moduleId)
          .single();
          
        if (modulesError) throw modulesError;
        
        const { data: allModules, error: allModulesError } = await supabase
          .from('course_modules')
          .select('id')
          .eq('course_id', courseModules.course_id);
          
        if (allModulesError) throw allModulesError;
        
        const { data: completedModules, error: completedError } = await supabase
          .from('user_course_progress')
          .select('id')
          .eq('user_id', userId)
          .in('module_id', allModules.map(m => m.id))
          .eq('completed', true);
          
        if (completedError) throw completedError;
        
        // If all modules are completed, increment the user's completed courses count
        if (completedModules.length === allModules.length) {
          await incrementCompletedCourses(userId);
        }
      }
    } else {
      // Create new progress record
      const { error: insertError } = await supabase
        .from('user_course_progress')
        .insert({
          module_id: moduleId,
          user_id: userId,
          completed: true,
          completed_at: now
        });
        
      if (insertError) throw insertError;
    }
    
    return true;
  } catch (error) {
    console.error('Error marking module as completed:', error);
    return false;
  }
};

/**
 * Checks if a module is completed for a user
 * 
 * @param moduleId The ID of the module to check
 * @param userId The ID of the user to check for
 * @returns True if the module is completed
 */
export const isModuleCompleted = async (moduleId: string, userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_course_progress')
      .select('completed')
      .eq('module_id', moduleId)
      .eq('user_id', userId)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') { // No rows found
        return false;
      }
      throw error;
    }
    
    return data.completed;
  } catch (error) {
    console.error('Error checking if module is completed:', error);
    return false;
  }
};
