import { FC, useCallback, useState } from "react";
import { Box } from "@ui/components";
import { Wrapper, LayoutPreview } from "./styles";

const layouts = [
  {
    id: "single",
    label: "Single Column",
    description: "Elements stack vertically",
    columns: 1,
  },
  {
    id: "two-column",
    label: "Two Columns",
    description: "Elements arranged in two columns",
    columns: 2,
  },
  {
    id: "three-column",
    label: "Three Columns",
    description: "Elements arranged in three columns",
    columns: 3,
  },
];

export const LayoutSelect: FC<BuilderFieldProps<string>> = ({
  initialValue = "single",
  onChange,
}) => {
  const [selectedLayout, setSelectedLayout] = useState<string>(initialValue);

  const updateLayout = useCallback((layout: string) => {
    setSelectedLayout(layout);
    onChange(layout);
  }, [onChange]);

  const renderLayoutPreview = useCallback(
    (columns: number) =>
      Array.from({ length: columns }, (_, i) => (
        <Box key={i}/>
      )),
    []
  );

  return (
    <Wrapper direction="row" gap="xs" wrap>
      {layouts.map((layout) => (
        <LayoutPreview
          $columns={layout.columns}
          direction="row"
          key={layout.id}
          $selected={layout.id === selectedLayout}
          onClick={() => updateLayout(layout.id)}
        >
          {renderLayoutPreview(layout.columns)}
        </LayoutPreview>
      ))}
    </Wrapper>
  );
};
