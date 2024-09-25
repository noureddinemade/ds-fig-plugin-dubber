// Main frame
const frameMinWidth         = { key: 'minWidth', value: 1200 };
const frameMaxWidth         = { key: 'maxWidth', value: 1200 };
const frameGap              = { key: 'itemSpacing', value: 1 };
const frameVertical         = { key: 'layoutMode', value: 'VERTICAL' };
const frameHorizontal       = { key: 'layoutMode', value: 'HORIZONTAL' };
const frameLayout           = [{ key: 'primaryAxisSizingMode', value: 'AUTO' },{ key: 'counterAxisSizingMode', value: 'AUTO' }];
const frameBg               = { key: 'fills', value: [{type: 'SOLID', color: figma.util.rgb('#F5F5F6')}]}

// Size element
const sizeFrameGap          = { key: 'itemSpacing', value: 8 };
const sizeFrameLayout       = [{ key: 'primaryAxisSizingMode', value: 'AUTO' },{ key: 'counterAxisSizingMode', value: 'AUTO' }];
const sizeClipContent       = { key: 'clipsContent', value: false };

// Text outline
const outlineStrokeWeight   = { key: 'strokeWeight', value: .2 };
const outlineStrokeColour   = { key: 'strokes', value: [{ type: 'SOLID', color: figma.util.rgb('#009AF9') }] };
const outlineFill           = { key: 'fills', value: [{ type: 'SOLID', color: figma.util.rgb('#009AF9'), opacity:.5 }] };

// Generic
const noBg                  = { key: 'fills', value: [] };

const frameProps            = [ frameBg, frameLayout, frameVertical, frameGap, frameMinWidth, frameMaxWidth ];
const sizeFrameProps        = [ noBg, sizeFrameLayout, frameVertical, sizeFrameGap, sizeClipContent ];
const blankFrame            = [ noBg ];
const textOutline           = [ outlineFill, outlineStrokeWeight, outlineStrokeColour ];
const propFrame             = [ noBg, frameLayout, sizeFrameGap, frameHorizontal ];

export const nodeStyles     = { blank: blankFrame, frame: frameProps, size: sizeFrameProps, outline: textOutline, prop: propFrame }