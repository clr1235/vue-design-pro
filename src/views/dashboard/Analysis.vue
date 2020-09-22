<template>
    <div class="analysis_page">
        {{chartOptions}}
        <Chart :option="chartOptions" style="height:400px" />
    </div>
</template>

<script>
import Chart from '@components/chart'
import axios from 'axios'

export default {
    name: 'Analysis',
    components: {
       Chart 
    },
    data() {
        return {
            chartOptions: {
                
            }
        }
    },
    mounted() {
        this.getChartData()
    },
    methods: {
        getChartData() {
            axios.get('/api/dashboard/chart', {
                params: { id: 12345 }
            }).then((res) => {
                console.log(res, 'res')
                this.chartOptions = {
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
                        data: res.data
                    }]
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
</style>
