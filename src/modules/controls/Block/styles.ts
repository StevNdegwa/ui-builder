import { css } from "lit";

export default css`
  :host(.ui-block) {
    --ui-block-width: 100%;
    --ui-block-height: auto;
    height: var(--ui-block-height);
    width: var(--ui-block-width);
    display: block;
  }

  :host(.ui-block) > .wrapper {
    width: 100%;
    height: 100%;
    background-color: var(--ui-block-bg-color, transparent);
  }
`;
