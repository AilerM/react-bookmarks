import React from 'react'
import { Select, PageHeader, Card, Col, Row, Avatar, Icon, Button } from 'antd'
import './index.scss'
// import bookmarksData from 'src/data/bookmarksData.js'
import {getBookMarks} from 'src/service/bookmarks'
const { Option } = Select
const { Meta } = Card

class Bookmarks extends React.Component{
  state = {
    currentSelectDataLink: ''
    // bookmarksData: bookmarksData.data
  }
  getData = () => {
    getBookMarks({}).then(res => {
      let { data } = res.rows
      this.setState({
        bookmarksData: data
      })
    })
  }
  getBookMarkCardCol = (data) => {
    let str = []
    data.forEach(({ name, icon, avatar, link, desc }, index) => {
      str.push(<Col key = {index} span = {6}>
        <Card bordered = {false}>
          <Meta
            avatar = {
              icon ? <Icon type={icon} /> : <Avatar src = {avatar} />
            }
            title = {<a target = {'_blank'} href = {link}>{ name }</a>}
            description = {<span title={desc}>{desc}</span>}
          />
        </Card></Col>)
    })
    return str
  }
  getBookMarkCardRow = () => {
    let data = this.state.bookmarksData
    let str = []
    data && data.forEach(({name, children}, index) => {
      str.push(<div key = {index}>
        <PageHeader title = {name}/>
        <Row gutter = {16}>
          {this.getBookMarkCardCol(children)}
        </Row>
      </div>)
    })
    return str
  }
  getTopSelectOptions = () => {
    let data = this.state.bookmarksData
    return data && data.map(({children, name}) => {
      return children.map((d, i) => 
        <Option key={d.link} data-link={d.link}>{d.name}</Option>
      )
    })
  }
  enterLink = () => {
    window.open(this.state.currentSelectDataLink)
  }
  onChange = (value) => {
    this.setState({
      currentSelectDataLink: value
    })
  }
  componentDidMount(){
    this.getData()
  }
  render() {
    return (
      <div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="搜索"
          optionFilterProp="children"
          onChange={this.onChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
         {this.getTopSelectOptions()}
        </Select>
        <Button type="ailer-default"
          onClick={this.enterLink}
        >跳转</Button>
        {this.getBookMarkCardRow()}
      </div>
    )
  }
}
export default Bookmarks