// Create instances
export function createTitle(title: string, instance: any, parent: any) {

    // Set up
    let result: any = instance.createInstance();

    // Adjust properties
    result.setProperties({

        'comp-cat#8725:13'      : figma.root.name,
        'comp-type#8725:14'     : 'Component',
        'comp-title#8725:15'    : title

    });

    // Append to frame
    parent.appendChild(result);

    // Return
    return result

}