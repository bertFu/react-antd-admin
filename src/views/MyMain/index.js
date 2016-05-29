import React from 'react'
import { Table, Button, Row, Col  } from 'antd';
import Input from '../../components/Input';
import reqwest from 'reqwest';

const columns =  [
  {
  title: '姓名',
  dataIndex: 'name',
  width:100,
  filters: [
    { text: '姓李的', value: '李' },
    { text: '姓胡的', value: '胡' },
  ],
  }, {
    title: '年龄',
    width:100,
    dataIndex: 'age',
    sorter: true,
  },
  { title: '列1', width: 100, dataIndex: 'age', key: '1' },
  { title: '列2', width: 100, dataIndex: 'age', key: '2' },
  { title: '列3', width: 100, dataIndex: 'age', key: '3' },
  { title: '列4', width: 100, dataIndex: 'age', key: '4' },
  { title: '列5', width: 100, dataIndex: 'age', key: '5' },
  { title: '列6', width: 100, dataIndex: 'age', key: '6' },
  { title: '列7',  width: 100,dataIndex: 'age', key: '7' },
  { title: '列8',  width: 100,dataIndex: 'age', key: '8' },
  { title: '列9',  width: 100,dataIndex: 'age', key: '9' },
  { title: '列10', width: 100, dataIndex: 'age', key: '10' },
  { title: '列11', width: 100, dataIndex: 'age', key: '11' },
  { title: '列12', width: 100, dataIndex: 'age', key: '12' },
  { title: '列13', width: 100, dataIndex: 'age', key: '13' },
  { title: '列14', width: 100, dataIndex: 'age', key: '14' },
  { title: '列15', width: 100, dataIndex: 'age', key: '15' },
  { title: '列16',  width: 100,dataIndex: 'age', key: '16' },
  { title: '列17',  width: 100,dataIndex: 'age', key: '17' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="#">操作</a>,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `李大嘴${i}`,
    age: 32,
    address: `西湖区湖底公园${i}号`,
  });
}
const pagination = {
  total: data.length,
  showSizeChanger: true,
  onShowSizeChange(current, pageSize) {
    console.log('Current: ', current, '; PageSize: ', pageSize);
  },
  onChange(current) {
    console.log('Current: ', current);
  }
};

const MyMain = React.createClass({
  getInitialState() {
    return {
      data: [],
      selectedRowKeys: [],  // 这里配置默认勾选列
      loading: false,
    };
  },
  start() {
    this.setState({ loading: true });
    // 模拟 ajax 请求，完成后清空
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  },
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      pageSize: pagination.pageSize,
      currentPage: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  },
  // fetch(params = {}) {
  //   console.log('请求参数：', params);
  //   this.setState({ loading: true });
  //   reqwest({
  //     url: 'demo/data.json',
  //     method: 'get',
  //     data: params,
  //     type: 'json',
  //     success: (result) => {
  //       const pagination = this.state.pagination;
  //       pagination.total = result.totalCount;
  //       this.setState({
  //         loading: false,
  //         data: result.data,
  //         pagination,
  //       });
  //     }
  //   });
  // },
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  },
  
  // componentDidMount() {
  //   this.fetch();
  // },
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div className="gutter-example" style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            
            <Col className="gutter-row" span="2">
              <div className="gutter-box">
                <Button type="primary" onClick={this.start}>发起时间</Button>
              </div>
            </Col>
            
            <Col className="gutter-row" span="2">
              <div className="gutter-box">
                <Button type="primary" onClick={this.start}>发起时间</Button>
              </div>
            </Col>
            
            <Col className="gutter-row" span="2">
              <div className="gutter-box">
                <Button type="primary" onClick={this.start}>催费金额</Button>
              </div>
            </Col>
            
            <Col className="gutter-row" span="6">
              <div className="gutter-box"><Input /></div>
            </Col>
            
                
            <Col className="gutter-row" offset="5" span="2">
              <div className="gutter-box">
                <Button type="primary" onClick={this.start}
                  disabled={!hasSelected} loading={loading}>操作</Button>
              </div>
            </Col>
            
            <Col className="gutter-row" span="2">
              <div className="gutter-box">
                <Button type="primary" onClick={this.start}
                  disabled={!hasSelected} loading={loading}>删除</Button>
              </div>
            </Col>
            
            <Col className="gutter-row" span="3">
                <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
            </Col>
            
          </Row>
        </div>
          <Table rowSelection={rowSelection} 
              columns={columns} 
              dataSource={data} 
              pagination={pagination}  
              scroll={{ x: 1000}}
              loading={this.state.loading}
              onChange={this.handleTableChange} />
      </div>
    );
  },
});
export default MyMain;
// ReactDOM.render(<App />, mountNode);