// Create instances
export function createSpecifications(specs: any, instance: any, append: any) {

    // Set up
    let result: any = instance.createInstance();

    // Append to frame
    append.appendChild(result);

    // Return
    return result

}