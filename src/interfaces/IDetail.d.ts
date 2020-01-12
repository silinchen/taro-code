interface  IUser{
    accesstoken:string,
    [propName:string]:any
}
 interface IGetTopicInfo{
 (params:any):void
}
interface ITopicInfo{
    id:string,
    author_id:string,
    content:string,
    title:string,
    good:boolean,
    reply_count:number,
    [propName:string]:any
}
interface IReply{
    id:string,
    content:string,
    is_uped:boolean,
    [propName:string]:any
}
export  interface IDetailProps{
    user:IUser,
    admireState?:boolean,
    getTopicInfo:IGetTopicInfo,
    topicinfo:ITopicInfo,
    replies:Array<IReply>,
    [propName:string]:any

}
export  interface IDetailState{
    showReplyContent:boolean,
    currentReply?:any
}