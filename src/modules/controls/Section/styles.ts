import { css } from "lit";

export default css`
  :host(.ui-section) {
    --ui-section-width: 100%;
    --ui-section-height: auto;
    height: var(--ui-section-height);
    width: var(--ui-section-width);
  }

  :host(.ui-section) > .wrapper {
    min-height: 120px;
    height: auto;
  }
`;
