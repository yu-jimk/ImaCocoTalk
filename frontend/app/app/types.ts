export type StoreData = {
  id: number;
  name: string;
  genres: string[];
  address: string;
  postalCode: string;
  distance: string;
  rating: number;
  isCheckedIn: boolean;
  description: string;
  openHours: string;
  phone: string;
  features: string[];
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
