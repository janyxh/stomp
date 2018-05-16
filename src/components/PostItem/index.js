import React, { PureComponent, PropTypes } from 'react';
import styles from './PostItem.css';
import moment from 'moment';
const propTypes = {
  post: PropTypes.object.isRequired,
};
class PostItem extends PureComponent {
  render() {
    const { avatar_url, create_at, loginname, recent_replies } = this.props.post;
    moment.locale('zh-cn');
    const createTime = moment(create_at).fromNow();
    const list = recent_replies.map((item, index) => {
      return (
        <div key={index} className={styles.list}>
        <img src={item.author.avatar_url} className={styles.image} />
        <div className={styles.title}> {item.title}</div>
        </div>);
    });
    return (<div className={styles.root}>
        <img src={avatar_url} />
         <div className = {styles.name}>
        {loginname}
        </div>
        <div className={styles.time}>
         注册时间：{createTime}
        </div>
        <div>
        <div >
        <div className={styles.header}>
        最近参与的话题
        </div>
      {list}
        </div>
      </div>
           </div>);
  }
}
PostItem.propTypes = propTypes;
export default PostItem ;
