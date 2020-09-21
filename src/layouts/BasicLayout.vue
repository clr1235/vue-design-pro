<template>
    <div :class="[`nav-theme-${navTheme}, nav-mode-${navMode}`]">
        <a-layout id="components-layout-demo-side" style="min-height: 100vh">
            <a-layout-sider 
                :theme="navTheme" 
                :trigger="null" 
                v-model="collapsed" 
                collapsible
                v-if="navMode === 'left'"
                width="256px"
            >
                <div class="logo">
                    <span>Ant Design Pro</span>
                </div>
                <SiderMenu :theme="navTheme"/>
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="background: #fff; padding: 0">
                    <a-icon 
                        class="trigger"
                        v-auth="['admin']"
                        @click="collapsed = !collapsed"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    ></a-icon>
                    <Header />
                </a-layout-header>
                <a-layout-content style="margin: 0 16px">
                    <router-view />
                    <Authorized :authority="['admin']">
                        <SettingDrawer/>
                    </Authorized>
                </a-layout-content>
                <a-layout-footer style="text-align: center">
                    <Footer />
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import SiderMenu from './SiderMenu'
import SettingDrawer from '@components/settingDrawer'
export default {
    name: 'BasicLayout',
    components: {
        SiderMenu,
        Footer,
        Header,
        SettingDrawer
    },
    computed: {
        navTheme() {
            return this.$route.query.navTheme || 'dark'
        },
        navMode() {
            return this.$route.query.navMode || 'left'
        }
    },
    data() {
        return {
            collapsed: false
        }
    }
}
</script>

<style lang="less" scoped>
.trigger {
    font-size: 19px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}
.trigger:hover {
        background: #eee;
        color: #1890ff;
    }
.logo {
    height: 64px;
    line-height: 64px;
    text-align: center;
    overflow: hidden;
}
.nav-theme-dark {
    /deep/ .ant-layout{
        .logo {
            color: #fff;
        }
    }
     
}

</style>
