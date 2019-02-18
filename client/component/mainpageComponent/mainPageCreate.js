Vue.component('create-page', {
    data () {
        return {
            title :'',
            text : '',
            file : '',
            tags : ''       
        }
    },
    props : ['postings','currentPage'],
     components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    methods : {
        addImage(e) {
            this.file = e.target.files[0]
        },
        addPost() {
            let article = {
                title : this.title,
                posting : this.text,
                tags : this.tags.split(' ')
            }

            let formData = new FormData()
            console.log(this.title, this.text)
            formData.append('image', this.file)
            formData.append('data', JSON.stringify(article))
            
            axios
                .post(`${urlLink}/posting`, formData, 
                    {
                        headers : {
                            token : localStorage.getItem('token')
                        }
                    }
                )
                .then(data => {
  
                    this.$emit('success-create',data.user)
                })
                .catch(err => {
                    console.log(err,"=======ini errornya========");
                    
                    swal('field cannot be blank')
                })
        }
    }, 
    template : `
            <div v-if="currentPage =='create'">
                <p></p>
                <p>create you new posting</p>
                <form method="post" v-on:submit.prevent="addPost" enctype="multipart/form-data">
                    <label>title</label><br>
                    <input id="title" v-model="title"><br>
                    <label>posting picture</label><br>
                    <input type="file" name="picture" @change="addImage"><br>
                    <label>tag</label><br>
                    <input  v-model="tags"><br>
                    <label>your post</label><br>
                    <button type="submit">Post</button>
                    <wysiwyg v-model="text" />
                </form>
            </div>`
})