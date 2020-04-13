<template>
  <v-list color="#f2f2f2">
    <v-list-item-group color="success">
      <v-list-item
        v-for="(item, i) in pcActivities"
        :key="i"
        :to="item.path"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    pcActivities: [	
			{
				id: 1,
				title: 'Clinical Servies',
				count: 12,
				icon: 'mdi-hotel',
				path: '/admin/departments/pcActivities/clinical',
			},
			{
				id: 2,
				title: 'Emergency Services',
				count: 5,
				icon: 'mdi-clipboard-list',
				path: '/admin/departments/pcActivities/emergency',
			},
			{
				id: 3,
				title: 'Diagnostic Services',
				count: 8,
				icon: 'mdi-clipboard-list',
				path: '/admin/departments/pcActivities/diagnostic',
			},
			{
				id: 4,
				title: 'Clinical Procedures',
				count: 14,
				icon: 'mdi-clipboard-list',
				path: '/admin/departments/pcActivities/special',
			},
			{
				id: 5,
				title: 'OT & Other Services',
				count: 12,
				icon: 'mdi-clipboard-list',
				path: '/admin/departments/pcActivities/otservice',
			}
		],
  })
}
</script>
<style scoped>
.disp
{
  font-size: 15px;
  font-weight: normal;
}
</style>
