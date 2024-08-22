// Create instances
export function createTitle(title: string, instance: any) {

    // Set up
    let result: InstanceNode = instance.createInstance();

    // Adjust properties
    result.setProperties({

        'comp-cat#8725:13'      : figma.root.name,
        'comp-type#8725:14'     : 'Component',
        'comp-title#8725:15'    : title

    });

    // Return
    return result

}