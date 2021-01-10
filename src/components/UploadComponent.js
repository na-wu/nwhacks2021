import React, { Component } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AWS_ENDPOINT = "https://09mznqi7b9.execute-api.us-west-1.amazonaws.com/prod/api/v1/images/upload";
const AWS_SUGGESTION_ENDPOINT = "https://09mznqi7b9.execute-api.us-west-1.amazonaws.com/prod/api/v1/suggest"

function upload(string) {
    const body = {
        "file": string
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    fetch(AWS_ENDPOINT, options)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const params = {
            "q": data[Math.floor(Math.random()*data.length)]
        };
        console.log(params)
        const options = {
            method: "POST",
            body: JSON.stringify(params)
        }
        return fetch(AWS_SUGGESTION_ENDPOINT, options).then(response => response.json())
    })
    .catch(err => {
        console.log(err);
    })
}

function getBase64String(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

class UploadComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            track: "https://open.spotify.com/embed/track/0wwPcA6wtMf6HUMpIRdeP7"
        };
        this.beforeUpload = this.beforeUpload.bind(this)

    }

    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          message.error('Image must smaller than 5MB!');
        }

        getBase64String(file).then(res => {
            const body = {
                "file": res
            };
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            fetch(AWS_ENDPOINT, options)
            .then(response => response.json())
            .then(data => {
                const params = {
                    "q": data[Math.floor(Math.random()*data.length)]
                };
                const options = {
                    method: "POST",
                    body: JSON.stringify(params)
                }
                fetch(AWS_SUGGESTION_ENDPOINT, options).then(response => response.json())
                .then(data => {
                    this.setState({
                        track: data
                    })
                })
            })
            .catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err)
        });
        return false
      }

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };

    render() {

        const { loading, imageUrl } = this.state;
        const uploadButton = (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );

        return (
            <div>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <iframe src={this.state.track} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            
        );
    }
}

export default UploadComponent;