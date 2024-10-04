import { arrayCheck, getAllChildren, handleError } from "../../helpers";

// Get dependencies from Component
export async function getDependencies(props: any) {

    // Set up
    let result: any = null

    // Find all children
    let dependencies = getAllChildren(props.propVariant);
        dependencies = arrayCheck(dependencies) ? dependencies.filter((a: any) => a.type === 'INSTANCE') : null;

    // Check if there are any dependencies
    if (arrayCheck(dependencies)) {

        result = [];

        // Loop thru dependencies
        for (const i of dependencies) {

            try {

                let mainComp = await i.getMainComponentAsync();

                if (mainComp) {

                    const compName = mainComp.parent.type === 'COMPONENT_SET' ? mainComp.parent.name : mainComp.name;
                    const compLink = `https://www.figma.com/file/${figma.fileKey}?node-id=${mainComp.id}`
                    
                    mainComp = { name: compName, link: compLink }

                    if (!result.includes(mainComp)) { result.push(mainComp) }

                }
                
            } catch (error) { handleError('Unable to get main component', error) }

        }
        
    }

    return result;

}