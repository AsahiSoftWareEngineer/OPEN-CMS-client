import { make_uuid } from "./common";

export class PageItem {
    constructor(items, id){
        this.items = items;
        this.id = id;
        for(let i=0; i<items.length; i++){
            if(items[i].id == id){
                this.item = items[i];
            }
        }
    }

    //新しいデータを作成するメソッド
    create_empty = () => {
        const item = {
            id: make_uuid(),
            name: "",
            col_name: "",
            type: {id: 0, text: "テキスト(1行)", value: 0},
            types:[
                {
                    id:0,
                    text: "テキスト(1行)",
                    value: 0
                },
                {
                    id: 1,
                    text: "テキスト(記述式)",
                    value: 1
                },
                {
                    id: 2,
                    text: "画像",
                    value: 2
                },
                {
                    id: 3,
                    text: "リッチテキスト",
                    value: 3
                }
            ]
        }
        this.items.push(item);
        return this.items;
    }

    //データを更新するメソッド  
    renew = () => {
        for (let i=0; i<this.items.length; i++){
            if(this.items[i].id == this.id) {
                this.items[i] = this.item
            }
        }
        return this.items
    }
}