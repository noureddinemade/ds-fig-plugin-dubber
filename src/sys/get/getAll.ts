import { notifyAndClose } from "../../helpers";

// Get all required from component
export function getAll(selectedItems: any[], toDocument: any[]) {

    // Loop thru selection
    selectedItems.forEach((i: any) => {

        let component: any = null;

        // Is the selected item a component?
        if (i.type === 'COMPONENT' || i.type === 'COMPONENT_SET') {

            component = {};

            component.name = i.name;
            component.type = i.type;

        }

        // If this item is a valid component then add to be documented
        if (component) toDocument.push(component);

    });

}