// Imports
import { getAll } from "./getAll";
import { createAll } from "./createAll";
import { arrayCheck, handleError, notifyAndClose } from "../helpers";
import { figmaComponents } from "../data/components";
import { fonts } from "../data/fonts";

// Run plugin
export async function runPlugin(selection: SceneNode[]) {

    // Load fonts
    if (arrayCheck(fonts)) { 
        
        for (const f of fonts) { 

            try { await figma.loadFontAsync(f) } 
            catch (error) { handleError('Could not load fonts', error) }
        
        } 
    
    }
    
    // Get reusable components
    const reusableComps: SceneNode[] = [];

    if (arrayCheck(figmaComponents)) { 
        
        for (const c of figmaComponents) {

            try {

                const node = c.set ? await figma.importComponentSetByKeyAsync(c.key) : await figma.importComponentByKeyAsync(c.key);

                if (node) { reusableComps.push(node as SceneNode) }
            
            } catch (error) { handleError('Could not get reusable components', error) }
        
        } 
        
    }

    // Get components and their properties from selection
    const toDocument: any = await getAll(selection);

    // Get components and their properties from selection and then check if anything was found to document
    arrayCheck(toDocument)

        ? await createAll(toDocument, reusableComps)
        : notifyAndClose('Nothing found so nothing gets documented!');

}