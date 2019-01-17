/*  
入参： url ： 图片上传地址 
      file：上传单张图片的文件
      fileList： 上传多张图片的文件列表  
      isMultiple：  是否上传多张图片   默认值 false 单张图片上传 
参数调用： 
    // 单张图片上传  file 上传图片文件
    // 多张图片上传  fileList  上传图片文件列表  
说明：


 */

<template>
    <div>
        <el-upload class="avatar-uploader"  v-if ='!isMultiple'
            :action="upLoadUrl"
            :show-file-list="false"   
            :on-success="handleAvatarSuccess"   
            :before-upload="beforeAvatarUpload">   
            <img v-if="imageUrl" :src="imageUrl" class="avatar">   
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> 
        </el-upload>
        <el-upload class="normal-uploader"  v-if='isMultiple'  list-type="picture-card"
            :action="upLoadUrl"   
            :file-list='fileShowList' 
            :on-success="handleFileSuccess"   
            :on-preview="handlePictureCardPreview"  
            :on-remove="handleRemove">   
            <i class="el-icon-plus"></i> 
        </el-upload> 
        <el-dialog v-model="dialogVisible" size="tiny">   <img width="100%" :src="dialogImageUrl" alt=""> </el-dialog>
    </div>
</template>

<script>
let CONSTANT = require('../constant/constant.js');
let common = require("../common.js");

export default {
    data() {
        return {
            upLoadUrl:'',
            isMultiple:false,
            //  单张图片上传  封面 
            file:'', 
            imageUrl:'',
            // 多张图片上传  普通图片 
            fileList:[],       // 上传的图片列表
            fileShowList:[],   // 显示的图片列表
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    props:['uploadConfig'],
    created() {
        let id = window.localStorage.getItem('sessionId');
        this.upLoadUrl = this.uploadConfig.url +'?sessionId='+id;   // 图片上传地址 
        this.isMultiple = this.uploadConfig.isMultiple;   // 是否上传多张图片 
        this.getPicFile();
    },
    methods: {
        getPicFile:()=> {
             // 单张图片 
            this.file = this.uploadConfig.file
            this.imageUrl = this.uploadConfig.file.filrUrl ? this.uploadConfig.file.filrUrl:'';
            // 普通图片 
            let fileList =this.uploadConfig.fileList;
            this.fileList = fileList;
            fileList.forEach(function(item){
                let fileItem = {};
                    fileItem.name = item.fileName;
                    fileItem.url = item.fileUrl;
                this.fileShowList.push(fileItem);
            });
            console.log(this.fileShowList)
        },
        //  单张图片上传  封面 
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            if(res.status == 200){
                this.file = res.data.bussData?res.data.bussData:'';   
            }
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
            //const isJPG = file.type === 'image/jpeg';
            // if (!isJPG) {
            // this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            // return isJPG && isLt2M;
        },
        // 多张图片上传  普通图片 
        handleFileSuccess(res, file) {
            if(res.status == 200){
                let picItem = res.data.bussData;
                this.fileList.push(picItem);
            }
        },
         handleRemove(file, fileList) {    
            console.log(file.url);
            let deleteUrl = file.url;
            let len = this.fileList.length;
            for(let i=0;i<len;i++){
                if(this.fileList[i].fileUrl == deleteUrl){
                    this.fileList.remove(i);
                }
            }   
        },       
        handlePictureCardPreview(file) {    
            this.dialogImageUrl = file.url;         
            this.dialogVisible = true;      
        },
    }
}

/** *删除数组指定下标或指定对象 */ 
Array.prototype.remove = function(obj){ 
    for(var i =0;i <this.length;i++){ 
        var temp = this[i]; 
        if(!isNaN(obj)){ temp=i; } 
        if(temp == obj){ 
            for(var j = i;j <this.length;j++){ 
                this[j]=this[j+1]; 
            } 
            this.length = this.length-1; 
        } 
    }
}

</script>

<style lang="scss" scoped>
    div {
        .avatar-uploader {
            border-radius: 6px;
            box-sizing: border-box;
            vertical-align: top;
            .el-upload {
                cursor: pointer;
                position: relative;
                overflow: hidden;
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                    border: 1px dashed #d9d9d9 !important;
                    border-radius: 6px;
                    margin-left: 6px;
                }
                .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }
            }
            .el-upload:hover {
                border-color: #20a0ff;
            }        
        }          
    }
</style>
