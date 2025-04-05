import { css } from "lit";

export default css`
  :host(.ui-block) {
    --ui-buildable-element-width: 100%;
    --ui-buildable-element-height: 100%;
    height: var(--ui-buildable-element-height);
    width: var(--ui-buildable-element-width);
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    display: block;
  }

  :host(.ui-block) > .wrapper {
    width: var(--ui-buildable-element-width);
    height: var(--ui-buildable-element-height);
    background-color: var(--ui-buildable-element-bg-color, transparent);
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
  }
`;
