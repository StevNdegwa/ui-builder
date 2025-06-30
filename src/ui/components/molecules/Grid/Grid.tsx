import { forwardRef } from "react";
import { BoxProps } from "@ui/components";
import { Item } from "./Item";
import { Wrapper } from "./styles";

export type GridProps = BoxProps & {
  /**
   * The grid-template-columns CSS property defines the line names and track sizing functions of the grid columns.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   * @example "auto auto auto auto"
   * @example "1fr 1fr 1fr 1fr"
   * @example "repeat(4, 1fr)"
   * @example "repeat(auto-fill, minmax(100px, 1fr))"
   */
  templateColumns?: string;

  /**
   * The grid-template-rows CSS property defines the line names and track sizing functions of the grid rows.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows
   * @example "auto auto auto auto"
   * @example "1fr 1fr 1fr 1fr"
   * @example "repeat(4, 1fr)"
   * @example "repeat(auto-fill, minmax(100px, 1fr))"
   */
  templateRows?: string;

  /**
   * The grid-template-areas CSS property specifies named grid areas.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
   * @example "'header header header header' 'main main main sidebar' 'footer footer footer footer'"
   */
  templateAreas?: string;
};

const _Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      element,
      templateColumns,
      templateAreas,
      templateRows,
      ...props
    },
    ref
  ) => {
    return (
      <Wrapper
        {...props}
        element={element}
        $templateColumns={templateColumns}
        $templateArea={templateAreas}
        $templateRows={templateRows}
        ref={ref}
      >
        {children}
      </Wrapper>
    );
  }
);

export const Grid = Object.assign(_Grid, { Item });
