import React, { ReactElement } from 'react';
import { Upload, Icon } from 'antd';
import classnames from 'classnames';
import { RcFile } from 'antd/es/upload';
import { Size, ImplicitSize } from '@/types/cherComponents';
import { UploadListType } from 'antd/es/upload/interface';

import styles from './index.scss';

/*
 * children 给这个属性是为了给用户自定义uploader界面
 * size 控制图片显示的尺寸
 * listType 上传列表的内建样式
 * action: 图片上传的地址
 * props 其余props参考antd upload
 * */

/*
 * 这个组件的原理是通过调用antd的Upload组件，利用其提供的beforeUpload钩子，在图片upload之前，
 * 调用H5的FileReader获取到图片的base64码
 * 接着将base64码给到canvas从而new一个canvas，然后通过canvas对图片大小，体积等进行控制，从而达到控制用户上传图片体积太大的问题。
 * 最后又通过canvas的api将修改后的图片重新变为base64码，通过callback传回到beforeUpload中上传到action提交地址中
 */

// 限制图片宽高最大为1600，当宽高超过1600的时候进行等比缩小
function figureSize(size: Size): ImplicitSize {
  const dis = 1600;
  const rect = ['width', 'height'];

  // 当图片宽高都小于1600的时候，直接返回size，不限制其宽高
  if (size.width < dis && size.height < dis) {
    return size;
  }

  // 当上传的图片宽高大于1600的时候，限定最大为1600，同时进行等比缩小
  if (size.height > size.width) {
    rect.sort();
  }

  const [w, h] = [size.width, size.height].sort((prev, next) => {
    return next - prev;
  });

  return {
    [rect[0]]: dis,
    [rect[1]]: (dis / w) * h, // 等比缩小
  };
}

// 通过FileReader拿到上传图片的base64码和限制过的图片的宽高生成canvas图片，然后将生成的canvas图片再次转换为base64通过callback传回到beforeUpload
function handleImageByCanvas(
  file: RcFile,
  imgResource: string,
  size: ImplicitSize,
  callback: (dataurl: string) => void
) {
  // console.log('4');
  const canvas = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
  const img = new Image();

  // 用限制完的图片宽高生成canvas图片宽高，而canvas生成的图片才是最终上传到action地址的图片，从而达到了控制图片大小的功能
  canvas.width = size.width;
  canvas.height = size.height;

  // 在beforeUpload的时候注册一个onload事件，并调用了我们在beforeUpload中提供的callback。onload事件将会在真正Upload的阶段调用
  img.onload = function () {
    ctx && ctx.drawImage(img, 0, 0, size.width, size.height);
    const dataurl = canvas.toDataURL(file.type); // dataurl即是base64格式的url

    callback(dataurl); // 通过callback将在beforeUpload阶段获取到的base64格式的url
  };

  // 将FileReader获取到的base64码赋值给img，这样才能对img使用canvas
  img.src = imgResource;

  // canvas预览
  // document.querySelector('body').appendChild(canvas);
}

function getBase64(img: RcFile, callback: (imgBase64: string | null | ArrayBuffer) => void) {
  // console.log('1');
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img); // 通过H5的FileReader提供的readAsDataURL获取到图片的base64数据
}

function dataURLtoBlob(dataurl: string) {
  const arr = dataurl.split(','),
    mime = (arr[0].match(/:(.*?);/) as string[])[1],
    bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

type Props = {
  listType: UploadListType | undefined;
  action: string;
  size: string;
  children: ReactElement;
};

type State = {
  imageUrl: string;
};

export default class SingleImageUpload extends React.Component<Props, State> {
  static defaultProps = {
    listType: 'picture-card',
    action: '//jsonplaceholder.typicode.com/posts/', // 需要更换到要上传的地址
    size: 'middle',
  };

  state = {
    imageUrl: '',
  };

  presetCanvas = (file: RcFile, callback: (dataurl: string) => void) => {
    const img = new Image();
    let imgResource: string;
    // 先挂载一个onload事件，实际执行顺序在getBase64之后
    img.onload = function () {
      // console.log('3');

      // 控制上传图片的宽高
      const size: ImplicitSize = figureSize({
        width: img.width,
        height: img.height,
      });

      // 事件触发的时候，imgResource为FileReader获取到的图片的base64码
      handleImageByCanvas(file, imgResource, size, callback);
    };

    // 调用getBase64获取到upload的图片的base64码，并修改了presetCanvas作用域下的imgResource的值
    getBase64(file, (imgBase64: string) => {
      // console.log('2', imgBase64);
      imgResource = imgBase64;
      img.src = imgResource;
      this.setState({ imageUrl: imgResource });
    });
  };

  // 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传。注意：IE9 不支持该方法。
  beforeUpload = (file: RcFile, fileList: RcFile[]) => {
    return new Promise<void>((resolve, reject) => {
      this.presetCanvas(file, function (dataurl: string) {
        // console.log('5', dataurl);
        // dataurl是最终canvas生成的修改后的图片，这里再将其转换为file对象，最终将会在upload阶段提交到action地址（通常就是我们的数据库）
        const blob = dataURLtoBlob(dataurl);
        new File([blob], file.name, { type: file.type });
        resolve();
      });
    });
  };

  render() {
    const { imageUrl } = this.state;
    const { size, children, ...props } = this.props;

    return (
      <Upload
        className={classnames(styles.uploader, styles[`${size}Uploader`])}
        beforeUpload={this.beforeUpload}
        showUploadList={false} // 单个图片的时候要关闭这个，不然会报错
        {...props}
      >
        {children ? (
          children
        ) : imageUrl ? (
          <img src={imageUrl} alt="" className={styles.avatar} />
        ) : (
          <Icon type="plus" className={styles.uploaderTrigger} />
        )}
      </Upload>
    );
  }
}
