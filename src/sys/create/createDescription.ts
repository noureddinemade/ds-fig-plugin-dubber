// Import
import { arrayCheck } from "../../helpers";
import { reComps } from "../get/getReusables";
import { createAllProps } from "./createProperty";

// Create instances
export function createDescription(description: string | null, props: any) {

    // Set up
    let result: any;
        result = reComps.filter(a => a.name === 'doc.comp-desc');
        result = result[0].comp;
        result = result.createInstance();

    // Adjust properties
    if (description) { result.setProperties({ 'comp-desc#8725:16' : description }) };

    // Detach instance
    result = result.detachInstance();

    // Find props section
    let propsFrame: FrameNode = result.findChild((n: any) => n.name === 'comp-props');

    // Check if there are props and then populate them if they exist
    let propCheck: boolean = props && !arrayCheck(props.variant) && !arrayCheck(props.instance) && !arrayCheck(props.boolean) && !arrayCheck(props.text);
    
    propCheck ? propsFrame.remove() : createAllProps(props, propsFrame);

    // Return
    return result

}