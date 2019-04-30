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
    testArea.innerHTML = '';
}

window.onload = function(){

    testArea = document.createElement('section');
    document.body.appendChild(testArea);
    testArea.style.overflow = 'visible';

    [
        "position:absolute;",
        "top:100px;",
        "left:100px;",
        "bottom:100px;",
        "right:100px;",
        "padding:0;",
        "margin:0;",
        "width:500px;",
        "height:500px;"
    ].forEach(function(thing){
        thing = thing.replace(';','');
        thing = thing.split(':');
        testArea.style[thing.shift()] = thing.shift();
    });

    test('unobscured element', function (t) {
        t.plan(4);

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

        t.equal(rect.height, 300);
        t.equal(rect.width, 300);
        t.equal(rect.top, 200);
        t.equal(rect.left, 200);
        t.end();
        cleanup();
    });

    test('obscured overflow visible parent element', function (t) {
        t.plan(4);

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

        t.equal(rect.height, 300);
        t.equal(rect.width, 300);
        t.equal(rect.top, 0);
        t.equal(rect.left, 200);
        t.end();
        cleanup();
    });


    test('top obscured element', function (t) {
        t.plan(4);

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

        t.equal(rect.height, 200);
        t.equal(rect.width, 300);
        t.equal(rect.top, 400);
        t.equal(rect.left, 200);
        t.end();
        cleanup();
    });



    test('left obscured element', function (t) {
        t.plan(4);

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

        t.equal(rect.height, 300);
        t.equal(rect.width, 200);
        t.equal(rect.top, 200);
        t.equal(rect.left, 100);
        t.end();
        cleanup();
    });

    test('bottom obscured element', function (t) {
        t.plan(4);

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

        t.equal(rect.height, 200);
        t.equal(rect.width, 300);
        t.equal(rect.top, 400);
        t.equal(rect.left, 200);
        t.end();
        cleanup();
    });

    test('right obscured element', function (t) {
        t.plan(4);

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

        t.equal(rect.height, 300);
        t.equal(rect.width, 200);
        t.equal(rect.top, 200);
        t.equal(rect.left, 400);
        t.end();
        cleanup();
    });

    test('left top obscured element', function (t) {
        t.plan(4);

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

        t.equal(rect.height, 200);
        t.equal(rect.width, 200);
        t.equal(rect.top, 100);
        t.equal(rect.left, 100);
        t.end();
        cleanup();
    });

    test('completely off the top element', function (t) {
        t.plan(5);

        var box = createBox({
                height:300,
                width:300,
                top:-500,
                left:100
            });

        testArea.style.overflow = 'hidden';

        testArea.appendChild(box);

        var rect = predator(box);

        delete rect.right;
        delete rect.bottom;

        t.equal(rect.height, 0);
        t.equal(rect.width, 300);
        t.equal(rect.top, 100);
        t.equal(rect.left, 200);
        t.equal(rect.hidden, true);
        t.end();
        cleanup();
    });

    test('an absolute child in a relative parent with overflow=hidden should be visible', function (t) {
        t.plan(5);

        var parent = createBox({
                height:300,
                width:300,
                top:0,
                left:0
            });
        parent.style.position = null;
        parent.style.overflow = 'hidden';

        var box = createBox({
                height:300,
                width:300,
                top:500,
                left:100
            });

        parent.appendChild(box);
        testArea.appendChild(parent);

        var rect = predator(box);

        t.equal(rect.height, 300);
        t.equal(rect.width, 300);
        t.equal(rect.top, 600);
        t.equal(rect.left, 200);
        t.notOk(rect.hidden);
        t.end();
        cleanup();
    });

    test('a static child in a static parent with overflow=scroll should not be visible', function (t) {
        t.plan(5);

        var parent = createBox({
                height:300,
                width:300,
                top:0,
                left:0
            });
        parent.style.position = null;
        parent.style.overflow = 'scroll';

        var box1 = createBox({
                height:300,
                width:300
            });
        box1.style.position = null;
        box1.style.overflow = null;

        var box2 = createBox({
                height:300,
                width:300
            });
        box2.style.position = null;
        box2.style.overflow = null;

        parent.appendChild(box1);
        parent.appendChild(box2);
        testArea.appendChild(parent);

        var rect = predator(box2);

        t.equal(rect.height, 0);
        t.equal(rect.width, 300);
        t.equal(rect.top, 400);
        t.equal(rect.left, 100);
        t.ok(rect.hidden);
        t.end();
        cleanup();
    });

};