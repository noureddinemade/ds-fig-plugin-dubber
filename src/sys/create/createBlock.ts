// Import
import { artefacts } from "../../data/arrays";
import { arrayCheck, cleanName } from "../../helpers";

// Create accessibility artefacts
function createAccessibilityartefact(props: any, name: any) {

    // Set up
    let result: any = null;
    let boolean: any = props.boolean.filter((a: any) => a.name === name);

    // Check if there are any boolean matches
    if (arrayCheck(boolean)) {

        // Loop thru booleans to find accessibility related props
        boolean.forEach((b: any) => {

            // Create instance of component
            let instance: any = props.propVariant.clone();

            // Turn on property
            instance.setProperties({ [b.nameSet]: true });

            // Append
            result = instance;

        })

    }

    // Return
    return result;
}

// Create a documentation block
export function createBlock(title: string, instance: any, parent: any, props: any = null) {

    // Set up
    let result:     any = instance.createInstance();
        result          = result.detachInstance();
    let block:      any = result.findChild((n: any) => n.name === 'block');
    let heading:    any = result.findChild((n: any) => n.name === 'section-title');

    // Update title
    heading.characters = title;

    // Create accessibility artefacts
    if (title === 'Accessibility' && props) {

        // Loop thru accessArtifcats and create artifcats if available
        artefacts.access.forEach((a: any) => { 
            
            // Set up
            let accessartefact: any = createAccessibilityartefact(props, a);
            let accessBlock:    any = block;

            // Check
            if (accessartefact) {

                // Set up block
                accessBlock = accessBlock.clone();

                let accessTitle:    any = accessBlock.findChild((n: any) => n.name === 'section-subtitle');
                let accessDiagram:  any = accessBlock.findChild((n: any) => n.name === 'diagram');
                let accessName:     any = cleanName(a, 'boolen');

                // Name block
                accessBlock.name = `block-${accessName}`;
                accessTitle.characters = accessName;

                // Append
                accessDiagram.appendChild(accessartefact);
                result.appendChild(accessBlock);

            }
        
        })
    
    }

    // Remove default block
    block.remove();

    // Append
    if (result) { parent.appendChild(result) };

}