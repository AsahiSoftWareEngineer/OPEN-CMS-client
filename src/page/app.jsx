import React from "react";
import {NavigationList} from "../interface/RivUI/src/widget"
import { App, Cloud } from "react-bootstrap-icons";

import "../styles/app/app.css";
import { AppTable } from "../components/app/table";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import { DriveView } from "./drive";
import { Editview } from "./edit";
import { make_key, make_uuid } from "../module/common";
import { can_access, has_account, json_request, renew_token } from "../module/http";
import { routing } from "../module/config/routing";

const main_menu = [
    {
        id: 0,
        name: "アプリケーション",
        icon: <App/>,
        link: "/"
    },
    {
        id: 1,
        name: "ドライブ",
        icon: <Cloud/>,
        link: "/drive"
    }
]

const test_app = [
    {
        id: "xxx-xxx",
        name: "テストアプリ",
        is_hidden: true,
        api_key: "xxx-xxx-xxxxx"
    },

]


export class AppView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: []
        }
    }
    componentDidMount = async () => {
        const have_account = await has_account()
        const is_accessible = await can_access()

        if(!have_account)return;
        if(!is_accessible) await renew_token()

        const request = await json_request(`${routing.api.http}/app/`, {
            command: "get"
        })
        this.setState({apps: request.apps})
    }

    createNewApp = async () => {
        const name = window.prompt("新しいアプリケーション名を入力")
        console.log(name)
        if(name !== null) {
            const param = {
                command: "create",
                id: make_uuid(),
                api_key: make_key(),
                name: name,
                created_at: new Date(),
                updated_at: new Date(),
            }

            this.state.apps.push(param);
            this.setState(this.state)
            const have_account = await has_account()
            const is_accessible = await can_access()

            if(!have_account)return;
            if(!is_accessible) await renew_token()
            const request = await json_request(`${routing.api.http}/app/`, param)
        }
    }

    render = () => {
        return (<>
        <div className="app-view">
            <NavigationList className="main-menu" menu={main_menu}/>
            <div className="app-container">
                <div className="app-header"></div>
                <div className="app-body">
                    <Routes>
                        <Route exact path={"/*"} element={<>
                            <AppTable
                            items={this.state.apps}
                            createNewApp={() => {this.createNewApp()}}
                            />
                        </>}/>
                        <Route exact path={"/app/*"}
                        element={<><Editview/></>}
                        />
                        <Route exact path={"/drive/*"} element={<><DriveView/></>}/>
                    </Routes>
                    
                </div>
            </div>
        </div>
        </>)
    }
}