import { arrayCheck } from "../../helpers";

// Get information from component
export function getInformation(component: any) {

    // Set up
    let result: any = {

        name: component.name,
        desc: component.description === '' ? null : component.description,
        link: arrayCheck(component.documentationLinks) && component.documentationLinks[0].uri ? component.documentationLinks[0].uri : null

    };

    // Return
    return result;

}