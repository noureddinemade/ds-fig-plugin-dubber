// Import
import { AnatomyResult, PropertiesResult } from "../../data/definitions";
import { arrayCheck, getAllChildren, getRelativePosition } from "../../helpers";

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

    let children = getAllChildren(anatomyInstance, undefined, ['INSTANCE']);

    // Loop through children if they exist
    if (arrayCheck(children)) {

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
        
            .filter((c: any) => c.name !== 'focus')
            .map((c: any, k: number) => ({

                name: c.name,
                x: getRelativePosition(c).x,
                y: getRelativePosition(c).y,
                key: k + 1,

            }));
    }

    // Return
    return result;
}
