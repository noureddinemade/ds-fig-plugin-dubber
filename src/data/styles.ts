// Main frame
const frameBg               = { key: 'fills', value: [] };
const frameMinWidth         = { key: 'minWidth', value: 1200 };
const frameMaxWidth         = { key: 'maxWidth', value: 1200 };
const frameGap              = { key: 'itemSpacing', value: 1 };
const frameVertical         = { key: 'layoutMode', value: 'VERTICAL' };
const frameLayout           = [{ key: 'primaryAxisSizingMode', value: 'AUTO' },{ key: 'counterAxisSizingMode', value: 'AUTO' }];

// Size element
const sizeFrameGap          = { key: 'itemSpacing', value: 8 };
const sizeFrameLayout       = [{ key: 'primaryAxisSizingMode', value: 'AUTO' },{ key: 'counterAxisSizingMode', value: 'AUTO' }];
const sizeClipContent       = { key: 'clipsContent', value: false };

export const frameProps     = [ frameBg, frameLayout, frameVertical, frameGap, frameMinWidth, frameMaxWidth ];
export const sizeFrameProps = [ frameBg, sizeFrameLayout, frameVertical, sizeFrameGap, sizeClipContent ];