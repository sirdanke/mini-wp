// const urlLink = `http://localhost:3000`

Vue.component('signup-form',{
    data () {
        return {
            email : '',
            name : '',
            password : ''
        }
    }, 
    methods : {
        register() {
            axios
                .post(`${urlLink}/users`, {
                    name : this.name,
                    email : this.email,
                    password : this.password
                })
                .then(data => {
                    console.log(data);
                    
                    this.$emit('success-register','login')
                })
                .catch(({response}) => {
                    swal(response.data.error)
                    // console.log(response,"==didalam,");                  
                })
        },
    }, template : ` 
    <div class="container">
    <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
                <div class="card-body">
                    <h5 class="card-title text-center">Sign Up</h5>

                    <form class="form-signup" @submit.prevent="register">

                        <div class="form-label-group">
                            <input type="text" id="inputEmail" class="form-control" placeholder="Enter Email" v-model="name">
                            <label for="inputEmail">Full Name</label>
                        </div>
                        <div class="form-label-group">
                            <input type="email" id="inputName" class="form-control" placeholder="Enter name" v-model="email" >
                            <label for="inputName">Email address</label>
                        </div>

                        <div class="form-label-group">
                            <input type="password" id="inputPassword" class="form-control"
                                placeholder="Password" required v-model="password">
                            <label for="inputPassword">Password</label>
                        </div>

                        <div class="custom-control custom-checkbox mb-3">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">Remember password</label>
                        </div>
                        <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign
                        up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>`
})