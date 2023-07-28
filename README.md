# PvJ-tabletop-gameboard
Gameboard / dashboard for  ProsVsJoes team tabletop exercises for workstream management and team coordination

It is a good advantage to run tabletop exercises in person. However, that is not always possible. So this web-based game board was developed to use over screensharing video conferencing.

The game facilitator opens the gameboard.html file, stored locally, in his browser and then shares that window with the group. The facilitator will be clicking the various controls to change the statuses and move the game forward round by round.

**NOTE:** DO NOT refresh the page or else you will lose all of your game status and counters! 

## Other materials needed
A standard deck of playing cards.

## Gameboard Operator's Function Guide
* Click on a server's title to change it.
* Click on a server's **UP button** to take the server DOWN. A random Fix Time will automatically be generated.
* **Shift-click** on a server's **DOWN button** to BORK the server.
* Click on a server's **BORKED button** to change the server state to UP and Unassigned.
* Click on a server's **Unassigned button** to change it to Assigned. The Fix Time will not progress if no one is assigned to the server.
* **Shift-click** a server's **Assigned button** to change it to Collab mode, indicating two or more team members are assigned to fixing it. Collab mode will fix the server twice as fast (the Fix Time decreases by two each round).
* Click the blue **Next Round button** to score this round (5 points per UP server) and move to the next round.
* Click the **Rollback/Reset button** to spend 150 points and fix a BORKED server. (Click the BORKED button on the server also).
* Click the **Use Prepared Script button** to decrement the Scripts Remaining count and instantly repair a server (click the DOWN button on the appropriate server also). Note that scripts can't fix BORKED servers.

You can add "servers=n" and "scripts=n" parameters to the URL to change the number of servers and Prepared Scripts count when starting an exercise. For example:
http://[local_file_location]/gameboard.html?servers=15&scripts=5
**These parameters do not change or update anything mid-exercise. Do not change them or reload the page once the exercise has started or you will lose the status and counters!**

## To Adjust the difficulty of the Exercise
You can change the number of servers in the game by adding the "servers" parameter to the URL, e.g.:
http://[local_file_location]/gameboard.html?servers=15

The minimum number of servers is five. The maximum allowed is 15. Any other number given will default to 5.
For a normal exercise difficulty, have one server per person on the team.
For a more challenging exercise, have more than one server per person. Fifteen servers for a team of nine or ten blue team players is about what you will encounter in the Las Vegas Pros-vs-Joes event. 

## To Run The Tabletop Exercise

1. Assemble the team that will be playing in the event. Discuss strengths and who wants to manage which server.
Recommended arrangement is to have a primary, secondary, and padwan for each server.
This exercises only has five servers, in the real game this will be more like ten to fifteen servers.

2. Have the players discuss how they will prioritize and coordinate tasks during the game.

3. Then start by loading the gameboard in your browser and sharing your screen.

4. Determine how many rounds the group will play. To simulate the full two-day event with each round taking ten minutes, play the exercise for 70 rounds. Any subsequent re-plays intended for improving scores should be run for the same number of rounds so that the scores can be compared.

5. Click the "Next Round" button to start off all services as up and the team getting 5 points for each UP server.

#### Now play each round of the simulation by these steps:
1. **Draw a playing card to determine what the red team will do.** 
See the "Red Team Action Cards Table" below and lookup the result. If the Red Team attacks a server, click the "UP" status button on the attacked server to change the status to "DOWN". You will see a Fix Time number appear; that is the number of rounds the server will take to fix. The fix time will automatically decrease with each click of the Next Round button **only if** there is someone assigned to that server fix task. Let the group determine who will work on it and when (hopefully now, but if everyone is already busy, remember that player cannot work on two servers at the same time!)
**Click the "Unassigned" button once someone has been assigned to fix this server.** This will change the status to "Assigned". 
Also note that players can pair-up and collaborate on a server fix, which solves the problem in half the time. Shift-click on the "Assigned" status button to change it to "Collab" and this will reduce the Fix Time by two rounds each round instead of one per round.
2. Continue to assign players to the DOWN servers until all assignments that can be made have been made. DO NOT assign more machines than you have players! The maximum number of machines any one player can work on in a single round is ONE. No player can work on two or more machines in the same round.
3. **Click the "Next Round" button and go back to step 1 of the round play.**
Repeat until the pre-determined rounds have been played.

Yes the Red Team will be attacking servers every round as per the card draw. The blue team will quickly become busy.

If you draw a card that says a server has been "borked", then shift-click the "DOWN" status on that server to change it to "BORKED" status. Borked servers cannot be fixed with time; they will require a restore / reset.

## To complete the Exercise
After completing the predetermined number of rounds, take note of the final score and ask the team how they could improve the score next time. Facilitate a discussion of deciding the strategies and tactics the team wants to use on PvJ game day to maximize focus, support, information sharing, and collaboration on tasks.

Write down the team decisions and write them up in an email or playbook. Review them at the game table on the morning of Day 1 of the PvJ event. Play, fine tune, and adjust the battle plan as needed!

## Red Team Action Table
Use a regular deck of cards. You can adjust the level of difficulty of the exercise by altering the contents of the deck:

**EASIER** level for smaller teams or orientation: remove all the face cards and the jokers.

**REGULAR** level: leave out the jokers.

**HARDER** level: use the full deck, including the jokers.

Once you have drawn a card, place it in the discard pile. Reshuffle the discard pile when you run out of cards in the draw pile, or at your descretion you can reshuffle when you have about a quarter of the deck left in the draw pile. 

#### Red Team Action Table for 5-10 servers
|Card Drawn|Action|
|---|---|
|A thru 10, any suit| Corresponding server number is attacked and knocked down. If there is no corresponding server (e.g., the 8 of clubs is drawn but there are only 5 servers) then the attack is considered failed.|
|Jack, any suit| A double attack! Continue to draw cards until you have two more pip cards (and ignore any additional face cards). Attack (take down) the servers numbers that correspond the the cards drawn.|
|Queen, any suit| A triple attack! First, take back down whatever server was last fixed. Then continue to draw cards until you have two more pip cards (and ignore any adiitional face cards). Attacks take down the server numbers that correspond to the cards drawn.|
|King, any suit| Quadruple attack! Same as the queen, except undo the LAST TWO servers that the team had fixed!|
|Joker, any time| If a joker is drawn at any point, attacks take down ALL servers!|

#### Red Team Actions for 11-15 servers
Use the table above, but red pip cards (hearts and diamonds) correspond to servers 11-15, as such:
|Card Drawn|Server Correspondence|
|---|---|
|Red Ace|Server #11|
|Red Two|Server #12|
|Red Three|Server #13|
|Red Four|Server #14|
|Red Five|Server #15|
|Red Six thru Ten|Failed attack. No server get taken down in this round.|

The face cards (Jack thru King) work the same and the color doesn't matter.
The jokers still take down every single server. You can use them to simulate the scorched earth last hour of the game if you draw them in round 64 of a 70-round game.


