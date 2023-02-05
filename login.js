
const { createApp } = Vue
createApp({
    data(){
        return{
            apiUrl:'https://vue3-course-api.hexschool.io/v2/',
            path:'aaronshih04263test',
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        login(){
            axios.post(`${this.apiUrl}admin/signin`,this.user)
            .then(res=>{
                const { token,expired} = res.data;
                document.cookie = `aarontoken=${token}; expires=${new Date(expired)};`;
                window.location = 'products.html'
                
            })
            .catch(error=>{
                console.log(error)
            })
        },
        
    }
}).mount('#app')