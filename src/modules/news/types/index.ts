export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  url: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface NewsSearchParams {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}
