// Notify with a message and then close plugin
export function notifyAndClose(message: string) {

    // console.clear();

    figma.notify(message);
    figma.closePlugin();

}

// Log the error to the console and close plugin
export function handleError(message: string, error: any) {

    // Print error to console and then close plugin
    console.log('> Error:', error.message);
    console.log('-------------------')
    console.log(error.stack);
    
    console.log('-------------------')
    notifyAndClose(message);

}

// Check if something is an array
export function arrayCheck(array: any, length: number = 0, operator: string = 'm') {

    if (array) {

        // Return based boolean based on operator
        if (operator === 'm')   { return Array.isArray(array) && array.length > length ? true : false     };
        if (operator === 'l')   { return Array.isArray(array) && array.length < length ? true : false     };
        if (operator === 'e')   { return Array.isArray(array) && array.length === length ? true : false   };
        if (operator === 'em')  { return Array.isArray(array) && array.length >= length ? true : false    };
        if (operator === 'el')  { return Array.isArray(array) && array.length <= length ? true : false    };
        
    }

}

// Check if an item is already in an array
export function inArray(item: any, array: any[]) {

    // Check if function can perfomr
    if (arrayCheck(array) && item) {

        const matches: any = array.filter((a: any) => JSON.stringify(a) === JSON.stringify(item));
        
        // Are there any matches?
        if (arrayCheck(matches)) { return true }
        else { return false };

    } else { return false };

}

// Sort an array
export function sortArray(array: any, key: any, reverse: any | null = null) {

    array.sort((a: any, b: any) => {

        // Handle the case when the key is a string or an array
        const valueA = Array.isArray(a[key]) ? a[key][0] : a[key];
        const valueB = Array.isArray(b[key]) ? b[key][0] : b[key];

        // Convert values to numbers if possible
        const numA = parseFloat(valueA);
        const numB = parseFloat(valueB);

        if (!isNaN(numA) && !isNaN(numB)) {

            // Both values are numbers, compare them directly
            return reverse ? numB - numA : numA - numB;

        } else {

            // Use localeCompare for string comparison
            return reverse ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
            
        }

    });

}

// Check if an item is an object
export function isObject(value: any): boolean {
    
    return value !== null && typeof value === 'object' && !Array.isArray(value);

}

// Convert colour from RGB to HEX and vice verca
export function convertColour(value: any) {

    // Set up internal functions
    const toHex = (c: any) => Math.round(c * 255).toString(16).padStart(2, "0");

    // Set base result
    let result;

    if (arrayCheck(value)) {

        result = `${toHex(value[0])}${toHex(value[1])}${toHex(value[2])}`;

    }

    else {

        const raw   = parseInt(value, 16);
        const r     = ((raw >> 16) & 255) / 255;
        const g     = ((raw >> 8) & 255) / 255;
        const b     = (raw & 255) / 255;

        result = {r,g,b};

    }

    return result;

}

// Clean name
export function cleanName(string: string, type: string | null = null) {

    // Set up
    let result: any = string;

    // Clean up

    // Remove # if it's a prop title
    if (type === 'prop') {

        // Does it include a #?
        if (string.includes('#')) {

            result = result.split('#');
            result = result[0];

        }

    };

    // Return
    return result;

}

// Clean type
export function cleanType(name: string, prop: any) {

    // Set up
    let result: any = prop.type;
        result      = result.toLowerCase();
        result      = result.charAt(0);
    
    // If variant boolean hybrid
    if (result === 'v' && name.includes('?')) { result = 'b' };

    // Return
    return result;

}

// Create element
export function create(name: string, props: any, type: any, text: any = null) {

    // Setup response
    let response: any | null;

    // Create based on type
    if (type === 'frame')   { response = figma.createFrame();       };
    if (type === 'text')    { response = figma.createText();        };
    if (type === 'vector')  { response = figma.createVector();      };
    if (type === 'circle')  { response = figma.createEllipse();     };
    if (type === 'rect')    { response = figma.createRectangle();   };

    // Assign name
    response.name = name;

    // Check if there are any props and then loop thru them and assign them to the frame
    if (arrayCheck(props)) {

        props.forEach((p: any) => {

            if (arrayCheck(p)) { p.forEach((i: { key: string | number; value: any; }) => response[i.key] = i.value ) }
            else { response[p.key] = p.value }

        })

    }

    // Add text if needed
    if (type === 'text' && text) { response.characters = text };

    // Return frame
    if (type === 'frame') { response.expanded = false };
    return response;

}

// Check naming convention
export function namingCheck(name: string, type: any) {

    // Set up
    let error: any = null; 

    // Check if name is not in lowercase
    if (name !== name.toLowerCase()) {

        error = `❌ The property "${name}" is not in lowercase which is againt our component naming pattern. 
            Please correct the name first before running the plugin again.
            You can do this by making the name all lowercase.`;

    }

    // Check name for spaces
    if (name.includes(' ')) {

        error = `❌ The property "${name}" contains a space in the name which is againt our component naming pattern. 
            Please correct the name first before running the plugin again.
            You can do this by replacing all spaces with dashes (-).`;

    }

    // Check if it's a boolean without a question mark
    if (type === 'b' && !name.includes('?')) {

        error = `❌ The property "${name}" is a boolean and does not include a question mark at the end. 
            Please correct the name first before running the plugin again.
            You can do this by adding a question mark (?) at the end of the name.`;

    }

    // Throw error if needed
    if (error) { throw new Error(error) }

}