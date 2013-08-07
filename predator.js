function findChildsExposedBox(child){
    var bounds = child.getBoundingClientRect(),
        parent = child.parentNode,
        parentOverflow,
        parentBounds;

    // Convert bounds object to pojo.
    bounds = {
        height: bounds.height,
        width: bounds.width,
        left: bounds.left,
        top: bounds.top,
        right: bounds.right,
        bottom: bounds.bottom
    };

    while(parent && parent !== document){
        parentOverflow = window.getComputedStyle(parent).overflow;
        if(parentOverflow !== 'visible'){
            parentBounds = parent.getBoundingClientRect();

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
                return false;
            }
        }

        parent = parent.parentNode;
    }

    return bounds;
}

module.exports = findChildsExposedBox;