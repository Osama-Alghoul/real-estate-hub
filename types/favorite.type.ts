export type Favorite = {
  id: number;
  userId: number;
  propertyId: number;

  title: string;
  image: string;
  price: number;

  owner: string;
  avatar: string;

  type: "sale" | "rent";
  status: "available" | "pending" | "sold";
};
