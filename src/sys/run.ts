import { notifyAndClose } from "../helpers";
import { getAll } from "./get/getAll";
import { showAll } from "./show/showAll";

export async function run(selection: any[], reusableComps: any[]) {

    // Loop thru components and get what's needed
    const componentsToDocument: any = getAll(selection);

    // Document all that was found
    await showAll(componentsToDocument, reusableComps);

}