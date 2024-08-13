// Imports
import { getAll } from "./getAll";
import { createAll } from "./createAll";

// Run plugin
export async function run(selection: any[], reusableComps: any[]) {

    // Loop thru components and get what's needed
    const componentsToDocument: any = getAll(selection);

    // Document all that was found
    createAll(componentsToDocument, reusableComps);

}