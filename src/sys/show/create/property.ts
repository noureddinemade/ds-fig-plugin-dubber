import { arrayCheck } from "../../../helpers";

// Create property item
function createProp(prop: any, original: any, parent: any) {

    // Clone original
    let newProp: any = original.clone();

    // Set name
    newProp.setProperties({ 'label#8808:0' : prop.name });

    // Append to parent
    parent.appendChild(newProp);

    // Check if there are any values
    if (arrayCheck(prop.options)) {

        // Loop thru options
        prop.options.forEach((o: any) => {

            // Clone original
            let newOption: any = original.clone();

            // Set properties
            newOption.setProperties({ 

                'label#8808:0' : o,
                'type': o === prop.default ? 'default' : 'value'

            });

            // Append to parent
            parent.appendChild(newOption);

        })

    }

}

// Create individual properties
function createIndividualProps(props: any, parent: any, type: string) {

    // Setup
    let parentFrame:    any = parent.findChild((n: any) => n.name === `property-${type}`);
        parentFrame         = parentFrame.children[1];
    let childFrame:     any = parentFrame.findChild((n: any) => n.name === 'item');

    // Loop thru prop values
    props.forEach((p: any) => { createProp(p, childFrame, parentFrame) });

    // Remove default childFrame
    childFrame.remove();

}

// Create all properties
export function createAllProps(props: any, parent: any) {

    // Setup
    let propsFrame:         any = parent.findChild((n: any) => n.name === 'content');

    if (arrayCheck(props.variant))  { createIndividualProps(props.variant, propsFrame, 'v')     }
    if (arrayCheck(props.text))     { createIndividualProps(props.text, propsFrame, 't')        }
    if (arrayCheck(props.boolean))  { createIndividualProps(props.boolean, propsFrame, 'b')     }
    if (arrayCheck(props.instance)) { createIndividualProps(props.instance, propsFrame, 'i')    }

}