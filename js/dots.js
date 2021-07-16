(function(){

  var doc = document,
	  canvas = doc.body.appendChild( doc.createElement( 'canvas' ) ),
	  ctx = canvas.getContext( '2d' ),
	  t = 0,
	  w = 0,
	  h = 0,
	  cx = 0,
	  cy = 0,
	  d = 40,
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
	ctx.clearRect( 0, 0, w, h );
	ctx.fillStyle = 'rgba(255,255,255,1)';
	ctx.globalCompositeOperation = 'lighter';
	t += .1;
	var wi = Math.floor(w / d) + 1;

	if ((actionStart + actionTime) <= t) {
	  action = '',
	  actionTime = 0,
	  actionStart = 0;
	}
	
	// path drawing code here
	
	var path = new Path2D()
	path.arc(w/2,h/2,h/3,0,Math.PI*2,true);	 // Outer circle
   
	path.moveTo(w/2 + h/4.5,h/2);
	path.arc(w/2,h/2,h/4.5,0,Math.PI,false);	 // Mouth
   
	path.moveTo(w/2+h/8+h/50,h/2.61);
	path.arc(w/2+h/8,h/2.61,h/50,0,Math.PI*2,true);	// Left eye
   
	path.moveTo(w/2-h/8+h/50,h/2.61);
	path.arc(w/2-h/8,h/2.61,h/50,0,Math.PI*2,true);	// Right eye
	
	ctx.strokeStyle = "red";
	ctx.stroke(path);
	

	while( wi-- ) {

	  hi = Math.floor(h / d);
	  while( hi-- ) {
		
		// per-dot code here
		
		var x = wi*d + (w % d),
			y = hi*d + (h % d),
			xoff = 0,
			yoff = 0;
			
		
		var found = false;
		
		var srad = 0;
		while (!found) {
			srad += 1;
			if (srad > 5) {
				break;
			}
			var sx = x-3*srad;
			while (!found) {
				sx += 2*srad;
				if (sx > x+srad) {
					break;
				}
				var sy = y-3*srad;
				while (!found) {
					sy += 2*srad;
					if (sy > y+srad) {
						break;
					}
					//console.log(sy);
					//console.log(sx);
					found = ctx.isPointInPath(path,sx,sy);
				}
			}
		}
		if (found) {
			ctx.fillRect(sx, sy, 10,10);
			continue;
		}
		

		xoff += 3*sin(0.5*t+x);
		yoff += 3*sin(0.5*t+y);

		switch (action) {
			case 'bounce':
			var progress = ((t - actionStart) / actionTime);
			yoff -= 35 * (4 * progress * (1-progress));
			break;
		}

		var dist = Math.sqrt(((x+xoff - cx)**2) + ((y+yoff - cy)**2));

		if (dist <= 200) {
			xo_temp = 30* sin(PI*(x + xoff - cx)/200) * ((200 - dist)/200)**2;
			yo_temp = 30* sin(PI*(y + yoff - cy)/200) * ((200 - dist)/200)**2;
			
			sideDist = Math.min(cx, cy, w - cx, h - cy);
			
			if (sideDist < 200) {
				
				xo_temp *= sideDist/200;
				yo_temp *= sideDist/200;
			}
			
			xoff += xo_temp;
			yoff += yo_temp;
		}
		
		
		//if (-5 < x + xoff < wi + 5 && -5 < y + yoff < hi + 5) {
		ctx.fillRect(x + xoff, y + yoff, 5,5);
		//}

	  }
	}
  }, 16 );

})()
