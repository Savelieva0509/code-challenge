export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

export interface Option {
  value: string;
  label: string;
  iconUrl: string;
}

export interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}
