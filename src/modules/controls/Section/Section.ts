import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('ui-section')
export class UISection extends LitElement {
  static styles = css`p { color: blue }`;


  render() {
    return html`<div><p>Builder Section</p></div>`;
  }
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "ui-section": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}