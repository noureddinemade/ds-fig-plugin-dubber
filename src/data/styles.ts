// Main frame
const frameMinWidth         = { key: 'minWidth', value: 1200 };
const frameMaxWidth         = { key: 'maxWidth', value: 1200 };
const frameGap              = { key: 'itemSpacing', value: 1 };
const frameVertical         = { key: 'layoutMode', value: 'VERTICAL' };
const frameLayout           = [{ key: 'primaryAxisSizingMode', value: 'AUTO' },{ key: 'counterAxisSizingMode', value: 'AUTO' }];

// Size element
const sizeFrameGap          = { key: 'itemSpacing', value: 8 };
const sizeFrameLayout       = [{ key: 'primaryAxisSizingMode', value: 'AUTO' },{ key: 'counterAxisSizingMode', value: 'AUTO' }];
const sizeClipContent       = { key: 'clipsContent', value: false };

// Text outline
const outlineStrokeWeight   = { key: 'strokeWeight', value: 1 };
const outlineStrokeColour   = { key: 'strokes', value: [{ type: 'SOLID', color: figma.util.rgb('#FF0000') }] };
const outlineFill           = { key: 'fills', value: [{ type: 'SOLID', color: figma.util.rgb('#FF0000') }] };
const outlineOpacity        = { key: 'opacity', value: 0.5 };

// Generic
const noBg                  = { key: 'fills', value: [] };

const frameProps            = [ noBg, frameLayout, frameVertical, frameGap, frameMinWidth, frameMaxWidth ];
const sizeFrameProps        = [ noBg, sizeFrameLayout, frameVertical, sizeFrameGap, sizeClipContent ];
const blankFrame            = [ noBg ];
const textOutline           = [ noBg, outlineStrokeWeight, outlineStrokeColour  ];

export const nodeStyles     = { blank: blankFrame, frame: frameProps, size: sizeFrameProps, outline: textOutline }