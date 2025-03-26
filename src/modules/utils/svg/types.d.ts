type ElementConfigType = {
  name: string;
  classNames?: string[];
  textContent?: string;
  attributes?: { name: string; value: string | number | boolean }[];
  children?: {
    name: string;
    classNames?: string[];
    textContent?: string;
    attributes?: { name: string; value: string | number | boolean }[];
  }[];
};
