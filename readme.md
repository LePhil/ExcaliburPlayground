# Install

* npm install
* npm start

Done!

# Open features
* finish CutScene stuff (animations, ...)
* More sounds!
* Upgrades/Events/Penalties!
    * More/less space in inventory
    * More reward per serving
* move away from electron...
* maybe (MAYBE) a small minigame with direct input - it's more fun anyway :)
* customers via LevelScene, not via door. Too far away!
* Pagination on textoverlay, if content is too long.
* some ambient sounds for cutscenes etc., play one at random
* much more extended player character with separate eyes (blinking, emotions), mouth ("talking" in cutscenes, frowning) and legs (animated)
* finish Animals/Animal Cages (similar to FoodStations)
* FoodStations should serve FOOD, not Animals -> Bones, Cans, etc.
* Random Mode with difficulty setting
* Minigames for Itemsources
* Tasks during each level (=passed or failed level!)
    * many initial items that have to be interacted with
        * cobwebs
        * tall grass (outside level)
    * something that takes a long time and can be done contiuously until stopped
        * build a cage
        * make fliers
        * work on computer
    * Blob should probably be a task.
* Level selection map with different areas (see mappack --> ice, desert, ... - the classics.) Each area with a different customer type (Desert = yellow, Woods = green, Ice = blue...) - Outdoor party as last level each.
* maybe it would be easier to remove a scene completely and re-create it instead of resetting and keeping track of everything?
* unify tools and items? Should be possible to have a Tool from an ItemSource (e.g. crate)
* Passed/Failed on LevelEnd (indication + maybe only be able to continue if passed?)
* Left-/Right-looking action for cutscene
* longer levels
* certain nr of points one should get per level

# Bugs
* "solved" taskItems re-appear when changing a level.
* pausing the Effect on the EndgameScene doesn't work (init of concrete type happens after pausing...)
* fireworks doesn't seem to work anymore

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
* Button should have Resources.ImgButton as the default sprite, no need to always pass it.
* some sounds <3
* Credits
* Level Handling... levelScene should only be created when a game is started.
* Settings should be its own scene - showing & hiding buttons is embarassing.
* stations don't break at the moment --> break again
* Audio Settings + Storage
* Randomly breaking stations -> got to get Hammer to fix it before being able to resume using them
* Tools are generated via Config & ToolFactory
* Fixed: changing the player color (options) after having started a game doesn't get saved
* Settings for Text in Textoverlay (Bold, etc.) from Config
* various button positions via Config, don't want to calculate it in each scene again..
* remove patience bar when paid
* blob can go out of the screen
* Cassa click: Player shouldn't stand on top of it, but beside the cassa. Makes it easier to click it as well!
* Time should show time (e.g. from 08:00 to 18:00) or at the least count down so it's clear when the time is almost over
* Animals/Cages with limited amount of items (WIP)
* if the inventory is full it should not remove an animal from the cage!
* first level: Rabbit Cage doesn't have any rabbits!
* AnimalCages (and/or ItemSources with a finite number of items) should be able to be defined via config (A for Amount) - no amount = infinite = spawn 5 but don't reduce.
* Level setup is wonky, desiredItems and itemSources don't get changed!
* Customers not in the Queue get reset on Level change now
* : in timer 
* Duration_S is now followed again
* Scores are no longer sorted alphabetically (72 > 123)...
* only a certain amount of scores are kept per level
* heart/coin effect with sprites
* Progress Bar is now its own thang - For Task items and for customer happiness/patience
* saving the scores, show older scores (sorted)
* more doorbell sounds, play at random (https://freesound.org/people/maisonsonique/packs/12501/)
* Make a Firework -Item- Tool
* Progressbar with Graphics from UIPack RPG
* workaround for #292 :(
* cutscenes: background image covers the text (zIndex, probably) (--> text is now at the bottom of the screen.)
* Speech bubbles or Text in its own container outside of the screen. Text on multi-colored bg just can't be read easily.
* when restarting a level, levelMap has a higher z-index than task Items...
* TaskItems now take some time and multiTaskItems have a nicer progressbar
* Some kind of weather effects (snow/rain overlay)
* works in Electron now <3
* added logo
* Score Screen overhaul
* Customers can wish for for multiple items now
* Credits are in HTML now too
* left-looking idle when last walked left

# Won't do
* If inventory is full, clicks on station should not do anything- No. We'd have to check for Tools in Inventory (in case the station is broken) and if there are actions in the queue to remove some items --> let the user make mistakes!
* rate of interest in a food/animal/item should depend on the worth/duration/amount available. Expensive items should take a long time or be very limited or be only rarely asked for (or a combination/all of them)
* unique sprites for main characters (2 so far)
* Create remaining sprite for the dude

# Depending on https://github.com/excaliburjs/Excalibur/issues/292
* If speed is increased, actions should take less long as well (e.g. pickup)
* Multiple clicks on Cassa should not stack up/take no time if no customer is there
* Picking up foods is broken right now, doesn't pause the player