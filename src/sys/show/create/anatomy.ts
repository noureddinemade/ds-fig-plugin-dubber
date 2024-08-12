// Create instances
export function createAnatomy(anatomy: any, instance: any, append: any) {

    // Set up
    let result: any = instance.createInstance();

    // Append to frame
    append.appendChild(result);

    // Return
    return result

}