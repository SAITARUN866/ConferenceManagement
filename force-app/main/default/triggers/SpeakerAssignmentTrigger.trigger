trigger SpeakerAssignmentTrigger on Speaker_Assignment__c (before insert) {
    SpeakerAssignmentHandler.checkConflicts(Trigger.new);
}
