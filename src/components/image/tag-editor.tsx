import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface TagEditorProps {
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
  isEditing: boolean;
  onEditToggle: () => void;
}

export function TagEditor({ tags, onTagsChange, isEditing, onEditToggle }: TagEditorProps) {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">タグ</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onEditToggle}
        >
          {isEditing ? '完了' : '編集'}
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm"
          >
            <span>{tag}</span>
            {isEditing && (
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="新しいタグを入力"
            className="flex-1"
          />
          <Button onClick={handleAddTag}>追加</Button>
        </div>
      )}
    </div>
  );
} 