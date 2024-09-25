import { reComps } from "../get/getReusables";

// Create instances
export function createTitle(title: string) {

    // Set up
    let result: any;
        result = reComps.filter(a => a.name === 'doc.comp-title');
        result = result[0].comp;
        result = result.createInstance();

    // Adjust properties
    result.setProperties({

        'category#8725:13' : figma.root.name,
        'type#8725:14'     : 'Component',
        'title#8725:15'    : title

    });

    // Return
    return result

}