// Import
import { AnatomyResult, PropertiesResult } from "../../data/definitions";
import { arrayCheck } from "../../helpers";

// Get anatomy from component
export function getAnatomy(component: ComponentSetNode, props: PropertiesResult | null): AnatomyResult | null {

    // Set up
    let result:             AnatomyResult | null    = null;
    let anatomyInstance:    any                     = component.defaultVariant ? component.defaultVariant : component;

    // Ensure anatomyInstance is not null
    if (anatomyInstance === null) {

        throw new Error("anatomyInstance is null and cannot create an instance.");

    }

        anatomyInstance = anatomyInstance.createInstance();
    let children = arrayCheck(anatomyInstance.children) ? anatomyInstance.children : [];

    // Loop through children if they exist
    if (children.length > 0) {

        // Name instance
        anatomyInstance.name = 'anatomyInstance';

        // Check if there are boolean props
        if (props && arrayCheck(props.boolean)) {

            // Loop through booleans and turn them on for instance
            props.boolean.forEach((b) => {

                // Exclude accessibility
                if (b.name !== 'focus?') {

                    anatomyInstance.setProperties({ [b.nameSet]: true });

                }

            });
        }

        // Set result as an array
        result = { items: [], variant: anatomyInstance };

        result.items = children
        
            .filter((c: ComponentNode) => c.name !== 'focus')
            .map((c: ComponentNode, k: number) => ({

                name: c.name,
                x: c.x - anatomyInstance!.x,
                y: c.y - anatomyInstance!.y,
                key: k + 1,

            }));
    }

    // Return
    return result;
}
