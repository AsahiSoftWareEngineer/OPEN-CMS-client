import React from "react";
import { CloudArrowUp } from "react-bootstrap-icons";
import { Button } from "../interface/RivUI/src/widget";
import { make_uuid } from "../module/common";
import { routing } from "../module/config/routing";
import { can_access, has_account, binary_request, json_request, renew_token } from "../module/http";

import "../styles/app/drive.css";

export class DriveView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images:[]
        }
    }

    componentDidMount = async () => {
        const have_account = await has_account()
        const is_accessible = await can_access()
        if(!have_account) return;
        if(!is_accessible)await renew_token()

        const request = await binary_request(`${routing.api.http}/drive/`, {
            "command": "get"
        })
        this.setState({images: request.images})
    }

    uploadImage = async (e) => {
        const have_account = await has_account()
        const is_accessible = await can_access()
        if(!have_account) return;
        if(!is_accessible)await renew_token()

        const request = await binary_request(`${routing.api.http}/drive/`, {
            command: "upload",
            image: e.target.files[0],
            id: make_uuid()
        })
        console.log(request)
        this.state.images.push(request.image)
        this.setState(this.state)
    }

    render = () => {

        return (<>
        <input type="file" id="uploader" accept="image/png;image/jpeg" onChange={(e) => {this.uploadImage(e)}} style={{display: "none"}} />
        <div className="drive-view">
            <div className="drive-body">
                {this.state.images.map((item) => {
                    return (<>
                    <div className="image-frame">
                        <img src={`${routing.api.http}/media/${item.url}`}/>
                    </div>
                    
                    </>)
                })}
            </div>
            <footer>
                <Button
                onClick={() => document.getElementById("uploader").click()}
                ><CloudArrowUp/>画像をアップロード</Button>
            </footer>
        </div>
        </>)
    }
}