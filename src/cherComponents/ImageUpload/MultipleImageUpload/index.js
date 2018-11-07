import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import classnames from 'classnames';

import styles from './index.scss';

/*
* size 控制图片显示的尺寸
* listType 上传列表的内建样式
* action: 图片上传的地址
* props 其余props参考antd upload
* */

export default class ImageUpload extends React.Component {
  static defaultProps = {
    listType: "picture-card",
    action: "//jsonplaceholder.typicode.com/posts/",  // 需要更换到要上传的地址
  }
  
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: null,
  };
  
  handleCancel = () => this.setState({ previewVisible: false })
  
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  
  handleChange = ({ fileList }) => this.setState({ fileList })
  
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { size = "middle", ...props } = this.props; 
    
    return (
      <div className="clearfix">
        <Upload
          className={classnames(styles.uploader, styles[`${size}Uploader`])}
          fileList={fileList && fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          {...props}
        >
          {fileList && fileList.length >= 3 ? null : <Icon type="plus"  className={styles.uploaderTrigger} />}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
