
// Component properties: variant, boolean, text and instance
export interface ComponentPropertyDefinition {

    defaultValue: any;
    variantOptions?: any[];
    preferredValues?: any[];

}

// Result extracted from component property
export interface PropertyResult {

    nameSet: string;
    name: string;
    type: string;
    default: any;
    options?: any[] | null;
    preferred?: any[] | null;

}

// Result for anatomy item
interface AnatomyItem {

    name: string;
    x: number;
    y: number;
    key: number;

}

// Result for anatomy array
export interface AnatomyResult {

    items: AnatomyItem[],
    variant: InstanceNode

}

// Result for documentation
export interface PropertiesResult {

    variant: PropertyResult[];
    instance: PropertyResult[];
    text: PropertyResult[];
    boolean: PropertyResult[];
    propVariant: InstanceNode;

}

export interface ComponentInfo {

    name: string;
    desc: string | null;
    link: string | null;

}

export interface DocComponent {

    info: ComponentInfo;
    props: PropertiesResult;
    anatomy: AnatomyResult;

}