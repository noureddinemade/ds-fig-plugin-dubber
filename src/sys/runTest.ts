import { notifyAndClose } from "../helpers";

export async function runTest(item: any) {

    try {

        console.log(item[0].key);
        
    } catch (error) {}

    //
    notifyAndClose('tested');

}