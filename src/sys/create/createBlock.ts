// Import
import { artefacts } from "../../data/arrays";
import { PropertiesResult, PropertyResult } from "../../data/definitions";
import { nodeStyles } from "../../data/styles";
import { arrayCheck, cleanName, create, getAllChildren, getRelativePosition } from "../../helpers";

// Create accessibility artefacts & block
function createAccessibilityBlock(props: any, block: FrameNode) {

    // Loop thru common accessibility properties
    for (const a of artefacts.accessibility) {

        // Find  match
        let match = props.boolean.filter((prop: any) => prop.name === a);

        // Check if component properties matches the current accessibility property
        if (arrayCheck(match)) {

            // Set up
            const aBlock:   FrameNode   = block.clone();
        
            let aTitle      = aBlock.findChild(c => c.name === 'section-subtitle') as TextNode | null;
            let aDiagram    = aBlock.findChild(c => c.name === 'diagram') as FrameNode | null;

            const instance = props.propVariant.clone();
            match = match[0];

            instance.setProperties({ [match.nameSet]: true });
            instance.name = match.name;

            // Customise block
            if (aTitle)     { aTitle.characters = cleanName(a, 'boolean') };
            if (aDiagram)   { aDiagram.appendChild(instance) };

            // Return block
            return aBlock;

        } else { return null }

    }

}

// Create content artefacts & block
function createContentBlock(props: any, block: FrameNode) {

    // Set up
    let result      = null;
    let textNodes   = props.propVariant;
        textNodes   = getAllChildren(textNodes);
        textNodes   = textNodes.filter((a: TextNode) => a.type === 'TEXT');

    // Check if there are any textnodes
    if (arrayCheck(textNodes)) {

        result = [];

        // Loop thru found text nodes
        textNodes.forEach((t: TextNode) => {

            // Find  match
            let match = props.text.filter((a: PropertyResult) => a.nameSet === t.componentPropertyReferences?.characters);

            // Check if component properties matches the current accessibility property
            if (arrayCheck(match)) {

                // Set up
                const cBlock:   FrameNode   = block.clone();
            
                let cTitle      = cBlock.findChild(c => c.name === 'section-subtitle') as TextNode | null;
                let cDiagram    = cBlock.findChild(c => c.name === 'diagram') as FrameNode | null;
                let instance    = props.propVariant.clone();
                
                match = match[0];

                instance.name = match.name;

                // Create and customise outline frame and children
                const outlineFrame: FrameNode       = create('outline', nodeStyles.blank, 'frame');
                const textOutline:  RectangleNode   = create('text', nodeStyles.outline, 'rect');
                const relativePos                   = getRelativePosition(t);
                
                outlineFrame.resize(instance.width, instance.height);
                textOutline.resize(t.width + 8, t.height + 2);

                textOutline.x = relativePos.x - 4;
                textOutline.y = relativePos.y - 1;

                outlineFrame.clipsContent = false;

                // Append
                outlineFrame.appendChild(instance);
                outlineFrame.appendChild(textOutline);

                instance = outlineFrame;

                // Customise block
                if (cTitle)     { cTitle.characters = match.name };
                if (cDiagram)   { cDiagram.appendChild(instance) };

                // Return block
                result.push(cBlock);

            }

        })
        
    }

    return result;

}

// Create behaviour artefacts & block
async function createBehaviourBlock(props: any, block: FrameNode) {

    // Set up
    let result = null;

    try {
        // Ensure propVariant exists and is of type InstanceNode
        if (props.propVariant && props.propVariant.type === 'INSTANCE') {

            // Get the main component of the instance
            let behaviours = props.propVariant;
                behaviours = await behaviours.getMainComponentAsync();

            if (behaviours) {
                console.log("Main component found:", behaviours);
            } else {
                console.log("No main component available for this instance.");
            }

        } else {
            console.log("propVariant is not an instance.");
        }

    } catch (error) {
        console.error("Error in createBehaviourBlock:", error);
    }

    return result;

}


// Create the block
export function createBlock(title: string, instance: ComponentNode, props: PropertiesResult | null = null): FrameNode | null {

    // Create and detach the instance
    let result      = instance.createInstance().detachInstance();
    let block       = result.findChild((n) => n.name === 'block') as FrameNode | null;
    let heading     = result.findChild((n) => n.name === 'section-title') as TextNode | null;

    // Error handling if block or heading is not found
    if (!block || !heading) { throw new Error('Could not find block or section-title') }

    // Set the title of the block
    heading.characters = title;

    // Create specific artefacts
    if (title === 'Accessibility' && arrayCheck(props?.boolean)) {

        const aBlock = createAccessibilityBlock(props, block);

        if (aBlock) result.appendChild(aBlock);
    
    }
    
    if (title === 'Content' && arrayCheck(props?.text)) {

        const cBlocks = createContentBlock(props, block);

        if (cBlocks && arrayCheck(cBlocks)) { cBlocks.forEach((c: any) => result.appendChild(c)) }

    }

    if (title === 'Behaviour') {

        const bBlocks = createBehaviourBlock(props, block);

        // if (bBlocks && arrayCheck(bBlocks)) { bBlocks.forEach((b: any) => result.appendChild(b)) }

    }
    

    // Remove the original block template
    block.remove();

    // Return the customized result
    return result;
}