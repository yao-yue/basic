/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 上架/下架关联映射
 */

const ToogleRackType = {
    YES: 'y',
    NO: 'n',
};
const map = [];
map[ToogleRackType.YES] = '上架';
map[ToogleRackType.NO] = '下架';

ToogleRackType.map = map;

ToogleRackType.getName = (type) => {
  return map[type] || '- -';
};

ToogleRackType.getType = (name) => {
  for (let type in map) {
    if (name === map[type]) {
      return type
    }
  }
};

export default ToogleRackType;