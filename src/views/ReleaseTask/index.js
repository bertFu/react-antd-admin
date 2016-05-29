import React from 'react'
import './index.less'
import { Form, Select, InputNumber, DatePicker, TimePicker, Switch, Radio,
         Cascader, Slider, Button, Col, Upload, Icon, Input, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const areaData = [{
  value: 'shanghai',
  label: '上海',
  children: [{
    value: 'shanghaishi',
    label: '上海市',
    children: [{
      value: 'pudongxinqu',
      label: '浦东新区',
    }],
  }],
}];
const onChange = function(info) {
  console.log('test 文件上传');
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    }
  };

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  },

  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  },
  getInitialState() {
    return {
      priviewVisible: false,
      priviewImage: '',
    };
  },
  handleCancel() {
    this.setState({
      priviewVisible: false,
    });
  },

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const props = {
      action: '/upload.do',
      listType: 'picture-card',
      defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      }],
      onPreview: (file) => {
        this.setState({
          priviewImage: file.url,
          priviewVisible: true,
        });
      },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit} >
        <FormItem
          label="InputNumber 数字输入框："
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}>
          <InputNumber min={1} max={10} style={{ width: 100 }}
            {...getFieldProps('inputNumber', { initialValue: 3 })} />
          <span className="ant-form-text"> 台机器</span>
        </FormItem>

        <FormItem
          label="我是标题："
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}>
          <p className="ant-form-text" id="static" name="static">唧唧复唧唧木兰当户织呀</p>
          <p className="ant-form-text">
            <a href="#">链接文字</a>
          </p>
        </FormItem>

        <FormItem
          label="Switch 开关："
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          required>
          <Switch {...getFieldProps('switch', { valuePropName: 'checked' })} />
        </FormItem>

        <FormItem
          label="Slider 滑动输入条："
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          required>
          <Slider marks={['A', 'B', 'C', 'D', 'E', 'F', 'G']} {...getFieldProps('slider')} />
        </FormItem>

        <FormItem
          label="Select 选择器："
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required>
          <Select style={{ width: 200 }}
            {...getFieldProps('select')}>
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>disabled</Option>
            <Option value="yiminghe">yiminghe</Option>
          </Select>
        </FormItem>

        <FormItem
          label="级联选择："
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
          hasFeedback>
          <Cascader style={{ width: 200 }} options={areaData} {...getFieldProps('area')} />
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label="备注："
          help="随便写点什么">
          <Input type="textarea" placeholder="随便写" {...getFieldProps('remark')} />
        </FormItem>
        
        <FormItem
          label="DatePicker 日期选择框："
          labelCol={{ span: 8 }}
          required>
          <Col span="6">
            <FormItem>
              <DatePicker {...getFieldProps('startDate')} />
            </FormItem>
          </Col>
          <Col span="1">
            <p className="ant-form-split">-</p>
          </Col>
          <Col span="6">
            <FormItem>
              <DatePicker {...getFieldProps('endDate')} />
            </FormItem>
          </Col>
        </FormItem>


        <FormItem
          label="TimePicker 时间选择器："
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required>
          <TimePicker {...getFieldProps('time')} />
        </FormItem>

        <FormItem
          label="选项："
          labelCol={{ span: 8 }}>
          <RadioGroup {...getFieldProps('rg')}>
            <RadioButton value="a">管理任务</RadioButton>
            <RadioButton value="b">信息问题</RadioButton>
            <RadioButton value="c">数据问题</RadioButton>
            <RadioButton value="d">间接问题</RadioButton>
            <RadioButton value="e">派单问题</RadioButton>
          </RadioGroup>
        </FormItem>

        <FormItem
          label="logo图："
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          help="提示信息要长长长长长长长长长长长长长长">
          <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}
            {...getFieldProps('upload', {
              valuePropName: 'fileList',
              normalize: this.normFile,
            })}
          >
            <Button type="ghost">
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>
        </FormItem>
        <FormItem
          label="选项："
          labelCol={{ span: 8 }}>
          <div className="clearfix">
            <Upload {...props}>
              <Icon type="plus" />
              <div className="ant-upload-text">上传照片</div>
            </Upload>
            <a href="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" target="_blank" className="upload-example">
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" />
              <span>示例</span>
            </a>
            <Modal visible={this.state.priviewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" src={this.state.priviewImage} />
            </Modal>
          </div>
        </FormItem>

        <FormItem wrapperCol={{ span: 16, offset: 8 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">确定</Button>
        </FormItem>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);

export default Demo;
// ReactDOM.render(<Demo />, mountNode);