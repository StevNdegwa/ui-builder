import styled from "styled-components";
import { Button } from "../../atoms/Button";

export const Wrapper = styled(Button)`
  ${({
    theme: {
      borderRadius: { xs },
    },
  }) => `
    color: inherit;
    border-radius: ${xs};
  `}
`;

export const Gap = styled.div`
  width: 0.5rem;
`;
