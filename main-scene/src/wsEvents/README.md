## Websoket Events for Main Scene

In the **/wsEvents** directory, all necessary events for handling messages from WebSocket connections are stored. The events are divided into several types:

1. Events for handling content change data on screens managed through the Admin Panel. These functions include **initBookingsState, eventBookingsChanged, eventSlotChange, and switchContent**.
2. Events for handling content change data on Discord screens. These functions include **eventDiscordAdded, eventDiscordUpdated, and eventDiscordDeleted**.
3. Events for updating data on upcoming events (for EventPoster). This function is **eventClosesBookingUpdate**.
4. Events for updating data on metric screens. This function is **eventMetricsUpdated**.

The **index.ts** file contains a global object that stores all possible message types for WebSocket and the corresponding events for each.
