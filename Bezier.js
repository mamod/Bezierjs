(function(){
var Bezier = function(arg1){
    
    var _B = this,
    args,$choose;
    
    _B.X = 0;
    _B.Y = 1;
    _B.CX = 2;
    _B.CY = 3;
    _B.CURV = [];
    _B.line = [];
    _B.ctrl = [];
    
    if (typeof arg1 == 'object'){
        args = arg1;
    } else {
        args = [].splice.call(arguments,0);
    }
    
    var $length = args.length / 2,
    i = 0;
    
    while (i < $length){
        _B.ctrl.push( args.splice(0,2) );
        i++;
    };
    
    var $n = _B.ctrl.length - 1;
    
    for (var $k = 0; $k <= $n; $k++) {
        
        if ($k == 0) {
            $choose = 1;
        } else if ($k == 1) {
            $choose = $n;
        } else {
            $choose *= ($n - $k + 1) / $k;
        }
        _B.ctrl[$k][_B.CX] = _B.ctrl[$k][_B.X] * $choose;
        _B.ctrl[$k][_B.CY] = _B.ctrl[$k][_B.Y] * $choose;
    }
};

Bezier.prototype = {
    
    bezier : function(){
        var args = [].splice.call(arguments,0),
        _bb = new Bezier(args);
        this.ctrl = _bb.ctrl;
        return this;
    },
    
    point : function($t){
        
        var $self = this.ctrl,
        $size = $self.length,
        points = []
        ,$point;
        
        var $n = $size - 1;
        var $u = $t;
        
        points.push([ $self[0][this.CX],$self[0][this.CY] ]);
        
        for (var $k = 1; $k <= $n; $k++) {
            points.push([ $self[$k][this.CX] * $u, $self[$k][this.CY] * $u ]);
            $u *= $t;
        }
        
        $point = points[$n];
        
        var $t1 = 1 - $t;
        var $tt = $t1;
        
        for (var $k = $n - 1; $k >= 0; $k--) {
            $point[this.X] += points[$k][this.X] * $tt;
            $point[this.Y] += points[$k][this.Y] * $tt;
            $tt = $tt * $t1;
        }
        
        return $point;  
    },
    
    curve : function($npoints){
        
        var points = [],
        $self = this.ctrl;
        $npoints--;
        
        for (var $t = 0; $t <= $npoints; $t++) {
            points.push(this.point($t / $npoints));
        }
        
        this.CURV = points;
        return this;
    },
    
    spline : function(x1,y1,x2,y2){
        
        if (x1 == false){
            x1 = 0;
            y1 = 0;
            x2 = 1;
            y2 = 1;
        }
        
        var xDiff = x2-x1;
        var yDiff = y2-y1;
        //var line = [];
        
        var $len = this.CURV.length - 1;
        
        var $timing,
        $realX,
        $oldLength = this.line.length,
        irr;
        
        //define timing & x axis position functions -- FIXME
        if (y1 == 0 && y2 == 0 || yDiff == 0){
            
            $timing = function(ms,$x){
                return (ms * $x ).toFixed(3);
            };
            
            $realX = function($x,$y){
                return (($y*xDiff) + x1).toFixed(3);
            };
            
        } else {
            $timing = function(ms,$x,i){
                return (( (ms/$len) * $x ) * i ).toFixed(3);
            };
            
            $realX = function($x,$y){
                return (($x*xDiff) + x1).toFixed(0);
            };
        }
        
        for (var i = 0; i <= $len; i++){
            
            var $x = this.CURV[i][0],
            $y = this.CURV[i][1],
            u = 0;
            
            irr = i + $oldLength;
            
            this.line[irr] = {
                
                x : $realX($x,$y),
                y : (($y*yDiff) + y1).toFixed(0),
                time : function(ms){
                    if (u > irr){ u = 0; }
                    var tt = ( (ms/irr) * u ).toFixed(0);
                    u++;
                    return tt;
                },
                easing : $timing(1000,$x,irr)
            }
        }
        
        return this;
    },
    
    reverse : function(){
        this.ctrl = this.ctrl.reverse();
        return this;
    },
    
    get : function(){
        return this.line;
    }
    
};

window.bezier = function () {
    var args = [].splice.call(arguments,0);
    return new Bezier(args);
}

})();
