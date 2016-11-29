# Projekt3

Your Netflix & chill plans aren't panning out and your (in)significant other wants to hit the town. 
But where to go?

Use Projekt3! (pronounced Pro-yekt tree)

Search for an artist or event and this full-stack web app will use the HTML5 geo-location function to pinpoint your location and pass that information to relevant APIs, (Ticketmaster and YouTube for now) to find events happening around you, and to provide some information and context about that event. e.g. If you search for Ke$ha (but why?) it will show you the most popular Ke$ha video on YouTube as well as link you to her concerts (if any) that are closest to you in location and date. After your ears stop bleeding, you can click the link to purchase tickets through Ticketmaster, everybody's favorite ticketing provider. Projekt3 will impose an additional $89.95 on top of any Ticketmaster fees. 

Once logged in, users will be able to save events to create a history of events attended.

We will sell your user data to anyone who asks and even some who don't. 

### Technologies:
HTML, CSS, Javascript, PSQL, Express, React, Node

Group: Mat Cullen, Lee Wilson, Darryl Zeigler

### Approach: 

We drew a site wireframe, heirarchy, and component relationships that remained fairly consistent throughout the project. 
However, some decisions that we made at the beginning of the project ended up causing issues towards the end of the project. 

### Challenges: AKA Mo' Components, Mo' Problems

Our initial concept of creating static HTML pages for register, login, and user profile began causing issues when we began to institute user authorization. Although initially it seemed like this would be an easier path - users would only see the React app if they successfully logged in, it turned out that these would have worked better if they were created as components. Trying to rectify this late in the projekt required us to create new components and reorganize much of our app. 

### Wireframes and ERDs:
[<img src="http://imgur.com/zP6xUbN"">](Wireframe)


### Special Thanks
Template for PERN stack projects thanks to Bobby King @gittheking. Webpack configuration inspired by [Jason Seminara](@jasonseminara)'s [React To Do Application](https://github.com/jasonseminara/react_to-do)
User Auth by [Rafael Pala](https://github.com/rapala61)
Aborted attempt at user auth and moral support courtesy of [Trevor Preston](https://github.com/trevorpreston).
