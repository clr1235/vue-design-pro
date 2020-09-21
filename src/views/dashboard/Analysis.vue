<template>
    <div class="analysis_page">
        <Chart :option="chartOptions" style="400px" />
    </div>
</template>

<script>
import Chart from '@components/chart'
export default {
    name: 'Analysis',
    components: {
       Chart 
    },
    data() {
        return {
            chartOptions: {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
        }
    }
}
</script>

<style lang="less" scoped>
</style>
