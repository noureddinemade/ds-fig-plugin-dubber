// Import
import { artefacts } from "../../data/arrays";
import { PropertiesResult, PropertyResult } from "../../data/definitions";
import { nodeStyles } from "../../data/styles";
import { arrayCheck, cleanName, create, getAllChildren, getRelativePosition, handleError, notifyAndClose } from "../../helpers";
import { reComps } from "../get/getReusables";

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

// Create the block
export function createBlock(title: string, props: PropertiesResult | null = null): FrameNode | null {

    // Create and detach the instance
    let result: any;
        result = reComps.filter(a => a.name === 'doc.comp-section');
        result = result[0].comp;
        result = result.createInstance();
        result = result.detachInstance();
        
    let block       = result.findChild((n: FrameNode) => n.name === 'block') as FrameNode | null;
    let heading     = result.findChild((n: FrameNode) => n.name === 'section-title') as TextNode | null;

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

    // Remove the original block template
    block.remove();

    // Return the customized result
    return result;
}