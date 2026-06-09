// components/contracts/ContractSearchBar.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface ContractSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function ContractSearchBar({ searchQuery, onSearchChange }: ContractSearchBarProps) {
  return (
    <div className="flex gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search contracts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button variant="outline" size="icon">
        <Filter className="w-4 h-4" />
      </Button>
    </div>
  );
}