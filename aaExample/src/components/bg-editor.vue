/**
 * Created by Eric on 2017/12/11.
 *
 * 表格组件
 *      此组件必须引用bootstrap.css\jquery\font-awesome\summernote

 *  参数说明:
 *          @param {String} upLoadUrl  图片上传接口地址
 *          @param {String} content  获取编辑器内容
 *          @param {Integer} minHeight 编辑器最低高度
 *  使用方式:
 *      ex:<bg-editor 
                :minHeight="300" 
                :uploadUrl="uploadApi" 
                :content="getApi"
                @editorData='editorInfo'>
            </bg-editor>
 *       @editorData 取得编辑器内容
 *
 *
 */
<template>
  <div>
     <div id="summernote"></div>
  </div>
</template>
<script>
import $ from 'jquery'
import {
    publicSysApi
} from '@/agent'
export default {
    data(){
        return{}
    },
    props:{
        uploadUrl:String,
        canEdit:{
            type:Boolean,
            default:true
        },
        minHeight:{
            type: Number,
            default: 300
        },
        content:{
            type: String,
            default: ''
        }
    },
    watch:{
    },
    mounted() {
        setTimeout(()=>{
         $('#summernote').summernote('code',this.content)
        },300)
       
        $('#summernote').summernote({
          toolbar: [
            //[groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['picture',['picture']],  
            ['video',['video']],  
            ['table',['table']],
            ['fullscreen',['fullscreen']],
            ['codeview', ['codeview']],
            // ['help', ['help']]
          ],
          lang: 'zh-CN',
          minHeight: this.minHeight, // set editor height
          dialogsFade: true,
          lineNumbers:false,
          callbacks: {
            onImageUpload: async (files) => {
                let file = files[0]
                const param = {
                    suffix: file.name.split(".")[1], // 文件后缀  png
                    contentType: file.type // 文件类型  image/png
                };
                const { data } = await publicSysApi.getOSSUploadUrl(param)
                if(data.status == 200) {
                    let upLoadUrl = data.data.bussData.uploadUrl;
                    let downloadUrl =   data.data.bussData.downloadUrl;
                    publicSysApi.uploadFile(upLoadUrl,file,file.type,(res)=>{
                        $('#summernote').summernote('editor.insertImage', downloadUrl);
                    })
                }    
            },
            onChange: (contents, $editable)=> {
                this.$emit('editorData',contents)
            }
          },
          content(item) {
            
          }
        })
        // if(!this.canEdit){
        //     //$('#summernote').summernote('enable');
        //     $('#summernote').summernote('disable');
        // }
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
@import '/static/bootstrap.css'; 
@import '/sys/static/bootstrap.css'; 
</style>