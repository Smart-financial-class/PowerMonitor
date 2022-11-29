<template>
	<div class="CarInfo-body">
		<!-- hey, this is lowpower page -->
		<!-- test change -->
		<div class="CarInfo-head">
			<span>报表下载</span>
			<h2>报表下载</h2>
		</div>
		<div class="CarInfo-content">
			<!-- <p> -->
            <!--使用 router-link 组件进行导航 -->
            <!--通过传递 `to` 来指定链接 -->
            <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
            <!-- <router-link to="">日报 </router-link>
            <router-link to="Month">月报 </router-link>
            <router-link to="Year">年报</router-link>
          </p> -->
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
					<el-menu class="el-menu-demo" mode="horizontal">
  				<el-menu-item index="1" @click="setRouter('')">日报</el-menu-item>
  				<el-menu-item index="2" @click="setRouter('month')">月报</el-menu-item>
  				<el-menu-item index="3" @click="setRouter('year')">年报</el-menu-item>
					</el-menu>
          <router-view></router-view>
		</div>
	</div>
</template>
<script lang="ts">
import axios from "axios";
export default {
  mounted() {
    this.mockTest();
  },
  methods: {
    setRouter (router: string) {
      this.$router.push(`/Statistics/${router}`)
    },
    mockTest() {
      axios.get("/api/getLowPowerCarList")
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
    }
  }
}
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


</style>

