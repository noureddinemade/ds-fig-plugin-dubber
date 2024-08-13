// Create instances
export function createAnatomy(anatomy: any, instance: any, parent: any) {

    // Set up
    let result:             any = instance.createInstance();
        result                  = result.detachInstance();
    let diagramFrame:       any = result.findChild((n: any) => n.name === 'diagram');
    let diagramMarkers:     any = diagramFrame.findChild((n: any) => n.name === 'annotations');
    let diagramMarker:      any = diagramMarkers.findChild((n: any) => n.name === 'marker.number');
    let annotationFrame:    any = result.findChild((n: any) => n.name === 'annotations');
    let annotationMarker:   any = annotationFrame.findChild((n: any) => n.name === 'marker-key');

    // Place instance in diagram frame
    diagramFrame.appendChild(anatomy.variant);

    // Resize and move digramFrame to match instance
    diagramMarkers.resizeWithoutConstraints(anatomy.variant.width, anatomy.variant.height);
    diagramMarkers.x = anatomy.variant.x;
    diagramMarkers.y = anatomy.variant.y;

    // Loop thru anatomy
    anatomy.items.forEach((i: any, k: any) => {

        // Create annotation markers
        let itemAnnotation:         any = annotationMarker.clone();
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

    // Append to frame
    parent.appendChild(result);

    // Return
    return result

}