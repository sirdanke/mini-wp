Vue.component('side-nav-page',{
    data () {
        return {
            data : ''
        }
    }, methods : {
        homePage() {
            this.$emit('home-page', 'home')
        },
        createPage() {
            this.$emit('create-page','create')
        },
        archievePage() {
            axios
                .get(`${urlLink}/posting/user`,{headers : {token : localStorage.getItem('token')}})
                .then(({data}) => {
                    console.log(data[0].postings,"=========real data");
                    this.data = data[0].postings
                    
                    this.$emit('archieve-page', this.data)
                })
                .catch(err => {
                    console.log(err);
                    
                    swal('internal server error')
                })
        }

    }, template  : `
    <div class="col-3">
        <p><a href="#" @click.prevent="homePage"><i class="fas fa-book-reader"></i> Read </a></p>
        <p><a href="#" @click.prevent="createPage"><i class="fas fa-blog"></i> Create </a></p>
        <p><a href="#" @click.prevent="archievePage"><i class="fas fa-archive"></i> Archieve </a></p>
        <p><a href="#"><i class="fab fa-gratipay"></i> Favorite </a></p>
    </div>`
})