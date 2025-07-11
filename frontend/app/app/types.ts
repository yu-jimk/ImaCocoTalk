export type StoreData = {
  id: number;
  name: string;
  genres: string[];
  address: string;
  postalCode: string;
  distance: string;
  rating: number;
  description: string;
  openHours: string;
  phone: string;
  features: string[];
  user: {
    isFavorited: boolean;
  };
};

export type Post = {
  id: number;
  user: { name: string; avatar: string };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  rating: number;
  store: {
    name: string;
  };
};

export type StoreMyPage = {
  id: number;
  name: string;
  genre: string;
  date?: string;
  visits?: number;
  isFavorite?: boolean;
};
