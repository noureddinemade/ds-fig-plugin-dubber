// Import
import { PropertyResult } from "../../data/definitions";
import { nodeStyles } from "../../data/styles";
import { arrayCheck, capitaliseFirstLetter, clearNodeChildren, create, resizeElement } from "../../helpers";
import { reComps } from "../get/getReusables";

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

            try {

                // Clone artefact
                let variantOption: InstanceNode = artefact.clone();

                variantOption.setProperties({ [variant.nameSet]: o });
        
                // Name artefact
                variantOption.name = o;
        
                // Append to parent
                parent.appendChild(variantOption);
                
            } catch (error) {

                console.warn(`Failed to set properties for ${variant.nameSet} with option ${o}:`, error);
                
            }

        })

    }

}

// Create size element for artefact
function createSizeElement(
    artefact: any, 
    type: 'width' | 'height', 
    minmax: string
): FrameNode {

    // Setup
    const result: FrameNode = create(`${minmax + type}`, nodeStyles.size, 'frame') as FrameNode;
    const value = minmax + capitaliseFirstLetter(type);

    let sizeElement: any;
        sizeElement = reComps.filter(a => a.name === 'doc.measure');
        sizeElement = sizeElement[0].comp;
        sizeElement = sizeElement.defaultVariant;
        sizeElement = sizeElement.createInstance();

    // Define sizes
    const artefactSize: [number, number] = setSizeForArtefact(artefact, type, value);
    const elementSize: [number, number] = setSizeForElement(sizeElement, artefact, type, value);

    // Customize element & artefact
    sizeElement.setProperties({ 
        'label#8818:2': `${minmax}:${artefact[value]}px`,
        'direction': type,
        'type': minmax,
    });

    resizeElement(sizeElement, elementSize[0], elementSize[1]);
    resizeElement(artefact, artefactSize[0], artefactSize[1]);

    sizeElement.layoutSizingHorizontal = type === 'height' ? 'HUG' : 'FIXED';
    result.layoutMode =  type === 'height' ? 'HORIZONTAL' : 'VERTICAL';
    artefact.name = value;

    // Append to result frame
    result.appendChild(sizeElement);
    result.appendChild(artefact);

    // Return
    return result;
}

// Create size artefacts
function createSizeArtefacts(parent: FrameNode, artefact: FrameNode): FrameNode[] {

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
            sizeElements.push(createSizeElement(artefact.clone(), type, minmax));
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
export function createSpecifications(props: { variant?: PropertyResult[]; propVariant: any; }): FrameNode {

    // Create and detach instance
    let result: any;
        result = reComps.filter(a => a.name === 'doc.comp-section');
        result = result[0].comp;
        result = result.createInstance();
        result = result.detachInstance();

    // Find temporary block
    let block       = result.findChild((n: FrameNode) => n.name === 'block') as FrameNode;
    let heading     = result.findChild((n: TextNode) => n.name === 'section-title') as TextNode;

    // Handle variants
    if (props.variant && props.variant.length > 0) {

        heading.characters = 'Specifications';

        props.variant.forEach(variant => {

            const propBlock: FrameNode = block?.clone() as FrameNode;
            const variantArtifactFrame: FrameNode | null = propBlock.findChild(node => node.name === 'diagram') as FrameNode;
            const propBlockTitle: TextNode | null = propBlock.findChild(node => node.name === 'section-subtitle') as TextNode;

            if (propBlock) {
                propBlock.name = `block-${variant.name}`;
                if (propBlockTitle) propBlockTitle.characters = variant.name;

                // Create artefacts for this variant
                createOptionArtefacts(variant, variantArtifactFrame, props.propVariant);

                variantArtifactFrame.name = `diagram: ${variant.name}`;

                // Append to result
                result.appendChild(propBlock);
            }
        });

        // Create size artefacts
        const sizeBlock: FrameNode | null = result.findChild((node: FrameNode) => node.name === 'block-size') as FrameNode;
        const sizeArtefactFrame: FrameNode | null = block?.findChild(node => node.name === 'diagram')?.clone() as FrameNode;

        if (sizeArtefactFrame && arrayCheck(createSizeArtefacts(sizeArtefactFrame, props.propVariant))) {
            if (sizeBlock) {
                sizeBlock.appendChild(sizeArtefactFrame);
                sizeArtefactFrame.name = 'diagram: width-and-height';
            } else {
                const wAndHBlock: FrameNode = block?.clone() as FrameNode;
                const wAndHTitle: TextNode | null = wAndHBlock.findChild(node => node.name === 'section-subtitle') as TextNode;
                const wAndHDiagram: FrameNode | null = wAndHBlock.findChild(node => node.name === 'diagram') as FrameNode;

                if (wAndHBlock && wAndHTitle && wAndHDiagram) {
                    wAndHDiagram.remove();

                    wAndHBlock.name = `block-width-and-height`;
                    wAndHTitle.characters = 'Width and Height';
                    wAndHBlock.appendChild(sizeArtefactFrame);
                    result.appendChild(wAndHBlock);
                }
            }
        }
        else { sizeArtefactFrame.remove() }
    }

    // Clean up
    block?.remove();

    return result;
}