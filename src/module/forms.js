import { Amd } from "react-bootstrap-icons";
import { make_uuid } from "./common";


export class Forms {
    constructor(forms, id){
        this.forms = forms;
        this.id = id;
        for (let i = 0; i < forms.length; i++) {
            if(forms[i].id === id){
                this.form = forms[i];
            }
        }
    }


    create_empty = (type) => {
        return this.generate_form(
            make_uuid(),
            type,
            "",
            ""
        )
    }

    generate_form = (id, type, name, hazard) => {
        switch(type) {
            case 0:
                this.forms.push({
                    id: id,
                    name: name,
                    type: type,
                    is_passed: true,
                    hazard: hazard
                })
                return this.forms
            case 1:
                this.forms.push({
                    id: id,
                    name: name,
                    type: type,
                    is_passed: true,
                    hazard: hazard,
                    temperature:0,
                    time: 1,
                    interval: 1
                })
                return this.forms
        }
    }

    change_type(type) {
        switch(type) {
            case 0:
                return {
                    id: this.form.id,
                    name: this.form.name,
                    hazard: this.form.hazard,
                    type: type,
                    is_passed: true,
                }
            case 1:
                return {
                    id: this.form.id,
                    name: this.form.name,
                    hazard: this.form.hazard,
                    type: type,
                    is_passed: true,
                    temperature: 0,
                    time: 1,
                    interval:1
                }
        }
    }

    remove = () => {
        for (let i = 0; i < this.forms.length; i++) {
            if(this.forms[i].id === this.id) {
                this.forms.splice(i, 1)
            }
        }
        return this.forms
    }



    renew = () => {
        for (let i = 0; i < this.forms.length; i++){
            if(this.forms[i].id === this.id){
                this.forms[i] = this.form;
            }
        }
        return this.forms
    }

}



export class ExecutionForms {
    constructor(forms, id){
        this.forms = forms;
        this.id = id;
        for (let i = 0; i < forms.length; i++){
            if(forms[i].id === id){
                this.form = this.forms[i];
            }
        }
    }

    renew = () => {
        for (let i = 0; i < this.forms.length; i++){
            if(this.forms[i].id === this.id){
                this.forms[i] = this.form;
            }
        }
        return this.forms
    }

}


export class Record {
    constructor(records, id) {
        this.records = records;
        this.id = id;
        for(let i = 0; i < records.length; i++){
            if(records[i].id === this.id){
                this.record = records[i];
            }
        }
    }

    renew = () => {
        for(let i = 0; i < this.records.length; i++){
            if(this.records[i].id === this.id){
                this.records[i] = this.record
            }
        }
        return this.records
    }
}

