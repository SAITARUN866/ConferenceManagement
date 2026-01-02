import { LightningElement, track } from 'lwc';
import searchSpeakers from '@salesforce/apex/SpeakerController.searchSpeakers';

export default class SpeakerSearch extends LightningElement {
    name = '';
    speciality = '';
    @track speakers = [];

    specialityOptions = [
        { label: 'Apex', value: 'Apex' },
        { label: 'LWC', value: 'LWC' },
        { label: 'Integrations', value: 'Integrations' },
        { label: 'Architecture', value: 'Architecture' }
    ];

    handleName(event) {
        this.name = event.target.value;
    }

    handleSpeciality(event) {
        this.speciality = event.detail.value;
    }

    search() {
        searchSpeakers({ name: this.name, speciality: this.speciality })
            .then(result => {
                this.speakers = result;
            });
    }
}
