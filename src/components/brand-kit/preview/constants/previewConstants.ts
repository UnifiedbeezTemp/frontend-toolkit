export interface ProductItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

export const EMAIL_PREVIEW_PRODUCTS: ProductItem[] = [
  {
    name: "Elegant Feast",
    description: "Classic design with ornate detailing",
    price: "$499.99",
    image: "img1",
  },
  {
    name: "Modern Fusion",
    description: "Sleek and contemporary style",
    price: "$699.99",
    image: "img2",
  },
  {
    name: "Rustic Charm",
    description: "Natural wood finish for a cozy ambiance",
    price: "$399.99",
    image: "img3",
  },
];
