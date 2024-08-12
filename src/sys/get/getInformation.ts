import { arrayCheck } from "../../helpers";

// Get information from component
export function getInformation(component: any) {

    // Set up
    let result: any = {};

    // Get name, description and link for full component
    result.name = component.name;
    result.desc = component.description === '' ? null : component.description;
    result.link = arrayCheck(component.documentationLinks) && component.documentationLinks[0].uri ? component.documentationLinks[0].uri : null;

    // Return
    return result;

}