<template>
<v-app>
<v-content>
<div class="backdrop">
	<div class="dark-overlay">
		<v-container
			fluid
			class="fill-height"
		>
			<v-row
				align="center"
				justify="center"
			>
				<v-col
					cols="12"
					sm="8"
					md="4"
				>
					<v-card v-if="!registerForm" 
						tile 
						color="rgba(255,255,255,0.6)"
					>
						<v-toolbar
							flat
							tile
							color="rgba(255,255,255,0.1)"
						>	
						<v-toolbar-title><img src="/text-logo.png" alt="" width="100%" class="pt-2"></v-toolbar-title>
						</v-toolbar>
						
						<v-card-text >
							<v-form ref="login">
								<v-text-field
									dense
									outlined
									v-model="loginData.login"
									label="Email / Employee Id / Student Id"
									type="text"
									color="success"
								/>

								<v-text-field
									dense
									outlined
									id="password"
									v-model="loginData.password"
									:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
									:type="show1 ? 'text' : 'password'"
									label="Password"
									name="password"
									color="success"
									
									@click:append="show1 = !show1"
								/>
							</v-form>
						</v-card-text>
						<v-card-actions>
								<v-col cols="8">
									<v-btn color="primary" small text  @click="gotoRegister">
										Create Account
									</v-btn>
								</v-col>
								<v-col cols="4">
									<v-btn color="success" small class="float-right" @click="signIn">
										Login
									</v-btn>
								</v-col>	
						</v-card-actions>
					</v-card>
				
					<!-- register Form -->
					<!-- <pre>{{ register }}</pre> -->
					<v-card v-if="registerForm" 
						tile 
						color="rgba(255,255,255,0.6)"
					>
						<v-toolbar
							flat
							tile
							color="rgba(255,255,255,0.1)"
						>	
						<v-toolbar-title><img src="/text-logo.png" alt="" width="100%" class="pt-2"></v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-form ref="registerForm" lazy-validation @submit.prevent>
								<v-select
									dense
									outlined
									v-model="authorities"
									:rules="[v => !!v || 'Item is required']"
									label="Select Role*"
									:items="roles"
									item-text="text"
									item-value="value"
									
									color="success"
								>
								</v-select>
								<v-row>
									<v-col cols="6">
										<v-text-field
											dense
											outlined
											v-model="register.firstName"
											:rules="[v => !!v || 'First Name is required']"
											label="First Name"
											type="text"
											color="success"
											
										/>
									</v-col>
									<v-col cols="6">
										<v-text-field
											dense
											outlined
											v-model="register.lastName"
											:rules="[v => !!v || 'Last Name is required']"
											label="Last Name"
											type="text"
											color="success"
											
										/>
									</v-col>
								</v-row>
								<v-text-field
									outlined
									v-model="register.email"
									:rules="[
										v => !!v || 'E-mail is required',
										v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
									label="Email Address"
									placeholder="Also your primary Login ID"
									type="email"
									color="success"
									
								/>
								<v-text-field
									outlined
									v-model="register.login"
									:rules="[v => !!v || 'Employee Id is required']"
									label="Login ID (Employee / Student ID)"
									placeholder="Also your alternative Login ID"
									type="text"
									color="success"
									
								/>
								<v-text-field
									dense
									outlined
									v-model="register.password"
									:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
									:type="show1 ? 'text' : 'password'"
									label="Password"
									color="success"
									
									@click:append="show1 = !show1"
								/>
								
							</v-form>
						</v-card-text>
						<v-card-actions>
								<v-col cols="8">
									<v-btn color="primary" small text  @click="loginForm">
										Login
									</v-btn>
								</v-col>
								<v-col cols="4">
									<v-btn color="success" small class="float-right" @click="registerMe">
										Create Account
									</v-btn>
								</v-col>	
						</v-card-actions>
						
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</div>
</v-content>
</v-app>
</template>

<script>
import Swal from 'sweetalert2'
export default {
head () {
return {
'title': 'ARMS Admin Login Page'
}
},
data: () => ({
show1: false,
password: 'Password',
registerForm: false,
loginData: {
login: '',
password: ''
},
registerData: {
name: '',
email: '',
password: ''
},
recoverPassEmail: '',
roles: [
{
	text: 'Faculty / Staff',
	value: 'ROLE_FACULTY'
},
{
	text: 'Student',
	value: 'ROLE_STUDENT'
}
], 
authorities: '',
register: 
{
login: "",
firstName: "",
lastName: "",
email: "",
imageUrl: "",
activated: false,
langKey: "en",
createdBy: "",
createdDate: "",
lastModifiedBy: "",
lastModifiedDate: "",
authorities: [
	""
]
}
}),
methods: {
async signIn () {
await this.$auth.loginWith("local", {
	data: {
		identifier: this.loginData.login,
		password: this.loginData.password,
		rememberMe: true
	}
})
	.then(data => {
		this.$router.push('/admin');
	})
	.catch(err => {
		Swal.fire(
			'Bad Credentials!',
			"You can either login with Employee/Student ID or Registered Email ID. Please check the password you've entered",
			'error'
		);
		this.resetLogin();
	});
},
async registerMe () {
if (this.$refs.registerForm.validate()) {
	this.register.authorities[0] = this.authorities;
	var payload = this.register;
	
	await this.$axios.$post('/register', payload)
		.then(resp => {
			Swal.fire(
				'Successfully Registered your Account.',
				'Your Department has to Approve your Registration.',
				'info'
			)
			this.reset();
			this.loginForm();
		})
		.catch(err => {
			if (err.response.data.errorKey==='userexists')
				Swal.fire('The Registered Login ID is already in use');
			else if (err.response.data.errorKey==='emailexists')
				Swal.fire('The Registered Email ID is already in use');
			else
				Swal.fire('Something Wrong! Please try again.');
			this.reset();
		});

}
},

reset () {
this.$refs.registerForm.reset()
},
resetLogin () {
this.$refs.login.reset()
},
gotoRegister () {
this.show1 = false;
this.registerForm = true;
},
loginForm () {
this.show1 = false;
this.registerForm = false;
}
}
}
</script>


<style scoped>

.backdrop {
background-image: url('/dashboard_back.jpg');
background-size: cover;
background-position: center center;
width: 100vw;
height: 100%;
vertical-align: middle;

}
.dark-overlay {
width: 100vw;
height: 100vh !important;
vertical-align: middle;
overflow: hidden;
}

.text-input-style
{
	border: none;
}

</style>