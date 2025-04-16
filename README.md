# 2025-group-14
2025 COMSM0166 group 14

## Link to game prototype

[Narrowboat game demo](https://uob-comsm0166.github.io/2025-group-14/)

## Link to Kanban board (Jira)

[Kanban board](https://bristol-team-bmscl43v.atlassian.net/jira/software/projects/SO/boards/1?cloudId=1256e9a6-2479-47c4-9fb8-bf1054da7034&atlOrigin=eyJpIjoiNGM4NmY3MWQwYTMwNGJjMjg0YjFlOTNhMDM5NzJmNDkiLCJwIjoiaiJ9)


## Your Game

Link to your game [PLAY HERE](https://uob-comsm0166.github.io/2025-group-14/)

Your game lives in the [/docs](/docs) folder, and is published using Github pages to the link above.

Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)

## Your Group

Add a group photo here!

![group photo](IMG_0747.jpeg)

| Name | Email | Role |
|----|-----|------|
| Polly Lang | js24119@bristol.ac.uk | developer |
| Leon Wellstead | np24094@bristol.ac.uk | developer |
| Casey Cronyn | mt24200@bristol.ac.uk | developer |
| Daniil Lutskiy | ya24711@bristol.ac.uk | developer |
| Leah Liddle | zs24945@bristol.ac.uk | developer |
| Adam Sidnell | fv24034@bristol.ac.uk | developer |

## Project Report

### Introduction

- 5% ~250 words 
- Describe your game, what is based on, what makes it novel?

#### Game ideas

##### Idea 1: Canal chase game
[Paper Prototype](https://www.youtube.com/watch?v=piU6QgTMxiM)

Top down lightly humorous chase game where you, on a canalboat, must flee a pursuing canalboat, across a top-down map. In addition to dodging your pursuer’s AI, you must master such mechanics as: rounding tight corners (ideally overcoming some very basic physics challenges; this is a secondary priority to AI pursuit mechanics), filling and emptying locks (can slow you or your pursuers down depending on how you time them), canal economics (keep yourself refuelled at chandleries as you pass them) and staying on top of repairs (your boat will need fixing every so often. Either stop and deal with repairs as they come, or keep going forwards until they build up and bring you to a complete halt). 

##### Idea 2: Robot Platformer
[Paper Prototype](https://youtube.com/shorts/YePgMwbQUTk?si=Ox-Gx0sC_hZafTdL)

Platformer style game where you are an Android in the year 2442. An evil conglomerate has stolen parts from you and your mission is to get these back before it's too late and you become obsolete. Along the way you have to go through levels and solve small puzzles and problems to progress. Problems to deal with include lasers, trap doors, and traps. The tools at your disposal include jet packs, teleportation and hacking. These are upgrades that you get as you find the parts and progress through the levels.


### Requirements 

- 15% ~750 words
- Use case diagrams, user stories. Early stages design. Ideation process. How did you decide as a team what to develop?

[Game Requirements - stakeholders, epics, user stories and acceptance criteria](https://github.com/UoB-COMSM0166/2025-group-14/blob/main/Requirements/GameRequirements.txt)

[Testing Session feedback on game requirements - positive feedback, confusing aspects and potential improvements to concept](https://github.com/UoB-COMSM0166/2025-group-14/blob/main/Requirements/TestingSessionFeedback.md)

#### Stakeholders

- Markers
- Developers (us)
- Prospective gamers - friends and family
- Prospective gamers - testers (at testathons)
- Prospective gamers - boaters/enthusiasts
- Prospective gamers - other;

#### Epics

| Stakeholder | Epic |
|---|---|
| Markers | As markers, we want a game that is based around unique mechanics to demonstrate the developers' capabilities.|
| Developers | As developers, we want a game that is easily implementable so that we can complete it within the timeframe.|
|Prospective gamers - friends and family| As friends and family, we want a game that is intutive so that it is easy for casual gamers or new gamers to play.|
|Prospective gamers - testers| As testers, we want a game that is stable so that it will not crash even as we try to break it. |
|Prospective gamers - boaters/enthusiasts| As boaters/enthusiasts, we want a game that captures the tone and feel of the canals.|
|Prospective gamers - other| As prospective gamers, we want a game that is fun to play.|

#### User stories

| Stakeholder | User story | Acceptance crteria |
|---|---|---|
| Markers |As markers, we want the challenge of overcoming map hazards to synergize with damage and pursuit so it can be assessed as a cohesive test of player strategy and thus a "twist".|Given control over the boat avatar and awareness of hazards and the pursuer, when I employ a clear strategy based on game mechanics, I should be able to complete the game.|
| Developers |As developers, we want modular game design based around  the interactions between objects so that they can be worked on seperately and we can thus divide tasks among our team members.|Given that we are assigned individual objects and mechanics to work on, when we merge branches, these mechanics should interact with minimal refactoring.| 
|Prospective gamers - friends and family|As a friend or family of the developers, I want a WASD or arrow-key control system so that I can navigate the boat.|Acceptance Criteria: Given that I have access to a keyboard while playing the game, when I press a button to move the boat avatar, the on-screen boat should move in an expected way.|
|Prospective gamers - friends and family|As a friend or family of the developers, I want instructions so that I can play the game.|Given that I have started up the game myself and seen the loading/introductory screen, when I start gameplay, I should not be confused as to controls or aims.|
|Prospective gamers - testers|As testers, we want the game to have gone through internal testing process so that breaking it will pose a challenge to us.|Given that the game has been submitted to a testathon, when a tester attempts to break it, it should not break.|
|Prospective gamers - boaters/enthusiasts|As a boating enthusiast I want a map that is interestingly shaped to provide a sense of exploration.|Given some familiarity with the English countryside, while playing the game, I should be able to recognise locks, winding holes and fields.|
|Prospective gamers - boaters/enthusiasts|As a boating enthusiast, I want the mechanics to feel verasimilitudinous to boat life.|Given that this avatar is a boat, when the player moves it, it should make the motions of a vessel that turns and advances rather than strafing.|
|Prospective gamers - other|As a player of the game I want a map I can navigate in order to encounter structured challenges.|Given that I have been playing the game for a certain amount of time, when I overcome a level hazard it should have required a greater mastery of the game's mechanics than overcoming a challenge when having played the game for less time.|
|Prospective gamers - other|As a player of the game I want to encounter locks as a map hazard so that there is challenge|Given that locks slow down both the player avatar and the pursuer, when I encounter one on the map, successful employment of other game mechanics should determine whether I am able to pass it or whether it causes me to lose the game.|
|Prospective gamers - other|As a player of the game I want to track and address damage to the boat so that there is a challenge|Given that my boat has taken damage, when I need to strategize in order to beat the game, I should be able to see the damage level and have some option to repair it.|
|Prospective gamers - other|As a player of the game I want to be pursued by an opponent with an increasing skill/power/speed level to keep the challenge consistently fresh.|Given that the game has been played for some time, when the enemy AI moves, it should be operating with a distinct AI algorithm from the starting AI that accounts for more player behaviours.| 
|Prospective gamers - other|As a player of the game I want a map that contains routes and hazards to reward strategic thinking|Given that the player has progressed beyond the very opening stages of the game, when the player makes a choice to move the boat in a particular direction, this should be an enactment of a player strategy rather than progression down a linear route.|
|Prospective gamers - other|As a plyaer of the game I want it to have a small narrative component to provide context.|Given that I have watched the game's introduction, when I see the enemy avatar approach, I should be able to say why they are chasing me and what the stakes are for my hypothetical player character.|


### Requirements Reflection
Initially, for certain cases, we had difficulty distinguishing between the Initiative, Epic, and User Story, as each one requires a different level of specificity -- a level which may vary between different teams due to factors such as the length of their sprints. However, we quickly established that our sprints will be short (not more than one week), and that the categories should be thought of as follows:

(1) **Initiative** = largest overview/goal; it is made up of several Epics.

(2) **Epic** = more narrow scope than an Initiative but large enough that it takes several sprints to complete; it is made up of several user stories.

(3) **User Story** = even more specific than an Epic and must be achievable within a single sprint.

(4) **Acceptance Criteria** = a pre-determined set of expectations/outcomes which is retrospectively measured against a specific user story, to ensure that what was promised has been fulfilled.

Another helpful lesson which Ruzanna mentioned to us is that if a particular Acceptance Criteria depends on something else that is not in the corresponding story, it could mean that it should be broken down into multiple stories. This way, each story can be developed independently, and the epic can be delivered incrementally. This modularity is important because development could otherwise become inefficient.

When establishing the requirements in the specific context of our game, we quickly realised the utility of Agile development, as it can be difficult to know upfront what all the requirements will be. We focused on prioritising the most important aspects of the game. For example, developing fluid and intuitive movement for the boat which the user controls, and not worrying yet about less pressing nice-to-have features like sound effects. As a team, we find the prioritisation matrix below to be a useful tool and reminder of what to work on next.

![Prioritisation matrix](https://www.productplan.com/uploads/2x2-prioritization-1024x536-1.png)
Source: https://www.productplan.com/glossary/2x2-prioritization-matrix/


### Design

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams.

#### UML Class Diagram

This is my first stab at a class diagram. We can update it once we've consolidated the core features and/or planned which features to implement next. For now, it's just a rough and ready template.

![UML Class Diagram of Narrowboat Game core features](./Diagrams/NarrowboatGameUMLv0.1.png)

### Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the three areas of challenge in developing your game. 

### Evaluation

- 15% ~750 words

#### Qualitative Evaluation

##### 'Thinking Aloud' Evaluation

For our Thinking Aloud evaluation, we asked participants to perform two tasks: (i) to complete two loops around our prototype circuit canal (under no contraints) and (ii) to complete the same loops but without being caught by the pursuing boat. As they did the tasks, a facilitator encouraged the participants to speak their thoughts out loud, describing their feelings and reactions to the gameplay in real time. Two observers recorded the feedback, and the team later discussed the results.

We have split our evaluation into four sections. Sections 1 (Constructive criticism) and 2 (Positive Feedback) detail the feedback we recived from our participants, and Section 3 (Analysis) describes our team’s analysis of the feedback.

###### 1. Constructive Criticism

- The corners were difficult to navigate with current movement mechanics. Glitches sometimes occur on corner collision
- The player did not feel in direct control of the movement; there is a learning curve to navigate the corners without crashing and being caught by the pursuer.
- Users thought that there was too much bounce when colliding with the walls of the canals.
- The pursuer was too fast and/or starts too close to the Player. It was almost impossible to win against the pursuer in its current state.
- The repair functionality was not very intuitive, and repairs took too much time.
- The health bar was too small. One participant didn't actually notice that there was a health bar until partway through playing, and was surprised to find that health was being tracked. They suggested that a bigger bar would be easier to notice immediately.
- Changes to the shape of the canal network were suggested: more small bends would be good, not just straight lines.
- Participants questioned how does the player win the game? The objective of the game at the present time is unclear.

###### 2. Positive Feeback

- The canal map shape was interesting because of the sharp corners.
- The game idea was interesting and original; one participant mentioned that they had never played a game like it before.
- Participants liked the top-down birds eye view as they could see the entire map on the screen and therefore see upcoming corners.
- The aesthetics (boats and water texture) received compliments. 

###### 3. Analysis

- We decided that we need to improve collision detection between the player and canal walls. Collisions occur when they should not; being close to the corner as you go around it, but not actually touching the wall, may register as a collision and bounce the player back. This has a big impact on the user’s experience and is therefore high priority.
- We decided to consider reducing the amount which the player bounces away from the wall when they collide.
- A simple tutorial on the controls and objective(s) of the game would make the experience more enjoyable and reduce the learning curve.
- We posited adding sound to collisions and when health goes down to, for example, 50%, to make the game more immersive and make it clearer to the player that they are losing health. The tutorial would also help with this.
- We considered adding multiple levels with varying skill levels for the AI pursuer, so that the player has a chance to get used to the game with a slower pursuer and once they get a feel for the movement of the boat they can progress and have a faster pursuer chasing them. Scaling the difficulty can help us cater to inexperienced and seasoned gamers alike.
- To produce a more difficult level, we can change the camera to scroll the map into view instead of showing the entire map on the screen; not seeing upcoming corners will make it more difficult.



##### Heuristic Evaluation

In the heuristic evaluation, two participants played the game for a short period of time (10 minutes) to familiarise themselves with the controls and gameplay. They then completed a heuristic evaluation of the game's useability, using Nielson's ten useabibility principles. The results are shown in the table below.

| Interface     | Issue         | Heuristics    |Frequency (0-4)| Impact (0-4)  |Persistence (0-4)| Severity (0-4)|
| ------------- |-------------  | ------------- |:-------------:|:-------------:| :-------------: |:-------------:|
| Repairs & visuals | The mechanic of the boat freezing after a repair requires you to start moving again but this is not visually indicated | Visibility of system status | 3 | 2 | 1 | 2 |
| Canal | Enemy boat goes through walls instead of colliding | Error prevention | 1 | 1 | 1 | 1 | 
| Controls | It is hard to turn on sharp corners, especially when boat is at speed | User control and freedom | 2 | 2 | 1 | 2 |
| Canal | Invisible walls mean turning is not always possible but this is not evident to the player | Error prevention | 2 | 3 | 1 | 2 |
| Instructions | It is not immediately obvious how to turn or use the repair. Need clear instructions before the game starts | Help and documentation | 0 | 3 | 1 | 2 |

The feedback from our heuristic evaluation highlighted several usability issues across different components of our game. Broadly, we found that some players struggled with unclear instructions, particularly for turning and repairs, which we plan to address with clearer on-screen prompts and tutorials. We also noted issues with invisible walls affecting turning, alongside difficulty navigating sharp corners at high speeds. Both issues fall under error prevention and user control, suggesting the need for improved visual cues and better control mechanics. To tackle these we will refine the control system and attempt to debug issues with collisions.

#### Quantitative Evaluation

In the quantitative evaluation, we used two methodologies (the System Useability Survey and the NASA Task Load Index) to measure and compare the system useability of two levels of our game. 

The differences between the Easy level and the Difficult level were as follows:
- In the Easy level, the player did not take damage over time. In the Difficult level, the player took 1 point of damage per second
- In the Easy level, the player took 3 points of damage when they collided with the canal; in the Difficult level, the player took 5 points of damage when colliding with the canal
- In the Easy level, there was no pursuer chasing the player. In the Difficult level, an AI pursuer chased the player boat, adding challenge and tension to gameplay.

Ten participants took part in our quantitative evaluation. Each participant played the game at each of the two levels (we asked them to complete two loops around our prototype canal circuit). To control for bias that could arise from participants always playing levels in the same order (thus causing their learning in the first level to affect the useability results of the second level), we alternated the order in which participants played each level. I.e. the first participant played Easy-then-Difficult, the second played Difficult-then-Easy, etc. After completing each level, the participant completed the SUS and the NASA TLX. The results are shown below. 

##### System Useability Survey (SUS)

The questions used in the SUS can be seen on [the Nielson Norman Group website](https://www.nngroup.com/articles/measuring-perceived-usability/). The responses are scores on a sclae between 1 to 5, where 1 means 'Strongly disagree' and 5 means 'Strongly agree'. 

| SUS Question | Average SUS Score (Easy) | Average SUS Level (Difficult) |
|---|---|---|
|1. I think that I would like to use this system frequently| 65 | 47.5 |
|2. I found the system unnecessarily complex|	55 | 65 |
|3. I thought the system was easy to use| 80 | 72.5 |
|4. I think that I would need the support of a technical person to be able to use this system| 85 | 72.5 |
|5.	I found the various functions in this system were well integrated| 65 | 62.5 |
|6.	I thought there was too much inconsistency in this system| 82.5 | 77.5 |
|7.	I would imagine that most people would learn to use this system very quickly| 55 | 35 |
|8.	I found the system very cumbersome to use| 90 | 82.5 |
|9.	I felt very confident using the system| 57.5 | 65 |
|10. I needed to learn a lot of things before I could get going with this system| 87.5 | 80 |
| **Average** | **72.25** | **66** |

Upon applying the Wilcoxon Signed Rank Test on the data, a W-statistic of 11.5 was obtained. For n = 10 and at a significance level of 0.05, this  value is greater than the critical value of 8, indicating a statistically significant difference in the useability scores between the two levels.

A more granular analysis of the raw data showed that particularly large contributions to the useability score came from Questions 4, 7, and 10 for both levels. These questions are:
- I think that I would need the support of a technical person to be able to use this system. (4)
- I would imagine that most people would learn to use this system very quickly. (7)
- I needed to learn a lot of things before I could get going with this system. (10)

Question 2 also made a fairly large contribution to the SUS for the easy level:
- I found the system unnecessarily complex. (2)

These large contributions indicate that currently the useability (or lack thereof) of the system may be dominated by the lack of instruction and information provided to the player when they start the game. We (the developers) needed to tell them quite a lot of information before they could start, and most of the testers took a few moments to get to grips with the controls. However, the large contribution from Question 7 ("I would imagine that most people would learn to use this system very quickly") suggests that once they have absorbed and understood how to use the system, they find it easy to use. 

Based on this, we can conclude that there is a satisfactorily significant difference between the different levels of the game. However, considerable gains in useability for both levels could be achieved by implementing methods to provide more information to the user about how to play the game and use the controls at the outset, for example, text explanations and/or tutorials. 

##### NASA Task Load Index (TLX)

The NASA TLX asks a user to rate the perceived workload of a system (i.e. how effortful it is to use the system) in 6 categories. The results of our evaluation are shown below.

| TLX Question | W value | Sample size | Result significance (at p<0.5) |
|---|---|---| ---|
| Mental Demand | 0 | 9 | significant |
| Physical Demand | 7.5 | 8 | not significant |
| Temporal Demand | 24 | 10 | not significant |
| Effort | 2.5 | 10 | significant |
| Performance | 5 | 9 | significant |
| Frustration | 8 | 10 | significant |

- **Mental demand & Effort**: The result was statistically significant, because increasing the difficulty level implies putting more effort into game play. Moreover, both tests were redone with the p=0.01, and the difference in means of the 2 groups was still statistically significant. We conclude from this that there is a significant difference in mental demand and effort between the easy level and the difficulty level, as there should be.
- **Physical demand**: The difference between the groups was not statistically significant, because in each case the controls for the player’s character were the same, i.e. pressing arrow keys for the boat movement.
- **Temporal demand**: The difference between the groups was not statistically significant, because there was no time limit in completing the task in each case. 
- **Performance**: We expected the difference not to be statistically significant because of the way the nature of the task (make *n* number of laps around a canal circuit). However, the players reported feeling that they completed the task more successfully on a difficult level than on the easy level. This result could not be explained by participants getting accustomed to the game play mechanics, because the order of difficulty (easy then hard or vice versa) was alternated.
- **Frustration**: At the time of conducting the testing we had unfixed bugs appearing randomly during the gameplay, which players might find unfair. Increased frustration at higher levels could have been induced by greater unjustified punishment.


#### Response to the Evaluation

In response to the feedback we received during the qualitative and quantitative evaluations, we critically reflected on how, based on this feedback, we could make changes to our game to improve its useability. The changes that we implemented in response to each category of constructive criticism are shown in the table below.

| User Feedback | Our Response |
| -----|-----|
| Issues with movement mechanics: glitches/bug, trouble navigating corners, too much bounce in collision with canal walls|We did a complete refactor of the game, overhauling how movement mechanics and collision mechanics were implemented by replacing our more error-prone implementations with classes and methods from the [p5 play library](https://p5play.org/learn/index.html). This considerably reduced the errors and bugs in our game, and enabled more fine-tuning of the movement and collision features.|
| The pursuer boat was too fast, started too close to the player, was almost impossible to escape, and occasionally experienced bugs such as passing through canal u-turns to reach player| The p5 play library was also used to refactor the Pursuer class, reducing bugs. We also re-tuned the pursuer's parameters to make it less fast/maneuverable, and changed its path-finding mechanism to ensure that it follows the player's trail rather than finding the shortest path to reach the player, ensuring that it never 'cuts the corner', passing through walls.|
| One of the most frequent constructive criticisms we received, as well as the main conclusion of the SUS quantitative evaluation, was that figuring out how to play the game i.e. use the controls and understand the rules/environment was difficult and negatively affected the useability. Even with facilitators from our team explaining the controls before the participants started playing, they still reported that there was a steep learning curve before they felt confident playing the game.| We made three main changes to the game in response to this: first, we implemented game control flow logic that meant that the player moves through a an introduction screen before proceesing on to the gameplay. This introduction screen details the narrative background to the game, as well as giving a brief overview of the controls and rules of the game before the player starts playing. Our second change was that, if the player still feels unsure of how to play the game, they have the option to play a 'Level 0' Tutorial level in which all of the controls and hazards of the game (movement controls, health damage, collision, pursuit, repair, garbage collection) are described, demonstrated, and they are asked to perform them one-by-one to learn how they work and what they look like. Finally, we have provided options for the player to play the game on three different difficulty levels: Easy, Medium and Hard, to suit different levels of ability and confidence. Differences between the levels were informed from the results of the quantitative evaluation, and involve differences in health damage over time, collision damage, maximum health of the player, the speed/ameuverability of the pursuer, and the length of time that collecting garbage freezes the pursuer.|
| Winning and losing conditions were unclear: how do you win the game?| The lack of win/lose conditions was due to the prototype nature of our game during the evaluations. Since then, we have implemented winning and losing conditions. The player wins the game by reaching the end of the canal network without having their health reduced to zero, whereupon they are re-directed to the win screen, from where they can choose to play the game again, or play a different level/difficulty. The player loses the game by having their health fall to zero, whereupon they are redirected to the lose screen, from where they can choose to play the again.|
| Health bar was too small and unnoticeable | The size of the healthbar was increased. The presence of health tracking, and the damage taken over time and during collisions was highlighted to the player in the introduction menu and tutorial, before gameplay starts.|
| Repair functionality is unintuitive and too slow | Use of the repair functionality was described on the Introduction page of the game, and taught in the Level 0 tutorial. Repair functionality was re-tuned to take less time, reducing player frustration. |
| Other useability and accessibility considerations | Although it was not explicitly mentioned during the evaluations, we decided to improve the useability and accessibility of the game by implementing a pause button, which allows the player to pause and resume the game by clicking the button. They can do this at any time during gameplay, and as many times as they like. It is also possible to escape from gameplay and go back to the start screen (from where the player can start a new game) at any time using the Escape key on the keyboard. This gives the user control over the game, and enables them to go back to change settings or start again.|  

### Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools did you use. Did you have team roles? Reflection on how you worked together. 

### Conclusion

- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work. 

### Contribution Statement

- Provide a table of everyone's contribution, which may be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Let us know as soon as possible if there are any issues with teamwork as soon as they are apparent. 

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5%) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.

- **Documentation** of code (5%)

  - Is your repo clearly organised? 
  - Is code well commented throughout?
