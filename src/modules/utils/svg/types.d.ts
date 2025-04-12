type ElementConfigType = {
  name: string;
  classNames?: string[];
  textContent?: string;
  attributes?: Record<string, string | number | boolean>;
  events?: { name: string; handler: (event?: Event) => void }[];
  children?: ElementConfigType[];
  data?: Record<string, string | number | boolean>;
};
