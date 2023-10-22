import React from "react";
import { CloudArrowUp, X, Plus } from "react-bootstrap-icons";
import { TextInput, TitleInterface, Button, NavigationButton } from "../../interface/RivUI/src/widget";
import { PageItem } from "../../module/editor";
import "../../styles/components/editor.css";
import "../../styles/components/modal.css";
import { can_access, has_account, binary_request, json_request, renew_token } from "../../module/http";
import { routing } from "../../module/config/routing";
import { Link } from "react-router-dom";
import { parse_url } from "../../module/common";

const test_content = [
    {
        id: "ssssssddddd",
        name: "タイトル",
        col_name: "title",
        type: 0,
        content: ""
    }, {
        id: "ssssssdaaaaaa",
        name: "説明文",
        col_name: "description",
        type: 1,
        content: ""
    }, {
        id: "img---stsetsetset",
        name: "サムネイル",
        col_name: "image",
        type: 2,
        image_id: "",
        alt: "",
        url: "",
    }
]

export class ContentEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "トップページ",
            items:[],
            is_open: false,
            hold_img_id: ""
        }
    }

    componentDidMount = async () => {
        const have_account = await has_account()
        const is_accessible = await can_access()
        if(!have_account) return;
        if(!is_accessible)await renew_token()

        const request = await json_request(`${routing.api.http}/page/`, {
            command: "get_draft",
            page_id: parse_url(window.location.pathname, 4)
        })

        console.log(request)

        this.setState({
            items: request.contents
        })
    }

    //内容を書き換えるメソッド
    contentChange = (id, content) => {
        const items = new PageItem(this.state.items, id)
        items.item.content = content;
        this.setState({ items: items.items })
    }
    //altの値を書き換えるメソッド
    altChange = (id, alt) => {
        const items = new PageItem(this.state.items, id)
        items.item.alt = alt;
        this.setState({ items: items.items })
    }

    //画像選択処理を行うメソッド
    setImage = (id, string, url) => {
        const items = new PageItem(this.state.items, id)
        items.item.image_id = string
        items.item.url = url
        this.setState({ items: items.items , is_open: false})
    }

    //下書きに保存処理するメソッド
    saveContent = async () => {
        const have_account= await has_account()
        const is_accessible = await can_access()

        if(!have_account) return;
        if(!is_accessible) await renew_token()

        const reqeuest = await json_request(`${routing.api.http}/page/`, {
            command: "save_as_draft",
            id: parse_url(window.location.pathname, 4),
            items: this.state.items
        })
        if(reqeuest.response){
            window.alert("下書きに保存しました")
        }
    }

    publishContent = async () => {
        const have_account= await has_account()
        const is_accessible = await can_access()

        if(!have_account) return;
        if(!is_accessible) await renew_token()

        const reqeuest = await json_request(`${routing.api.http}/page/`, {
            command: "published",
            id: parse_url(window.location.pathname, 4),
            items: this.state.items
        })
        if(reqeuest.response){
            window.alert("公開しました")
        }
    }

    render = () => {
        return (<>
        <div className="content-editor">
            <p className="page-title"><span className="name">{this.state.name}</span>を編集<Button onClick={() => {window.history.back()}} className="back-button">戻る</Button></p>
            {this.state.items.map((item) => {
                switch(item.type) {
                    case 0:
                        return <TextComponent
                        name={item.name}
                        col_name={item.col_name}
                        content={item.content}
                        contentChange={(value)=> {this.contentChange(item.id, value)}}
                        />
                    case 1:
                        return <PassageComponent
                        name={item.name}
                        col_name={item.col_name}
                        content={item.content}
                        contentChange={(value)=> {this.contentChange(item.id, value)}}
                        />
                    case 2:
                        return <ImageContent
                        name={item.name}
                        col_name={item.col_name}
                        b64string={item.b64string}
                        setImage={(value) => {this.setImage(item.id, value)}}
                        alt={item.alt}
                        url={item.url}
                        open={() => {this.setState({is_open: true, hold_img_id: item.id});}}
                        />
                }
            })}
            <ImagePickerModal 
            is_open={this.state.is_open} 
            close={() => {this.setState({is_open: false})}}
            commitImg={(string, url) => {this.setImage(this.state.hold_img_id, string, url)}}
            />
            <footer>
                <Button onClick={() =>{this.saveContent()}}>下書きに保存</Button>
                <Button onClick={() => {this.publishContent()}}>公開する</Button>
            </footer>
        </div>
        </>)
    }
}


export class TextComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => {
        return (<>
        <div className="text-item content-item">
            <TitleInterface
            className="item-text-input"
            title={`${this.props.name}(${this.props.col_name})`}
            element={<TextInput 
                value={this.props.content}
                onChange={(e) => {this.props.contentChange(e.target.value)}}
                />}
            />
        </div>
        </>)
    }
}

export class PassageComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render = ()  => {
        return (<>
        <div className="passage-item content-item">
            <TitleInterface
            className={"item-passage-input"}
            title={`${this.props.name}(${this.props.col_name})`}
            element={<>
            <textarea value={this.props.content} onChange={(e) => {this.props.contentChange(e.target.value)}}></textarea>
            </>}
            />
        </div>
        </>)
    }
}

export class ImageContent extends React.Component {
    constructor(props) {
        super(props)
    }
    render = () => {
        return (<>
        <div className="image-item content-item">
            <TitleInterface
            className="item-passage-input"
            title={`${this.props.name}(${this.props.col_name})`}
            element={<>
            <div className="image-picker">
                <div className="picker">
                    <Button
                    onClick={() => {this.props.open()}}
                    >画像を選択</Button>
                </div>
                <div className="preview">
                    {this.props.url == null?(<>
                        <span>
                        <CloudArrowUp/>画像をアップロード
                    </span>
                    </>):(<>
                    <img src={`${routing.api.http}/media/${this.props.url}`}/>
                    </>)}
                </div>
                
            </div>
            </>}
            />
            <TitleInterface
                title="alt属性"
                className={"item-text-input"}
                element={<>
                <TextInput
                value={this.props.alt}
                />
                </>}
                />
        </div>
        </>)
    }
}

export class ImagePickerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images:[],
            selected_id: ""
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
        const images = request.images.map((img) => {return {id: img.id, url: img.url, is_selected: false}})
        this.setState({images: images})
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
        this.state.images.push(request.image)
        const images = this.state.images.map((img) => {return {id: img.id, url: img.url, is_selected: false}})
        console.log(images)
        this.setState({images: images})
    }

    setImg = (id, url) => {
        const images = this.state.images
        for (let i = 0; i <images.length; i++) {
            images[i].is_selected = false
            if(images[i].id === id) {
                images[i].is_selected = true;
            }
        }
        this.setState({ 
            images: images,
            selected_id: id,
            selected_url: url
        })
    }

    render = () => {
        return (<>
         <input type="file" id="uploader" accept="image/png;image/jpeg" onChange={(e) => {this.uploadImage(e)}} style={{display: "none"}} />
        {this.props.is_open?(<>
        <div className="modal-background">
            <div className="image-picker modal">
                <div className="modal-header">
                    <button onClick={() =>{this.props.close()}} className="close">
                        <X/>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="drive-view">
                        <div className="drive-body">
                            {this.state.images.map((item) => {
                                return (<>
                                <Link className={`image-frame ${item.is_selected?"selected":"unselected"}`} onClick={() => {this.setImg(item.id, item.url)}}>
                                    <img src={`${routing.api.http}/media/${item.url}`}/>
                                </Link>
                            </>)
                        })}
                </div>
                <footer>
                    <Button 
                    className="cloud-upload"
                    onClick={() => document.getElementById("uploader").click()}
                    ><CloudArrowUp/>画像をアップロード</Button>
                    
                    <Button 
                    className="cloud-commit"
                    onClick={() => {this.props.commitImg(this.state.selected_id, this.state.selected_url)}}
                    ><Plus/>確定する</Button>

            </footer>
        </div>
                </div>
            </div>
        </div>

        </>):<></>}
        </>)
    }
}