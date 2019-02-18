Vue.component('navbar', {
    data: function () {
        return {
        
            query_search : ''
            
        }
    },
    props : ['postings'],
    methods: {
        searchPost() {
            console.log('masuk search', this.query_search);
            
            this.$emit('search-box', this.query_search)
        }
    }, 
    template: `
                    <nav class="navbar navbar-light bg-info justify-content-between">
                        <div class="d-flex justify-content-start">
                            <a class="navbar-brand"><i class="fas fa-play"></i> bandMate</a>
                        </div>
                        <div class="d-flex justify-content-between">
                            <form method="post" v-on:submit.prevent="searchPost">
                                <input class="form-control mr-xm-1" placeholder="Search" aria-label="Search" v-model="query_search">
                                <button class="btn btn-outline-success my-1 my-xm-0" type="submit">Search</button>
                            </form>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-outline-success my-2 my-sm-0" onclick="signOut()">Logout</button>
                        </div>
                    </nav>`
})