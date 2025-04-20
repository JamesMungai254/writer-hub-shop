
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";

const Writers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Mock writers data
  const writers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Academic Research & Essays",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Ph.D. in Literature with 10+ years of academic writing experience. Specializes in research papers, literature reviews, and critical analyses.",
      categories: ["academic", "research"],
    },
    {
      id: 2,
      name: "Michael Chen",
      specialty: "Technical Writing & Documentation",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      bio: "Engineering background with expertise in technical documentation, user manuals, and process guides. Fluent in explaining complex concepts clearly.",
      categories: ["technical", "documentation"],
    },
    {
      id: 3,
      name: "Olivia Martinez",
      specialty: "Creative Writing & Literature",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      bio: "MFA in Creative Writing. Published author specializing in fiction, poetry, and creative non-fiction. Offers developmental editing and proofreading.",
      categories: ["creative", "literature"],
    },
    {
      id: 4,
      name: "James Wilson",
      specialty: "Business & Professional Writing",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      bio: "MBA with experience in business communication, reports, and proposals. Helps with professional emails, business plans, and marketing copy.",
      categories: ["business", "professional"],
    },
    {
      id: 5,
      name: "Aisha Patel",
      specialty: "Scientific & Medical Writing",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      bio: "Ph.D. in Biochemistry. Expert in scientific paper writing, research proposals, and lab reports. Familiar with various citation styles.",
      categories: ["scientific", "academic", "research"],
    },
    {
      id: 6,
      name: "Robert Garcia",
      specialty: "Web Content & SEO Writing",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      bio: "Digital marketing professional specializing in SEO-optimized content, blog posts, and website copy. Helps increase online visibility.",
      categories: ["content", "professional"],
    },
    {
      id: 7,
      name: "Emma Thompson",
      specialty: "English as a Second Language",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604",
      bio: "TEFL certified instructor with expertise in helping non-native English writers. Offers proofreading and language improvement services.",
      categories: ["academic", "documentation"],
    },
    {
      id: 8,
      name: "David Kim",
      specialty: "STEM Subjects & Problem Solving",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      bio: "Computer Science Ph.D. helping with programming projects, mathematical proofs, and engineering reports. Expert in problem-solving approaches.",
      categories: ["technical", "scientific"],
    },
  ];

  // Filter and search writers
  const filteredWriters = writers.filter((writer) => {
    const matchesSearch = writer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        writer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        writer.bio.toLowerCase().includes(searchTerm.toLowerCase());
                        
    if (filter === "all") return matchesSearch;
    return matchesSearch && writer.categories.includes(filter);
  });

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Connect with Professional Writers</h1>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search by name, specialty, or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-2/3"
        />
        
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="academic">Academic Writing</SelectItem>
            <SelectItem value="technical">Technical Writing</SelectItem>
            <SelectItem value="creative">Creative Writing</SelectItem>
            <SelectItem value="business">Business Writing</SelectItem>
            <SelectItem value="scientific">Scientific Writing</SelectItem>
            <SelectItem value="research">Research</SelectItem>
            <SelectItem value="content">Web Content</SelectItem>
            <SelectItem value="documentation">Documentation</SelectItem>
            <SelectItem value="professional">Professional Writing</SelectItem>
            <SelectItem value="literature">Literature</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Writers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWriters.length > 0 ? (
          filteredWriters.map((writer) => (
            <div key={writer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex items-center p-4 border-b">
                <img 
                  src={writer.image} 
                  alt={writer.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold text-lg">{writer.name}</h3>
                  <p className="text-gray-600 text-sm">{writer.specialty}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(writer.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : i < writer.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{writer.rating}/5</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{writer.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {writer.categories.map((category) => (
                    <span 
                      key={category} 
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                
                <Button 
                  onClick={() => navigate(`/writers/${writer.id}`)} 
                  className="w-full"
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <h3 className="text-xl font-bold mb-2">No writers found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Writers;
