import { frame } from "../../data/styles";
import { arrayCheck, create } from "../../helpers";

// Get anatomy from component
export function getAnatomy(component: any, props: any) {

    // Set up
    let result:     any     = null;
    let defaultV:   any     = component.defaultVariant;
        defaultV            = defaultV.createInstance();
    let children:   any     = arrayCheck(defaultV.children) ? defaultV.children : null;
    let test:       any     = create('test', frame.main, 'frame');
    let booleans:   any     = arrayCheck(props.boolean) ? props.boolean : null;

    
    if (booleans) {

        booleans.forEach((b: any) => { defaultV.setProperties({ [b.nameSet]: true }) });

    }
    
    test.x = 4595;
    test.y = -1319;
    test.appendChild(defaultV);

    // Loop thru children if they exist
    if (children) {

        children.forEach((c: any) => {

            console.log(c.name);
            console.log(`x: ${c.x}`);
            console.log(`y: ${c.y}`);

        });

    }

    // Return
    return result ? result : null;

}