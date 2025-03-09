import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import { BuildableElement } from '../BuildableElement';

@customElement('ui-section')
export class UISection extends BuildableElement {

  declare width: string;
  declare height: string;

  static properties = {
    width: { type: String },
    height: { type: String }
  };

  static styles = css`
    :host {
      --ui-section-width: 100%;
      --ui-section-height: 100%;
    }

    div.ui-section-wrapper {
      width: var(--ui-section-width, 100%);
      height: var(--ui-section-height, 0px);
      border: 4px solid green;
      background-color: yellow;
      pointer-events: none;
    }`;

  constructor(){
    super();
    this.width = "100%";
    this.height = "100%";
  }

  updated(changedProperties: Map<string, string>) {
    if (changedProperties.has('width')) {
      this.style.setProperty('--ui-section-width', this.width);
    }
    if (changedProperties.has('height')) {
      this.style.setProperty('--ui-section-height', this.height);
    }
  }

  render() {
    return html`<div class="ui-section-wrapper"><p>Builder Section</p></div>`;
  }
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "ui-section": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >& {
        width?: string;
        height?: string;
      };
    }
  }
}