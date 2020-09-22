<template>
    <div class="chart_box">
        <div ref="chartDom"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
import { addListener, removeListener } from 'resize-detector'
import { debounce } from 'lodash'

export default {
    name: 'Chart',
    props: {
        option: {
            type: Object,
            default: () => {}
        }
    },
    watch: {
        // hander(val) {
        //     this.myChart.setOption(val)
        // }
        option: {
            handler(val) {
                this.myChart.setOption(val)
            },
            deep: true
        }
    },
    created() {
        this.resize = debounce(this.resize, 300)
    },
    mounted () {
        this.renderCharts()
        addListener(this.$refs.chartDom, this.resize)
        
    },
    beforeDestroy() {
        removeListener(this.$refs.chartDom, this.resize)
        this.myChart.dispose()
        this.myChart = null
    },
    methods: {
        resize () {
            this.myChart.resize()
        },
        renderCharts() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(this.$refs.chartDom);
            // 绘制图表
            this.myChart.clear()
            this.myChart.setOption(this.option)
            console.log(8767666)

        }
    }
}
</script>

<style lang="less" scoped>

</style>