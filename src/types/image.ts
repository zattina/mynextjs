export interface Image {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  createdAt: string;
  width: number;
  height: number;
  author?: {
    id: string;
    name: string;
    avatar: string;
  };
} 