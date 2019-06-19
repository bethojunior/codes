function openChat(trip) {
    Session.set("tripChat", trip);
    Route.redirectDynamic("Client", "Chat");
    InfoTrip.closeArrivalDriver();
}

function callDriver(trip) {
    location.href = "tel:" + trip.driver.phone;
    InfoTrip.closeArrivalDriver();
}