(function(){

  var doc = document,
      canvas = doc.body.appendChild( doc.createElement( 'canvas' ) ),
      context = canvas.getContext( '2d' ),
      t = 0,
      w = 0,
  	  h = 0,
      cx = 0,
      cy = 0,
      d = 50;

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

  setInterval( function() {
    context.clearRect( 0, 0, w, h );
    context.fillStyle = 'rgba(255,255,255,1)';
    context.globalCompositeOperation = 'lighter';
    t += .1;
    var wi = Math.floor(w / d);

    while( wi-- ) {

      hi = Math.floor(h / d);
      while( hi-- ) {

        var x = wi*d + (w % d),
            y = hi*d + (h % d),
            xoff = 0,
            yoff = 0;

        xoff += sin(t+x);
        yoff += sin(t+y);

        if (Math.abs(x - cx) < 100 && Math.abs(y - cy) < 100) {
          xoff += 10* sin(PI*(x - cx)/100) * (1 - Math.abs(y - cy)/100);
          yoff += 10* sin(PI*(y - cy)/100) * (1 - Math.abs(x - cx)/100);
        }

        context.fillRect(x + xoff, y + yoff, 5,5);

      }
  	}

  }, 16 );

})()
