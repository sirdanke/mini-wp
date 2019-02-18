Vue.component('profile-page', {
    data: function () {
        return {
            page: 'main',
            file : '',
            name : ''
        }
    },
    props: ['profile-user'],
    methods: {
        toEditPage() {
            this.page = 'edit'
        },
        getFile(e) {
            console.log(e.target.files[0])
            
            this.file = e.target.files[0]
        },
        doneEdit() {
            let obj = {
                name : this.profileUser.name,
                image : this.profileUser.profilePicture,
                email : this.profileUser.email
            }
            let newData = new FormData()
            newData.append('image', this.file)
            newData.append('data',JSON.stringify(obj))

            axios
                .patch(`${urlLink}/users/${this.profileUser._id}`,newData,{
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(data => {
                    console.log(data,"================");
                    
                    this.profileUser = data.data
                    
                    this.page = 'main'
                })
                .catch(err => {
                    console.log(err);
                    
                    
                })
        }

    },

    template: `
    <div class="col-3">
        <div class="card" style="width: 18rem;" v-if="page == 'main'">
            <img v-bind:src="profileUser.profilePicture"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{profileUser.name}}</h5>
                <a href="#" @click.prevent="toEditPage">edit profile</a>
            </div>
        </div>

        <div class="card" style="width: 18rem;" v-if="page == 'edit'">

            <img v-bind:src="profileUser.profilePicture"
                class="card-img-top" alt="...">
            <input type="file" @change="getFile">
            <label>name</label>
            <input v-model="profileUser.name">
            <input v-model="profileUser.email">
            <div class="card-body">
                <a href="#" @click.prevent="doneEdit">submit</a>
            </div>
        </div>
    </div>
`
})

