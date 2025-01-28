import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

interface StoryTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

type StoryType = Database['public']['Tables']['story type']['Row'];

export const StoryTypeSelect = ({ value, onChange }: StoryTypeSelectProps) => {
  const { data: storyTypes, isLoading } = useQuery({
    queryKey: ['storyTypes'],
    queryFn: async () => {
      console.log('Fetching story types...');
      // Using backticks to properly handle table name with space
      const { data, error } = await supabase
        .from('story type')
        .select('id, story_type');
      
      if (error) {
        console.error('Error fetching story types:', error);
        throw error;
      }
      
      console.log('Fetched story types:', data);
      return data as StoryType[];
    }
  });

  // Ensure we have at least 3 placeholder items if data is loading or empty
  const displayItems = isLoading || !storyTypes?.length 
    ? Array(3).fill({ id: 0, story_type: 'Loading...' })
    : storyTypes;

  return (
    <div className="space-y-2">
      <Label htmlFor="storyType" className="text-lg text-purple-700">
        Story Type <span className="text-red-500">*</span>
      </Label>
      <Select 
        value={value} 
        onValueChange={onChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full border border-purple-100">
          <SelectValue placeholder="Select a story type" />
        </SelectTrigger>
        <SelectContent 
          className="bg-white border border-purple-100 min-h-[120px] max-h-[200px] overflow-y-auto"
          position="popper"
        >
          {displayItems.map((type) => (
            <SelectItem 
              key={type.id} 
              value={type.id.toString()}
              className="py-2 px-4 hover:bg-purple-50"
            >
              {type.story_type || `Story Type ${type.id}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};