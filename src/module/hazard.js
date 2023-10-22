import { make_uuid } from "./common";
import { routing } from "./config/routing";
import { has_account, json_request, renew_token, can_access } from "./http";


export class Hazard {
    constructor(hazards, id){
        this.hazards = hazards;
        this.id = id;
        for (let i=0; i<hazards.length; i++){
            if(hazards[i].id == id){
                this.hazard = hazards[i]
            }
        }
    }

    create_empty = () => {
        const hazard = {
            id: make_uuid(),
            name: "",
            is_waiting: false,
            physics: {
                hazard: "",
                counter: "",
                is_ccp: false,
            },
            chemistry: {
                hazard: "",
                counter: "",
                is_ccp: false,
            },
            creature: {
                hazard: "",
                counter: "",
                is_ccp: false,
            }
        }
        this.hazards.push(hazard);
        return this.hazards;
    }

    suggest_hazard = async () => {
        const have_account = await has_account();
        const is_accessible = await can_access();

        if(!have_account) return;
        if(!is_accessible){await renew_token()}

        const request = await json_request(`${routing.api.http}/check/gpt/`, {
            command: "throw",
            name: this.hazard.name
        });

        this.hazard = {
            id: this.hazard.id,
            name: this.hazard.name,
            is_waiting: false,
            physics: {
                hazard: request.physics.factor,
                counter: request.physics.counter,
                is_ccp: false,
            },
            chemistry: {
                hazard: request.chemistry.factor,
                counter: request.chemistry.counter,
                is_ccp: false,
            },
            creature: {
                hazard: request.creature.factor,
                counter: request.creature.counter,
                is_ccp: false,
            }
        }
        return this.hazard
    }

    renew = () => {
        for(let i = 0; i < this.hazards.length; i++){
            if(this.hazards[i].id == this.id){
                this.hazards[i] = this.hazard
            }
        }
        return this.hazards
    }
}