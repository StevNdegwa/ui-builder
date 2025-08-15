import { css } from "lit";

export default css`
  :host(.ui-section) > .wrapper {
    min-height: 48px;
  }

  :host(.ui-section) > .single-column-layout {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  :host(.ui-section) > .two-column-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0px;
  }

  :host(.ui-section) > .two-column-layout > * {
    min-width: 0;
  }

  :host(.ui-section) > .three-column-layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0px;
  }

  :host(.ui-section) > .three-column-layout > * {
    min-width: 0;
  }
`;
