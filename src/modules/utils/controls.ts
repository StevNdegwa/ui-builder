export const isCustomWebComponentDefined = (tagName:string) => {
    return customElements.get(tagName) !== undefined;
}

export function getElementDimensionValue(value: string | number | undefined): string {
    if(typeof value === 'string'){
        return value;
    } else if(typeof value === 'number'){
        return `${value}px`;
    }
    return "100%";

}