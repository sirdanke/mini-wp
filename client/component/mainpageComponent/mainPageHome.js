Vue.component('home-page', {
    data() {
        return {


        }
    },  
    props: ['postings', 'currentPage'],
    computed : {
        allpostings : function () {
            return this.userPostings
        }
    },
    methods: {
       
    }, template: `
                    <div v-if="currentPage== 'home'">
                 
                        <ul class="list-unstyled">
                            <li v-for="post,index in postings">
                                <div class="card">
                                    <div class="card-header">
                                      posted by : {{post.author.name}}
                                    </div>
                                    <img class="card-img-top" v-bind:src="post.image">
                                    <div class="card-body">
                                        
                                        <h5 class="card-title">{{post.title}}</h5>
                                        <p class="card-text" v-html="post.posting"></p>
                                        <div >
                                            <ul style="display:inline" v-for="tag in post.tags">
                                                <li style="display:inline">
                                                    <button>{{tag}}</button>
                                                </li>
                                            </ul></div>
                                        
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                `
})