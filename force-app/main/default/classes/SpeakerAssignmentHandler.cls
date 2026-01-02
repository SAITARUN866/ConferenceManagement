public class SpeakerAssignmentHandler {

    public static void checkConflicts(List<Speaker_Assignment__c> newList) {

        Set<Id> speakerIds = new Set<Id>();
        Set<Id> sessionIds = new Set<Id>();

        for (Speaker_Assignment__c sa : newList) {
            speakerIds.add(sa.Speaker__c);
            sessionIds.add(sa.Session__c);
        }

        Map<Id, Session__c> sessionMap = new Map<Id, Session__c>(
            [SELECT Id, Session_Date__c, Start_Time__c, End_Time__c
             FROM Session__c
             WHERE Id IN :sessionIds]
        );

        List<Speaker_Assignment__c> existingAssignments = [
            SELECT Speaker__c,
                   Session__r.Session_Date__c,
                   Session__r.Start_Time__c,
                   Session__r.End_Time__c
            FROM Speaker_Assignment__c
            WHERE Speaker__c IN :speakerIds
        ];

        for (Speaker_Assignment__c newSA : newList) {
            Session__c newSession = sessionMap.get(newSA.Session__c);

            for (Speaker_Assignment__c oldSA : existingAssignments) {
                if (newSA.Speaker__c == oldSA.Speaker__c &&
                    newSession.Session_Date__c == oldSA.Session__r.Session_Date__c &&
                    newSession.Start_Time__c < oldSA.Session__r.End_Time__c &&
                    newSession.End_Time__c > oldSA.Session__r.Start_Time__c) {

                    newSA.addError('Speaker is already booked for this time.');
                }
            }
        }
    }
}