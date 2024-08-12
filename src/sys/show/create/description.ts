import { arrayCheck } from "../../../helpers";
import { createAllProps } from "./property";

// Create instances
export function createDescription(description: any, props: any, instance: any, append: any) {

    // Set up
    let result: any = instance.createInstance();

    // Adjust properties
    result.setProperties({ 'comp-desc#8725:16' : description });

    // Detach instance
    result = result.detachInstance();

    // Check if there are props and then populate them if they exist
    if (props) { createAllProps(props, result) };

    // // Check if there are booleans
    // if (arrayCheck(props.boolean)) {

    //     // Get boolean frame
    //     let booleanFrame:   any = result.findChild((n: any) => n.name === 'content');
    //         booleanFrame        = booleanFrame.findChild((n: any) => n.name === 'property-boolean');
    //         booleanFrame        = booleanFrame.children[1];
    //     let booleanProp:    any = booleanFrame.findChild((n: any) => n.name === 'item');

    //     // Loop thru booleans
    //     props.boolean.forEach((b: any) => {

    //         // Create prop frame
    //         let propFrame: any = booleanProp.clone();
                
    //         // Set name
    //         propFrame.setProperties({ 'label#8808:0' : b.name });

    //         // Append
    //         booleanFrame.appendChild(propFrame);

    //     })

    //     // Remove default prop
    //     booleanProp.remove();

    // }

    // Append to frame
    append.appendChild(result);

    // Return
    return result

}