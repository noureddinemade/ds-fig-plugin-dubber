import { notifyAndClose } from "../helpers";

export async function test(item: any) {

    try {

        console.log(item.componentPropertyDefinitions);
        
    } catch (error) {}

    //
    notifyAndClose('tested');

}