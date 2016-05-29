import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon, Badge } from 'antd'
import { Link } from 'react-router'
import { getAllMenu, updateNavPath } from '../../actions/menu'
import testMenu from '../../../fake/menu'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup;

import './index.less'

// const defaultProps = {
//   items: [],
//   currentIndex: 0
// }

// const propTypes = {
//   items: PropTypes.array,
//   currentIndex: PropTypes.number
// }

// class Task extends React.Component {
const Task = React.createClass({
  // constructor (props) {
  //   super(props)

  //   this.menuClickHandle = this.menuClickHandle.bind(this);
  // },

  // componentDidMount () {
  //   console.log('asdasdsdsdsd')
  //   this.props.getAllMenu()
  // },

  // menuClickHandle (item) {
  //   this.props.updateNavPath(item.keyPath, item.key)
  // },

getInitialState() {
    return {
      current: '1',
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  },
  render () {
    const { items } = this.props
    console.log('items', items);
    // const  items  = testMenu
    // console.log('items', items);
    // console.log('testMenu', testMenu);
    // let openKey = []
    
    // const menu = items.map((item) => {
    //   // console.log('item', item);
    //   openKey.push('sub'+item.key)
    //   return (
    //     <SubMenu
    //       key={'sub'+item.key}
    //       title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
    //     >
    //       {item.child.map((node) => {
    //         return (
    //           <Menu.Item key={'menu'+node.key}>
    //              <Link to={'' + node.key}>{node.name}</Link>
    //           </Menu.Item>
    //         )
    //       })}
    //     </SubMenu>
    //   )
    // });
    
    return (
      <Menu onClick={this.handleClick}
        style={{ width: 240 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[this.state.current]}
        mode="inline">
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>导航三</span></span>}>
          <Menu.Item key="9">选项9</Menu.Item>
          <Menu.Item key="10">选项10</Menu.Item>
          <Menu.Item key="11">选项11</Menu.Item>
          <Menu.Item key="12">选项12</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
})

// Task.propTypes = propTypes;
// Task.defaultProps = defaultProps;

// function mapStateToProps(state) {

//   return {
//     items: state.menu.items,
//     currentIndex: state.menu.currentIndex
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getAllMenu: bindActionCreators(getAllMenu, dispatch),
//     updateNavPath: bindActionCreators(updateNavPath, dispatch)
//   }
// }

export default Task;
// export default connect(mapStateToProps, mapDispatchToProps)(Task)