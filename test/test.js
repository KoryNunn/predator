var test = require('tape'),
    crel = require('crel'),
    predator = require('../'),
    testArea;

function createBox(position){
    var box = crel('div');

    box.style.position = 'absolute';
    box.style.top = position.top + 'px';
    box.style.left = position.left + 'px';
    box.style.height = position.height + 'px';
    box.style.width = position.width + 'px';

    return box;
}

function cleanup(){
    testArea.style.overflow = 'visible';  
    //testArea.innerHTML = '';
}

window.onload = function(){

    testArea = document.body;
    testArea.style.overflow = 'visible';  

    test('unobscured element', function (t) {
        t.plan(1);

        var box = createBox({
                height:300,
                width:300,
                top:100,
                left:100
            });

        testArea.appendChild(box);

        var rect = predator(box);

        delete rect.right;
        delete rect.bottom;
        
        t.deepEqual(rect, {
            height:300,
            width:300,
            top:200,
            left:200
        });
        t.end();
        cleanup();
    });

    test('obscured overflow visible parent element', function (t) {
        t.plan(1);

        var box = createBox({
                height:300,
                width:300,
                top:-100,
                left:100
            });

        testArea.appendChild(box);

        var rect = predator(box);

        delete rect.right;
        delete rect.bottom;
        
        t.deepEqual(rect, {
            height:300,
            width:300,
            top:0,
            left:200
        });
        t.end();
        cleanup();
    });


    test('top obscured element', function (t) {
        t.plan(1);

        var box = createBox({
                height:300,
                width:300,
                top:300,
                left:100
            });

        testArea.style.overflow = 'hidden';  

        testArea.appendChild(box);

        var rect = predator(box);

        delete rect.right;
        delete rect.bottom;
        
        t.deepEqual(rect, {
            height:200,
            width:300,
            top:400,
            left:200
        });
        t.end();
        cleanup();
    });



    test('left obscured element', function (t) {
        t.plan(1);

        var box = createBox({
                height:300,
                width:300,
                top:100,
                left:-100
            });

        testArea.style.overflow = 'hidden';  

        testArea.appendChild(box);

        var rect = predator(box);

        delete rect.right;
        delete rect.bottom;
        
        t.deepEqual(rect, {
            height:300,
            width:200,
            top:200,
            left:100
        });
        t.end();
        cleanup();
    });

    test('bottom obscured element', function (t) {
        t.plan(1);

        var box = createBox({
                height:300,
                width:300,
                top:300,
                left:100
            });

        testArea.style.overflow = 'hidden';  

        testArea.appendChild(box);

        var rect = predator(box);

        delete rect.right;
        delete rect.bottom;
        
        t.deepEqual(rect, {
            height:200,
            width:300,
            top:400,
            left:200
        });
        t.end();
        cleanup();
    });

    test('right obscured element', function (t) {
        t.plan(1);

        var box = createBox({
                height:300,
                width:300,
                top:100,
                left:300
            });

        testArea.style.overflow = 'hidden';  

        testArea.appendChild(box);

        var rect = predator(box);

        delete rect.right;
        delete rect.bottom;
        
        t.deepEqual(rect, {
            height:300,
            width:200,
            top:200,
            left:400
        });
        t.end();
        cleanup();
    });

    test('left top obscured element', function (t) {
        t.plan(1);

        var box = createBox({
                height:300,
                width:300,
                top:-100,
                left:-100
            });

        testArea.style.overflow = 'hidden';  

        testArea.appendChild(box);

        var rect = predator(box);

        delete rect.right;
        delete rect.bottom;
        
        t.deepEqual(rect, {
            height:200,
            width:200,
            top:100,
            left:100
        });
        t.end();
        cleanup();
    });


};