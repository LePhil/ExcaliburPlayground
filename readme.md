# Install

* npm install
* npm start

Done!

Tiles/Sprites by Kenney (https://kenney.nl)

# Open features
* finish CutScene stuff (animations, ...)
* Sound
* Upgrades/Events/Penalties!
* * More/less space in inventory
* * More reward per serving
* * Randomly breaking stations? -> got to get Tools/Wrench to fix it before being able to resume using them
* * A way to increase patience of customers
* Time should show time (e.g. from 08:00 to 18:00) or at the least count down so it's clear when the time is almost over
* saving the scores, show older scores (sorted)
* Hover-States on Buttons
* Speech bubbles or Text in its own container outside of the screen. Text on multi-colored bg just can't be read easily.
* move away from electron...
* Animals/Cages with limited amount of items
* rate of interest in a food/animal/item should depend on the worth/duration/amount available. Expensive items should take a long time or be very limited or be only rarely asked for (or a combination/all of them)
* maybe (MAYBE) a small minigame with direct input - it's more fun anyway :)
* Button should have Resources.ImgButton as the default sprite, no need to always pass it.
* player via LevelScene, not via door. Too far away!

# Bugs
* If speed is increased, actions should take less long as well (e.g. pickup)
* Multiple clicks on Cassa should not stack up/take no time if no customer is there
* Level Handling... levelScene should only be created when a game is started.
* Picking up foods is broken right now

# Recently done
* Re-done buttons with Labels
* Don't keep the score in the scoreCounter...
* Use a Director for score management, *not* a global POJO
* Time stuff via Director as well
* Intro/Outro in separate Scenes - no hassle with pausing/unpausing and inputs!
* Conf/Levels/Resources/Storage as Import, not via Global!
* map config should contain next level's name
* added props to Cutscene
* Cutscenes can now change to other cutscene in the same Level
* new Director concept
* Multiple levels with offhanding via Director
* optional Intro and outro text for each level (Pre- and EndGameScene)

# Won't do
* -If inventory is full, clicks on station should not do anything- No. We'd have to check for Tools in Inventory (in case the station is broken) and if there are actions in the queue to remove some items - let the user make mistakes!