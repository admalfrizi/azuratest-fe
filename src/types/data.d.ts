interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publication_date: string;
  number_of_pages: number;
  category: {
    id: number;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface Categories {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}