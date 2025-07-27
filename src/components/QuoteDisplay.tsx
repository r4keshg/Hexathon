
import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  { 
    text: "The beautiful thing about learning is that nobody can take it away from you.", 
    author: "B.B. King" 
  },
  { 
    text: "Education is the most powerful weapon which you can use to change the world.", 
    author: "Nelson Mandela" 
  },
  { 
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", 
    author: "Dr. Seuss" 
  },
  { 
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", 
    author: "Mahatma Gandhi" 
  },
  { 
    text: "Learning never exhausts the mind.", 
    author: "Leonardo da Vinci" 
  },
  { 
    text: "The only person who is educated is the one who has learned how to learn and change.", 
    author: "Carl Rogers" 
  },
  { 
    text: "Develop a passion for learning. If you do, you will never cease to grow.", 
    author: "Anthony J. D'Angelo" 
  },
  { 
    text: "Education is not the filling of a pail, but the lighting of a fire.", 
    author: "W.B. Yeats" 
  }
];

const QuoteDisplay: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    // Get a random quote when component mounts
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  if (!quote) return null;

  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-4">
        <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center">
          <Lightbulb className="h-5 w-5 text-brand-600" />
        </div>
      </div>
      <div>
        <p className="text-lg italic text-gray-700">"{quote.text}"</p>
        <p className="text-sm text-gray-500">— {quote.author}</p>
      </div>
    </div>
  );
};

export default QuoteDisplay;
