export interface Post {
  id?: string;
  title?: string;
  subtitle?: string;
  description: string;
  image?: {
    formats: {
      small: {
        url: string;
      };
    };
  };
}