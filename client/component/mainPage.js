Vue.component('main-page', {
    data : function () {
        return {
            dataToEdit : 'macn'
        }
    },
    props : ['currentPage','postings', 'userPostings', 'searchPosting'],
    methods : {
        toEditPage(payload) {
            // this.currentPage
            this.dataToEdit = payload
            this.$emit('to-edit-page','edit')
        },
        reloadData() {
            this.$emit('reload-data','delete')
        },
        editDone(payload) {
            this.currentPage = payload
        },
        doneCreate(payload) {
            console.log(payload);
            
            // this.postings.push(payload)
            this.$emit('done-create', 'home')
        }
    },
    computed : {
      
    },
    template : `
        <div class="col-6">


                <search-page
                    :current-page="currentPage"
                    :search-posting="searchPosting">
                </search-page>

                <home-page
                    :postings="postings"
                    :current-page="currentPage">
                </home-page>

                <archieve-page
                    :user-postings="userPostings"
                    :current-page="currentPage"
                    @to-edit-page="toEditPage"
                    @reload-data="reloadData">
                </archieve-page>

                <edit-page
                    @edit-done="editDone"
                    :postings="postings"
                    :current-page="currentPage"
                    :data-to-edit="dataToEdit">
                </edit-page>

                <create-page
                    @success-create="doneCreate"
                    :postings="postings"
                    :current-page="currentPage">
                </create-page>

            
        </div>`
})

