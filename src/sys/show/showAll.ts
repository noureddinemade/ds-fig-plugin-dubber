// Import
import { frameProps } from "../../data/styles";
import { arrayCheck, create, isObject, notifyAndClose } from "../../helpers";
import { createAnatomy } from "./create/anatomy";
import { createDescription } from "./create/description";
import { createSpecifications } from "./create/specifications";
import { createTitle } from "./create/title";

// Show all that was found
export function showAll(components: any[], reusableComps: any[]) {

    // Check if there are components to document
    if (arrayCheck(components)) {

        // Loop thru components
        components.forEach((c: any) => {

            console.log(c);

            // Create document frame
            const compFrame: any = create(`component: ${c.info.name}`, frameProps, 'frame');

            // Create instances of reusable components
            const compTitle:    any = createTitle(c.info.name, reusableComps[0], compFrame);
            const compDesc:     any = createDescription(c.info.desc, c.props, reusableComps[1], compFrame);
            const compAnat:     any = createAnatomy(c.anatomy, reusableComps[2], compFrame);
            const compSpec:     any = createSpecifications(c.props, reusableComps[3], compFrame);
            const compSect:     any = reusableComps[4].createInstance();

            // Append to frame
            compFrame.appendChild(compSect);

        });

    }
    else { notifyAndClose('Nothing to document') };

}