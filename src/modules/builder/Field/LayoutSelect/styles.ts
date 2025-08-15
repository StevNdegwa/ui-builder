import styled, { css } from "styled-components";
import { FlexBox } from "@ui/components";

export const Wrapper = styled(FlexBox)`
  width: 100%;
`;

export const LayoutPreview = styled(FlexBox)<{ $columns: number, $selected: boolean  }>`
  cursor: pointer;
  width: 80px;
  height: 40px;
  ${({ theme:{ colorSchemes: { palette: { gray } } }, $selected }) => css`
    background-color: ${gray[50]};
    border-radius: 6px;
    padding: 4px;
    gap:2px;
    border: 1px solid ${gray[50]};

    & > div {
      flex: 1;
      background-color: ${$selected ? gray[900] : 'transparent'};
      border: 1px solid ${gray[900]};
      border-radius: 4px;
      height: 100%;
    }
  `}
`;
