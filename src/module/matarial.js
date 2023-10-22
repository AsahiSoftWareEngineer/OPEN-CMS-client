

export class Material {
    constructor(materials, id) {
        this.materials = materials;
        this.id = id;
        for (let i = 0; i < materials.length; i++){
            if(materials[i].id === id){
                this.material = materials[i];
            }
        }
    }

    is_exists = (material) => {
        for(let i = 0; i < this.materials.length; i++){
            if(this.materials[i].id === material.id){
                return true;
            }
        }
        return false;
    }

    add_materials = (materials) => {
        for (let i = 0; i < materials.length; i++){
            if(!this.is_exists(materials[i])){
                this.materials.push(materials[i]);
            }
        }
        return this.materials
    }
}


export class ExecutionMaterial{
    constructor(materials, id){
        this.materials = materials;
        this.id = id;

        for(let i = 0; i < materials.length; i++){
            if(materials[i].id === id){
                this.material = materials[i];
            }
        }
    }

    renew = () => {
        for (let i = 0; i < this.materials.length; i++){
            if(this.materials[i].id === this.id){
                this.materials[i] = this.material
            }
        }
        return this.materials
    }
}