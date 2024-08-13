// Import
import { createAllProps } from "./createProperty";

// Create instances
export function createDescription(description: string, props: any, instance: any, parent: any) {

    // Set up
    let result: any = instance.createInstance();

    // Adjust properties
    result.setProperties({ 'comp-desc#8725:16' : description });

    // Detach instance
    result = result.detachInstance();

    // Check if there are props and then populate them if they exist
    if (props) { createAllProps(props, result) };

    // Append to frame
    parent.appendChild(result);

    // Return
    return result

}