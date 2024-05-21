import { notifyAndClose } from "../helpers";

export async function test(item: any) {

    try {

        let test: any   = null;
            test        = await figma.getNodeByIdAsync(item.id);

        console.log(test);
        
    } catch (error) {}

    //
    notifyAndClose('tested');

}