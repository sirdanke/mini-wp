Vue.component('search-page', {
    data () {
        return {
            searchBox : ''
        }
    }, 
    props: ['search-posting', 'currentPage'],
    methods : {

    }, template : `
        <div v-if="currentPage == 'search'">
            <ul class="list-unstyled">
                <li v-for="post in searchPosting ">
                    <div class="card" v-if="post.posting !== null">
                        <div class="card-header">
                        
                        </div>
                        <div v-if="post.posting !== null" class="card-body">
                            <img class="card-img-top" v-bind:src="post.posting.image">
                            <h5 class="card-title">{{post.title}}</h5>
                            <p class="card-text" v-html="post.posting.posting"></p>
                            <div >
                            <ul style="display:inline" v-for="tag in post.posting.tags">
                                <li style="display:inline">
                                    <button>{{tag}}</button>
                                </li>
                            </ul></div>
                            </div>
                         
                        </div>
                    </div>
                </li>
            </ul>
        </div>`
})