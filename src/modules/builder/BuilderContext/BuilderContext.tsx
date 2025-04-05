import { createContext, FC, PropsWithChildren, useContext } from "react";

export type BuilderContextType = {
  notify: (message: string) => void;
};

const BuilderContext = createContext<BuilderContextType>(
  {} as BuilderContextType
);

export const BuilderContextProvider: FC<
  PropsWithChildren<{ value: BuilderContextType }>
> = ({ children, value }) => {
  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
};

export const useBuilderContext = () => {
  return useContext(BuilderContext);
};

export default BuilderContext;
