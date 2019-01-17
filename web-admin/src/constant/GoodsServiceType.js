/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 商品服务分类关联映射
 */

const GoodsServiceType = {
    OFFICE: 'office',
    LIVING: 'living',
};
const map = [];
map[GoodsServiceType.OFFICE] = '办公室服务';
map[GoodsServiceType.LIVING] = '生活服务';

GoodsServiceType.map = map;

GoodsServiceType.getName = (type) => {
  return map[type] || '未知';
};

GoodsServiceType.getType = (name) => {
  for (let type in map) {
    if (name === map[type]) {
      return type
    }
  }
};

export default GoodsServiceType;