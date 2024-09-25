import { nodeStyles } from "../../data/styles";
import { arrayCheck, create } from "../../helpers";

// Create property item
function createProp(prop: any, original: any, parent: any) {

    // Set up
    const propFrame = create(prop.name, nodeStyles.prop, 'frame');

    // Customise
    propFrame.name = prop.name;

    // Clone original
    let newProp: any = original.clone();

    // Set name
    newProp.setProperties({ 'label#8808:0' : prop.name });

    // Append to parent
    propFrame.appendChild(newProp);
    parent.appendChild(propFrame);

    // Check if there are any values
    if (arrayCheck(prop.options)) {

        parent.layoutMode               = 'VERTICAL';
        parent.layoutSizingVertical     = 'HUG';

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
            propFrame.appendChild(newOption);

        })

    }

}

// Create individual properties
function createIndividualProps(props: any, parent: any) {

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

    arrayCheck(props.variant)   ? createIndividualProps(props.variant, vFrame)     : vFrame.remove();
    arrayCheck(props.text)      ? createIndividualProps(props.text, tFrame)        : tFrame.remove();
    arrayCheck(props.boolean)   ? createIndividualProps(props.boolean, bFrame)     : bFrame.remove();
    arrayCheck(props.instance)  ? createIndividualProps(props.instance, iFrame)    : iFrame.remove();

}