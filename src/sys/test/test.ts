import { notifyAndClose } from "../../helpers";

export async function test(item: any) {

    try {

        console.log(item.id);
        
    } catch (error) {}

    //
    notifyAndClose('tested');

}