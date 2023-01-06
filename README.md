# ThriftCustomer

ThriftCustomer is a prototype app which helps local businesses sell their excess or unsold food at discounted prices at the end of the day. This helps reduce food waste by giving the food a new home instead of it going to waste. Customers can browse the app for discounted food deals, and can purchase the food directly through the app. This is a win-win scenario for both businesses and customers, as the businesses are able to recoup some of their losses from unsold food and customers are able to get a good deal on fresh food. Overall, ThriftCustomer helps to reduce food waste and make it easier for people to access fresh, affordable food.

| Home And Order Pages     |  Order Flow  | Local Notification |
:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://github.com/JonathanFoo0523/ThriftCustomer/blob/main/HomeAndOrder.gif" alt="drawing" width="250"/> | <img src="https://github.com/JonathanFoo0523/ThriftCustomer/blob/main/OrderFlow.gif" alt="drawing" width="250"/> | <img src="https://github.com/JonathanFoo0523/ThriftCustomer/blob/main/LocalNotification.png" alt="drawing" width="250"/> | 

# Development Approach

We make use of agile methodologies to develop the product - which involves breaking the project into smaller chunks and regularly reviewing and adapting the project based on feedback from stakeholders(customer/business). The current state of the project (as of writing) represent a minimal working product which can be use to test run our product on real-world scenario involving selected business and small set of customers.

As the project grow bigger, we will adopt test-driven development to reduce bugs and issues in the app. We decided to forgo TDD in the current iteration in favour of fast product development to test out the vialibity of the idea. Futhermore, the small scale of the app still make it easy to find issue and fix bug in the app.

## Technology
* React Native
* Firebase Firestore

## Drawback

Currently, the app doesn't support user signin/signup. Instead, the first time an user launches the app, it generates a random UUID which is stored locally on the device. The UUID is submitted along with every order the user made. When users close and relauch the app, the locally-stored UUID will be retrived to get orders history of the user. The problem with the approach is that the UUID will be cleared when the app is deleted & reinstalled; and user has no way to access their orders from other devices.

## TODO
* Push notification when business accepts/rejects an order
* Login/Signup feature for user

