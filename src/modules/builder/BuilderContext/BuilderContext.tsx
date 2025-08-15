import { createContext, FC, PropsWithChildren, useContext } from "react";
import { BuildableControl } from "../BuildableControl";

export type BuilderContextType = {
  notify: (message: string) => void;
  buildableConfigs: BuildableFrameConfig<BuildableControl>[];
  getBuildableConfigById: (
    id: string
  ) => BuildableFrameConfig<BuildableControl> | undefined;
  activeBuildableId?: string;
  activeBuildableControl?: BuildableFrameConfig<BuildableControl>;
  removeActionsById: (id: string) => void;
  setActiveElementId: (id?: string) => void;
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
