import { PropertiesResult, ComponentPropertyDefinition, PropertyResult } from "../../data/definitions";
import { cleanName, cleanType, namingCheck } from "../../helpers";


export function getProperties(component: ComponentSetNode): PropertiesResult | null {

    // Set up
    const result: PropertiesResult = { variant: [], instance: [], text: [], boolean: [], propVariant: null as unknown as InstanceNode };
    const props: Record<string, ComponentPropertyDefinition> = component.componentPropertyDefinitions;

    let propVariant:    any = component.defaultVariant ? component.defaultVariant : component;
        propVariant         = propVariant ? propVariant.createInstance() : null;

    // Customise instance
    if (propVariant) propVariant.name = 'propertyInstance';

    // Check if component has properties and then loop through them
    if (props) {

        result.propVariant = propVariant;

        for (const [key, k] of Object.entries(props)) {

            let p: PropertyResult = {

                nameSet:    key,
                name:       cleanName(key, 'prop'),
                type:       cleanType(key, k),
                default:    k.defaultValue,
                options:    k.variantOptions ?? null,
                preferred:  k.preferredValues ?? null

            };

            if (p.type === 'v') { result.variant.push(p); }
            if (p.type === 'i') { result.instance.push(p); }
            if (p.type === 't') { result.text.push(p); }
            if (p.type === 'b') { result.boolean.push(p); }

            namingCheck(p.name, p.type);
        }
    }

    // If there were no properties, return null
    return result;
}
