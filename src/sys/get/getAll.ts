import { getAnatomy } from "./getAnatomy";
import { getInformation } from "./getInformation";
import { getProperties } from "./getProperties";

// Get all required from component
export function getAll(selectedItems: any[]) {

    // Set up
    let result: any = [];

    // Loop thru selection
    selectedItems.forEach((i: any) => {

        let component: any = null;

        // Is the selected item a component?
        if (i.type === 'COMPONENT' || i.type === 'COMPONENT_SET') {

            // Set up component object for info to be stored in
            component = {};

            // Define information to store in component
            component.info      = getInformation(i);
            component.props     = getProperties(i);
            component.anatomy   = getAnatomy(i);

        }

        // If this item is a valid component then add to be documented
        if (component) { result.push(component) };

    });

    // Return
    return result;

}