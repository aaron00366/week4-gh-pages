
const { createApp } = Vue
let myModal=''
let delProductModal = '';
import pagination from "./Pagination.js";

createApp({
    data(){
        return{
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'aaronshih04263test',
            user:{
                username:'',
                password:''
            },
            products:[],
            tempProduct: {
                imagesUrl: [],
              },
              isNew:false,//確認是編輯或新增所使用
              page:{}

        }
    },
    methods:{
          getData(page = 1){
            const getDataurl = `${this.apiUrl}/api/${this.apiPath}/admin/products/?page=${page}`;
            axios.get(getDataurl)
            .then((res)=>{
              this.products = res.data.products
              this.page = res.data.pagination
              console.log(res)
            })
            .catch((err)=>{
              console.log(err)
            })
          },
          openModal(status,product){
            if(status ==='create'){
                myModal.show()
                this.isNew = true
                //資料初始話
                this.tempProduct= {
                    imagesUrl: [],
                  }
            } else if(status ==='edit'){
                myModal.show()
                this.isNew = false
                this.tempProduct = {...product};
            } else if(status ==='delete'){
                delProductModal.show()
                this.tempProduct = {...product}
            }
          },
          updateData(){
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            //用this.isNew 判斷api 如何運行
            let method = 'post'
            if(!this.isNew){
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                method = 'put'
            }
            axios[method](url,{data:this.tempProduct})
            .then(res=>{
                this.getData()
                myModal.hide()
            })
          },
          delData(){
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            axios.delete(url)
            .then(res=>{
                this.getData()
                delProductModal.hide()
                console.log('dsfsdf')
            })
            .catch(error=>{
                console.log(error)
            })
          }
    },
    components:{
        pagination
    },
    mounted() {
        console.log('init');
         myModal =  new bootstrap.Modal(document.querySelector('#productModal'));
         delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'))
         let token = document.cookie.replace(/(?:(?:^|.*;\s*)aarontoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
         axios.defaults.headers.common['Authorization'] = token;//coolie有儲存時
         this.getData()
    },
})
.component('product-modal',{
    props:['tempProduct','updateData'],
    template:'#product-modal-template'
})
.component('delete-modal',{
    props:['tempProduct','delData'],
    template:'#delete-modal-template'
 })
.mount('#app')