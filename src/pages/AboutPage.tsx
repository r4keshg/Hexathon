
import React, { useState } from 'react';
import { 
  Github, Linkedin, Mail, Send, MessageSquare, Users, Award, Book, 
  BookOpen, Sparkles, Code, Lightbulb, Heart, ChevronDown, ChevronUp 
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Mock data for team members
const teamMembers = [
  {
    name: "Rakesh G",
    //role: "Founder & CEO",
    bio: "Wealth of education can not be lost",
    avatar: "/placeholder.svg",
    social: {
      github: "https://github.com/raa-kaysh",
      linkedin: "https://linkedin.com/in/rakeshg",
      email: "graakaysh@gmail.com"
    }
  },
  {
    name: "Harish Srinivasa",
    //role: "CTO",
    bio: "Full-stack developer with a passion for creating intuitive learning experiences.",
    avatar: "/placeholder.svg",
    social: {
      github: "https://github.com/harish4238",
      linkedin: "https://linkedin.com/in/harish10",
      email: "srinivasaharish55@gmail.com"
    }
  },
  /*{
    name: "Miguel Hernandez",
    role: "Chief Learning Officer",
    bio: "PhD in Educational Psychology focusing on online learning methodologies.",
    avatar: "/placeholder.svg",
    social: {
      github: "https://github.com/miguelhernandez",
      linkedin: "https://linkedin.com/in/miguelhernandez",
      email: "miguel@vskill.edu"
    }
  },
  {
    name: "Priya Patel",
    role: "Head of Content",
    bio: "Author and former university professor specializing in creating engaging educational content.",
    avatar: "/placeholder.svg",
    social: {
      github: "https://github.com/priyapatel",
      linkedin: "https://linkedin.com/in/priyapatel",
      email: "priya@vskill.edu"
    }
  },
  {
    name: "David Wilson",
    role: "UX/UI Designer",
    bio: "Award-winning designer focused on creating accessible and beautiful interfaces.",
    avatar: "/placeholder.svg",
    social: {
      github: "https://github.com/davidwilson",
      linkedin: "https://linkedin.com/in/davidwilson",
      email: "david@vskill.edu"
    }
  },
  {
    name: "Jasmine Kim",
    role: "Community Manager",
    bio: "Social media expert with experience building vibrant online learning communities.",
    avatar: "/placeholder.svg",
    social: {
      github: "https://github.com/jasminekim",
      linkedin: "https://linkedin.com/in/jasminekim",
      email: "jasmine@vskill.edu"
    }
  }*/
];

// Mock data for FAQs
const faqs = [
  {
    question: "What is 101?",
    answer: "101 is an innovative eLearning platform that combines structured learning paths with community features. Our platform allows learners to not only access high-quality courses but also connect with peers, join interest-based clans, and share knowledge through blogs and forums."
  },
  {
    question: "How does the Tribe feature work?",
    answer: "Tribe is our community feature that allows learners to connect with each other. You can join or create clans based on your interests, participate in discussions, share resources, and collaborate on projects. Think of it as a learning-focused social network designed to enhance your educational journey."
  },
  {
    question: "What is Odyssey?",
    answer: "Odyssey is your personal learning dashboard that tracks your progress across courses, shows your achievements, displays learning streaks, and keeps you updated on community activities. It provides a gamified overview of your learning journey and helps you stay motivated."
  },
  {
    question: "Are the courses free or paid?",
    answer: "101 offers both free and premium courses. Many foundational courses are available for free, while specialized and advanced courses may require a subscription or one-time payment. We believe in providing accessible education while sustainably supporting our content creators and platform."
  },
  {
    question: "Can I become a content creator on 101?",
    answer: "Absolutely! 101 welcomes educators, industry experts, and knowledgeable individuals to create and share courses. We provide tools to help you design engaging learning experiences and can connect you with our instructional design team for guidance. Contact us to learn more about becoming a content creator."
  },
  {
    question: "How does 101 differ from other eLearning platforms?",
    answer: "What sets 101 apart is our holistic approach to learning. We combine structured courses with community-driven learning through our Tribe feature, personalized progress tracking via Odyssey, and knowledge sharing through blogs. Our platform addresses not just the 'what' of learning but also the 'how' and 'with whom'."
  }
];

const AboutPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically send the form data to a backend
    console.log('Contact form submitted:', { name, email, message });
    
    // Show success message
    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon.",
    });
    
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">About 101</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Transforming how people learn through community-driven education and personalized learning journeys.
        </p>
      </section>
      
      {/* Mission Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              At 101, we believe learning is not just about consuming content, but about connecting with others, sharing knowledge, and building a community of lifelong learners.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our mission is to create an educational platform that combines structured learning paths with the power of community, making learning more engaging, effective, and enjoyable.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              We envision a world where education is accessible to all, where learners support each other, and where the joy of learning is rediscovered through collaboration and shared achievement.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-brand-50 dark:bg-gray-800 border-brand-100 dark:border-gray-700">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-8 w-8 text-brand-600 mb-2" />
                <h3 className="font-semibold mb-1">Community Learning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn together in supportive communities</p>
              </CardContent>
            </Card>
            <Card className="bg-brand-50 dark:bg-gray-800 border-brand-100 dark:border-gray-700">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Award className="h-8 w-8 text-brand-600 mb-2" />
                <h3 className="font-semibold mb-1">Achievement Oriented</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Track progress with meaningful goals</p>
              </CardContent>
            </Card>
            <Card className="bg-brand-50 dark:bg-gray-800 border-brand-100 dark:border-gray-700">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Book className="h-8 w-8 text-brand-600 mb-2" />
                <h3 className="font-semibold mb-1">Quality Content</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expert-crafted learning materials</p>
              </CardContent>
            </Card>
            <Card className="bg-brand-50 dark:bg-gray-800 border-brand-100 dark:border-gray-700">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Sparkles className="h-8 w-8 text-brand-600 mb-2" />
                <h3 className="font-semibold mb-1">Engaging Experience</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Interactive and gamified learning</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Quote Section */}
      <section className="mb-16 py-12 px-4 bg-brand-50 dark:bg-gray-800 rounded-lg text-center">
        <BookOpen className="h-12 w-12 text-brand-600 mx-auto mb-4" />
        <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white italic max-w-3xl mx-auto mb-4">
          "Education is not the filling of a pail, but the lighting of a fire."
        </blockquote>
        <cite className="text-gray-600 dark:text-gray-400">— William Butler Yeats</cite>
      </section>
      
      {/* Our Team Section */}
      <section id="team" className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href={`mailto:${member.social.email}`}
                      className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none bg-white dark:bg-gray-900"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                {expandedFaq === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you! Fill out the form and our team will get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-brand-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">graakaysh@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 text-brand-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Live Chat</h3>
                  <p className="text-gray-600 dark:text-gray-400">Available Monday-Friday, 9am-5pm ST</p>
                </div>
              </div>
              <div className="flex items-start">
                <Code className="h-5 w-5 text-brand-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Developers</h3>
                  <p className="text-gray-600 dark:text-gray-400">Check out our GitHub repository</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
