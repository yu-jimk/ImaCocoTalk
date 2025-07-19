export type StoreData = {
  id: string;
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
  id: string;
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
  id: string;
  store_id: string;
  name: string;
  genre: string;
  date?: string;
  visits?: number;
  isFavorite?: boolean;
};
