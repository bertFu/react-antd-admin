import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon, Badge } from 'antd'
import { Link } from 'react-router'
import { getAllMenu, updateNavPath } from '../../actions/menu'
import testMenu from '../../../fake/menu'

const SubMenu = Menu.SubMenu

import './index.less'

const defaultProps = {
  items: [],
  currentIndex: 0
}

const propTypes = {
  items: PropTypes.array,
  currentIndex: PropTypes.number
}

class Sidebar extends React.Component {
  constructor (props) {
    super(props)

    this.menuClickHandle = this.menuClickHandle.bind(this);
  }

  componentDidMount () {
    this.props.getAllMenu()
  }

  menuClickHandle (item) {
    this.props.updateNavPath(item.keyPath, item.key)
    console.log('click ', item);
    this.setState({
      current: item.key,
    });
  }

  render () {
    const { items } = this.props
    // const  items  = testMenu
    // console.log('items', items);
    // console.log('testMenu', testMenu);
    let openKey = []
    const menu = items.map((item) => {
      // console.log('item', item);
      openKey.push('sub'+item.key)
      return (
        <SubMenu
          key={'sub'+item.key}
          title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
        >
          {item.child.map((node) => {
            return (
              <Menu.Item key={'menu'+node.key}>
                 <Link to={'' + node.key}>{node.name}</Link>
              </Menu.Item>
            )
          })}
        </SubMenu>
      )
    });
    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo"></div>
        <Menu
          mode="inline" 
          theme="dark" 
          openKeys={openKey}
          onClick={this.menuClickHandle}
        >
          {menu}
        </Menu>
      </aside>
    )
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

function mapStateToProps(state) {

  return {
    items: state.menu.items,
    currentIndex: state.menu.currentIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMenu: bindActionCreators(getAllMenu, dispatch),
    updateNavPath: bindActionCreators(updateNavPath, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
