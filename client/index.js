
var urlLink = `http://localhost:3000`

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    axios
        .post(`${urlLink}/users/login/google`, { id_token })
        .then(({ data }) => {
            console.log(data.user);
            
            localStorage.setItem('token', data.token)
            app.loginVerify(data.user)

        })
        .catch(err => {
            console.log(err);

        })
}




function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        app.isLogin = false
        localStorage.removeItem('token')
    });
}

var app = new Vue({
    el: '#app',
    created: function () { 
        
        this.loginVerify()},
    data: {

        currentPage: 'home',
        text: '',
        query_search: '',
        postings: [],
        userPostings: [],
        searchPosting : [],
        signup: false,
        isLogin: false,
        profile : '',
        tagsData : ''
    },
    methods: {

        
        loginVerify(user) {
            if (localStorage.getItem('token')) {
                axios
                    .post(`${urlLink}/users/verification`, { token: localStorage.getItem('token') })
                    .then(({data}) => {
                        console.log(data.data,"============ini data yg dibutuhkan");
                        
                        this.profile = data.data
                        this.isLogin = true
                        this.getAll()
                        this.getTag()
                    })
                    .catch(err => {
                        swal('internal server error')
                    })
            }
        },
        signUp(payload) {
            this.signup = payload
        },
        headingToArchieve(payload) {
            console.log(payload,"=====inside index");

            this.userPostings = payload
            this.currentPage = 'archieve'
        },
        headingToCreate(payload) {
            
            this.currentPage = payload
        },
        headingToHome(payload) {
            this.loginVerify()
            this.currentPage = 'home'
            
        },
        toEditPage(payload) {
            this.currentPage = payload
        },
        successRegister(payload) {
            this.signup = false

        },
        reloadData(payload) {
            console.log(payload);

            this.getAll()
        },
        successLogin(payload) {
            this.loginVerify(payload)
        },
        getAll() {

            axios.get(`${urlLink}/posting`,
                {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({data}) => {
 
                    this.postings = data.reverse()
                })
                .catch(err => {
                })

            // console.log('masuk sini');           

        },

        getTag() {
            axios.get(`${urlLink}/tags`)
                .then(({data}) => {
                    console.log(data.data);
                    
                    this.tagsData = data.data                   
                })
                .catch(err => {
                    console.log(err);                   
                })
        },


        searchBox(payload) {
           
            
            let regex = new RegExp('.*' + payload + '.*', "i")
            let data = this.tagsData.filter(el => {
                return el.name.match(regex)
            })
            this.currentPage = 'search'       
            this.searchPosting = data
        },
        doneCreate() {
            this.currentPage = 'home'
            this.loginVerify()
        }


    }
})

// console.log(app.data);
