<template>
    <div v-if="userRole != 1" class="bg-zinc-800 min-h-screen text-white">
        <FailedPage />
    </div>
    <div v-else class="bg-zinc-800 min-h-screen text-white">
        <NavBar />
        <b-container>
            <b-row align-h="end">                
                <b-col cols="7" xl="2" lg="4" md="4" sm="4">
                    <UserBotton class="mr-2 mt-20" />
                </b-col>
            </b-row>
        </b-container>

        <div class="mt-20">
            <b-container>
                <!-- search -->
                <div class="mb-4 flex justify-start">
                    <b-form-input v-model.lazy="searchDummyArticle" type="text" placeholder="Search Full Movie Name"
                        @keyup.enter="$fetch" @keyup.delete="clearSearch" style="max-width: 400px;"></b-form-input>
                    <b-button v-show="searchInput !== ''" class="ml-2 bg-primary" variant="" size="sm"
                        @click="clearSearch">Clear Search</b-button>
                </div>

                <b-card bg-variant="dark" border-variant="primary" class="">
                    <div class="text-2xl font-bold mb-2 ml-4">
                        {{ userData.name }}
                    </div>

                    <b-row align-h="center">
                        <b-col cols="12" xl="" lg="12" md="12 mb-4" sm="12" class="">
                            <b-container style="max-width:700px;">
                                <b-card bg-variant="dark" class="overflow-y-scroll"
                                    style="height: 470px; max-width: 700px;">
                                    <div v-if="articles == ''" class="flex justify-center">
                                        <p class="font-bold text-2xl">You currently have no articles.</p>
                                    </div>

                                    <!-- search article -->
                                    <div v-if="searchInput !== ''">
                                        <div v-for="(sa, index ) in searchedArticles" :key="index">
                                            <b-card :header="sa.articles" header-text-variant="white"
                                                header-border-variant="primary" header-bg-variant="dark"
                                                header-tag="header" tag="article" class="mb-4 px-4 text-xl break-words"
                                                style="height: auto; max-width: 700px; " bg-variant="dark"
                                                text-variant="light" border-variant="primary">
                                                <b-card-text class="text-sm break-words">Movie name: {{ sa.movie_name }}
                                                </b-card-text>
                                                <b-card-text class="text-sm">Date: {{ new
                                                        Date(sa.date).toLocaleString('en-us', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })
                                                }}</b-card-text>

                                                <div class="absolute bottom-3 right-3">
                                                    <b-dropdown size="sm" no-caret>
                                                        <template #button-content>
                                                            <b-icon icon="three-dots-vertical" variant="light"
                                                                font-scale="1">
                                                            </b-icon>
                                                        </template>
                                                        <b-dropdown-item-button variant="dark" class="px-0 text-xs"
                                                            @click="deleteArticle(sa.article_id)">
                                                            <b-icon icon="trash-fill" variant="dark" font-scale="1"
                                                                class="flex justify-end">
                                                            </b-icon>
                                                            Delete
                                                        </b-dropdown-item-button>
                                                        <b-dropdown-item-button variant="dark" class="text-xs flex"
                                                            @click="showArticleInfo(sa)">
                                                            <b-icon icon="pencil-square" variant="dark" font-scale="1"
                                                                class="flex justify-end">
                                                            </b-icon>
                                                            Edit
                                                        </b-dropdown-item-button>
                                                    </b-dropdown>
                                                </div>

                                            </b-card>
                                        </div>
                                    </div>

                                    <!-- normal article -->
                                    <div v-else>
                                        <div v-for="(a, index ) in articles" :key="index">
                                            <b-card :header="a.articles" header-text-variant="white"
                                                header-border-variant="primary" header-bg-variant="dark"
                                                header-tag="header" tag="article" class="mb-4 px-4 text-xl break-words"
                                                style="height: auto; max-width: 700px; " bg-variant="dark"
                                                text-variant="light" border-variant="primary">
                                                <b-card-text class="text-sm break-words">Movie name: {{ a.movie_name }}
                                                </b-card-text>
                                                <b-card-text class="text-sm">Date: {{ new
                                                        Date(a.date).toLocaleString('en-us', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })
                                                }}</b-card-text>

                                                <div class="absolute bottom-3 right-3">
                                                    <b-dropdown size="sm" no-caret>
                                                        <template #button-content>
                                                            <b-icon icon="three-dots-vertical" variant="light"
                                                                font-scale="1">
                                                            </b-icon>
                                                        </template>
                                                        <b-dropdown-item-button variant="dark" class="px-0 text-xs"
                                                            @click="deleteArticle(a.article_id)">
                                                            <b-icon icon="trash-fill" variant="dark" font-scale="1"
                                                                class="flex justify-end">
                                                            </b-icon>
                                                            Delete
                                                        </b-dropdown-item-button>
                                                        <b-dropdown-item-button variant="dark" class="text-xs flex"
                                                            @click="showArticleInfo(a)">
                                                            <b-icon icon="pencil-square" variant="dark" font-scale="1"
                                                                class="flex justify-end">
                                                            </b-icon>
                                                            Edit
                                                        </b-dropdown-item-button>
                                                    </b-dropdown>
                                                </div>

                                            </b-card>
                                        </div>
                                    </div>


                                </b-card>
                            </b-container>
                        </b-col>

                        <b-col class="mb-4" cols="12" xl="" lg="12" md="12" sm="12">
                            <b-container style="max-width: 700px;">
                                <b-card bg-variant="dark" class="pb-4">
                                    <b-form @submit.prevent="onSubmit" @reset="onReset">
                                        <b-form-group id="input_group_1" label="Article:" label-for="input_1">
                                            <b-form-textarea id="input_1" v-model="form.title" type="text"
                                                placeholder="" :state="validateState('title')"
                                                aria-describedby="feedback_1" rows="8">
                                            </b-form-textarea>
                                            <b-form-invalid-feedback id="feedback_1">This is a required field.
                                            </b-form-invalid-feedback>
                                        </b-form-group>

                                        <div>
                                            <div class="absolute bottom-3 left-5">
                                                <b-button type="submit" variant="primary"
                                                    @click="showDismissibleAlert = true">Submit
                                                </b-button>
                                                <b-button type="reset" variant="danger">Reset</b-button>
                                            </div>
                                        </div>

                                    </b-form>
                                </b-card>
                                <!-- <div>
                                    <b-card class="mt-3" header="Form Data Result">
                                        <pre class="m-0">{{ form }}</pre>
                                    </b-card>
                                </div> -->
                            </b-container>
                        </b-col>
                    </b-row>
                </b-card>
            </b-container>
        </div>


    </div>
</template>

<script>
import axios from "axios"
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import swal from 'sweetalert2/dist/sweetalert2.js';
import NavBar from '@/components/nav_bar.vue'
import UserBotton from '@/components/user_botton.vue';
import FailedPage from '@/components/failed_page.vue';

export default {
    name: 'userDataPage',
    components: {
        NavBar,
        UserBotton,
        FailedPage
    },
    mixins: [validationMixin],
    data() {
        return {
            articles: [],
            form: {
                title: ''
            },
            userData: '',
            userRole: '',
            editArticleID: '',
            searchDummyArticle: '',
            searchInput: '',
            searchedArticles: [],
            // url: 'http://localhost:3000'
            url: 'https://backend-final.azurewebsites.net'
        }
    },
    validations: {
        form: {
            title: {
                required,
                maxLength: maxLength(1000)
            }
        }
    },
    async created() {
        console.log('RedirectUserData1!')

        await this.getSingleUser()
        console.log('UserRole:')
        console.log(this.userRole)
        if (this.userRole != 1) {
            this.$router.push({ name: 'index' })
            console.log('RedirectUserData2!')
            setTimeout(() => {
                swal.fire({
                    title: 'You need to log in first!',
                    // text: 'Do you want to continue',
                    icon: 'warning',
                    confirmButtonText: 'Done',
                    confirmButtonColor: '#007bff'
                })
            }, 1000);
        }
        else {
            await this.getSingleArticle()
        }
    },

    async fetch() {
        if (this.searchDummyArticle === '') {
            await this.getSingleArticle()
            //   await this.getUserRank();
        } else {
            await this.searchArticle()
            //   await this.getUserRank();
        }
    },
    methods: {
        validateState(title) {
            const { $dirty, $error } = this.$v.form[title];
            return $dirty ? !$error : null;
        },
        // GET
        async getSingleUser() {
            try {
                const res = await fetch(this.url + "/getsingleuser", {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    withCredentials: true,
                    credentials: 'include'
                })
                const getuserdata = await res.json()
                this.userData = getuserdata.data

                console.log('userData_page name:')
                console.log(this.userData)
                this.userRole = getuserdata.data.role
            }
            catch (error) {
                console.log(`get user failed: ${error}`)
            }
        },

        async getSingleArticle() {
            try {
                const res = await fetch(this.url + "/getarticleowner", {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    credentials: 'include'
                })
                const getuserdata = await res.json()
                this.articles = getuserdata
                console.log('Userdata:')
                console.log(this.articles)
            }
            catch (error) {
                console.log(`get articleowner failed: ${error}`)
            }
        },

        async searchArticle() {
            this.searchInput = this.searchDummyArticle
            const data = axios.get(`${this.url}/getarticlebymoviename/${this.searchInput}`, { withCredentials: true })
            const result = await data
            console.log('SearchArticle2:')
            console.log(result.data.data)
            result.data.data.forEach((searchArticle) => {
                this.searchedArticles.push(searchArticle)
                console.log('SearchArticles3:')
                console.log(this.searchedArticles)
            })
        },

        clearSearch() {
            this.searchDummyArticle = ''
            this.searchInput = ''
            this.searchedArticles = []
        },


        // EDIT
        showArticleInfo(articleInfo) {
            this.editArticleID = articleInfo.article_id
            this.form.title = articleInfo.articles
        },
        async onSubmit() {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }
            try {
                await fetch(this.url + "/editarticle1", {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        article_id: this.editArticleID,
                        articles: this.form.title
                    }),
                })
                this.clearSearch()
                await this.getSingleArticle()
                console.log('Reloaddata:')

                swal.fire({
                    title: 'Submit Success!',
                    // text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Done',
                    confirmButtonColor: '#007bff'
                })

                this.editArticleID = ''
                this.form.title = ''
                this.$nextTick(() => {
                    this.$v.$reset();
                });
            }
            catch (error) {
                console.log(`EditArticle False!!! ${error}`)
                swal.fire({
                    title: 'Submit Error!',
                    // text: '${error}',
                    icon: 'error',
                    confirmButtonText: 'Cancel',
                    confirmButtonColor: '#007bff'
                })
            }
        },

        // DELETE
        async deleteArticle(articleId) {
            console.log("Delete ID")
            console.log(articleId)
            try {
                await fetch(`${this.url}/deletearticle/${articleId}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })

                const res = await fetch(this.url + "/getarticleowner", {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    credentials: 'include'
                })
                const getuserdata = await res.json()
                this.articles = getuserdata
            }
            catch (error) {
                console.log(`delete failed: ${error}`)
            }
        },

        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.editArticleID = ''
            this.form.title = ''
            // Trick to reset/clear native browser form validation state
            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
    }
}

</script>