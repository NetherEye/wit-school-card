<template>
	<div class="pub">
		<my-crumbs></my-crumbs>
		<div class="filter">
			<div class="filter-item">
				<div class="label">年级</div>
				<el-select v-model="input" clearable placeholder="请选择" size="small">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="filter-item">
				<div class="btn">查询</div>
			</div>
			<div class="filter-item">
				<div class="btn">导出</div>
			</div>
			<div class="filter-item">
				<div class="btn">导出EXCEL</div>
			</div>
		</div>
		<div class="table">
			<div class="left_ear"></div>
			<div class="right_ear"></div>
			<el-table ref="table" :data="tableData" tooltip-effect="dark" header-cell-class-name="tableTou" cell-class-name="tableRow">
				<el-table-column prop="grade" label="年级" align="center" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="gradeName" label="年级名称" align="center" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="studentNumber" label="年级学生数" align="center" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" label="操作" show-overflow-tooltip>
					<template slot-scope="scope">
						<div class="text-btn" @click="dialogDetailShow = true">详情</div>
					</template>
				</el-table-column>
				
			</el-table>
			<div class="fenye">
				<el-pagination :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="220">
				</el-pagination>
			</div>
			
		</div>
		
		<el-dialog title="年级详情" :visible.sync="dialogDetailShow" width="600px" center custom-class="pwdDialog">
			<div class="p_item" style="padding-left: 210px;">年级：2017 </div>
			<div class="p_item" style="padding-left: 210px;">年级名称：三年级 </div>
			<div class="p_item" style="padding-left: 210px;">年级学生人数：1000 </div>
			
			<div slot="footer" style="height: 50px;">
			</div>
		</el-dialog>
		
		
		
	</div>
</template>

<script>
import fetch from "@/assets/http/fetch"
import grade from "@/assets/api/grade"
export default {
	data(){
		return {
			input: '',
			currentPage: 1,
			dialogDetailShow: false,
			options: [],
			tableData: [
			]
			
		}
	},
	created(){
		this.getData();
	},
	methods: {
		getData(){
			let par={
				pageSize: this.pageSize,
				pageNumber: this.currentPage,
			}
			fetch.get(grade.getGradeByschoolId, par, res => {

				if(res.code=== 200) {

					this.tableData = res.data;
				} else {
					this.tableData = [];
				}
			})
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pub{
	height: 100%;
	overflow-y: auto;
}
</style>