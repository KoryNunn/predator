function getExposedBoundingRect(child){
    var childWindow = (child.ownerDocument || child).defaultView,
        childDocument = child.ownerDocument || child,
        originalBounds = child.getBoundingClientRect(),
        parent = child.parentNode,
        parentOverflow,
        parentBounds,
        bounds;

    // Convert bounds object to pojo.
    bounds = {
        original: originalBounds,
        height: originalBounds.height,
        width: originalBounds.width,
        left: originalBounds.left,
        top: originalBounds.top,
        right: originalBounds.right,
        bottom: originalBounds.bottom
    };

    while(parent){
        if(parent === childDocument){
            parentBounds = {
                top: 0,
                left: 0,
                bottom: childWindow.innerHeight,
                right: childWindow.innerWidth,
                height: childWindow.innerHeight,
                width: childWindow.innerWidth
            };
        }else{
            var childStyle = childWindow.getComputedStyle(child);
            var parentStyle = childWindow.getComputedStyle(parent);
            var childPosition = childStyle.position;
            var parentPosition = parentStyle.position;
            var parentOverflow = parentStyle.overflow;
            if(
                parentOverflow === '' ||
                parentOverflow === 'visible' ||
                (
                    (childPosition === 'fixed' || childPosition === 'absolute') &&
                    !(parentPosition === 'fixed' || parentPosition === 'absolute')
                )
            ){
                child = parent;
                parent = parent.parentNode;
                continue;
            }
            parentBounds = parent.getBoundingClientRect();
        }

        if(parentBounds.top > bounds.top){
            bounds.height = bounds.height - (parentBounds.top - bounds.top);
            bounds.top = parentBounds.top;
        }
        if(parentBounds.left > bounds.left){
            bounds.width = bounds.width - (parentBounds.left - bounds.left);
            bounds.left = parentBounds.left;
        }
        if(parentBounds.right < bounds.right){
            bounds.width = bounds.width - (bounds.right - parentBounds.right);
            bounds.right = parentBounds.right;
        }
        if(parentBounds.bottom < bounds.bottom){
            bounds.height = bounds.height - (bounds.bottom - parentBounds.bottom);
            bounds.bottom = parentBounds.bottom;
        }

        if(bounds.width <= 0 || bounds.height <= 0){
            bounds.hidden = true;
            bounds.width = Math.max(bounds.width, 0);
            bounds.height = Math.max(bounds.height, 0);
            return bounds;
        }

        parent = parent.parentNode;
    }

    return bounds;
}

module.exports = getExposedBoundingRect;