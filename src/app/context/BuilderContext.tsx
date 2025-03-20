import { BuildableControl } from "@modules/builder";
import { createContext, FC, PropsWithChildren, useContext } from "react";

export type BuilderContextType = {
  activeBuildable: BuildableControl | null;
};

const BuilderContext = createContext<BuilderContextType>({
  activeBuildable: null,
});

export const BuildableContextProvider: FC<
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
