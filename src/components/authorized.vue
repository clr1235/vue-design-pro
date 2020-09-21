<script>
// 权限校验组件 
import { check } from '@utils/auth'
export default {
    functional: true,
    name: 'Authorized',
    authority: {
        type: Array,
        required: true
    },
    render (h, context) {
        console.log(h, 'h===>>>', context)
        const { props, scopedSlots } = context
        return check(props.authority) ? scopedSlots.default() : null
    }
}
</script>

<style lang="less" scoped>

</style>