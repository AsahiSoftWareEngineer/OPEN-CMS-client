import React from "react";
import { Dropdown, TextInput, TitleInterface, Button } from "../../interface/RivUI/src/widget";
import { TextComponent } from "./editor";
import "../../styles/components/creator.css";
import { CheckCircle, Plus } from "react-bootstrap-icons";
import { PageItem } from "../../module/editor";
import { can_access, has_account, json_request, renew_token } from "../../module/http";
import { routing } from "../../module/config/routing";
import { make_uuid, parse_url } from "../../module/common";


const test_items = [
    {
        id: "xxxxcccccc",
        name: "テスト",
        col_name: "test",
        type:{id: 0, text: "テキスト(1行)", value: 0},
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
            }
        ]
    }
];


export class ContentCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            url: "",
            name: "",
            is_blog_mode: false,
        }
    }

    componentDidMount = () => {
        this.setState({ items: []})
    }

    //データタイプを変えるメソッド
    changeType = (id, value) => {
        const items = new PageItem(this.state.items, id, value);
        items.item.type = value;
        this.setState({items: items.renew()})
    }

    //カラムを作成するメソッド
    createEmpty = () => {
        const items = new PageItem(this.state.items, null);
        this.setState({items: items.create_empty()});
    }

    //カラム名を書き換えるメソッド
    changeColName = (id, value) => {
        const items = new PageItem(this.state.items, id)
        items.item.col_name = value;
        this.setState({items: items.renew()});
    }

    //データ名を書き換えるメソッド
    changeName = (id, value) => {
        const items = new PageItem(this.state.items, id)
        items.item.name = value
        this.setState({items: items.renew()})
    }

    //サーバーへデータを送信するメソッド

    commitItem = async () => {
        const have_account = await has_account()
        const is_accessible = await can_access()

        if(!have_account) return;
        if(!is_accessible) {await renew_token()}

        const request = await json_request(`${routing.api.http}/page/`, {
            command: "create",
            id: make_uuid(),
            app_id: parse_url(window.location.pathname, 4),
            name: this.state.name,
            url: this.state.url,
            items: this.state.items,
            is_blog_mode: this.state.is_blog_mode,
            created_at: new Date(),
            updated_at: new Date()
        })
        console.log(request)
        if(request.response){
           window.alert("ページを作成しました");
        }
    }





    render = () => {
        return (<>
        <div className="content-creator-content">
            <div className="application-header">
                <TitleInterface
                title="URL"
                className="header-interface"
                element={<>
                /<TextInput value={this.state.url} className="url header-input" onChange={(e) => {this.setState({url: e.target.value})}}/>
                </>}
                />
                <TitleInterface
                title="名前"
                className="header-interface"
                element={<>
                <TextInput value={this.state.name} className="name header-input" onChange={(e)=>{this.setState({name:e.target.value})}}/>
                </>}
                />
                <TitleInterface
                element={<>
                <Button onClick={() => {this.setState({is_blog_mode: !this.state.is_blog_mode})}}>
                    {this.state.is_blog_mode?<>オブジェクトモードにする</>:<>ブログモードにする</>}
                </Button>
                </>}
                />
            </div>
            {this.state.items.map((item) => {
                return (<>
                <div className={`editor-item`}>
                    <TitleInterface
                    title={"データタイプ"}
                    className="row-item dropdown"
                    element={<>
                    <Dropdown 
                    className="type-selector"
                    value={item.type}
                    items={item.types}
                    onChange={(value) => {this.changeType(item.id, value)}}
                    />
                    </>}
                    />
                    <TitleInterface
                    title="名前"
                    className="row-item"
                    element={<>
                    <TextInput 
                    value={item.name} 
                    onChange={(e) => {this.changeName(item.id, e.target.value)}}/>
                    </>}/> 

                    <TitleInterface
                    title="カラム名"
                    className="row-item"
                    element={<>
                    <TextInput
                    value={item.col_name}
                    onChange={(e) => {this.changeColName(item.id, e.target.value)}}
                    />
                    </>}/>
                </div>
                </>)
            })}
            <div className="editor-item button">
                <span className="row-item dropdown"></span>
            <Button onClick={() => {this.createEmpty()}} className="addition-item">
                <Plus/>追加
            </Button>
            <span className="row-item"></span>
            </div>
        </div>
        <footer>
            <Button onClick={() => {this.commitItem()}} className="create-complete">
                <CheckCircle/>作成する　
            </Button>
        </footer>
        </>)
    }
}