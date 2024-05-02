import { sortArray } from "../../helpers";

// Get properties for component
export function getProperties(component: any) {

    // Set up
    let props:  any = component.componentPropertyDefinitions;
    let result: any = [];

    console.log(props);

    // Check if component has properties and then loop thru them
    for (const key in props) {

        if (props.hasOwnProperty(key)) {

            let property: any   = {};
                property.title  = key;
                property.type   = props[key].type;
            
            result.push(property);

        }
    }

    // Clean and return
    sortArray(result, 'type');
    return result ? result : null;

}