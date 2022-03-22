# Class practice

Communication between lambdas using EventBridge

The goal of this practice is communicate two lambdas using an event bridge. 

You should implement ping pong game. 
Each player is a lambda, and when the player shot the ball, 
it sends an event to the event bridge

You should create the following resources:
- 2 lambdas (one for each player)
- 1 event bridge
- event bridge rules to route the events from one lambda to each other
- lambda permission to allow event bridge execute lambda code

***Usefull links***

- AWS::Events::EventBus: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-eventbus.html
- AWS::Events::Rule: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-rule.html
- AWS::Lambda::Permission: https://docs.aws.amazon.com/es_es/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-permission.html
- AWS EventBridge SDK: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EventBridge.html



Some considerations:
- When do the game finish?
    - The game finish when user fails his shot. Before send an event, a random number between 0 and 10 
  should be generated and if number is bigger than 7, the fails his shot    
    - In case more than 10 shots are done, the game finish. 




### Step 1: Hello Event

Create an event bus with all the necessary resources to communicate it with hello world lambda. 

Try to send an event to the event bus and check the logs from hello-world lambda.

```
# Send an event to event bridge using aws cli

aws events put-events --entries file://start-event.json

```

### Step 2: Player one

Create a lambda that reacts the player2 events.  

This lambda will handle initial event and send the new event to hello world lambda.

Check all your code is working properly, ***check finish conditions*** sending fake events.

```
# Event send from player1
 {
    "Source": "player1", --> This should be player 1.
    "DetailType": "ping-pong-event", 
    "Detail": "{ \"round\": \"0\" }", --> This should change from start to 0 and will increment if it is already a number 
    "EventBusName": "jordi-sapes-event-bridge"
  }
```

### Step 3: Player two

Create a lambda that reacts to player1 events. 

This lambda will do the same as player one lambda. You can reuse the existing code.

```
# Event send from player2
 {
    "Source": "player2", --> This should be player2
    "DetailType": "ping-pong-event", 
    "Detail": "{ \"round\": \"1\" }", --> This should increment each round 
    "EventBusName": "jordi-sapes-event-bridge"
  }
```
