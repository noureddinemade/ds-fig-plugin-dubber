// Import
import { artefacts } from "../../data/arrays";
import { PropertiesResult, PropertyResult } from "../../data/definitions";
import { nodeStyles } from "../../data/styles";
import { arrayCheck, cleanName, create } from "../../helpers";

// Create accessibility artefacts
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

// Create accessibility artefacts
function createContentBlock(props: any, block: FrameNode) {

    // Set up
    let textNodes   = props.propVariant;
        textNodes   = textNodes.findChildren((a: TextNode) => a.type === 'TEXT');

    // Loop thru found text nodes
    for (const t of textNodes) {

        // Find  match
        let match = props.text.filter((a: PropertyResult) => a.nameSet === t.componentPropertyReferences.characters);

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
            
            outlineFrame.resize(instance.width, instance.height);
            textOutline.resize(t.width + 8, t.height + 2);

            textOutline.x = t.x - 4;
            textOutline.y = t.y - 1;

            // Append
            outlineFrame.appendChild(instance);
            outlineFrame.appendChild(textOutline);

            instance = outlineFrame;

            // Customise block
            if (cTitle)     { cTitle.characters = match.name };
            if (cDiagram)   { cDiagram.appendChild(instance) };

            // Return block
            return cBlock;

        } else { return null }

    }

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

        const cBlock = createContentBlock(props, block);

        if (cBlock) result.appendChild(cBlock);

    }
    

    // Remove the original block template
    block.remove();

    // Return the customized result
    return result;
}