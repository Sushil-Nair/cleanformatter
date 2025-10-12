export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  readTime?: number;
  featured?: boolean;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description?: string;
  count?: number;
}
