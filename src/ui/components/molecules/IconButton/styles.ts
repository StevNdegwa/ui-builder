import styled from "styled-components";
import { Button } from "../../atoms/Button";

export const Wrapper = styled(Button)`
  ${({
    theme: {
      borderRadius: { sm },
    },
  }) => `
    color: inherit;
    border-radius: ${sm};
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
`;

export const Gap = styled.div`
  width: 0.5rem;
`;
