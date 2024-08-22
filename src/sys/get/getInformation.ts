import { ComponentInfo } from "../../data/definitions";
import { arrayCheck } from "../../helpers";

// Get information from component
export function getInformation(component: ComponentNode) {

    // Set up
    let result: ComponentInfo = {

        name: component.name,
        desc: component.description === '' ? null : component.description,
        link: arrayCheck(component.documentationLinks) && component.documentationLinks[0].uri ? component.documentationLinks[0].uri : null

    };

    // Return
    return result;

}