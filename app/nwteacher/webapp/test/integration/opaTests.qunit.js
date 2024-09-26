sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'nwteacher/test/integration/FirstJourney',
		'nwteacher/test/integration/pages/TeacherList',
		'nwteacher/test/integration/pages/TeacherObjectPage'
    ],
    function(JourneyRunner, opaJourney, TeacherList, TeacherObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('nwteacher') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTeacherList: TeacherList,
					onTheTeacherObjectPage: TeacherObjectPage
                }
            },
            opaJourney.run
        );
    }
);