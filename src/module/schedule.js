import { make_uuid } from "./common";


export class Schedule{
    constructor(schedule, row_id, col_id){
        this.schedule = schedule;
        this.row_id = row_id;
        this.col_id = col_id;
        
        for (var i = 0; i < schedule.length; i++){
            if(schedule[i].id == row_id){
                this.target_row = schedule[i];
                for (let j = 0; j < schedule[i].cells.length; j++){
                    if(schedule[i].cells[j].id == col_id){
                        this.target_col = schedule[i].cells[j]
                    }
                }
            }
        }
    }

    init = () => {
        const schedule = []
        const rows = [...Array(8)]
        const cells = [...Array(5)]
        for (let i = 0; i < rows.length; i++){
            const cell = []
            for (let j = 0; j < cells.length; j++){
                cell.push(this.create(0, "", false))
            }
            schedule.push({id: make_uuid(), cells: cell})
        }
        return schedule
    }

    create = (type, content, is_vertical) => {
        const cell = {
            id: make_uuid(),
            type: type,
            content: content,
            is_vertical: is_vertical,
            url: "",
            is_ccp: false,
        }
        return cell;
    }

    delete_item = () => {
        const cell = this.create(0, "", false)
        return cell
    }

    add_row = () => {
        const cells = []
        for (let i = 0; i < this.schedule[0].cells.length; i++){
          cells.push(this.create(0, "", false))  
        }

        const row = {
            id: make_uuid(),
            cells: cells
        }

        this.schedule.push(row)
        return this.schedule

    }

    add_column = () => {
        for (let i = 0; i < this.schedule.length; i++){
            this.schedule[i].cells.push(this.create(0, "", false))
            this.schedule[i].cells.push(this.create(0, "", false))
        }
        return this.schedule
    }



    renew = () => {
        for (let i = 0; i < this.schedule.length; i++){
            if(this.schedule[i].id == this.row_id){
                for (let j = 0; j < this.schedule[i].cells.length; j++){
                    if(this.schedule[i].cells[j].id == this.col_id){
                        this.schedule[i].cells[j] = this.target_col
                    }
                }
            }
        }
        return this.schedule
    }

    generate_hazard = () => {
        const hazards = [];
        for (let i = 0; i < this.schedule.length; i++){
            const row = this.schedule[i];
            for (let j = 0; j < row.cells.length ; j++) {
                const cell = row.cells[j];
                if(cell.type ==1){
                    hazards.push({
                        id: make_uuid(),
                        name: cell.content,
                        is_warning: false,
                        physics: {
                            hazard: "",
                            counter: "",
                            is_ccp: cell.is_ccp
                        },
                        chemistry: {
                            hazard: "",
                            counter: "",
                            is_ccp: cell.is_ccp
                        },
                        creature: {
                            hazard: "",
                            counter: "",
                            is_ccp: cell.is_ccp
                        }
                    })
                }
            }
        }
        return hazards
    }
}