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

export function getPropertiesAsString(props: Record<string, string | number>): string {
    let properties = "";
    
    for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            const element = props[key];
            properties += `${key}:${element};`;
        }
    }

    return properties;
}
