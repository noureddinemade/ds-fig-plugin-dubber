// Import
import { handleError, notifyAndClose } from "../helpers";
import { getAnatomy } from "./get/getAnatomy";
import { getInformation } from "./get/getInformation";
import { getProperties } from "./get/getProperties";

// Set component to return
function setComp(component: any) {

    return {

        info:       getInformation(component),
        props:      getProperties(component),
        anatomy:    getAnatomy(component, getProperties(component))

    }

}

// Get all required from component
export async function getAll(selectedItems: any[]): Promise<any[]> {

    const promises = selectedItems.map(async (i: any) => {

        let c: any = null;

        if (i.type === 'COMPONENT' || i.type === 'COMPONENT_SET') {

            try { c = setComp(i) } 
            catch (error) { handleError('Could not get component details', error) }

        } else if (i.type === 'INSTANCE') {

            try {

                c = await i.getMainComponentAsync();

                c = setComp(c);


            } catch (error) { handleError('Could not get the main component', error) }

        }

        console.log(c);

        return c;  // Return the component or null
    
    });

    const result = await Promise.all(promises);
    return result.filter(Boolean);  // Filter out any nulls

}