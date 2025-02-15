Leah here - updating on where I got to with map stuff by the weekend

WHAT'S HERE
"skeletonmimic.js" - a main file that recreates (mostly) Daniel's motion file. The one thing I've not included is that the boat now stops when its middle reaches the edge, even if its front is over; I didn't want to adapt that because I figured it might step on the toes of the people doing movement. 

"testmap.js" - a map file that I've been using to play around with stuff. 

"boat.js" - a class file for the boat object.

"canal.js" - a class file for the canal object. 

"bank.js" - a class file for the bank object; don't worry about this one, it just makes the rest of the code easier.

"boatmath.js" - some equations my code needed. 


HOW DOES IT WORK IN A NUTSHELL
The boat object has a "canal" attribute, which refers to the canal that it is currently on. If the boat tries to move past the borders of that canal.

Canal objects can link together. If the boat moves into a different canal, then its "canal" attribute changes to the new canal, meaning that it now has new borders it can't go beyond. 

the curving route in "testmap.js" is actually three canals linked together


WHAT IT CURRENTLY CAN'T DO
So far it only works if the canals are drawn as diagonal lines pointing from 3 O'clock to 6 O'clock. Making them more versatile will be a challenge, but that will affect the canal object and not the boat object, so any changes to the boat object can be fine.





