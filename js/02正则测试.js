let  p = '<p>1.这个有免运费的吗？没有</p><p>2.这个有免运费的吗？没有</p><p>3.这个有免运费的吗？没有</p>';
let List = []
List = p.replace(/[\r\t\n]/g, "").match(/(\<p\>)(.*?)(\<\/p\>)/g)
for(let item of List) {
    
}
console.log(List);