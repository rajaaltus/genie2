<template>
	<v-app>
		<!-- Year POPUP DIALOG -->
		<v-dialog v-model="Ydialog" persistent max-width="30%">
			<v-card>
				<v-card-title>
					<span class="headline">Select Reporting Year</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-spacer></v-spacer>
							<v-col cols="12">
								<v-select
									v-model="selectedYear"
									:items="reportYears"
									item-text="val"
									item-value="id"
									label="Reporing Year"
									required
									class="text-center"
								></v-select>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue" text @click="Ydialog = false">
						Close
					</v-btn>
					<v-btn color="blue" text @click="setReportingYear">
						Set
					</v-btn>
				</v-card-actions>
			</v-card>
			</v-dialog>
			<!-- Year Dialog ends here -->

			<v-container>
				<PageHeader :title="$metaInfo.title" :reportYears="reportYears" :selectedYear="$store.state.selectedYear" /> 
			
				<p class="mb-3">
					<span >A. Introduction: Specifically indicate the recognition / contribution of the Department during the year to policies, planning and programmes at State / National and International levels.</span>
				</p>
				<div>
					<client-only>
						<ckeditor v-model="departmentAbout.introduction" :editor="editor" :config="editorConfig"></ckeditor>
					</client-only>
				</div>
				<div>
					<p class="mt-3">
						<span>B. New facilities developed, new initiatives taken up by the Department(s) within NIMHANS during the year.</span>
					</p>
					<div>
						<client-only>
							<ckeditor v-model="departmentAbout.facilities" :editor="editor" :config="editorConfig"></ckeditor>
						</client-only>
					</div>
				</div>
				<v-row>
					<v-spacer></v-spacer>
					<v-btn @click="addProfile" color="success" class="ma-3">
						Submit
					</v-btn>
				</v-row>
			</v-container>
				<v-container>
				<v-row class="mx-3 mb-4">
				<span class="theme-border"><h1 class="ml-3">Related Images</h1></span>
				</v-row>
				
				<v-row class="center my-2 mx-1" justify="space-between">
				<v-img
					src="https://picsum.photos/id/11/100/60"
					lazy-src="https://picsum.photos/id/11/100/60"
					aspect-ratio="1"
					class="grey lighten-2"
					max-width="500"
					max-height="300"
				>
					<template v-slot:placeholder>
						<v-row
							class="fill-height ma-0"							
							justify="center"
						>
							<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
						</v-row>
					</template>
				</v-img>
				<v-img
					src="https://picsum.photos/id/11/100/60"
					lazy-src="https://picsum.photos/id/11/100/60"
					aspect-ratio="1"
					class="grey lighten-2"
					max-width="500"
					max-height="300"
				>
					<template v-slot:placeholder>
						<v-row
							class="fill-height ma-0"							
							justify="center"
						>
							<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
						</v-row>
					</template>
				</v-img>
				<v-img
					src="https://picsum.photos/id/11/100/60"
					lazy-src="https://picsum.photos/id/11/100/60"
					aspect-ratio="1"
					class="grey lighten-2"
					max-width="500"
					max-height="300"
				>
					<template v-slot:placeholder>
						<v-row
							class="fill-height ma-0"							
							justify="center"
						>
							<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
						</v-row>
					</template>
				</v-img>
				</v-row>
				<v-row class="center my-2 mx-1" justify="space-between">
					<v-col cols="12" md=6 sm=4 lg=3>
					<v-file-input
						:rules="rules"
						accept="image/png, image/jpeg, image/bmp"
						placeholder="Pick an avatar"
						prepend-icon="mdi-camera"
						label="Avatar"
						v-model="chosenFile"
  					></v-file-input>
					  <v-btn color="primary" right @click="onFileChange">Upload</v-btn>
						</v-col>
						<v-col cols="12" md=6 sm=4 lg=3>
						<v-file-input
						:rules="rules"
						accept="image/png, image/jpeg, image/bmp"
						placeholder="Pick an avatar"
						prepend-icon="mdi-camera"
						label="Avatar"
  					></v-file-input>
						</v-col>
						<v-col cols="12" md=6 sm=4 lg=3>
						<v-file-input
						:rules="rules"
						accept="image/png, image/jpeg, image/bmp"
						placeholder="Pick an avatar"
						prepend-icon="mdi-camera"
						label="Avatar"
  					></v-file-input>
						</v-col>
				</v-row>
			</v-container>
	</v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import PageHeader from '@/components/PageHeader'
import Swal from 'sweetalert2'
if(process.client) {
	require('~/plugins/ckeditor');
}
export default {
	head() {
    return {
      title: 'About the Department'
    }
	}, 
	components: {
		PageHeader
	},
	data: () => ({		
		rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
		Ydialog: false,
		editorConfig: { height: '400px' },
		selectedYear: 0,				
		chosenFile: null,
		departmentAbout: 
		{			
			annual_year: 0,			
			department_id: 0,
			id: 0,
			status: "published",
			introduction: "",
			facilities: "",
			image_1: 0,
			image_2: 0,
			image_3: 0
		},
		editedItem: 
		{			
			annual_year: 0,			
			department_id: 0,
			id: 0,
			status: "published",
			introduction: "",
			facilities: ""            
		},
		file: '',
		addDepartmentImage:
		{
			departmentProfileId: 0,			
			imageCode: "",
			name: "",
			path: "",
			status: "VALID"
		},
		addImageContent:
		{
			data: "",
			dataContentType: "",
			departmentImageId: 0,						
			status: "VALID"
		},
		reportYears: [
			{
				id: 2017,
				val: '2017-2018',
			},
			{
				id: 2018,
				val: '2018-2019'
			},
			{
				id: 2019,
				val: '2019-2020'
			},
			{
				id: 2020,
				val: '2020-2021'
			}
		],
		selectedYear: 0,
		aboutImages: [],
		user_id: 0,
		user_department_id: 0
	}),
	computed: {
		// ...mapState("depabout", ["aboutData", "deptImages", "deptImageContents", "addedImageId", "departmentProfileId"]),	
		// ...mapState({
		// 	aboutData: state => state.depabout.aboutData
		// }),	
		editor () {
			return process.client ? require('@ckeditor/ckeditor5-build-classic') : null
		},
		// // eslint-disable-next-line vue/return-in-computed-property
		// introductionText () {
		// 	return this.aboutData.result.introduction;
		// },
		// // eslint-disable-next-line vue/return-in-computed-property
		// facilitiesText () {
		// 	return this.aboutData.result.facilities;
		// },	
		// deptId () {
		// 	return this.aboutData.result.departmentId;
		// },
		// deptProfileId () {
		// 	return this.departmentProfileId;
		// },		
		uniqueID () {
			let id = "";
			const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
			const _length = 8;
			for (let i = 0; i < _length; i++) {
				id += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return id;
		}
	},
	async fetch ({store}) {
		let id = 1;
		console.log(id);
		// await store.dispatch('user/setUserProfile', {id: id})
		// 	.catch(err => {
		// 		this.snackbar = true
		// 		this.submitMessage = err
		// 	});
		// let deptId = store.state.user.userProfile.result.departmentId;
		// let userId = store.state.user.userProfile.result.userId;		
		// this.selectedYear = store.state.selectedYear;
		let queryString = ''
		//console.log(deptId);

		queryString = `filter[department_id]=${id}`;
		console.log(queryString);
		// await store.dispatch('depabout/getDeptProfileData', {query: queryString});
		// queryString = `departmentProfileId.equals=${deptId}`
		// await store.dispatch('depabout/getAllDepartmentImages', {query: queryString});
		
	},	
	mounted () {
		if (this.$store.state.selectedYear == 0)
			this.Ydialog = true;
		else
			this.selectedYear = this.$store.state.selectedYear
		console.log(this.selectedYear);
		
		if(this.$store.state.auth.loggedIn)
			this.user_id = this.$store.state.auth.user.id;
		//console.log(this.user_id);
		// console.log(this.$store.state.depabout.aboutData.result);
		// this.departmentAbout = Object.assign({}, this.$store.state.depabout.aboutData.result[0]);
		
	},
	methods: {
		async addProfile () {
			if (this.aboutData.success) {
				this.departmentAbout.id = this.$store.state.depabout.aboutData.result[0].id;
				var payload = this.departmentAbout;
				// console.log(payload);
				await this.$store.dispatch('depabout/updateAbout', payload)
					.then(resp => {
						Swal.fire({
							
							title: 'Success',
							text: 'Department Profile Added!',
							type: 'success',
							showConfirmButton: false,
							timer: 1500
						})
						this.reload();
					})
					.catch(err => {
						console.log(err);
					})
			} else {
				this.departmentAbout.id = null;
				this.departmentAbout.annualYear = this.selectedYear;
				this.departmentAbout.departmentId = this.$store.state.user.userProfile.result.departmentId;
				var payload = this.departmentAbout;
				// console.log(payload);
				await this.$store.dispatch('depabout/addProfile', payload)
					.then(resp => {
						Swal.fire({
							
							title: 'Success',
							text: 'Profile Added!',
							type: 'success',
							showConfirmButton: false,
							timer: 1500
						})
						this.reload();
					})
					.catch(err => {
						console.log(err);
					})
			}
		},
		reload () {
			let deptId = this.$store.state.user.userProfile.result.departmentId;
			let queryString = '';
			 queryString = `departmentId.equals=${deptId}`;
			  this.$store.dispatch('depabout/setAboutData', {query: queryString});
		},
		async changeReportingYear () {
			await this.$store.dispatch('setReportingYear', this.selectedYear)
		},
		async setReportingYear () {
			this.Ydialog = false;
			await this.$store.dispatch('setReportingYear', this.selectedYear)
			console.log(this.selectedYear)
		},
		handleFileUpload () {
			this.file = this.$refs.file.files[0];
		},
		onFileChange() {
			let formData = new FormData();
            if(this.chosenFile){
				//console.log(this.chosenFile.name);				
				formData.append("file", this.chosenFile);
				//console.log(formData);
				var query = {
					deptProfileId: 1,
					data: formData      
				};
				console.log(query);
				this.$store.dispatch("depabout/addDeptProfileImage", query);
			}
        },
		async submitFile () {		
			var fileName = this.file.name;			
			var imageCode = this.uniqueID;
			var status = "VALID";
			var imageContentType = "";
			var blob = this.file;
			//console.log(this.deptProfileId);
			imageContentType = blob.type;	
			var dpId = 0;
			dpId = this.deptProfileId;
			//console.log(dpId);

			this.addDepartmentImage.departmentProfileId = dpId;
			this.addDepartmentImage.imageCode = imageCode;
			this.addDepartmentImage.name = fileName;
			this.addDepartmentImage.path = fileName;
			var payload = this.addDepartmentImage;
			var imageData = null;
			var array = null;
			var binaryString = null;
			var fileByteArray = [];

			var reader = new FileReader();
			reader.readAsArrayBuffer(this.file);			
			reader.onloadend = function (evt) {
				if (evt.target.readyState == FileReader.DONE) {
					var arrayBuffer = evt.target.result,
						array = new Uint8Array(arrayBuffer);
					for (var i = 0; i < array.length; i++) {
						fileByteArray.push(array[i]);
					}
				}		
			};		
			
			//console.log(fileByteArray);
			if(fileByteArray) {
				
				console.log(payload);
				await this.$store.dispatch('depabout/addDeptImage', payload);
					 					
				this.addImageContent.data = fileByteArray;
				this.addImageContent.dataContentType = imageContentType;
				this.addImageContent.departmentImageId = this.$store.state.depabout.addedImageId;
				payload = this.addImageContent;
				console.log(payload);
				
			 	await this.$store.dispatch('depabout/addDeptImageContent', payload)
					.then(resp => {
						console.log(resp);
						console.log(resp.id);							
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		
	}
}
</script>

<style>
.page-title {
  background: none;
  border-left: 10px #57A727 solid;
  display: inline-flex;
  line-height: 0em;
  height: 40px;
  vertical-align: center !important;
}

.ck.ck-toolbar {
  background: none !important;
  border-radius: 0.4em 0.4em 0 0 !important;
}
.ck.ck-editor__main>.ck-editor__editable {
	min-height: 350px;
}

</style>
