import styled from "styled-components";
import { Notification } from "../Notification";

export const Wrapper = styled(Notification)<{ $show?: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 300px;

  ${({
    $show,
    theme: {
      colorSchemes: {
        bg,
        palette: { secondary },
      },
      layers,
    },
  }) => `
    ${
      $show
        ? `transform: translateY(0);
        bottom: 20px;`
        : `transform: translateY(100%);
        bottom: 0;`
    }
    border-bottom: 4px solid ${secondary[500]};
    background-color: ${bg};
    z-index: ${layers.notification};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  `};
`;
