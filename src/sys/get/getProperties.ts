import { arrayCheck, cleanName, cleanType, sortArray } from "../../helpers";

// Get properties for component
export function getProperties(component: any) {

    // Set up
    let props:  any = component.componentPropertyDefinitions;
    let result: any = { variant: [], instance: [], text: [], boolean: [] };

    // Check if component has properties and then loop thru them
    for (const key in props) {

        if (props.hasOwnProperty(key)) {

            let k: any      = props[key];
            let p: any      = {};
                p.name      = cleanName(key, 'prop');
                p.type      = cleanType(key, k);
                p.default   = p.type === 'b' ? Boolean(p.default) : k.defaultValue;
                p.options   = p.type === 'v' ? k.variantOptions : null;
                p.preferred = p.type === 'i' ? k.preferredValues : null;
            
            if (p.type === 'v') { result.variant.push(p)    };
            if (p.type === 'i') { result.instance.push(p)   };
            if (p.type === 't') { result.text.push(p)       };
            if (p.type === 'b') { result.boolean.push(p)    };

        }
    }

    // Clean and return
    return result ? result : null;

}