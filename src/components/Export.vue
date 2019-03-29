<template>
	<div>
		<download-excel
				:data="tableData.json_data"
				:fields = "tableData.json_fields"
				class="export-button"
		>
			<el-button type="primary" plain>导出Excel</el-button>
		</download-excel>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: {
					json_fields: {
						'Complete name': 'name',
						'City': 'city',
						'country': 'country',
						'Telephone': 'phone.mobile',
						'Telephone 2' : {
							field: 'phone.landline',
							callback: (value) => {
								return `Landline Phone - ${value}`;
							}
						},
					},
					json_data: [
						{
							'name': 'Tony Peña',
							'city': 'New York',
							'country': '\'15538114551718070',
							'birthdate': '1978-03-15',
							'phone': {
								'mobile': '1-541-754-3010',
								'landline': '(541) 754-3010'
							}
						},
						{
							'name': 'Thessaloniki',
							'city': 'Athens',
							'country': 'Greece',
							'birthdate': '1987-11-23',
							'phone': {
								'mobile': '+1 855 275 5071',
								'landline': '(2741) 2621-244'
							}
						}
					],
					json_meta: [
						[
							{
								'key': 'charset',
								'value': 'utf-8'
							}
						]
					],
				}
			}
		}
	}
</script>

<style></style>