citadel
=======

Citadel is a project to orchestrate location sharing across teams. There
is an alexa and slack component that sync via dynamodb in order to share
with team where a team member is.

Examples
========

Set location
------------

"Alexa, tell citadel I'm working from home"
slack> /set-office home

"Alexa, tell citadel I'm in the office"
slack> /set-office Norfolk

Relay location
--------------

#of-norfolk> [user] is working from home

#of-norfolk jon.robison> /get-office <user>
#of-norfolk> [user] is working from Norfolk

LICENSE
=======

Copyright 2018

Please see included LICESE for details
