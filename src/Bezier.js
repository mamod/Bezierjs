/**
* Bezier
* MIT Licensed
* @author Mamod Mehyar
* http://twitter.com/mamod
* version 1.1
* 23-9-2013
*/

(function () {
    "use strict";
    function Bezier (args) {
        
        var Bzr = this
          , $choose;
        
        Bzr.X = 0;
        Bzr.Y = 1;
        Bzr.CX = 2;
        Bzr.CY = 3;
        Bzr.CURV = [];
        Bzr.line = [];
        Bzr.ctrl = [];
        
        var $length = args.length / 2
          , i       = 0;
        
        while (i < $length){
            Bzr.ctrl.push( args.splice(0,2) );
            i++;
        };
        
        var $n = Bzr.ctrl.length - 1;
        for (var $k = 0; $k <= $n; $k++) {
            if ($k === 0) {
                $choose = 1;
            } else if ($k === 1) {
                $choose = $n;
            } else {
                $choose *= ($n - $k + 1) / $k;
            }
            Bzr.ctrl[$k][Bzr.CX] = Bzr.ctrl[$k][Bzr.X] * $choose;
            Bzr.ctrl[$k][Bzr.CY] = Bzr.ctrl[$k][Bzr.Y] * $choose;
        }
    };
    
    Bezier.prototype = {
        bezier : function () {
            var args = [].splice.call(arguments,0)
              , _bb = new Bezier(args);
            
            this.ctrl = _bb.ctrl;
            return this;
        },
        
        point : function ($t) {
            var $self   = this.ctrl
              , $size   = $self.length
              , points  = []
              , $n      = $size - 1
              , $u      = $t
              , $point;
            
            points.push([ $self[0][this.CX],$self[0][this.CY] ]);
            
            for (var $k = 1; $k <= $n; $k++) {
                points.push([ $self[$k][this.CX] * $u, $self[$k][this.CY] * $u ]);
                $u *= $t;
            }
            
            $point = points[$n];
            
            var $t1 = 1 - $t
              , $tt = $t1;
            
            for (var $k = $n - 1; $k >= 0; $k--) {
                $point[this.X] += points[$k][this.X] * $tt;
                $point[this.Y] += points[$k][this.Y] * $tt;
                $tt = $tt * $t1;
            }
            
            return $point;  
        },
        
        curve : function ($npoints){
            var points  = []
              , $self   = this.ctrl;
            
            $npoints--;
            
            for (var $t = 0; $t <= $npoints; $t++) {
                points.push(this.point($t / $npoints));
            }
            
            this.CURV = points;
            return this;
        },
        
        spline : function (x1,y1,x2,y2) {
            
            var xDiff       = x2-x1
              , yDiff       = y2-y1
              , $len        = this.CURV.length
              , $oldLength  = this.line.length
              , prevX       = 0
              , irr;
            
            var $realX = function($x,$y){
                var ret = yDiff ?
                ($x*xDiff) + x1:
                ($y*xDiff) + x1;    
                return ret.toFixed(2);
            };
            
            //experimental
            var $timing = function ($x,$y,i,index) {
                var tt  = yDiff ? ($x - $y) : $x
                  , ret = (tt - prevX);
                
                ret = yDiff ? ret * (index/100) : ret;
                prevX = tt;
                ret = ret < 0 ? -ret : ret;
                return ret;
            };
            
            var u       = 0
              , lines   = this.line
              , curve   = this.CURV;
            
            for (var i = 0; i < $len; i++){
                var $x  = curve[i][0]
                  , $y  = curve[i][1];
                
                u++;
                irr = i + $oldLength;
                lines[irr] = {
                    x : $realX($x,$y),
                    y : (($y*yDiff) + y1).toFixed(2),
                    easing : $timing($x,$y,irr,u)
                }
            }
            return this;
        },
        
        //return x,y object
        getSpline : function () {
            return this.line;
        },
        
        getCurve : function () {
            return this.CURV;
        }
    };
    
    window.bezier = function (args) {
        if (typeof args !== 'object'){
            args = [].splice.call(arguments,0);
        }
        return new Bezier(args);
    }
})();
