import axios from 'axios';
import {defineStore} from 'pinia';
export const data = defineStore('data',{
    state:()=>({
     data:[],
     loading:false,
     erro:'',
     dataType:'',
     filter_category:[],
     show_all_categories:true,
     filter_price:'',
     old_data:[],
     one_product:{},
     sharedValue:0,
    }),
    actions:{
    
     async getData(){
        this.loading = true;
    await axios.get('https://fakestoreapi.com/products')
    .then((res)=>{
        if(res.status == 200){
            this.loading = false
            if(this.dataType == 'mens clothing'){
                const filter = res.data.filter((data)=>{
                    return data.category == "men's clothing";
                  }); 
                this.data = filter; 
                console.log('iam test');
            }else if(this.dataType == 'women clothing'){
                const filter = res.data.filter((data)=>{
                return data.category == "women's clothing";
                  }); 
                this.data = filter; 
            }else if(this.dataType == 'jewellry'){
                const filter = res.data.filter((data)=>{
                return data.category == "jewelery";
                  }); 
                this.data = filter;
            }else if(this.dataType == 'electronics'){
                const filter = res.data.filter((data)=>{
                return data.category == "electronics";
                  }); 
                this.data = filter;
            }else{
              this.data = res.data;
            }
            console.log(this.data);   

        }
    }).catch((err)=>{
        this.loading = false;
        console.log(err);
    })
      },
      
     async getOneProduct(id){
      await axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res)=>{
        if(res.status == 200){
          this.one_product = res.data;
          console.log(this.one_product);
        }
      }).catch((err)=> console.log(err))
     }
      ,
      filterOnPrice(){
        setTimeout(() => {
          if(!this.filter_price){
            this.data = this.old_data;
        }else{
         let new_data = this.old_data.filter((product)=>{
           return product.price <= this.filter_price
          })
          this.data = new_data;
        }
           
        }, 10);
      }
    }
})