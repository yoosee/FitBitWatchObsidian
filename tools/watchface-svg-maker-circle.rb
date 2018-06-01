#!/usr/bin/ruby
#
# create round watchface svg file.
# tool for fitbit versa watchface development.
#

width = 300
height = 300

radius = 140

s_length = 8
l_length = 20
s_width = 2
l_width = 5

center_x = 150
center_y = 150

(0..59).each do |i|
  d  = 2.0 * Math::PI * (i/60.0)
  xi = Math.cos(d)
  yi = Math.sin(d)

  xa = 0
  ya = 0

  w = (i%5==0 ? l_width : s_width)
  l = (i%5==0 ? l_length : s_length)
  x1 = (center_x + xi * (radius + xa)).round
  y1 = (center_y + yi * (radius + ya)).round
  x2 = (center_x + xi * (radius + xa - l)).round 
  y2 = (center_y + yi * (radius + ya - l)).round

  cl = (i%5==0 ? "fl" : "fs")
  puts "<line x1=\"#{x1}\" y1=\"#{y1}\" x2=\"#{x2}\" y2=\"#{y2}\" class=\"#{cl}\" stroke-width=\"#{w}\" />"
end
