// Import
import { DocComponent } from "../data/definitions";
import { nodeStyles } from "../data/styles";
import { addToFrame, arrayCheck, create, handleError, notifyAndClose } from "../helpers";
import { createAnatomy } from "./create/createAnatomy";
import { createBlock } from "./create/createBlock";
import { createDescription } from "./create/createDescription";
import { createSpecifications } from "./create/createSpecifications";
import { createTitle } from "./create/createTitle";
import { createShowcase } from "./create/createShowcase";

// Show all that was found
export async function createAll( components: DocComponent[]): Promise<void> {

    // Ensure components array is not empty
    if (arrayCheck(components)) {

        components.forEach(async (c: DocComponent) => {

            // Create document frame for the component
            const compFrame: FrameNode | null = create(`component: ${c.info.name}`, nodeStyles.frame, 'frame') as FrameNode;

            // Ensure compFrame is created
            if (!compFrame) {
                handleError("Failed to create component frame.", new Error(`Frame creation failed for component: ${c.info.name}`));
                return;
            }

            // Create documentation blocks
            const title:            InstanceNode     = createTitle(c.info.name);
            const description:      FrameNode | null = createDescription(c.info.desc, c.props);
            const usage:            FrameNode | null = createBlock('Usage');
            const behaviour:        FrameNode | null = createBlock('Behaviour', c.props);
            const accessbility:     FrameNode | null = createBlock('Accessibility', c.props);
            const showcase:         FrameNode | null = c.props? createShowcase(c.props) : null;
            const anatomy:          FrameNode | null = c.anatomy ? createAnatomy(c.anatomy) : null;
            const specifications:   FrameNode | null = c.props ? createSpecifications(c.props) : null;
            const content:          FrameNode | null = c.props.text && arrayCheck(c.props.text) ? createBlock('Content', c.props) : null;

            // Append
            const toAppend: any[] = [title, showcase, description, anatomy, specifications, usage, behaviour, accessbility, content];

            toAppend.forEach((i: any) => { if (i) addToFrame(compFrame, i) });

            // Clean up and remove spares (if any)
            const toDelete = figma.currentPage.findAll(a => a.name === 'propertyInstance');

            if (arrayCheck(toDelete)) { toDelete.forEach(d => { d.remove() }) }

            // Notify and close the plugin after successful documentation creation
            notifyAndClose('Documentation was successfully created!');

        });

    } else {
        // Notify and close the plugin if no components are available for documentation
        notifyAndClose('Nothing to document');
    }
}