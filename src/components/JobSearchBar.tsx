
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

interface JobSearchBarProps {
  onSearch: (query: string) => void;
}

const JobSearchBar = ({ onSearch }: JobSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      const combinedSearch = [searchTerm, location].filter(Boolean).join(" ");
      setDebouncedSearch(combinedSearch);
      onSearch(combinedSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, location, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedSearch = [searchTerm, location].filter(Boolean).join(" ");
    onSearch(combinedSearch);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Job title, company, or keywords"
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="relative flex-grow">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Location (city, state, remote)"
          className="pl-10"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default JobSearchBar;
