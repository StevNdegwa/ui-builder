import { css } from "lit";

export default css`
  :host(.ui-image) {
    width: 100%;
    height: auto;
    max-height: 100%;
    overflow: hidden;
  }

  :host(.ui-image) > .image-wrapper {
    width: 100%;
    height: auto;
  }
`;
