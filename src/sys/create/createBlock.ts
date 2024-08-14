// Import
import { arrayCheck } from "../../helpers";

// Create accessibility artifacts
function createAccessibilityArtifact(props: any, name: any) {

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
    let heading:    any = result.findChild((n: any) => n.name === 'section-title' );
    let artifacts:  any = result.findChild((n: any) => n.name === 'diagram');

    // Update title
    heading.characters = title;

    // Create accessibility artifacts
    if (title === 'Accessibility' && props) {

        // Set up artifacts to find
        let focusArtifact: any = createAccessibilityArtifact(props, 'focus?');
        
        // Append artifacts if found
        if (focusArtifact) { artifacts.appendChild(focusArtifact) }
        else { result.remove(); result = null; }
    
    }


    // Append
    if (result) { parent.appendChild(result) };

}