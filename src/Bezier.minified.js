/**
* Bezier
* MIT Licensed
* @author Mamod Mehyar
* http://twitter.com/mamod
* version 1.1
* 23-9-2013
*/

(function(){function h(b){var c;this.X=0;this.Y=1;this.CX=2;this.CY=3;this.CURV=[];this.line=[];this.ctrl=[];for(var a=b.length/2,d=0;d<a;)this.ctrl.push(b.splice(0,2)),d++;b=this.ctrl.length-1;for(a=0;a<=b;a++)c=0===a?1:1===a?b:c*((b-a+1)/a),this.ctrl[a][this.CX]=this.ctrl[a][this.X]*c,this.ctrl[a][this.CY]=this.ctrl[a][this.Y]*c}h.prototype={bezier:function(){var b=[].splice.call(arguments,0);this.ctrl=(new h(b)).ctrl;return this},point:function(b){var c=this.ctrl,a=[],d=c.length-1,f=b;a.push([c[0][this.CX],
c[0][this.CY]]);for(var g=1;g<=d;g++)a.push([c[g][this.CX]*f,c[g][this.CY]*f]),f*=b;c=a[d];f=b=1-b;for(g=d-1;0<=g;g--)c[this.X]+=a[g][this.X]*f,c[this.Y]+=a[g][this.Y]*f,f*=b;return c},curve:function(b){var c=[];b--;for(var a=0;a<=b;a++)c.push(this.point(a/b));this.CURV=c;return this},spline:function(b,c,a,d){a-=b;d-=c;for(var f=this.CURV.length,g=this.line.length,h=0,m,n=0,q=this.line,p=this.CURV,l=0;l<f;l++){var k=p[l][0],e=p[l][1];n++;m=l+g;var r=q,s=(d?k*a+b:e*a+b).toFixed(2),t=(e*d+c).toFixed(2),
k=d?k-e:k,e=k-h,e=d?e*(n/100):e,h=k,e=0>e?-e:e;r[m]={x:s,y:t,easing:e}}return this},getSpline:function(){return this.line},getCurve:function(){return this.CURV}};window.bezier=function(b){"object"!==typeof b&&(b=[].splice.call(arguments,0));return new h(b)}})();
