import { arrayCheck, notifyAndClose } from "../../helpers";

// Show all that was found
export function showAll(components: any[]) {

    // Check if there are components to document
    if (arrayCheck(components)) {

        console.log(components);

    }
    else { notifyAndClose('Nothing to document') };

}