public with sharing class SpeakerController {

    @AuraEnabled(cacheable=true)
    public static List<Speaker__c> searchSpeakers(String name, String speciality) {
        String query = 'SELECT Id, Name, Email__c, Bio__c, Speciality__c FROM Speaker__c WHERE Id != null';

        if (String.isNotBlank(name)) {
            query += ' AND Name LIKE \'%' + name + '%\'';
        }
        if (String.isNotBlank(speciality)) {
            query += ' AND Speciality__c = \'' + speciality + '\'';
        }
        return Database.query(query);
    }

    @AuraEnabled
    public static Boolean checkAvailability(Id speakerId, Date selectedDate) {
        return [
            SELECT COUNT()
            FROM Speaker_Assignment__c
            WHERE Speaker__c = :speakerId
            AND Session__r.Session_Date__c = :selectedDate
        ] == 0;
    }

    @AuraEnabled
    public static void createAssignment(Id speakerId, Id sessionId) {
        insert new Speaker_Assignment__c(
            Speaker__c = speakerId,
            Session__c = sessionId
        );
    }
}