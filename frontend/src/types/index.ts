export interface Author {
  id: string;
  name: string | null;
  email: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  authorId: string;
  author: Author;
  tags: Tag[];
}
