<template>
	<v-app>
      <v-dialog v-model="Ydialog" persistent max-width="30%">
					<v-card>
						<v-card-title>
							<span class="headline">Select Reporting Year</span>
						</v-card-title>
						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="4">
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
			<v-container>
							<v-select
								v-model="selectedYear"
								:items="reportYears"
								item-text="val"
								item-value="id"
								label="Reporing Year"
								required
								@input="changeReportingYear"
							></v-select>
				
			
					<p class="uk-article">
						<span class="frm-title">A. Introduction (in about 150 words); specifically indicate the recognition / contribution of the Department during the year to policies, planning and programmes at State / National and International levels.</span>
					</p>
					<div>
						<client-only>
							<ckeditor v-model="departmentAbout.introduction" :editor="editor" :config="editorConfig"></ckeditor>
						</client-only>
					</div>
		

				<div>
					<p>
						<span class="frm-title">B. New facilities developed, new initiatives taken up by the Department(s) within NIMHANS during the year.</span>
					</p>
					<div>
						<client-only>
							<ckeditor v-model="departmentAbout.facilities" :editor="editor" :config="editorConfig"></ckeditor>
						</client-only>
					</div>
				</div>

				<v-btn @click="addProfile">
					Submit
				</v-btn>
					
	</v-container>
	</v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Swal from 'sweetalert2'
if(process.client) {
	require('~/plugins/ckeditor');
}
export default {
	name: 'DepartmentAbout',
	data: () => ({		
		Ydialog: false,
		editorConfig: {},
		selectedYear: 0,		
		departmentAbout: 
		{			
			annualYear: 0,			
			departmentId: 0,
			status: "VALID",
			introduction: "",
			facilities: ""
		},
		editedItem: 
		{			
			annualYear: 0,			
			departmentId: 0,
			status: "VALID",
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
		aboutImages: []
	}),
	computed: {
		// ...mapState("depabout", ["aboutData", "deptImages", "deptImageContents", "addedImageId", "departmentProfileId"]),	
		// ...mapState({
		// 	aboutData: state => state.depabout.aboutData
		// }),	
		editor () {
			return process.client ? require('@ckeditor/ckeditor5-build-classic') : null
		},
	
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
		// let id = store.state.auth.user.id
		// await store.dispatch('user/setUserProfile', {id: id})
		// 	.catch(err => {
		// 		this.snackbar = true
		// 		this.submitMessage = err
		// 	});
		// let deptId = store.state.user.userProfile.result.departmentId;
		// let userId = store.state.user.userProfile.result.userId;		
		// this.selectedYear = store.state.selectedYear;
		// let queryString = ''
		// console.log(deptId);

		// queryString = `departmentId.equals=${deptId}`;
		// console.log(queryString);
		// await store.dispatch('depabout/setAboutData', {query: queryString});
		// queryString = `departmentProfileId.equals=${deptId}`
		// await store.dispatch('depabout/getAllDepartmentImages', {query: queryString});
		
	},	
	mounted () {
		// if (this.$store.state.selectedYear == 0)
		// 	this.Ydialog = true;
		// else
		// 	this.selectedYear = this.$store.state.selectedYear

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
.uk-grid-grey {
  margin-top: 0 !important;
  background: none !important;
  box-shadow: none !important;
}
.ck.ck-toolbar {
  background: none !important;
  border-radius: 0.4em 0.4em 0 0 !important;
}

</style>
