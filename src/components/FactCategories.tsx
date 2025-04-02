
import React from 'react';

export const FACT_CATEGORIES = [
  { id: 'science', name: 'Science', color: 'fact-blue' },
  { id: 'history', name: 'History', color: 'fact-purple' },
  { id: 'technology', name: 'Technology', color: 'fact-green' },
  { id: 'space', name: 'Space', color: 'fact-purple' },
  { id: 'animals', name: 'Animals', color: 'fact-orange' },
  { id: 'art', name: 'Art', color: 'fact-pink' },
  { id: 'literature', name: 'Literature', color: 'fact-blue' },
  { id: 'geography', name: 'Geography', color: 'fact-green' },
  { id: 'sports', name: 'Sports', color: 'fact-orange' },
  { id: 'music', name: 'Music', color: 'fact-pink' },
  { id: 'movies', name: 'Movies', color: 'fact-purple' },
  { id: 'food', name: 'Food', color: 'fact-green' },
  { id: 'psychology', name: 'Psychology', color: 'fact-blue' },
  { id: 'mathematics', name: 'Mathematics', color: 'fact-orange' },
  { id: 'medicine', name: 'Medicine', color: 'fact-pink' },
  { id: 'bizarre', name: 'Bizarre', color: 'fact-purple' },
  { id: 'inventions', name: 'Inventions', color: 'fact-green' },
  { id: 'nature', name: 'Nature', color: 'fact-blue' },
  { id: 'culture', name: 'Culture', color: 'fact-orange' },
  { id: 'economics', name: 'Economics', color: 'fact-pink' },
];

interface CategoryTagProps {
  category: typeof FACT_CATEGORIES[0];
  selected?: boolean;
  onClick?: () => void;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ 
  category, 
  selected = false,
  onClick 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-full text-sm font-medium transition-all
        ${selected 
          ? `bg-${category.color} text-white` 
          : `bg-secondary text-foreground hover:bg-${category.color}/10`
        }
      `}
    >
      {category.name}
    </button>
  );
};

export default FACT_CATEGORIES;
