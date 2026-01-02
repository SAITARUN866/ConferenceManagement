import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SPEAKER_CHANNEL from '@salesforce/messageChannel/speakerSelectedChannel__c';

import checkAvailability from '@salesforce/apex/SpeakerController.checkAvailability';
import createSpeakerAssignment from '@salesforce/apex/SpeakerController.createAssignment';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookSession extends LightningElement {

    @wire(MessageContext) messageContext;

    speakerId;
    speakerBio;
    speakerSpeciality;

    selectedDate;
    minDate;

    available = false;
    availabilityChecked = false;
    dateInputClass = '';

    connectedCallback() {
        // Disable past dates
        this.minDate = new Date().toISOString().split('T')[0];

        // Subscribe to speaker selection
        subscribe(this.messageContext, SPEAKER_CHANNEL, (msg) => {
            this.speakerId = msg.speakerId;
            this.speakerBio = msg.speakerBio;
            this.speakerSpeciality = msg.speakerSpeciality;
            this.resetState();
        });
    }

    resetState() {
        this.selectedDate = null;
        this.available = false;
        this.availabilityChecked = false;
        this.dateInputClass = '';
    }

    handleDate(event) {
        this.selectedDate = event.target.value;

        checkAvailability({
            speakerId: this.speakerId,
            sessionDate: this.selectedDate
        })
        .then(result => {
            this.available = result;
            this.availabilityChecked = true;
            this.dateInputClass = result ? 'date-available' : 'date-booked';

            if (!result) {
                this.showToast(
                    'Slot Unavailable',
                    'This date is already booked. Please choose another.',
                    'error'
                );
            }
        })
        .catch(() => {
            this.showToast(
                'Error',
                'Unable to check availability.',
                'error'
            );
        });
    }

    get disableCreate() {
        return !this.available || !this.selectedDate;
    }

    handleCreateAssignment() {
        if (!this.available || !this.selectedDate) {
            this.showToast(
                'Error',
                'Please select an available date.',
                'error'
            );
            return;
        }

        createSpeakerAssignment({
            speakerId: this.speakerId,
            sessionDate: this.selectedDate
        })
        .then(() => {
            this.showToast(
                'Success',
                '🎉 Session booked successfully!',
                'success'
            );
            this.resetState();
        })
        .catch(error => {
            this.showToast(
                'Error',
                error.body?.message || 'Booking failed.',
                'error'
            );
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({ title, message, variant })
        );
    }
}
