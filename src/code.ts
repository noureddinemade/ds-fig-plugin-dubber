// Import
import { arrayCheck, handleError, notifyAndClose } from "./helpers";
import { runPlugin } from "./sys/runPlugin";
import { runTest }  from "./sys/runTest";

// Get the user current selection
let selection:  SceneNode[] = [...figma.currentPage.selection];
let testMode:   boolean     = false;

// Check if the user has selected anything
if (arrayCheck(selection)) {

    try { !testMode ? runPlugin(selection) : runTest(selection) }
    catch (error) { handleError('Could not run plugin', error) }

} else { notifyAndClose('"If nothing has been selected, how can anything be documented?" - An ancient design system proverb') }