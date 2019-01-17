/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 首页轮播图关联映射
 */

const RelationType = {
    CONSULT: 'consult',
    ACTIVITY: 'activity',
};
const map = [];
map[RelationType.CONSULT] = '资讯';
map[RelationType.ACTIVITY] = '活动';

RelationType.map = map;

RelationType.getName = (type) => {
  return map[type] || '未知';
};

RelationType.getType = (name) => {
  for (let type in map) {
    if (name === map[type]) {
      return type
    }
  }
};

export default RelationType;