// Import
import { PropertyResult } from "../../data/definitions";
import { sizeFrameProps } from "../../data/styles";
import { arrayCheck, capitaliseFirstLetter, clearNodeChildren, create, resizeElement } from "../../helpers";

function setSizeForArtefact(artefact: any, type: string, value: string): [number, number] {
    return type === 'width' ? [artefact[value], artefact.height] : [artefact.width, artefact[value]];
}

function setSizeForElement(sizeElement: InstanceNode, artefact: any, type: string, value: string): [number, number] {
    return type === 'width' ? [artefact[value], sizeElement.height] : [sizeElement.width, artefact[value]];
}

// Create option artefacts
function createOptionArtefacts(variant: PropertyResult, parent: any, artefact: InstanceNode) {

    // Loop thru options
    if (variant && variant.options) {

        variant.options.forEach((o: string) => {

            // Clone artefact
            let variantOption: InstanceNode = artefact.clone();
    
            // Set property for artefact
            variantOption.setProperties({ [variant.nameSet] : o });
    
            // Name artefact
            variantOption.name = o;
    
            // Append to parent
            parent.appendChild(variantOption);
    
        })

    }

}

// Create size element for artefact
function createSizeElement(
    measure: ComponentSetNode, 
    artefact: any, 
    type: 'width' | 'height', 
    minmax: string
): FrameNode {

    // Setup
    const result: FrameNode = create(`${minmax + type}`, sizeFrameProps, 'frame') as FrameNode;
    const sizeElement: InstanceNode = measure.defaultVariant.createInstance();
    const value = minmax + capitaliseFirstLetter(type);

    // Define sizes
    const artefactSize: [number, number] = setSizeForArtefact(artefact, type, value);
    const elementSize: [number, number] = setSizeForElement(sizeElement, artefact, type, value);

    // Customize element & artefact
    sizeElement.setProperties({ 
        'label#8818:2': `${minmax}:${artefact[value]}`,
        'direction': type,
        'type': minmax,
    });

    resizeElement(sizeElement, elementSize[0], elementSize[1]);
    resizeElement(artefact, artefactSize[0], artefactSize[1]);

    sizeElement.layoutSizingHorizontal = type === 'height' ? 'HUG' : 'FIXED';

    // Append to result frame
    result.appendChild(sizeElement);
    result.appendChild(artefact);

    // Return
    return result;
}


// Create size artefacts
function createSizeArtefacts(parent: FrameNode, artefact: FrameNode, measure: ComponentSetNode): FrameNode[] {

    // Set up
    const sizeElements: FrameNode[] = [];

    // Array of size properties and corresponding types
    const sizeProperties: Array<{ prop: keyof FrameNode, type: 'width' | 'height', minmax: 'min' | 'max' }> = [
        { prop: 'minWidth', type: 'width', minmax: 'min' },
        { prop: 'minHeight', type: 'height', minmax: 'min' },
        { prop: 'maxWidth', type: 'width', minmax: 'max' },
        { prop: 'maxHeight', type: 'height', minmax: 'max' },
    ];

    // Check if artefact has size constraints and create size elements
    sizeProperties.forEach(({ prop, type, minmax }) => {
        if (artefact[prop]) {
            sizeElements.push(createSizeElement(measure, artefact.clone(), type, minmax));
        }
    });

    // Clear previous artefacts and append new ones
    if (sizeElements.length > 0) {
        clearNodeChildren(parent);
        sizeElements.forEach(element => parent.appendChild(element));
    }

    // Return
    return sizeElements;
}


// Create instances
export function createSpecifications(props: {
    variant?: PropertyResult[];
    propVariant: any;
}, instance: any, measure: any): FrameNode {

    // Create and detach instance
    const result: FrameNode = instance.createInstance().detachInstance();

    // Find temporary block
    const tempBlock: FrameNode | null = result.findChild(node => node.name === 'block') as FrameNode;

    // Handle variants
    if (props.variant && props.variant.length > 0) {
        props.variant.forEach(variant => {
            const propBlock: FrameNode = tempBlock?.clone() as FrameNode;
            const variantArtifactFrame: FrameNode | null = propBlock.findChild(node => node.name === 'diagram') as FrameNode;
            const propBlockTitle: TextNode | null = propBlock.findChild(node => node.name === 'section-subtitle') as TextNode;

            if (propBlock) {
                propBlock.name = `block-${variant.name}`;
                if (propBlockTitle) propBlockTitle.characters = variant.name;

                // Create artefacts for this variant
                createOptionArtefacts(variant, variantArtifactFrame, props.propVariant);

                // Append to result
                result.appendChild(propBlock);
            }
        });

        // Create size artefacts
        const sizeBlock: FrameNode | null = result.findChild(node => node.name === 'block-size') as FrameNode;
        const sizeArtefactFrame: FrameNode | null = tempBlock?.findChild(node => node.name === 'diagram')?.clone() as FrameNode;

        if (sizeArtefactFrame && arrayCheck(createSizeArtefacts(sizeArtefactFrame, props.propVariant, measure))) {
            if (sizeBlock) {
                sizeBlock.appendChild(sizeArtefactFrame);
            } else {
                const wAndHBlock: FrameNode = tempBlock?.clone() as FrameNode;
                const wAndHTitle: TextNode | null = wAndHBlock.findChild(node => node.name === 'section-subtitle') as TextNode;
                const wAndHDiagram: FrameNode | null = wAndHBlock.findChild(node => node.name === 'diagram') as FrameNode;

                if (wAndHBlock && wAndHTitle && wAndHDiagram) {
                    wAndHDiagram.remove();
                    wAndHBlock.name = `block-width-height`;
                    wAndHTitle.characters = 'Width and Height';
                    wAndHBlock.appendChild(sizeArtefactFrame);
                    result.appendChild(wAndHBlock);
                }
            }
        }
    }

    // Clean up
    tempBlock?.remove();

    return result;
}
