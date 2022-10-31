<template>
	<div class="lowpower-body">
		<!-- hey, this is lowpower page -->
		<!-- test change -->
		<div class="lowpower-head">
			<span>车辆列表</span>
			<h2>低电量车列表</h2>
		</div>
		<div class="lowpower-content">
			<div class="lowpower-content-ability-a">
				<span>公司:</span>
				<el-select v-model="value" placeholder="Select">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
						:disabled="item.disabled" />
				</el-select>
				<el-button type="primary" :icon="Search">查询</el-button>
				<el-button :icon="Delete">重置</el-button>
			</div>
			<div class="lowpower-content-ability-b">
				<el-button :icon="Share">导出</el-button>
				<el-button :icon="Edit">设置</el-button>
			</div>
			<div class="lowpower-content-list" style="height: 500px">
				<el-auto-resizer>
					<template #default="{ height, width }">
						<el-table-v2 :columns="columns" :data="data" :width="width" :height="height" fixed />
					</template>
				</el-auto-resizer>
			</div>
		</div>
	</div>
</template>
<script lang="tsx" setup>
	import {
		ref
	} from 'vue'
	import {
		Search,
		Delete,
		Edit,
		Share,
		Timer
	} from '@element-plus/icons-vue'
	import dayjs from 'dayjs'
	import {
		ElButton,
		ElIcon,
		ElTag,
		ElTooltip,
		ElCheckTag,
		TableV2FixedDir
	} from 'element-plus'

	import type {
		Column
	} from 'element-plus'

	import axios from 'axios'


	const setRouter = function(router: string) {
		this.$router.push(`/${router}`)
	}
	const mockTest = function() {
		axios.get("/api/getLowPowerCarList")
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			});
	}


	mockTest();

	const value = ref('')
	const options = [{
			value: 'Option1',
			label: 'Option1',
		},
		{
			value: 'Option2',
			label: 'Option2',
			disabled: true,
		},
		{
			value: 'Option3',
			label: 'Option3',
		},
		{
			value: 'Option4',
			label: 'Option4',
		},
		{
			value: 'Option5',
			label: 'Option5',
		},
	]
	let id = 0

	const dataGenerator = () => ({
		model: '万象-786',
		route: '1路',
		number: '浙A 88888',
		time: '2002/10/20',
		power: '100%',
		state: '正常',
		theoRange: '900公里',
		todayRange: '5公里',
		plate: 'CL-507',
	})

	const columns: Column < any > [] = [{
			key: 'plate',
			title: '车辆自编号',
			dataKey: 'plate',
			width: 150,
			align: 'center',
			cellRenderer: ({
				cellData: plate
			}) => <> 
				<ElCheckTag checked style = "margin-right: 8px" >
				plate </ElCheckTag>
			</>,
		},
		{
			key: 'model',
			title: '型号',
			dataKey: 'model',
			width: 150,
			align: 'center',
			cellRenderer: ({
				cellData: model
			}) => <> {
				model
			} </>,
		},
		{
			key: 'route',
			title: '线路',
			dataKey: 'route',
			width: 50,
			align: 'center',
			cellRenderer: ({
				cellData: route
			}) => <> {
				route
			} </>,
		},
		{
			key: 'number',
			title: '车牌号',
			dataKey: 'number',
			width: 150,
			align: 'center',
			cellRenderer: ({
				cellData: number
			}) => <> {
				number
			} </>,
		},
		{
			key: 'time',
			title: '车辆启动时间',
			dataKey: 'time',
			width: 150,
			align: 'center',
			cellRenderer: ({
				cellData: time
			}) => <> {
				time
			} </>,
		},
		{
			key: 'power',
			title: '剩余电量',
			dataKey: 'power',
			width: 50,
			align: 'center',
			cellRenderer: ({
				cellData: power
			}) => <> {
				power
			} </>,
		},
		{
			key: 'state',
			title: '状态',
			dataKey: 'state',
			width: 70,
			align: 'center',
			cellRenderer: ({
				cellData: state
			}) => <> {
				state
			} </>,
		},
		{
			key: 'theoRange',
			title: '理论续航里程',
			dataKey: 'theoRange',
			width: 120,
			align: 'center',
			cellRenderer: ({
				cellData: theoRange
			}) => <> {
				theoRange
			} </>,
		},
		{
			key: 'todayRange',
			title: '当日行驶里程',
			dataKey: 'todayRange',
			width: 120,
			align: 'center',
			cellRenderer: ({
				cellData: todayRange
			}) => <> {
				todayRange
			} </>,
		},
		{
			key: 'check',
			title: '操作',
			cellRenderer: () => ( <>
				<ElButton size = "small"
				type = "success" >
				充电记录 </ElButton>  </>
			),
			width: 150,
			align: 'center',
		},
	]

	const data = ref(Array.from({
		length: 30
	}).map(dataGenerator))
</script>

<style scoped>
	.lowpower-body {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.lowpower-head {
		width: 100%;
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.lowpower-head span {
		color: #ababaa;
	}

	.lowpower-content {
		width: 95%;
		height: 700px;
		border: 1px solid #000;
	}

	.lowpower-content-ability-a {
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
		margin: 20px 0 20px 0;
	}

	.lowpower-content-ability-a>* {
		margin: 0px 10px 0px 10px;
	}

	.lowpower-content-ability-b {
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}

	.lowpower-content-ability-b>* {
		margin: 0px 20px 0px 20px;
	}
</style>
