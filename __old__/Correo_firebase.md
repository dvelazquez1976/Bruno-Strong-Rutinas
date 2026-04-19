[Firebase] Client access to your Cloud Firestore database expiring in 1 day(s)

You chose to start developing in Test Mode, which leaves your Cloud Firestore database completely open to the Internet. Because your app is vulnerable to attackers, your Firestore security rules were configured to stop allowing requests after the first 30 days.

In 1 day(s), all client requests to your Firestore database will be denied. Before that time, please write strong security rules that allow your app to function while appropriately protecting your data. Analysis is run daily; if you've modified your rules in the last 24 hours those changes may not be accounted for.

Expiring Rules
bruno-strong
Database
(default)
