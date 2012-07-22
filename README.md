=head1 Bezierjs

Solution of Bezier Curves in javascript, it is a direct port from the Perl module
Math::Bezier by Andy Wardley
    
=head1 DESCRIPTION

This module implements the algorithm for the solution of Bezier curves
as presented by Robert D. Miller in Graphics Gems V, "Quick and Simple
Bezier Curve Drawing".

=head1 SYNOPSIS
    
    //bezier function accept as many points as you want
    //note that the first 2 points represent the starting points of the line
    //and last 2 points represents the end of the line, while the controlling
    //points are everything else in between
    
    var b = bezier(100,20,25,41,19,50,..... 200,250);
    
    //determine how many (x, y) points you want to get along the curve
    b.curve(60);
    
    var c = b.getCurve();
    
    //now c will be a 60 value array of x,y
    [
        [100,20],
        [127,139],
        [x,y],
        ...
        ...
        [200,250]
    ]
    

=head2 Chaining

    This module accepts chaining, so you can draw multi lines with different
    bezier control points

    bezier(0, 0, 0.25, -.45, 1, .8, 1, 1).curve(30).spline(100,100,200,200);
    

=head2 Splines
    
    You can draw multiple splines, each can have a different bezier control points
    and curve points
    
    spline(x1,y1,x2,y2)
    
    //example
    
    var lines = bezier(0,0,.8,1,.95,.02,.8,1,1)
    .curve(50)
    .spline(100,100,300,420)
    .spline(300,420,20,50)
    .bezier(0,1,.6,.7,-.9,-1.2,1,0)
    .curve(50)
    .spline(20,50,700,800).getSpline();
    
    //lines will be now an array of objects as the following
    
    [
        {
            x: 100,
            y: 100,
            timing: function(ms){
                //accepts millisoconds i.e 2000
                //returns times in milliseconds for each point
                //this is useful for animations
            }
        },
        ...
        ...
    ]
    


=head1 TODO

    * Adding some examples and usage cases
    * Fixing timing function for better easing
    * Read some math books to know how things really work in this module :P

    
=head1 LICENSE (MIT)
    
    Copyright (c) 2012 Mamod Mehyar

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
=cut
