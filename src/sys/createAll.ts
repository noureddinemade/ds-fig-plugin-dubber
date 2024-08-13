// Import
import { frameProps } from "../data/styles";
import { arrayCheck, create, isObject, notifyAndClose } from "../helpers";
import { createAnatomy } from "./create/createAnatomy";
import { createDescription } from "./create/createDescription";
import { createSpecifications } from "./create/createSpecifications";
import { createTitle } from "./create/createTitle";

// Show all that was found
export function createAll(components: any[], reusableComps: any[]) {

    // Check if there are components to document
    if (arrayCheck(components)) {

        // Loop thru components
        components.forEach((c: any) => {

            // Create document frame
            const compFrame: any = create(`component: ${c.info.name}`, frameProps, 'frame');

            // Create instances of reusable components
            const compTitle:    any = createTitle(c.info.name, reusableComps[0], compFrame);
            const compDesc:     any = createDescription(c.info.desc, c.props, reusableComps[1], compFrame);
            const compAnat:     any = c.anatomy ? createAnatomy(c.anatomy, reusableComps[2], compFrame) : null;
            const compSpec:     any = c.props ? createSpecifications(c.props, reusableComps[3], compFrame, reusableComps[5] ) : null;
            const compSect:     any = reusableComps[4].createInstance();

            // Append to frame
            compFrame.appendChild(compSect);

        });

    }
    else { notifyAndClose('Nothing to document') };

}