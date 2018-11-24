ManagerView.TripView =  {
    actionDetails : function(){
        const js = [
        ];
        const css = [
            'trip/detailTrip',
        ];
        const views = [
            'trip/detailTrip',
        ];

        viewController.nameView = "contact-us";
        layoutBuild(views, js, css);
    },
    actionTrips: function(){
        const js = [
            'modulos/trip/list'
        ];
        const css = [
            'trip/list'
        ];
        const views = [
            'trip/list'
        ];

        viewController.nameView = "trips";

        layoutBuild(views, js, css);
    },
};