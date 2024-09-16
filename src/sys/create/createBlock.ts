// Import
import { artefacts } from "../../data/arrays";
import { PropertyResult } from "../../data/definitions";
import { nodeStyles } from "../../data/styles";
import { arrayCheck, cleanName, create } from "../../helpers";

// Create accessibility artefacts
function createAccessibilityArtefact(props: {
    boolean: { name: string; nameSet: string }[];
    propVariant: InstanceNode;
}, name: string): InstanceNode | null {

    // Filter boolean properties based on the provided name
    const matchingProps = props.boolean.filter(prop => prop.name === name);

    // Check if there are any matches
    if (!arrayCheck(matchingProps)) { return null } // No matches found, return null

    // Create and configure the instance for the first matching prop
    const matchedProp = matchingProps[0];
    const instance = props.propVariant.clone();
    instance.setProperties({ [matchedProp.nameSet]: true });

    return instance;
}

// Create content artefacts
function createContentArtefact(property: PropertyResult, variant: InstanceNode) {

    // Create and configure the instance for the first matching prop
    let instance:       any     = variant.clone();
    const textNodes:    any[]   = instance.findAll((a: any) => a.type === 'TEXT'); // Find all text nodes

    // Loop thru text nodes
    textNodes.forEach((t: TextNode) => {

        // Check if text node matches the matched prop
        if (t.componentPropertyReferences && t.componentPropertyReferences.characters === property.nameSet) {

            // Create and customise outline frame and children
            const outlineFrame: FrameNode       = create('outline', nodeStyles.blank, 'frame');
            const textOutline:  RectangleNode   = create('text', nodeStyles.outline, 'rect');
            
            outlineFrame.resize(instance.width, instance.height);
            textOutline.resize(t.width + 8, t.height + 2);

            textOutline.x = t.x - 4;
            textOutline.y = t.y - 1;

            // Append
            outlineFrame.appendChild(instance);
            outlineFrame.appendChild(textOutline);

            instance = outlineFrame;

        }

    });

    return instance;

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

    if (arrayCheck(props.text)) {

        props.text.forEach((p: any) => {
            let artefact = createContentArtefact(p, props.propVariant);
    
            if (artefact) {
                let accessBlock = blockTemplate.clone();
                let accessTitle = accessBlock.findChild((n) => n.name === 'section-subtitle') as TextNode | null;
                let accessDiagram = accessBlock.findChild((n) => n.name === 'diagram') as FrameNode | null;
    
                if (accessTitle) accessTitle.characters = p.name;
                if (accessDiagram) accessDiagram.appendChild(artefact);
    
                accessBlock.name = `block-${p.name}`;
                result.appendChild(accessBlock);
            }
        });

    }
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