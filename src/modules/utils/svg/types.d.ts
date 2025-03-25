type ElementConfigType = {
  name: string;
  textContent?: string;
  attributes?: { name: string; value: string | number | boolean }[];
  children?: {
    name: string;
    textContent?: string;
    attributes?: { name: string; value: string | number | boolean }[];
  }[];
};
