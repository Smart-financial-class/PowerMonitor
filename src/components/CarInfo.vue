<template>
	<div class="CarInfo-body">
		<!-- hey, this is lowpower page -->
		<!-- test change -->
		<div class="CarInfo-head">
			<span>车辆列表/车辆详情</span>
			<h2>车辆：2-8888</h2>
		</div>
		<div class="CarInfo-content">
      <div class="CarInfo-Container">
		  <div class="CarInfo-content-detail">
		    <!-- <h2>车辆信息</h2> -->
		  				<el-descriptions title="车辆信息">
		  					<el-descriptions-item label="车辆自编号：">{{arr[0].车辆型号}}</el-descriptions-item>
		  					<el-descriptions-item label="车牌号：">{{arr[0].车牌号}}</el-descriptions-item>
		  					<el-descriptions-item label="VIN:">{{show_detail.VIN}}</el-descriptions-item>
		  					<el-descriptions-item label="所属公司/承修单位：">{{show_detail.VIN}}</el-descriptions-item>
		  					<el-descriptions-item label="启用时间："
		  						>{{arr[0].车辆启用时间}}</el-descriptions-item>
		  						<el-descriptions-item label="车辆状态：">{{show_detail.车辆状态}}</el-descriptions-item>
		  					<el-descriptions-item label="续驶里程："
		  						>{{show_detail.续航里程}}</el-descriptions-item>
		  						<el-descriptions-item label="储能总量：">{{show_detail.储能总量}}</el-descriptions-item>
		  					<el-descriptions-item label="额定电压："
		  						>{{show_detail.额定电压}}</el-descriptions-item>
		  				</el-descriptions>
		    
		  </div>
		  			<div class="CarInfo-content-ability-a">
		  				<span>充电记录:</span>
		  				<el-select v-model="value" placeholder="Select">
		  					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
		  						:disabled="item.disabled" />
		  				</el-select>
		  				<el-button type="primary" :icon="Search">查询</el-button>
		  				<el-button :icon="Delete">重置</el-button>
		  			</div>
		  			<!-- <div class="CarInfo-content-ability-b">
		  				<el-button :icon="Share">导出</el-button>
		  				<el-button :icon="Edit">设置</el-button>
		  			</div> -->
		  
		  			<div class="CarInfo-content-list" style="height: 500px">
		  				<el-auto-resizer>
		  					<template #default="{ height, width }">
		  						<el-table-v2 :columns="columns" :data="data" :width="width" :height="height" fixed />
		  					</template>
		  				</el-auto-resizer>
		  			</div>
	  </div>
		</div>
	</div>
</template>
<script lang="tsx" setup>
	import{ ref, onMounted, defineComponent }from 'vue';
	import {
		Search,
		Delete,
		Edit,
		Share,
		Timer
	} from '@element-plus/icons-vue';
	import dayjs from 'dayjs';
	import {
		ElButton,
		ElIcon,
		ElTag,
		ElTooltip,
		ElCheckTag,
		TableV2FixedDir
	} from 'element-plus';

	import type {
		Column
	} from 'element-plus';

	import axios from 'axios';

	// export default({
  // name: 'CarInfo',
  // setup(){


	// 充电记录
	const setRouter = function(router: string) {
		this.$router.push(`/${router}`)
	}

	const data = ref([]);

			let arr = ref([{}]);
			let show_num=ref(0);
			let show_detail=ref(0)
			const mockTest = function() {
				axios.get("/api/getLowPowerCarList")
				.then(res => {
					console.log(res)
					
					arr.value=res.data.data
					console.log(arr.value[0])
					
					show_num.value=arr.value[0].车辆型号
					// console.log(show_num)
					show_detail.value=res.data.data[0].车辆详情

					data.value=res.data.data[0].车辆详情.充电记录
					// console.log(data);
					
			})
				.catch(err => {
				console.log(err)
				});		
			};
				onMounted(() => {
							mockTest()
					})


	

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
		stime: '18:00',
		spower: '75%',
		ftime: '20:30',
		fpower: '100%',
		power: '2h 30min',
		// state: '正常',
		// theoRange: '900公里',
		// todayRange: '5公里',
		// plate: '矿泉水 550ml',
	})

	const columns: Column < any > [] = [{
			key: 'plate',
			title: '充电开始时间',
			dataKey: 'plate',
			width: 200,
			align: 'center',
			cellRenderer: ({
				cellData: plate
			}) => <> 
				<ElCheckTag checked style = "margin-right: 8px" >
				plate </ElCheckTag>
			</>,
		},
		{
			key: 'stime',
			title: '充电开始时间',
			dataKey: '充电开始时间',
			width: 200,
			align: 'center',
			cellRenderer: ({
				cellData: stime
			}) => <> {
				stime
			} </>,
		},
		{
			key: 'rspower',
			title: '充电开始电量',
			dataKey: '充电开始电量',
			width: 200,
			align: 'center',
			cellRenderer: ({
				cellData: spower
			}) => <> {
				spower
			} </>,
		},
		{
			key: 'ftime',
			title: '充电完成时间',
			dataKey: '充电完成时间',
			width: 200,
			align: 'center',
			cellRenderer: ({
				cellData: ftime
			}) => <> {
				ftime
			} </>,
		},
		{
			key: 'fpower',
			title: '充电完成电量',
			dataKey: '充电完成电量',
			width: 200,
			align: 'center',
			cellRenderer: ({
				cellData: fpower
			}) => <> {
				fpower
			} </>,
		},
		{
			key: 'power',
			title: '充电时长',
			dataKey: '充电时长',
			width: 150,
			align: 'center',
			cellRenderer: ({
				cellData: power
			}) => <> {
				power
			} </>,
		}
	]

	// const data = ref(Array.from({
	// 	length: 30
	// }).map(dataGenerator))
	
	// return{
  //     show_num
  //   }

//   }
// });

</script>

<style scoped>
	.CarInfo-body {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.CarInfo-head {
		width: 100%;
		display: flex;
		flex-direction: column;
		text-align: left;
		background-color: #fff;
		padding: 10px 10px 10px 10px;
		margin-bottom: 10px;
	}

	.CarInfo-head span {
		color: #ababaa;
	}

	.CarInfo-content {
		width: 100%;
		height: 700px;
/* 		border: 1px solid rgb(220, 218, 218); */
	}

	.CarInfo-content-ability-a {
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
		margin: 20px 30px 0px 0;
		background-color: #fff;
	}

	.CarInfo-content-ability-a>* {
		margin: 20px 30px 0px 20px;
	}

	.CarInfo-content-ability-b {
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}

	.CarInfo-content-ability-b>* {
		margin: 0px 0px 0px 0px;
	}

	.CarInfo-content-detail {
	  margin: 0px 0px 0px 0px;
	}
	.CarInfo-Container{
		padding: 30px 30px 30px 30px;
		background-color: #fff;
	}
</style>

