import { PropertiesResult } from "../../data/definitions";
import { reComps } from "../get/getReusables";

// Create showcase for component
export function createShowcase(props: PropertiesResult) {

    // Create and detach the instance
    let result: any;
        result = reComps.filter(a => a.name === 'doc.comp-section');
        result = result[0].comp;
        result = result.createInstance();
        result = result.detachInstance();
        
    let heading     = result.findChild((n: FrameNode) => n.name === 'section-title') as FrameNode | null;
    let block       = result.findChild((n: FrameNode) => n.name === 'block') as any | null;
    let diagram     = block ? block.findChild((n: TextNode) => n.name === 'diagram') as FrameNode | null : null;
    let instance    = props.propVariant.clone();

    console.log(instance);

    // Cusomise and fill
    instance.name = 'core-component'

    if (diagram) { 

        diagram.fills           = [];
        diagram.strokes         = [{ type: 'SOLID' ,color: figma.util.rgb('#9747FF') }];
        diagram.dashPattern     = [10,10];

    }

    // Append
    diagram?.appendChild(instance);
    result.appendChild(diagram);

    // Remove
    block?.remove();
    heading?.remove();


    return result;

}