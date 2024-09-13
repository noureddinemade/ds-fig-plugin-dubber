import { notifyAndClose } from "../helpers";

export async function runTest(item: any) {

    try {

        console.log(item[0].fills);
        
    } catch (error) {}

    //
    notifyAndClose('tested');

}