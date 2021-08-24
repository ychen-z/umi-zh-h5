import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title:"心鸟心理",
  publicPath:"./",
  styles: ["https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"],
  routes: [
    { path: '/', component: '@/pages/start' },
    { path: '/index', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
