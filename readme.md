# Install

* npm install
* npm start

Done!

# Open features
* finish CutScene stuff (animations, props, ...)
* Sound
* Upgrades/Events/Penalties!
* * More/less space in inventory
* * More reward per serving
* * Randomly breaking stations? -> got to get Tools/Wrench to fix it before being able to resume using them
* * A way to increase patience of customers
* Time should show time (e.g. from 08:00 to 18:00) or at the least count down so it's clear when the time is almost over
* saving the scores, show older scores (sorted)
* Hover-States on Buttons
* Intro and outro text for each level
* Multiple levels with offhanding via Director

# Bugs
* If speed is increased, actions should take less long as well (e.g. pickup)
* If inventory is full, clicks on station should not do anything
* Multiple clicks on Cassa should not stack up/take no time if no customer is there

# Recently done
* Re-done buttons with Labels
* Don't keep the score in the scoreCounter...
* Use a Director for score management, *not* a global POJO
* Time stuff via Director as well