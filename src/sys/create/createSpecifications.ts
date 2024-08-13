// Import
import { sizeFrameProps } from "../../data/styles";
import { arrayCheck, capitaliseFirstLetter, clearNodeChildren, create } from "../../helpers";

// Create option artifacts
function createOptionArtifacts(variant: any, parent: any, artifact: any) {

    // Loop thru options
    variant.options.forEach((o: any) => {

        // Clone artifact
        let variantOption: any = artifact.clone();

        // Set property for artifact
        variantOption.setProperties({ [variant.nameSet] : o });

        // Name artifact
        variantOption.name = o;

        // Append to parent
        parent.appendChild(variantOption);

    })

}

// Create size element for artifact
function createSizeElement(measure: any, artifact: any, type: string, minmax: string) {

    // Setup
    let result:         any = create(type, sizeFrameProps, 'frame');
    let sizeElement:    any = measure.defaultVariant.createInstance();
    let value:          any = minmax+capitaliseFirstLetter(type)
    let sizeA:          any;
    let sizeS:          any;

    // Define sizes
    if (type === 'width') {


        sizeA = [artifact[value], artifact.height];
        sizeS = [artifact[value], sizeElement.height];

    } else {

        result.layoutMode = 'HORIZONTAL';

        sizeA = [artifact.width, artifact[value]];
        sizeS = [sizeElement.width, artifact[value]];
        
    }

    // Customise element & artfact
    sizeElement.setProperties({ 

        'label#8818:2': `${artifact[value]}`,
        'direction': type
    })

    sizeElement.resize(sizeS[0], sizeS[1]);
    artifact.resize(sizeA[0], sizeA[1]);

    // Append
    result.appendChild(sizeElement);
    result.appendChild(artifact);

    // Return
    return result;

}

// Create size artifacts
function createSizeArtifacts(parent: any, artifact: any, measure: any) {

    // Set up
    let artifacts:  any     = [];

    // Check if variant has a min or max width/height
    if (artifact.minWidth)  { artifacts.push(createSizeElement(measure, artifact.clone(), 'width', 'min')) };
    if (artifact.minHeight) { artifacts.push(createSizeElement(measure, artifact.clone(), 'height', 'min')) };
    if (artifact.maxWidth)  { artifacts.push(createSizeElement(measure, artifact.clone(), 'width', 'max')) };
    if (artifact.maxHeight)  { artifacts.push(createSizeElement(measure, artifact.clone(), 'height', 'max')) };

    // Check if there are any size artifacts to display
    if (arrayCheck(artifacts)) {

        // Set up
        let grandParent:   any = parent.parent;
        let sizeArtifacts:  any = parent.clone();

        console.log(parent.name, grandParent.name)
        
        // Clear sizeArtifacts of any previous artifacts
        clearNodeChildren(sizeArtifacts);

        // Append
        artifacts.forEach((a: any) => { sizeArtifacts.appendChild(a) }) ;
        grandParent.appendChild(sizeArtifacts);

    }


}

// Create instances
export function createSpecifications(props: any, instance: any, parent: any, measure: any) {

    // Set up
    let result:     any = instance.createInstance();
        result          = result.detachInstance();
    let tempBlock:  any = result.findChild((n: any) => n.name === 'block');

    // Check if there are variants
    if (arrayCheck(props.variant)) {

        // Set up
        let artifactFrame: any = tempBlock.findChild((n: any) => n.name === 'diagram');

        // Loop thru variants and create blocks and artifacts
        props.variant.forEach((p: any) => {

            // Create and find elements
            let propBlock:              any = tempBlock.clone();
            let variantArtifcatFrame:   any = propBlock.findChild((n: any) => n.name === 'diagram');
            let propBlockTitle:         any = propBlock.findChild((n: any) => n.name === 'section-subtitle');

            // Name block
            propBlock.name = `block-${p.name}`;
            propBlockTitle.characters = p.name;

            // Create artifacts
            createOptionArtifacts(p, variantArtifcatFrame, props.propVariant);

            // Append to section
            result.appendChild(propBlock);

        })

        // Create size artifacts
        createSizeArtifacts(artifactFrame, props.propVariant, measure);

    }

    // Remove tempBlock & propVariant
    tempBlock.remove();
    props.propVariant.remove();

    // Append to frame
    parent.appendChild(result);

    // Return
    return result

}