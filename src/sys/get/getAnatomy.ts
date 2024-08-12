import { frame } from "../../data/styles";
import { arrayCheck, create } from "../../helpers";

// Get anatomy from component
export function getAnatomy(component: any) {

    // Set up
    let result:     any     = null;
    let defaultV:   any     = component.defaultVariant;
    let children:   any     = arrayCheck(defaultV.children) ? defaultV.children : null;

    // Loop thru children if they exist
    if (children) {

        // Set result as array
        result = [];

        children.forEach((c: any, k: number) => {

            // Ignore accessibility children

            if (c.name !== 'focus') {

                result.push({

                    name:   c.visible === true ? c.name : `${c.name} (optional)`,
                    x:      c.x,
                    y:      c.y,
                    key:    k+1

                })

            }

        });

    }

    // Return
    return result;

}