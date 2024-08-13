// Import
import { getAnatomy } from "./get/getAnatomy";
import { getInformation } from "./get/getInformation";
import { getProperties } from "./get/getProperties";

// Get all required from component
export function getAll(selectedItems: any[]) {

    // Set up
    let result: any = [];

    // Loop thru selection
    selectedItems.forEach((i: any) => {

        let c: any = null;

        // Is the selected item a component?
        if (i.type === 'COMPONENT' || i.type === 'COMPONENT_SET') {

            // Set up component object for info to be stored in
            c = {};

            // Define information to store in component
            c.info              = getInformation(i);
            c.props             = getProperties(i);
            c.anatomy           = getAnatomy(i, c.props);

        }

        // If this item is a valid component then add to be documented
        if (c) { result.push(c) };

    });

    // Return
    return result;

}