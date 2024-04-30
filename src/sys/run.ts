import { notifyAndClose } from "../helpers";
import { getAll } from "./get/getAll";
import { showAll } from "./show/showAll";

export function run(selection: any[]) {

    // Set up
    let toDocument: any = [];

    // Loop thru components and get what's needed
    getAll(selection, toDocument);

    // Document all that was found
    showAll(toDocument);
    
    // Finish up
    notifyAndClose('All done baby!');

}