import Taro, { Component } from '@tarojs/taro'
import { View,  Text } from '@tarojs/components'
import './index.less'
import Menu  from  '../../components/menu/menu';
import TopicList  from  '../../components/topiclist/topiclist';

class Index extends Component {

    config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
 
  componentWillUnmount () { 
  }
  componentDidMount(){

  }
  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
         <Menu />
         <TopicList  />
      </View>
    )
  }
}

export default Index
