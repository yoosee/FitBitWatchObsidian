#!/usr/bin/ruby
#
# create svg file for watchface as square (round corner) shape.
# tool for fitbit versa watchface development.
#

width = 300
height = 300
margin = 10

radius = 140

s_length = 6
l_length = 14
s_width = 1
l_width = 3

x_center = 150
y_center = 150

x_max = width - x_center - margin
x_min = 0 - x_center + margin
y_max = height - y_center - margin
y_min = 0 - y_center + margin

(0..59).each do |i|
  d  = 2.0 * Math::PI * (i/60.0)
  xi = Math.cos(d)
  yi = Math.sin(d)

  r = radius + 40

  w = (i%5==0 ? l_width : s_width)
  l = (i%5==0 ? l_length : s_length)

  x1 = xi * r
  y1 = yi * r

  if (x1 > x_max) then
    x1 = x_max
    rn = x1 / xi
    y1 = yi * rn
  end
  if (x1 < x_min) then
    x1 = x_min
    rn = x1 / xi
    y1 = yi * rn
  end
  if (y1 > y_max) then
    y1 = y_max
    rn = y1 / yi
    x1 = xi * rn
  end
  if (y1 < y_min) then
    y1 = y_min
    rn = y1 / yi
    x1 = xi * rn
  end

  rn = Math.sqrt(x1*x1 + y1*y1)
  x2 = xi * (rn - l)
  y2 = yi * (rn - l)

  x1 = (x1 + x_center).round
  x2 = (x2 + x_center).round
  y1 = (y1 + y_center).round
  y2 = (y2 + y_center).round

  cl = (i%5==0 ? "fl" : "fs")
  puts "<line x1=\"#{x1}\" y1=\"#{y1}\" x2=\"#{x2}\" y2=\"#{y2}\" class=\"#{cl}\" stroke-width=\"#{w}\" />"
end
