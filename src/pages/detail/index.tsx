import  Taro,{Component} from '@tarojs/taro';
import  {View,Text,Button} from  '@tarojs/components';
import {connect} from '@tarojs/redux';
import {validateUser}  from '../../actions/user';
import  {getTopicInfo,admireTopic,replyContent} from  '../../actions/topiclist';
import TopicInfo from  '../../components/topicinfo/topicinfo';
import Replies from  '../../components/topicinfo/replies';
import ReplyContent  from  '../../components/topicinfo/replycontent';
import  './detail.less';
import {IDetailProps,IDetailState} from '../../interfaces/IDetail';
@connect(function(store):IDetailProps{
    return {getTopicInfo,admireState:store.topiclist.admireState,user:store.user,topicinfo:store.topiclist.topicinfo,replies:store.topiclist.replies}
},function(dispatch){
    return {getTopicInfo(params){
        dispatch(getTopicInfo(params))
    }
  }
})
class  Detail  extends   Component<IDetailProps,IDetailState>{
   config={
     navigationBarTitleText: '话题详情'
   }
   state:IDetailState={
       showReplyContent:false //显示回复组件
   }
   componentWillMount(){
      this.getDetail();
   }
   getDetail(){
    let {user}=this.props;
    let params={id:this.$router.params.topicid,mdrender:true,accesstoken:user.accesstoken}
    this.props.getTopicInfo&&this.props.getTopicInfo(params)
   }
   admire(reply){
     let {user}=this.props;
     let  params={replyid:reply.id,accesstoken:user.accesstoken};
      admireTopic(params).then(result=>{
          if(result.success){
            this.getDetail();
          }
      })
   }
   componentWillReceiveProps(nextProps){
      if(this.props.admireState!=nextProps.admireState){
          //发生变化 请求数据
          this.getDetail();
      }
   }
   Reply(){
     validateUser(this.props.user).then(result=>{
         if(result){
            this.setState({showReplyContent:true});
         }
     })
   }
   closeReplyContent(){
     this.setState({showReplyContent:false});
   }
   //评论
   ReplyContentValue(content){
      let {user}=this.props;
      let {currentReply}=this.state;
      let reply_id=currentReply?currentReply.id:null;
      let preName=currentReply?'@'+currentReply.author.loginname+'   ':'';//评论人的昵称
      let params={reply_id:reply_id,content:preName+content,accesstoken:user.accesstoken,topicid:this.$router.params.topicid}
      replyContent(params).then(result=>{
          if(result.success){
              this.getDetail();
              this.closeReplyContent();
          }
      })
   }
   //提供给子组件使用的函数
   replyToReply(reply){
      this.setState({currentReply:reply,showReplyContent:true})
   }
   render(){
       let {topicinfo,replies,user}=this.props;
       let {showReplyContent}=this.state;
       let  selfPublish=topicinfo.author&&user.loginname==topicinfo.author.loginname;
      return (<View className='detail'>
             {showReplyContent?<ReplyContent onOKReplyContent={this.ReplyContentValue.bind(this)}  onCancelReplyContent={this.closeReplyContent.bind(this)} />:null}
             <TopicInfo selfPublish={selfPublish} topicinfo={topicinfo} />
             < Replies user={user} onReplyToReply={this.replyToReply.bind(this)}  replies={replies} onAdmire={this.admire.bind(this)} />
             <Button className='replyBtn' onClick={this.Reply.bind(this)}>回复</Button>
           </View>)
   }
}
export default  Detail;