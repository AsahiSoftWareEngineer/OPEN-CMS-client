import React from "react";
import { Routes, Route } from "react-router-dom";
import { ContentEditor } from "../components/app/editor";
import { UrlTable } from "../components/app/table";
import { ContentCreator } from "../components/app/creator";
import { parse_url } from "../module/common";
import { can_access, has_account, json_request, renew_token } from "../module/http";
import { routing } from "../module/config/routing";
const test_url = [
    {
        id: "caaa-bbbb",
        url: "/top",
        name: "トップページ"
    }
]


export class Editview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            app_id: "",
            urls: []
        }
    }

    componentDidMount = async () => {
        const app_id = parse_url(window.location.pathname, 3)
        const have_account = await has_account()
        const is_accessible = await can_access()

        if(!have_account)return;
        if(!is_accessible) await renew_token()

        const request = await json_request(`${routing.api.http}/page/`, {
            command: "get",
            app_id
        })
    
       
        console.log(request)
        this.setState({
            urls: request.urls,
            app_id: app_id,
        })
    }



    render = () => {
        return (<>
       <Routes>
           <Route exact path="url/*" element={<>
           <UrlTable
           app_id={this.state.app_id}
           items={this.state.urls}/>
           </>}/>
           <Route exact path="page/edit/*" element={<>
           <ContentEditor/>
           </>}/>
           <Route exact path="page/create/*" element={<>
           <ContentCreator app_id={this.state.app_id}/>
           </>}/>
       </Routes>
        </>)
    }
}