$(document).ready(function () {

    if(searchTrips.page === 0) {
        loadTrips(searchTrips)
    }


    $('#trips-list').on('scroll', function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {

            if (searchTrips.page >= lastPage) {
                return
            }

            loadTrips(searchTrips)
        }

    })

}) //end document ready
