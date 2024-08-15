// Import
import { sizeFrameProps } from "../../data/styles";
import { arrayCheck, capitaliseFirstLetter, clearNodeChildren, create } from "../../helpers";

// Create option artefacts
function createOptionartefacts(variant: any, parent: any, artefact: any) {

    // Loop thru options
    variant.options.forEach((o: any) => {

        // Clone artefact
        let variantOption: any = artefact.clone();

        // Set property for artefact
        variantOption.setProperties({ [variant.nameSet] : o });

        // Name artefact
        variantOption.name = o;

        // Append to parent
        parent.appendChild(variantOption);

    })

}

// Create size element for artefact
function createSizeElement(measure: any, artefact: any, type: string, minmax: string) {

    // Setup
    let result:         any = create(`${minmax+type}`, sizeFrameProps, 'frame');
    let sizeElement:    any = measure.defaultVariant.createInstance();
    let value:          any = minmax+capitaliseFirstLetter(type);
    let sizeA:          any;
    let sizeS:          any;

    // Define sizes
    if (type === 'width') {


        sizeA = [artefact[value], artefact.height];
        sizeS = [artefact[value], sizeElement.height];

    } else {

        result.layoutMode = 'HORIZONTAL';

        sizeA = [artefact.width, artefact[value]];
        sizeS = [sizeElement.width, artefact[value]];
        
    }

    // Customise element & artfact
    sizeElement.setProperties({ 

        'label#8818:2': `${minmax}:${artefact[value]}`,
        'direction': type,
        'type': minmax
    })

    // Resize
    sizeElement.resize(sizeS[0], sizeS[1]);
    artefact.resize(sizeA[0], sizeA[1]);

    type === 'height' ? sizeElement.layoutSizingHorizontal = 'HUG' : sizeElement.layoutSizingHorizontal = 'FIXED';

    // Append
    result.appendChild(sizeElement);
    result.appendChild(artefact);

    // Return
    return result;

}

// Create size artefacts
function createSizeartefacts(parent: any, artefact: any, measure: any) {

    // Set up
    let artefacts: any = [];

    // Check if variant has a min or max width/height
    if (artefact.minWidth)  { artefacts.push(createSizeElement(measure, artefact.clone(), 'width', 'min')) };
    if (artefact.minHeight) { artefacts.push(createSizeElement(measure, artefact.clone(), 'height', 'min')) };
    if (artefact.maxWidth)  { artefacts.push(createSizeElement(measure, artefact.clone(), 'width', 'max')) };
    if (artefact.maxHeight)  { artefacts.push(createSizeElement(measure, artefact.clone(), 'height', 'max')) };

    // Check if there are any size artefacts to display
    if (arrayCheck(artefacts)) {
        
        // Clear sizeartefacts of any previous artefacts
        clearNodeChildren(parent);

        // Append
        artefacts.forEach((a: any) => { parent.appendChild(a) }) ;

    }

    // Return
    return artefacts;

}

// Create instances
export function createSpecifications(props: any, instance: any, parent: any, measure: any) {

    // Set up
    let result:     any = instance.createInstance();
        result          = result.detachInstance();
    let tempBlock:  any = result.findChild((n: any) => n.name === 'block');

    // Check if there are variants
    if (arrayCheck(props.variant)) {

        // Loop thru variants and create blocks and artefacts
        props.variant.forEach((p: any) => {

            // Create and find elements
            let propBlock:              any = tempBlock.clone();
            let variantArtifcatFrame:   any = propBlock.findChild((n: any) => n.name === 'diagram');
            let propBlockTitle:         any = propBlock.findChild((n: any) => n.name === 'section-subtitle');

            // Name block
            propBlock.name = `block-${p.name}`;
            propBlockTitle.characters = p.name;

            // Create artefacts
            createOptionartefacts(p, variantArtifcatFrame, props.propVariant);

            // Append to section
            result.appendChild(propBlock);

        })

        // Create size artefacts
        let sizeBlock:          any = result.findChild((n: any) => n.name === 'block-size');
        let sizeartefactFrame:  any = tempBlock.findChild((n: any) => n.name === 'diagram');
            sizeartefactFrame       = sizeartefactFrame.clone();
        
        
        // Check if any size artefacts were created
        if (arrayCheck(createSizeartefacts(sizeartefactFrame, props.propVariant, measure))) {

            // Check if size block exists
            if (sizeBlock) { sizeBlock.appendChild(sizeartefactFrame) }
            else {

                // Create width and height block
                let wAndHBlock:     any = tempBlock.clone();
                let wAndHTitle:     any = wAndHBlock.findChild((n: any) => n.name === 'section-subtitle');
                let wAndHDiagram:   any = wAndHBlock.findChild((n: any) => n.name === 'diagram');

                // Remove default diagram
                wAndHDiagram.remove();

                // Name block
                wAndHBlock.name = `block-width-height`;
                wAndHTitle.characters = 'Width and Height';

                // Append
                wAndHBlock.appendChild(sizeartefactFrame);
                result.appendChild(wAndHBlock);

            }

        }

    }

    // Remove tempBlock & propVariant
    tempBlock.remove();

    // Append to frame
    parent.appendChild(result);

    // Return
    return result

}