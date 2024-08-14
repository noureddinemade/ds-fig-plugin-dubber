// Import
import { arrayCheck } from "../../helpers";

// Get anatomy from component
export function getAnatomy(component: any, props: any) {

    // Set up
    let result:             any = null;
    let anatomyInstance:    any = component.defaultVariant ? component.defaultVariant : component;
        anatomyInstance         = anatomyInstance.createInstance();
    let children:           any = arrayCheck(anatomyInstance.children) ? anatomyInstance.children : null;

    // Loop thru children if they exist
    if (children) {

        // Name instance
        anatomyInstance.name = 'anatomyInstance';

        // Check if there are boolean props
        if (arrayCheck(props.boolean)) {

            // Loop thru booleans and turn them on for instance
            props.boolean.forEach((b: any) => { if (b.name !== 'focus?') { anatomyInstance.setProperties({ [b.nameSet] : true }) } });

        }

        // Set result as array
        result = { items: [], variant: anatomyInstance };

        children.forEach((c: any, k: number) => {

            // Ignore accessibility children

            if (c.name !== 'focus') {

                result.items.push({

                    name:   c.name,
                    x:      c.x - anatomyInstance.x,
                    y:      c.y - anatomyInstance.y,
                    key:    k+1

                })

            }

        });

    }

    // Return
    return result;

}