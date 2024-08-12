// Import
import { arrayCheck, handleError, notifyAndClose } from "./helpers";
import { run } from "./sys/run";
import { fonts } from "./data/fonts";
import { test } from "./sys/test";
import { figmaComponents } from "./data/components";

// Get the user current selection
const selection: any = figma.currentPage.selection;

// test(selection[0]);

// Check if the user has selected anything and that if what they selected is a component
if (arrayCheck(selection)) {

    // Load fonts
    if (arrayCheck(fonts)) { for (const f of fonts) { await figma.loadFontAsync(f) } }

    // Get reusable components
    const reusableComps: any = [];
    if (arrayCheck(figmaComponents)) { for (const c of figmaComponents) { reusableComps.push(await figma.getNodeByIdAsync(c)) } }

    // Run the plugin
    try { await run(selection, reusableComps); notifyAndClose('All done baby!'); }

    // Catch any errors, log in the console and close plugin
    catch(error: any) { handleError('😢😢 Something went wrong', error) }

}

// If nothing is selected close the plugin
else { notifyAndClose('"If nothing has been selected, how can anything be documented?" - An ancient design system proverb') };