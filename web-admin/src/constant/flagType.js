/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 是否关联映射
 */

const FlagType = {
    YES: 'y',
    NO: 'n',
};
const map = [];
map[FlagType.YES] = '是';
map[FlagType.NO] = '否';

FlagType.map = map;

FlagType.getName = (type) => {
  return map[type] || '未选择';
};

FlagType.getType = (name) => {
  for (let type in map) {
    if (name === map[type]) {
      return type
    }
  }
};

export default FlagType;