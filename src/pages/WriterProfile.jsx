
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Mail, Phone, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "../App";

const WriterProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const [writer, setWriter] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Mock writers data - in a real app, you'd fetch this from an API
  const writersData = {
    1: {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Academic Research & Essays",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Ph.D. in Literature with 10+ years of academic writing experience. Specializes in research papers, literature reviews, and critical analyses.",
      email: "sarah.johnson@writerhub.com",
      phone: "+1 (555) 123-4567",
      education: [
        "Ph.D. in English Literature, Stanford University",
        "M.A. in Comparative Literature, Yale University",
        "B.A. in English, Columbia University"
      ],
      expertise: [
        "Research Methodology",
        "Literature Analysis",
        "Academic Writing",
        "Citation Styles (APA, MLA, Chicago)",
        "Dissertation Support"
      ],
      samples: [
        {
          title: "The Influence of Gothic Elements in Modern Literature",
          description: "A comprehensive analysis of gothic tropes in contemporary fiction.",
          link: "#"
        },
        {
          title: "Feminist Perspectives in Victorian Literature",
          description: "Examination of gender roles and feminist themes in 19th-century novels.",
          link: "#"
        },
        {
          title: "Postcolonial Readings of Caribbean Poetry",
          description: "Analysis of cultural identity and historical context in Caribbean literary works.",
          link: "#"
        }
      ],
      reviews: [
        {
          name: "Michael R.",
          date: "March 15, 2023",
          rating: 5,
          comment: "Dr. Johnson helped me with my dissertation literature review and provided invaluable insights. Her feedback was thorough and helped me significantly improve my work."
        },
        {
          name: "Jessica T.",
          date: "February 2, 2023",
          rating: 5,
          comment: "Outstanding assistance with my research paper. Dr. Johnson is extremely knowledgeable and provided excellent guidance throughout the writing process."
        },
        {
          name: "David K.",
          date: "January 10, 2023",
          rating: 4,
          comment: "Very professional and responsive. Helped me structure my arguments more effectively and improved the overall quality of my paper."
        }
      ]
    },
    2: {
      id: 2,
      name: "Michael Chen",
      specialty: "Technical Writing & Documentation",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      bio: "Engineering background with expertise in technical documentation, user manuals, and process guides. Fluent in explaining complex concepts clearly.",
      email: "michael.chen@writerhub.com",
      phone: "+1 (555) 234-5678",
      education: [
        "M.S. in Computer Science, MIT",
        "B.S. in Electrical Engineering, UC Berkeley"
      ],
      expertise: [
        "User Manual Creation",
        "API Documentation",
        "Technical Guides",
        "Procedural Documentation",
        "Software Requirements"
      ],
      samples: [
        {
          title: "Cloud Platform User Guide",
          description: "Comprehensive documentation for enterprise cloud service.",
          link: "#"
        },
        {
          title: "API Documentation for Payment Gateway",
          description: "Technical documentation for developer integration.",
          link: "#"
        },
        {
          title: "Internal Software Training Manual",
          description: "Step-by-step guide for new enterprise software users.",
          link: "#"
        }
      ],
      reviews: [
        {
          name: "Lisa M.",
          date: "April 8, 2023",
          rating: 5,
          comment: "Michael created exceptional documentation for our product. His technical knowledge and clear writing style made complex concepts accessible to our users."
        },
        {
          name: "Robert P.",
          date: "March 22, 2023",
          rating: 4,
          comment: "Excellent work on our API documentation. Michael is thorough and precise, exactly what we needed."
        },
        {
          name: "Amanda J.",
          date: "February 15, 2023",
          rating: 5,
          comment: "Michael helped translate our technical specifications into user-friendly guides. Very impressed with his work!"
        }
      ]
    },
  };

  useEffect(() => {
    // In a real app, you would fetch the writer data from an API
    // For now, we're using the mock data
    const writerData = writersData[id];
    if (writerData) {
      setWriter(writerData);
    }
  }, [id]);

  const submitRating = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to rate this writer",
        variant: "destructive",
      });
      return;
    }

    if (userRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send this rating to your backend
    toast({
      title: "Rating Submitted",
      description: `You rated ${writer.name} ${userRating} stars`,
    });
  };

  const contactWriter = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to contact this writer",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would open a contact form or chat
    toast({
      title: "Contact Request Sent",
      description: `${writer.name} will be notified of your interest`,
    });
  };

  if (!writer) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Writer not found</h2>
        <p className="mb-4">The writer you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/writers">Back to Writers</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Link to="/writers" className="text-primary hover:underline mb-6 inline-block">
        &larr; Back to Writers
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Writer Info - Left Column */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex flex-col items-center mb-6">
              <img 
                src={writer.image} 
                alt={writer.name} 
                className="w-13 h-12 rounded-full object-cover mb-4"
              />
              <h1 className="text-2xl font-bold text-center">{writer.name}</h1>
              <p className="text-gray-600 mb-2">{writer.specialty}</p>
              
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(writer.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : i < writer.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">{writer.rating}/5</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-500 mr-2" />
                <a href={`mailto:${writer.email}`} className="text-primary hover:underline">{writer.email}</a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-500 mr-2" />
                <a href={`tel:${writer.phone}`} className="text-primary hover:underline">{writer.phone}</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button onClick={contactWriter} className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Writer
              </Button>
              
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Rate this writer:</p>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`w-6 h-6 cursor-pointer ${
                        rating <= (hoverRating || userRating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => setUserRating(rating)}
                      onMouseEnter={() => setHoverRating(rating)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
                <Button onClick={submitRating} className="w-full" variant="outline">
                  Submit Rating
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Writer Details - Right Column */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="samples">Work Samples</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="bg-white rounded-lg shadow-md p-6 mt-4">
              <h2 className="text-xl font-bold mb-4">About {writer.name}</h2>
              <p className="text-gray-700 mb-6">{writer.bio}</p>
              
              <h3 className="text-lg font-bold mb-2">Education</h3>
              <ul className="list-disc list-inside mb-6 text-gray-700">
                {writer.education.map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>
              
              <div className="border-t pt-4">
                <Link to="/shop" className="text-primary hover:underline">
                  Check out our IT products shop &rarr;
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="expertise" className="bg-white rounded-lg shadow-md p-6 mt-4">
              <h2 className="text-xl font-bold mb-4">Areas of Expertise</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {writer.expertise.map((skill, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="samples" className="bg-white rounded-lg shadow-md p-6 mt-4">
              <h2 className="text-xl font-bold mb-4">Work Samples</h2>
              <div className="space-y-4">
                {writer.samples.map((sample, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <h3 className="font-bold text-lg mb-1">{sample.title}</h3>
                    <p className="text-gray-600 mb-3">{sample.description}</p>
                    <a 
                      href={sample.link} 
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      View Sample
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="bg-white rounded-lg shadow-md p-6 mt-4">
              <h2 className="text-xl font-bold mb-4">Student Reviews</h2>
              <div className="space-y-6">
                {writer.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">{review.name}</h3>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WriterProfile;
