Vue.component('archieve-page', {
    data() {
        return {


        }
    },
   
    props: ['user-postings', 'currentPage'],
    computed : {
        allpostings : function () {
            return this.userPostings.reverse()
        }
    },
    methods: {
        reload() {
            this.$emit('reload-data','data')
        },
        deletePost(id) {
            // console.log(this);
            
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this file!",
                icon: "warning",
                buttons: [
                    'No, cancel it!',
                    'Yes, I am sure!'
                ],
                dangerMode: true,
            }).then((isConfirm) =>{
                if (isConfirm) {
                    swal({
                        title: 'Deleted!',
                        text: 'your article are successfully deleted!',
                        icon: 'success'
                    })
                    .then(()=> {
                        axios
                            .delete(`${urlLink}/posting/${id}`,{ headers : { token : localStorage.getItem('token')}})
                            .then((data) => {
                                let deleted = this.allpostings.filter(arr => {
                                    return arr._id !== id
                                })
                                this.userPostings = deleted
                            })
 
                    })
                    .catch(err => {
                        swal('our server are busy, please try again')                        
                    })
                } else {
                    swal("Cancelled", "Your posting is safe :)", "error");
                }
            })

        },
        updatePage(posting,index) {
            this.$emit('to-edit-page',posting,index)
        }
    }, template: `
                    <div v-if="currentPage== 'archieve'">
                        <ul class="list-unstyled">
                            <li v-for="post,index in allpostings">
                                <div class="card">
                                    <div class="card-header">
                                       
                                    </div>
                                    <img class="card-img-top" v-bind:src="post.image">
                                    <div class="card-body">
                                        
                                        <h5 class="card-title">{{post.title}}</h5>
                                        <p class="card-text" v-html="post.posting"></p>
                                        <p> <a href="#" class="btn btn-primary"
                                                @click.prevent="deletePost(post._id)">delete</a> <a href="#"
                                                class="btn btn-primary"
                                                @click.prevent="updatePage({post},index)">update</a>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                `
})