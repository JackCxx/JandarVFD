<template>
	<div>
		<a-tabs size="small" defaultActiveKey="flow-attr" :activeKey="activeKey">
			<a-tab-pane key="flow-attr">
				<span slot="tab">
					<a-icon type="cluster" />
					流程属性
				</span>
				<a-form layout="horizontal">
					<a-form-item label="流程id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
						<a-input :value="flowData.attr.id" disabled />
					</a-form-item>
					<a-form-item label="流程名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
						<a-input :value="flowData.attr.name" disabled/>
					</a-form-item>
					<!--
					<a-form-item label="流程表名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
						<a-input placeholder="请输入节点名称" :value="flowData.attr.tablename" @change="tableNameChange"/>
					</a-form-item>
					 -->
				</a-form>
			</a-tab-pane>
			<a-tab-pane key="node-attr">
				<span slot="tab">
					<a-icon type="profile" />
					节点属性
				</span>
				<template v-if="currentSelect.type == 'start'">
					<a-form layout="horizontal">
						<a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-tag color="purple">{{ currentSelect.type }}</a-tag>
						</a-form-item>
						<a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input :value="currentSelect.id" disabled />
						</a-form-item>
						<a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange" />
						</a-form-item>
					</a-form>
				</template>
				<template v-if="currentSelect.type == 'end'">
					<a-form layout="horizontal">
						<a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-tag color="purple">{{ currentSelect.type }}</a-tag>
						</a-form-item>
						<a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input :value="currentSelect.id" disabled />
						</a-form-item>
						<a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange" />
						</a-form-item>
					</a-form>
				</template>
				<template v-if="currentSelect.type == 'common'">
					<a-form layout="horizontal">
						<a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-tag color="purple">{{ currentSelect.type }}</a-tag>
						</a-form-item>
						<a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input :value="currentSelect.id" disabled />
						</a-form-item>
						<a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange" />
						</a-form-item>
						<a-form-item label="人员类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-select  placeholder="请选择人员类型"  @change="personTypeChnage" v-model="queryParam.personType">
								<a-select-option v-for="d in personTypes" :key="d.id" :value="d.name">{{d.name}}</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item label="审核人员" :label-col="formItemLayout.labelCol" v-if="currentSelect.personType == '指定人员'":wrapper-col="formItemLayout.wrapperCol">
							<a-select
							v-model="queryParam.assessPerson"
							showSearch
          					:filterOption="filterOption"
          					placeholder="请选择人员"
          					@change="assessPersonChnage"
          					>
								<a-select-option v-for="p in flowOptions.assessPersons" :key="p.id" :value="p.id">{{p.name}}</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item label="行政级别" :label-col="formItemLayout.labelCol" v-if="currentSelect.personType == '分管领导'":wrapper-col="formItemLayout.wrapperCol">
							<a-tree-select
							    style="width: 100%"
							    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
							    :treeData="flowOptions.areaTree"
							    placeholder="请选择行政级别"
							    treeDefaultExpandAll
							    v-model="queryParam.assessArea"
								showSearch
								treeNodeFilterProp="title"
							    @change="assessAreaChnage"
							  >
							    <span style="color: #08c" slot="title" slot-scope="{key, value}">
							      {{value}}
							    </span>
						  </a-tree-select>
						</a-form-item>
						<a-form-item label="会签类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-select  placeholder="请选择会签类型"  @change="countersignTypeChnage"
							v-model="queryParam.countersignType"
							showSearch
          					:filterOption="filterOption"
          					>
								<a-select-option v-for="p in countersignTypes" :key="p.id" :value="p.id">{{p.name}}</a-select-option>
							</a-select>
						</a-form-item>
					</a-form>
				</template>
				<template v-else-if="currentSelect.type == 'freedom'">
					<a-form layout="horizontal">
						<a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-tag color="purple">{{ currentSelect.type }}</a-tag>
						</a-form-item>
						<a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input :value="currentSelect.id" disabled />
						</a-form-item>
						<a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange" />
						</a-form-item>
						<a-form-item label="抄送人员类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-select  placeholder="请选择抄送人员类型"  @change="ccpersonTypeChange" v-model="queryParam.ccpersonType">
								<a-select-option v-for="d in ccpersonTypes" :key="d.id" :value="d.name">{{d.name}}</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item label="抄送人员" :label-col="formItemLayout.labelCol" v-if="currentSelect.ccpersonType == '指定人员'":wrapper-col="formItemLayout.wrapperCol">
							<a-select
							v-model="queryParam.ccPerson"
							showSearch
							:filterOption="filterOption"
							placeholder="请选择人员"
							@change="ccPersonChnage"
							mode="multiple"
							>
								<a-select-option v-for="p in flowOptions.ccPersons" :key="p.id" :value="p.id">{{p.name}}</a-select-option>
							</a-select>

						</a-form-item>
						<a-form-item label="行政级别" :label-col="formItemLayout.labelCol" v-if="currentSelect.ccpersonType == '分管领导'":wrapper-col="formItemLayout.wrapperCol">
							<a-tree-select
							    style="width: 100%"
							    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
							    :treeData="flowOptions.areaTree"
							    placeholder="请选择行政级别"
							    treeDefaultExpandAll
							    v-model="queryParam.ccArea"
								showSearch
								treeNodeFilterProp="title"
							    @change="ccAreaChnage"
							  >
							    <span style="color: #08c" slot="title" slot-scope="{key, value}">
							      {{value}}
							    </span>
						  </a-tree-select>
						</a-form-item>
					</a-form>
				</template>
				<template v-else-if="currentSelect.type == 'event'">
					<a-form layout="horizontal">
						<a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-tag color="purple">{{ currentSelect.type }}</a-tag>
						</a-form-item>
						<a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input :value="currentSelect.id" disabled />
						</a-form-item>
						<a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange" />
						</a-form-item>
					</a-form>
				</template>
				<template v-else-if="currentSelect.type == 'gateway'">
					<a-form layout="horizontal">
						<a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-tag color="purple">{{ currentSelect.type }}</a-tag>
						</a-form-item>
						<a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input :value="currentSelect.id" disabled />
						</a-form-item>
						<a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange" />
						</a-form-item>
						<a-form-item label="网关类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-select  placeholder="请选择网关类型"  @change="gatewayTypeChnage" v-model="queryParam.gatewayType">
								<a-select-option v-for="d in gatewayTypes" :key="d.id" :value="d.name">{{d.name}}</a-select-option>
							</a-select>
						</a-form-item>
					</a-form>
				</template>
				<template v-else-if="currentSelect.type == 'child-flow'">
					<a-form layout="horizontal">
						<a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-tag color="purple">{{ currentSelect.type }}</a-tag>
						</a-form-item>
						<a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input :value="currentSelect.id" disabled />
						</a-form-item>
						<a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange" />
						</a-form-item>

					</a-form>
				</template>
				<template v-else-if="currentSelect.type == 'x-lane' || currentSelect.type == 'y-lane'">
					<a-form layout="horizontal">
						<a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-tag color="purple">{{ currentSelect.type }}</a-tag>
						</a-form-item>
						<a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input :value="currentSelect.id" disabled />
						</a-form-item>
						<a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
							<a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange" />
						</a-form-item>

					</a-form>
				</template>
			</a-tab-pane>
			<a-tab-pane key="link-attr">
				<span slot="tab">
					<a-icon type="branches" />
					连线属性
				</span>
				<a-form layout="horizontal">
					<a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
						<a-input :value="currentSelect.id" disabled />
					</a-form-item>
					<a-form-item label="源节点" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
						<a-input :value="currentSelect.sourceId" disabled />
					</a-form-item>
					<a-form-item label="目标节点" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
						<a-input :value="currentSelect.targetId" disabled />
					</a-form-item>
					<a-form-item label="文本" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
						<a-input :value="currentSelect.label" @change="linkLabelChange" />
					</a-form-item>
				</a-form>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
import jsplumb from 'jsplumb'
import { flowConfig } from '../config/args-config.js'
import { nodeExtraConfig } from '../config/basic-extra-config.js'

export default {
  props: ['plumb', 'flowData', 'select', 'flowOptions'],
  components: {
    jsplumb
  },
  // created 初始加载
  created () {
    let config = JSON.parse(JSON.stringify(this.extraConfig))
    let personType = config.personType
    let gatewayType = config.gatewayType
    let countersignType = config.countersignType
    let ccpersonType = config.ccpersonType

    this.personTypes = personType
    this.ccpersonTypes = ccpersonType
    this.gatewayTypes = gatewayType
    this.countersignTypes = countersignType
    this.extraConfig = config
    this.$nextTick(() => {
      if (this.attrflowOptions != 'undefined' && this.attrflowOptions != null) {
        if (this.attrflowOptions.personTypes !== 'undefined' && this.attrflowOptions.personTypes != null && this.attrflowOptions.personTypes.length > 0) {
          this.personTypes = this.attrflowOptions.personTypes
        }
        if (this.attrflowOptions.ccpersonTypes !== 'undefined' && this.attrflowOptions.ccpersonTypes != null && this.attrflowOptions.ccpersonTypes.length > 0) {
		  this.ccpersonTypes = this.attrflowOptions.ccpersonTypes
        }
      }
    })
  },
  data () {
    return {
      currentSelect: this.select,
	  extraConfig: nodeExtraConfig,
      personTypes: nodeExtraConfig.personType,
      gatewayTypes: nodeExtraConfig.gatewayType,
      countersignTypes: nodeExtraConfig.countersignType,
      attrflowData: this.flowData,
      attrflowOptions: this.flowOptions,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      queryParam: {
		  personType: null,
		  assessPerson: null,
		  gatewayType: null,
		  assessArea: null,
		  ccpersonType: null,
		  ccPerson: [],
		  ccArea: null
	  },
      activeKey: 'flow-attr'
    }
  },
  methods: {
    nodeNameChange (e) {
      this.currentSelect.nodeName = e.target.value
    },
    personTypeChnage (value) {
      this.currentSelect.personType = value
    },
    ccpersonTypeChange (value) {
	  this.currentSelect.ccpersonType = value
    },
    assessPersonChnage (value) {
      this.currentSelect.assessPerson = value
    },
    ccPersonChnage (value) {
	  this.currentSelect.ccPerson = value
	  console.log(value)
    },
    assessAreaChnage (value) {
      this.currentSelect.assessArea = value
    },
    ccAreaChnage (value) {
	  this.currentSelect.ccArea = value
    },
    gatewayTypeChnage (value) {
      this.currentSelect.gatewayType = value
    },
    countersignTypeChnage (value) {
      this.currentSelect.countersignType = value
    },
    tableNameChange (e) {
      this.attrflowData.attr.tablename = e.target.value
    },
    filterOption (input, option) {
      return (
		          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
		        )
    },
    linkLabelChange (e) {
      const that = this
      let label = e.target.value

      that.currentSelect.label = label
      let conn = that.plumb.getConnections({
        source: that.currentSelect.sourceId,
        target: that.currentSelect.targetId
      })[0]
      if (label != '') {
        conn.setLabel({
          label: label,
          cssClass: 'linkLabel'
        })
      } else {
        let labelOverlay = conn.getLabelOverlay()
        if (labelOverlay) conn.removeOverlay(labelOverlay.id)
      }
    }
  },
  watch: {
    select (val) {
      this.currentSelect = val
      if (this.currentSelect.type == 'link') {
        this.activeKey = 'link-attr'
      } else if (!this.currentSelect.type) {
        this.activeKey = 'flow-attr'
      } else {
        this.activeKey = 'node-attr'
      }
      if (this.currentSelect.personType !== 'undefined' && this.currentSelect.personType != null) {
        this.queryParam.personType = this.currentSelect.personType
      } else {
        this.queryParam.personType = ''
      }
      if (this.currentSelect.assessPerson !== 'undefined' && this.currentSelect.assessPerson != null) {
        this.queryParam.assessPerson = this.currentSelect.assessPerson
      } else {
        this.queryParam.assessPerson = null
      }
	  if (this.currentSelect.ccpersonType !== 'undefined' && this.currentSelect.ccpersonType != null) { // 抄送人员类型
	    this.queryParam.ccpersonType = this.currentSelect.ccpersonType
	  } else {
	    this.queryParam.ccpersonType = ''
	  }
	  if (this.currentSelect.ccPerson !== 'undefined' && this.currentSelect.ccPerson != null) { // 抄送人员
	    this.queryParam.ccPerson = this.currentSelect.ccPerson
	  } else {
	    this.queryParam.ccPerson = []
	  }
      if (this.currentSelect.gatewayType !== 'undefined' && this.currentSelect.gatewayType != null) {
        this.queryParam.gatewayType = this.currentSelect.gatewayType
      } else {
        this.queryParam.gatewayType = null
      }
      if (this.currentSelect.countersignType !== 'undefined' && this.currentSelect.countersignType != null) {
        this.queryParam.countersignType = this.currentSelect.countersignType
      } else {
        this.queryParam.countersignType = null
      }
      if (this.currentSelect.assessArea !== 'undefined' && this.currentSelect.assessArea != null) {
        this.queryParam.assessArea = this.currentSelect.assessArea
      } else {
        this.queryParam.assessArea = null
      }
    },
    flowData (val) {
      this.attrflowData = val
    },
    flowOptions (val) {
      this.attrflowOptions = val
    },
    attrflowData: {
      handler (val) {
        this.$emit('update:flowData', val)
      },
      deep: true
    },
    currentSelect: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
	@import '../style/flow-attr.scss'
</style>
