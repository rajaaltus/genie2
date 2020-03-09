<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12"
        sm="12"
        md="12"
      >
      </v-col>
      <v-col cols="12" md="12">
        <v-select
          v-model="publication.userProfileId"
          :items="staffs"
          item-value="id"
          item-text="firstname"
          filled
          label="Data from (Select Faculty)"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
					<v-container>
						<v-row>
							<v-col cols="12">
								<v-select
									v-model="publication.publicationTypeId"
									:items="publicationTypes"
									label="Select Publication Type"
									item-text="type"
									item-value="id"
								></v-select>
							</v-col>
							<v-col v-if="publication.publicationTypeId <= 4" cols="8">
								<v-select v-model="publication.classifcation"
									:items="classifications"
									item-text="name"
									item-value="value"
									:rules="[v => !!v || 'Item is required']"
									label="Classification"
									required
								>
								</v-select>
							</v-col>
							<v-col v-if="publication.publicationTypeId==1" cols="4">
								<v-row justify="space-around">
									<v-text-field v-model="publication.pmid"
										label="Enter PMID to fetch data"
										required
										@blur="fetchArticle"
									>
									</v-text-field>
									<v-dialog
										v-model="loaderdialog"
										hide-overlay
										persistent
										width="300"
									>
										<v-card
											color="green"
											dark
										>
											<v-card-text>
												Please stand by
												<v-progress-linear
													indeterminate
													color="white"
													class="mb-0"
												></v-progress-linear>
											</v-card-text>
										</v-card>
									</v-dialog>
								</v-row>
							</v-col>
							
							<v-col v-if="publication.publicationTypeId==1" cols="12">
								<v-autocomplete
									v-model="publication.authorNames"
									value="journalArticle.authors"
									:items="journalArticle.authors"
									item-text="name"
									chips
									label="Authors"
									full-width
									hide-details
									hide-no-data
									hide-selected
									multiple
									single-line
									@blur="composeReference()"
								></v-autocomplete>
							</v-col>
							<v-col v-if="publication.publicationTypeId>=2" cols="12">
								<v-text-field v-model="publication.authorNames"
									:rules="[v => !!v || 'Item is required']"
									label="Name of the Author(s)*"
									required
								>
								</v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field v-if="publication.publicationTypeId==1"
									v-model="journalArticle.title"
									value="journalArticle.title"
									label="Article Title"
									required
									text-val="journalArticle.title"
								>
								</v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field v-if="publication.publicationTypeId==2"
									v-model="publication.articleTitle"
									label="Title"
									required
								>
								</v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field v-if="publication.publicationTypeId==3"
									v-model="publication.bookTitle"
									label="Book Title"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId==4" cols="12">
								<v-text-field v-model="publication.chapterTitle"
								
									label="Title of the chapter"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId>4" cols="12">
								<v-text-field v-model="publication.articleTitle"
									label="Title"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId==4" cols="12">
								<v-text-field v-model="publication.editorNames"
									label="Name of the Editor"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId==1" cols="12">
								<v-text-field v-model="journalArticle.fulljournalname"
									value="journalArticle.fulljournalname"
									label="Title of Journal (With standard Abbrevation)"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId==2" cols="12">
								<v-text-field v-model="publication.journalTitle"
									label="Title of Journal (With standard Abbrevation)"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId==1" cols="6">
								<v-text-field v-model="journalArticle.epubdate"
									label="Publication Date"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId==2" cols="3">
								<v-text-field v-model="publication.publicationDate"
									label="Publication Date"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId==1" cols="3">
								<v-text-field v-model="journalArticle.volume"
									value="jouralArticle.volume"
									label="Volume / Issue No"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId==2" cols="3">
								<v-text-field v-model="publication.volumeIssueNo"
									label="Volume / Issue No"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId>2" cols="3">
								<v-text-field v-model="publication.edition"
									label="Edition"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId>2" cols="3">
								<v-text-field v-model="publication.place"
									label="Place"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId>2" cols="3">
								<v-text-field v-model="publication.publisher"
									label="Publisher"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId>2" cols="3">
								<v-text-field v-model="publication.year"
									label="Year"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId==1" cols="3">
								<v-text-field v-model="journalArticle.pages"
									value="jouralArticle.pages"
									label="Pages"
									required
								>
								</v-text-field>
							</v-col>
							<v-col v-if="publication.publicationTypeId==2" cols="3">
								<v-text-field v-model="publication.pages"
									label="Pages"
									required
								>
								</v-text-field>
							</v-col>
							<v-spacer></v-spacer>
							<v-btn class="mx-3 my-5" color="green" @click="composeReference()">
								Compose Reference
							</v-btn>
							<v-col cols="12">
								<v-textarea
									v-model="publication.reference"
									label="Reference"
									:value="publication.reference"
									placeholder="Example: Andrade C, Prasad Y, Devaraj A, Pinto EF, Shukla L. ECT and Pronounced Impairment in Spatial Cognition: The Fallacy of Drawing Conclusions From a Single Case. J ECT. 2018 Jun;34(2):75–7."
								></v-textarea>
							</v-col>
						</v-row>
					</v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn medium color="#d74f4f" dark @click="reset" class="mr-4">
        Reset
      </v-btn>
      <v-btn medium color="#57a727" dark @click="programAdd" class="mr-4">
        Submit
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
		lloading: false,
		date: false,
		valid: true,
    publication: 
		{
			annualYear: 0,
			approvalStatus: "PENDING",
			approvedBy: "",
			approvedDate: "",
			articleTitle: "",
			authorNames: "",
			bookTitle: "",
			chapterTitle: "",
			classifcation: "",
			departmentId: 0,
			edition: "",
			editorNames: "",
			journalTitle: "",
			pages: "",
			place: "",
			pmid: "",
			publicationDate: new Date().toISOString().substr(0, 10),
			publicationTypeId: 0,
			publisher: "",
			referance: "",
			reference: "",
			rejectedReason: "",
			specifyPublicationType: "",
			status: "VALID",
			userProfileId: 0,
			volumeIssueNo: "",
			year: 0
		},
		journalArticle: {
			title: "",
			fulljournalname: "",
			epubdate: "",
			volume: "",
			pages: ""
		},
    classifications: [
			{
				value: 'INTERNATION',
				name: 'International'
			 },
			 {
				value: 'NATIONAL',
				name: 'National'
			 },
			 {
				value: 'NOT_APPLICABLE',
				name: 'Not Applicable'
			 },
			 {
				value: 'OTHERS',
				name: 'Others'
			 },
		],
		publicationTypes: [
			{ id: 1,
				type: 'Journal_Article'
			},
			{
				id: 2,
				type: 'Article_for_proffessionals_in_Souvenirs_Newsletters_etc'
			},
			{
				id: 3,
				type: 'Book'
			},
			{
				id: 4,
				type: 'Book_Chapter'
			},
			{
				id: 5,
				type: 'Monograph'
			},
			{
				id: 6,
				type: 'Manual'
			},
			{
				id: 7,
				type: 'Report'
			},
			{
				id: 8,
				type: 'Article_for_General_public_or_IEC_Materials'
			}
		],
		approvals: ['PENDING', "REJECTED", 'APPROVED'],
  })
}
</script>
