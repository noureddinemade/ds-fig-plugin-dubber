import { AnatomyResult } from "../../data/definitions";

// Create instances
export function createAnatomy(anatomy: AnatomyResult, instance: ComponentNode) {

    // Set up
    let result:             InstanceNode | FrameNode    = instance.createInstance();
        result                                          = result.detachInstance();

    let diagramFrame:       any = result.findChild((n: any) => n.name === 'diagram');
    let diagramMarkers:     any = diagramFrame.findChild((n: any) => n.name === 'annotations');
    let annotationFrame:    any = result.findChild((n: any) => n.name === 'annotations');
    let diagramMarker:      InstanceNode = diagramMarkers.findChild((n: any) => n.name === 'marker.number');
    let annotationMarker:   InstanceNode = annotationFrame.findChild((n: any) => n.name === 'marker-key');

    // Place instance in diagram frame
    diagramFrame.appendChild(anatomy.variant);

    // Check size of anatomy.variant and rescale IF it's bigger than the bounds of the frame;
    if (anatomy.variant.width >= 1040) { anatomy.variant.rescale(0.8) };

    // Resize and move digramFrame to match instance
    diagramMarkers.resizeWithoutConstraints(anatomy.variant.width, anatomy.variant.height);
    diagramMarkers.x = anatomy.variant.x;
    diagramMarkers.y = anatomy.variant.y;

    // Loop thru anatomy
    anatomy.items.forEach((i: any, k: any) => {

        // Create annotation markers
        let itemAnnotation:         InstanceNode = annotationMarker.clone();
        let itemAnnotationMarker:   any = itemAnnotation.findChild((n: any) => n.name === 'marker-group' );
            itemAnnotationMarker        = itemAnnotationMarker.findChild((n: any) => n.name === 'marker-1' );
        let itemDiagram:            any = diagramMarker.clone();
        
        // Set labels
        itemAnnotation.setProperties({ 'label#2504:9': i.name });
        itemAnnotationMarker.setProperties({ 'label#2504:0':  `${k+1}` });
        itemDiagram.setProperties({ 'label#2504:0':  `${k+1}` });

        // Position diagram marker
        itemDiagram.x = i.x - 8;
        itemDiagram.y = i.y - 16;

        // Append labels
        annotationFrame.appendChild(itemAnnotation);
        diagramMarkers.appendChild(itemDiagram);

    });

    // Remove defaults
    annotationMarker.remove();
    diagramMarker.remove();

    // Return
    return result

}