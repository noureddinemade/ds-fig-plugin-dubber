// Import
import { arrayCheck } from "../../helpers";
import { createAllProps } from "./createProperty";

// Create instances
export function createDescription(description: string, props: any, instance: any, parent: any) {

    // Set up
    let result: any = instance.createInstance();

    // Adjust properties
    if (description) { result.setProperties({ 'comp-desc#8725:16' : description }) };

    // Detach instance
    result = result.detachInstance();

    // Find props section
    let propsFrame: any = result.findChild((n: any) => n.name === 'comp-props');

    // Check if there are props and then populate them if they exist
    let propCheck: any = props && !arrayCheck(props.variant) && !arrayCheck(props.instance) && !arrayCheck(props.boolean) && !arrayCheck(props.text);
    
    propCheck ? propsFrame.remove() : createAllProps(props, propsFrame);

    // Append to frame
    parent.appendChild(result);

    // Return
    return result

}