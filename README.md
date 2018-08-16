# TravelWhere
This website is designed to allow a user to find somewhere they want to visit based on their budget and preferences.

## Audience
The website targets people who are bored and unsure of there to go outside of their house.

## Experience
The user will load the page and select their budget, way of transport, and something they are interested in (or select nothing to have a random search);.

# Technical
EventBrite API
Google Maps API //hopefully not so much of this

## Models
<li>Input</li> //budget, transport, interest, initial location
<li>Users</li> //for accounts to save want to go places

## Views
<li>Form.hbs: Form to show where to go</li>
<li>result.hbs: One random place to go</li>
<li>error.hbs: Error page</li>

## Routes
Index - get
?Index - post (convert front end results to another page possibly)
?Results - get

## Other

Use components from Material Design Lite: https://getmdl.io/index.html?
Google maps?
Other maps?

# The MVP will just find somewhere close to the user and post it.

# Weekly Milestones

## Week 3

<li>Outline design document</li>
<li>Complete MVP of just a nearby place generator</li>

## Week 4

<li> Complete MVP features </li>
<li>Add inputs to find user preferences</li>
<li>Add other events such as Eventbrite and other sites</li>
<li>Potentially add user recommendations</li>
<li>User testing at end of week</li>

## Week 6

<li>Complete usable build</li>
<li>Diagnose potential bugs</li>
<li>Polish</li>

## Future changes
IBM Watson to integrate personalized recommendations
  -analyze user twitter
  -analyse event description -- done
