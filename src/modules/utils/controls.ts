export const isCustomWebComponentDefined = (tagName:string) => {
    return customElements.get(tagName) !== undefined;
}