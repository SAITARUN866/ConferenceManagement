import { LightningElement, api, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SPEAKER_CHANNEL from '@salesforce/messageChannel/speakerSelectedChannel__c';

export default class SpeakerList extends LightningElement {
    @api speakers;
    @wire(MessageContext) messageContext;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email__c' },
        { label: 'Speciality', fieldName: 'Speciality__c' },
        {
            type: 'button',
            typeAttributes: {
                label: 'Book Session',
                name: 'book'
            }
        }
    ];

    handleRowAction(event) {
        const row = event.detail.row;

        publish(this.messageContext, SPEAKER_CHANNEL, {
            speakerId: row.Id,
            speakerBio: row.Bio__c,
            speakerSpeciality: row.Speciality__c
        });
    }
}
