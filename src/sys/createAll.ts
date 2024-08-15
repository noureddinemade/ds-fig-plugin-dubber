// Import
import { frameProps } from "../data/styles";
import { arrayCheck, create, notifyAndClose } from "../helpers";
import { createAnatomy } from "./create/createAnatomy";
import { createBlock } from "./create/createBlock";
import { createDescription } from "./create/createDescription";
import { createSpecifications } from "./create/createSpecifications";
import { createTitle } from "./create/createTitle";

// Show all that was found
export async function createAll(components: any[], reusableComps: any[]) {

    // Check if there are components to document
    if (arrayCheck(components)) {

        // Loop thru components
        components.forEach((c: any) => {

            // Setup
            let block: any = reusableComps[4];

            // Create document frame
            const compFrame: any = create(`component: ${c.info.name}`, frameProps, 'frame');

            // Create instances of reusable components
            const compTitle:    any = createTitle(c.info.name, reusableComps[0], compFrame);
            const compDesc:     any = createDescription(c.info.desc, c.props, reusableComps[1], compFrame);
            const compAnat:     any = c.anatomy ? createAnatomy(c.anatomy, reusableComps[2], compFrame) : null;
            const compSpec:     any = c.props ? createSpecifications(c.props, reusableComps[3], compFrame, reusableComps[5] ) : null;
            const compUsage:    any = createBlock('Usage', block, compFrame);
            const compBehave:   any = createBlock('Behaviour', block, compFrame);
            const compAccess:   any = createBlock('Accessibility', block, compFrame, c.props);
            const compContent:  any = arrayCheck(c.props.text) ? createBlock('Content', block, compFrame, c.props) : null;

            // Clean up and remove spares
            c.props.propVariant.remove();

            // Close plugin
            notifyAndClose('Documentation was successfully created!');

        });

    }
    else { notifyAndClose('Nothing to document') };

}