<template>
    <div class="settingDrawer">
        <a-drawer
            title="设置"
            placement="right"
            :closable="false"
            :visible="visible"
            @close="onClose"
            width="300px"
        >   
            <template slot="handle">
                <div class="handle" @click="visible = !visible">
                    <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
                </div>
            </template>
            <div>
                <div class="setItem">
                    <h3>整体风格定制</h3>
                    <a-radio-group name="navTheme" :value="$route.query.navTheme || 'dark'" 
                    @change="(e) => {onChangeNav('navTheme', e)}">
                        <a-radio value="dark">
                            深色
                        </a-radio>
                        <a-radio value="light">
                            浅色
                        </a-radio>
                    </a-radio-group>
                </div>
                <div class="setItem">
                    <h3>导航模式定制</h3>
                    <a-radio-group name="navMode" :value="$route.query.navMode || 'left'" 
                    @change="(e) => {onChangeNav('navMode', e)}">
                        <a-radio value="left">
                            左侧
                        </a-radio>
                        <a-radio value="top">
                            顶部
                        </a-radio>
                    </a-radio-group>
                </div>
            </div>
        </a-drawer>
    </div>
</template>

<script>
export default {
    name: 'SettingDrawer',
    data() {
        return {
            visible: false,
            navTheme: 'dark',
            navMode: 'left'
        }
    },
    methods: {
        onClose() {
            this.visible = false
        },
        onChangeNav(type, e) {
            const val = e.target.value
            this.$router.push({
                query: {
                    ...this.$route.query,
                    [type]: val
                }
            })
            switch (type) {
                case 'navTheme': {
                    this.navTheme = val
                    break
                }
                case 'navMode': {
                    this.navMode = val
                    break
                }
            }
            
        }
    }
}
</script>

<style lang="less" scoped>
.handle{
    position: absolute;
    top: 240px;
    right: 300px;
    width: 48px;
    height: 48px;
    background: #1890ff;
    line-height: 48px;
    text-align: center;
    font-size: 20px;
    border-radius: 4px 0 0 4px;
    color: #fff;
    cursor: pointer;
}
.setItem {
    margin-bottom: 20px;
}
</style>
