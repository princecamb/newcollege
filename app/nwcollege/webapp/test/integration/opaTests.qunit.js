sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'nwcollege/test/integration/FirstJourney',
		'nwcollege/test/integration/pages/DepartmentList',
		'nwcollege/test/integration/pages/DepartmentObjectPage'
    ],
    function(JourneyRunner, opaJourney, DepartmentList, DepartmentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('nwcollege') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDepartmentList: DepartmentList,
					onTheDepartmentObjectPage: DepartmentObjectPage
                }
            },
            opaJourney.run
        );
    }
);