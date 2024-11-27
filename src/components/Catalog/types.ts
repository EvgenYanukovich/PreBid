export type ViewMode = 'grid' | 'list';

export interface Product {
  id: string;
  image: string;
  lotNumber: string;
  year: number;
  make: string;
  model: string;
  volume: number;
  fuelType: string;
  odometer: number;
  date: string;
  currentBid: number;
  buyNowPrice: number;
}

export type SortOption = {
  label: string;
  value: string;
};

export interface CatalogState {
  viewMode: ViewMode;
  currentPage: number;
  itemsPerPage: number;
  sortBy: string;
  products: Product[];
}
