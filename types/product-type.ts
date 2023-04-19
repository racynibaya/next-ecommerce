export default interface ProductType {
  id: string;
  name: string;
  image: string;
  unit_amount: number | null;
  quantity?: number | 1;
  description: string | null;
  metadata: Metadata;
}

type Metadata = {
  features: string;
};
