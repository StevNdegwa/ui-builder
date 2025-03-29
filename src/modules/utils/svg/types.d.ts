type ElementConfigType = {
  name: string;
  classNames?: string[];
  textContent?: string;
  attributes?: { name: string; value: string | number | boolean }[];
  events?: { name: string; handler: (event?: Event) => void }[];
  children?: ElementConfigType[];
};
