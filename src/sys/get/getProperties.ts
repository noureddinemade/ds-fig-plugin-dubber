import { cleanName, sortArray } from "../../helpers";

// Get properties for component
export function getProperties(component: any) {

    // Set up
    let props:  any = component.componentPropertyDefinitions;
    let result: any = { variant: [], instance: [], text: [], boolean: [] };

    console.log(props);

    // Check if component has properties and then loop thru them
    for (const key in props) {

        if (props.hasOwnProperty(key)) {

            let k: any      = props[key];
            let p: any      = {};
                p.name      = cleanName(key);
                p.type      = k.type;
                p.default   = k.defaultValue;
                p.options   = p.type === 'VARIANT' ? k.variantOptions : null;
                p.preferred = p.type === 'INSTANCE_SWAP' ? k.preferredValues : null;
            
            if (p.type === 'VARIANT')           { result.variant.push(p)    };
            if (p.type === 'INSTANCE_SWAP')     { result.instance.push(p)   };
            if (p.type === 'TEXT')              { result.text.push(p)       };
            if (p.type === 'BOOLEAN')           { result.boolean.push(p)    };
            

        }
    }

    // Clean and return
    return result ? result : null;

}