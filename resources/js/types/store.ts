interface categoryModel {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface productTypeModel {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface productModel {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  product_type_id: number;
  image: string;
  discount: number;
  rating: number;
  created_at: string;
  updated_at: string;
}
