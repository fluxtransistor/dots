(function(){

  var doc = document,
      canvas = doc.body.appendChild( doc.createElement( 'canvas' ) ),
      context = canvas.getContext( '2d' ),
      t = 0,
      w = 0,
  	  h = 0,
      cx = 0,
      cy = 0,
      d = 50,
      action = '',
      actionTime = 0,
      actionStart = 0;

  var cos = Math.cos,
	    sin = Math.sin,
	    PI = Math.PI;

  if (window.Event) {
	   doc.captureEvents(Event.MOUSEMOVE);
	}
  doc.onmousemove = getCursorX;

  function fill() {
  	canvas.width = w = innerWidth;
  	canvas.height = h = innerHeight;
  }

  function getCursorX(e) {
	   cx = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
     cy = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  }

  addEventListener('resize', fill, false);
  fill();

  document.addEventListener("keydown", onKeyPressed);

  function onKeyPressed(e) {
      var keyCode = e.keyCode;
      var key = e.key;
      // console.log('Key Code: ' + keyCode + ' Key: ' + key);
      switch (keyCode) {
        case 32:
          if (!action) {
            action = 'bounce';
            actionTime = 2;
            actionStart = t;
            break;
          }
      }
  }

  setInterval( function() {
    context.clearRect( 0, 0, w, h );
    context.fillStyle = 'rgba(255,255,255,1)';
    context.globalCompositeOperation = 'lighter';
    t += .1;
    var wi = Math.floor(w / d);

    if ((actionStart + actionTime) <= t) {
      action = '',
      actionTime = 0,
      actionStart = 0
    }

    while( wi-- ) {

      hi = Math.floor(h / d);
      while( hi-- ) {

        var x = wi*d + (w % d),
            y = hi*d + (h % d),
            xoff = 0,
            yoff = 0;

        xoff += 3*sin(0.5*t+x);
        yoff += 3*sin(0.5*t+y);

        switch (action) {
          case 'bounce':
            var progress = ((t - actionStart) / actionTime);
            yoff -= 35 * (4 * progress * (1-progress));
            break;
        }

        if (Math.abs(x + xoff - cx) < 200 && Math.abs(y + yoff - cy) < 200) {
          xoff += 20* sin(PI*(x + xoff - cx)/200) * (1 - Math.abs(y + yoff - cy)/200)**2;
          yoff += 20* sin(PI*(y + yoff - cy)/200) * (1 - Math.abs(x + xoff - cx)/200)**2;
        }

        if (0 < x + xoff < wi )
        context.fillRect(x + xoff, y + yoff, 5,5);

      }
  	}

  }, 16 );

})()
