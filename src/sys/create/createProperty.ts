import { arrayCheck } from "../../helpers";

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
    let parentFrame:    any = parent.children[1];
    let childFrame:     any = parentFrame.findChild((n: any) => n.name === 'item');

    // Loop thru prop values
    props.forEach((p: any) => { createProp(p, childFrame, parentFrame) });

    // Remove default childFrame
    childFrame.remove();

}

// Create all properties
export function createAllProps(props: any, parent: any) {

    // Setup
    let pFrame: any = parent.findChild((n: any) => n.name === 'content');
    let vFrame: any = pFrame.findChild((n: any) => n.name === 'property-v');
    let tFrame: any = pFrame.findChild((n: any) => n.name === 'property-t');
    let bFrame: any = pFrame.findChild((n: any) => n.name === 'property-b');
    let iFrame: any = pFrame.findChild((n: any) => n.name === 'property-i');

    arrayCheck(props.variant)   ? createIndividualProps(props.variant, vFrame, 'v')     : vFrame.remove();
    arrayCheck(props.text)      ? createIndividualProps(props.text, tFrame, 't')        : tFrame.remove();
    arrayCheck(props.boolean)   ? createIndividualProps(props.boolean, bFrame, 'b')     : bFrame.remove();
    arrayCheck(props.instance)  ? createIndividualProps(props.instance, iFrame, 'i')    : iFrame.remove();

}