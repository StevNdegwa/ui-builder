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
  `}
`;

export const Gap = styled.div`
  width: 0.5rem;
`;
