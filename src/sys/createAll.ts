// Import
import { DocComponent } from "../data/definitions";
import { frameProps } from "../data/styles";
import { addToFrame, arrayCheck, create, handleError, notifyAndClose } from "../helpers";
import { createAnatomy } from "./create/createAnatomy";
import { createBlock } from "./create/createBlock";
import { createDescription } from "./create/createDescription";
import { createSpecifications } from "./create/createSpecifications";
import { createTitle } from "./create/createTitle";

// Show all that was found
export async function createAll(
    components: DocComponent[], 
    reusableComps: ComponentNode[]
): Promise<void> {

    // Ensure components array is not empty
    if (arrayCheck(components)) {

        components.forEach((c: DocComponent) => {

            // Extract reusable component blocks
            const [titleComp, descComp, anatComp, specComp, blockComp, extraComp] = reusableComps;

            // Create document frame for the component
            const compFrame: FrameNode | null = create(`component: ${c.info.name}`, frameProps, 'frame') as FrameNode;

            // Ensure compFrame is created
            if (!compFrame) {
                handleError("Failed to create component frame.", new Error(`Frame creation failed for component: ${c.info.name}`));
                return;
            }

            // Create documentation blocks
            const compTitle:    InstanceNode     = createTitle(c.info.name, titleComp);
            const compDesc:     FrameNode | null = createDescription(c.info.desc, c.props, descComp);
            const compAnat:     FrameNode | null = c.anatomy ? createAnatomy(c.anatomy, anatComp) : null;
            const compSpec:     FrameNode | null = c.props ? createSpecifications(c.props, specComp, extraComp) : null;
            const compUsage:    FrameNode | null = createBlock('Usage', blockComp);
            const compBehave:   FrameNode | null = createBlock('Behaviour', blockComp);
            const compAccess:   FrameNode | null = createBlock('Accessibility', blockComp, c.props);
            const compContent:  FrameNode | null = arrayCheck(c.props.text) ? createBlock('Content', blockComp, c.props) : null;

            // Append
            const toAppend: any[] = [compTitle, compDesc, compAnat, compSpec, compUsage, compBehave, compAccess, compContent ];

            toAppend.forEach((i: any) => addToFrame(compFrame, i) )

            // Clean up and remove spares (if any)
            if (c.props.propVariant) {
                c.props.propVariant.remove();
            }

            // Notify and close the plugin after successful documentation creation
            notifyAndClose('Documentation was successfully created!');

        });

    } else {
        // Notify and close the plugin if no components are available for documentation
        notifyAndClose('Nothing to document');
    }
}
