import { figmaComponents } from "../../data/components";
import { arrayCheck, handleError } from "../../helpers";

// Get reusable components
async function getReusables() {

    const reusableComps = [];

    if (arrayCheck(figmaComponents)) { 
        
        for (const c of figmaComponents) {

            try {

                const node = c.set ? await figma.importComponentSetByKeyAsync(c.key) : await figma.importComponentByKeyAsync(c.key);

                if (node) { reusableComps.push({name: node.name, comp: node}) }
            
            } catch (error) { handleError('Could not get reusable components', error) }
        
        } 
        
    }

    return reusableComps;

}

// Export array of reusable components to use in plugin
export const reComps = await getReusables();