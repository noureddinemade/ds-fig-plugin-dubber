// Import
import { artefacts } from "../../data/arrays";
import { cleanName } from "../../helpers";

// Create accessibility artefacts
function createAccessibilityArtefact(props: {
    boolean: { name: string; nameSet: string }[];
    propVariant: InstanceNode;
}, name: string): InstanceNode | null {

    // Filter boolean properties based on the provided name
    const matchingProps = props.boolean.filter(prop => prop.name === name);

    // Check if there are any matches
    if (matchingProps.length === 0) {
        return null; // No matches found, return null
    }

    // Create and configure the instance for the first matching prop
    const matchedProp = matchingProps[0];
    const instance = props.propVariant.clone();
    instance.setProperties({ [matchedProp.nameSet]: true });

    return instance;
}

// Create content artefacts
function createContentArtefact(props: any, artefactName: any) {
    return true;
}

// Create accessbility block
function createAccessibilityBlock(props: any, blockTemplate: FrameNode, result: FrameNode) {
    artefacts.access.forEach((artefactName: any) => {
        let artefact = createAccessibilityArtefact(props, artefactName);
        
        if (artefact) {
            let accessBlock = blockTemplate.clone();
            let accessTitle = accessBlock.findChild((n) => n.name === 'section-subtitle') as TextNode | null;
            let accessDiagram = accessBlock.findChild((n) => n.name === 'diagram') as FrameNode | null;
            let cleanArtefactName = cleanName(artefactName, 'boolean');

            if (accessTitle) accessTitle.characters = cleanArtefactName;
            if (accessDiagram) accessDiagram.appendChild(artefact);

            accessBlock.name = `block-${cleanArtefactName}`;
            result.appendChild(accessBlock);
        }
    });
}

// Create content block
function createContentBlock(props: any, blockTemplate: FrameNode, result: FrameNode) {
    artefacts.content.forEach((artefactName: any) => {
        let artefact = createContentArtefact(props, artefactName);

        if (artefact) {
            let accessBlock = blockTemplate.clone();
            let accessTitle = accessBlock.findChild((n) => n.name === 'section-subtitle') as TextNode | null;
            let accessDiagram = accessBlock.findChild((n) => n.name === 'diagram') as FrameNode | null;
            let cleanArtefactName = cleanName(artefactName, 'boolean');

            if (accessTitle) accessTitle.characters = cleanArtefactName;
            // if (accessDiagram) accessDiagram.appendChild(artefact);

            accessBlock.name = `block-${cleanArtefactName}`;
            result.appendChild(accessBlock);
        }
    });
}


// Create the block
export function createBlock(title: string, instance: ComponentNode, props: any = null): FrameNode | null {

    // Create and detach the instance
    let result = instance.createInstance().detachInstance();
    let block = result.findChild((n) => n.name === 'block') as FrameNode | null;
    let heading = result.findChild((n) => n.name === 'section-title') as TextNode | null;

    // Error handling if block or heading is not found
    if (!block || !heading) { throw new Error('Could not find block or section-title') }

    // Set the title of the block
    heading.characters = title;

    // Create accessibility artefacts if applicable
    if (title === 'Accessibility' && props) { createAccessibilityBlock(props, block, result) }

    // Create content artefacts if applicable
    if (title === 'Content' && props) { createContentBlock(props, block, result) }

    // Remove the original block template
    block.remove();

    // Return the customized result
    return result;
}