Vue.component('edit-page', {
    data() {
        return {
            editTitle: '',
            title: '',
            file: ''
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    props: ['currentPage', 'data-to-edit'],

    methods: {
        addImage(e) {
            this.file = e.target.files[0]
        },
        updatePost(id) {
            console.log(id);

            let article = {
                title: this.dataToEdit.post.title,
                posting: this.dataToEdit.post.posting,
                image: this.dataToEdit.post.image
            }

            let formData = new FormData()
            formData.append('image', this.file)
            formData.append('data', JSON.stringify(article))

            axios
                .patch(`${urlLink}/posting/${id}`, formData, {
                    headers: {
                        token: localStorage.getItem('token')
                    }

                })
                .then(data => {
                    this.$emit('edit-done', 'archieve')
                    swal('edit success')
                })
                .catch(err => {

                })
        }
    }, template: `
        <div v-if="currentPage === 'edit'">
            <form method="post" v-on:submit.prevent="updatePost(dataToEdit.post._id)">
                <label>title</label><br>
                <input id="title" v-model="dataToEdit.post.title" ><br>
                <img class="card-img-top" v-bind:src="dataToEdit.post.image">
                <input type="file" name="picture" @change="addImage"><br>
                <label>your post</label><br>
                <wysiwyg v-model="dataToEdit.post.posting" />
                <button type="submit">Post</button>

            </form>
        </div>`
})


//{/* <wysiwyg v-model="text" /> */}