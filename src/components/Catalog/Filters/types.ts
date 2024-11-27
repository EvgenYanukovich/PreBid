export interface FilterOption {
  label: string;
  type: 'default' | 'range';
  options?: string[];
  years?: number[];
}

export interface FilterOptions {
  [key: string]: FilterOption;
}

export interface FilterState {
  [key: string]: string[];
}