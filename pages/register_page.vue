<template>
    <div class="bg-zinc-800 min-h-screen text-white">
        <NavBar />
        <b-container fluid>
            <div class="pt-20">
                <registerForm @register-user="confirmRegis"></registerForm>
            </div>
        </b-container>
    </div>
</template>

<script>
import swal from 'sweetalert2/dist/sweetalert2.js'
import NavBar from '@/components/nav_bar.vue'
import registerForm from '@/components/register_form.vue'

export default {
    name: 'RegisterPage',
    components: {
        NavBar,
        registerForm
    },
    emits: ['register-user'],
    data() {
        return {
            userList: [],
            // url: 'http://localhost:3000'
            url: 'https://backend-final.azurewebsites.net'
        }
    },
    async created() {
        this.userList = await this.getAllUser();
        console.log('userList')
        console.log(this.userList)
    },

    methods: {
        // CONFIRM
        async confirmRegis(registerData) {
            await this.reloadUser();
            console.log('registerData_page')
            console.log(registerData)
            swal.fire({
                title: 'Are you sure?',
                // text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#dc2626',
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.registerUser(registerData)
                }
            })
        },

        // GET
        async getAllUser() {
            try {
                const res = await fetch(this.url + "/getalluser", {
                    credentials: 'include'
                })
                const getuserdata = await res.json()
                return getuserdata
            }
            catch (error) {
                console.log(`get user failed: ${error}`)
            }
        },

        async reloadUser() {
            this.userList = await this.getAllUser()
        },

        // POST
        async registerUser(registerData) {
            console.log('regisdata2')
            console.log(registerData)
            try {
                const res = await fetch(this.url + "/adduser", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        name: registerData.userName,
                        alias: registerData.penname,
                        emailaddress: registerData.emailAddress,
                        password: registerData.password,
                        DOB: registerData.dob
                    })
                })

                const resdata = await res.json()
                if (resdata.data == 1) {
                    swal.fire({
                        title: 'Registered!',
                        text: 'Your has been registered.',
                        icon: 'success',
                        // confirmButtonColor: '#007bff',
                        // confirmButtonText: 'Done',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    setTimeout(() => { this.$router.push('/login_page') }, 2000);
                } else if (resdata.data == 2) {
                    swal.fire({
                        title: 'Register Failed!',
                        text: 'You must be 15 years old to register.',
                        icon: 'error',
                        confirmButtonColor: '#dc2626',
                        confirmButtonText: 'Cancel',
                    })
                } else if (resdata.data == 0) {
                    swal.fire({
                        title: 'Register Failed!',
                        text: 'Your Email has been used.',
                        icon: 'error',
                        confirmButtonColor: '#dc2626',
                        confirmButtonText: 'Cancel',
                    })
                } else {
                    swal.fire({
                        title: 'Register Failed!',
                        text: 'Your Username has been used.',
                        icon: 'error',
                        confirmButtonColor: '#dc2626',
                        confirmButtonText: 'Cancel',
                    })
                }
            }
            catch (error) {
                console.log(`addUserFalse!!! ${error}`)
            }
        }
    },


}


</script>