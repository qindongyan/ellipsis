<template>
    <div class="ellipsis" ref="container">
        <span class="ellipsis-txt" ref="txt">中</span><span class="ellipsis-ellipsis" ref="ellipsis" :style="{'display':show?'none':'inline-block'}">{{ ellipsis }}</span><span class="ellipsis-button" v-if="showButton" :style="moreStyle" ref="more" @click="handleClick">{{ show ? collapseText: expandText }}</span>
    </div>
</template>
<script>
export default {
    name: 'ellipsis',
    props: {
        text: String,
        line: {
            type: Number,
            default: 2,
        },
        ellipsis: {
            type: String,
            default: '...',
        },
        showButton: {
            type: Boolean,
            default: true,
        },
        expandText: {
            type: String,
            default: '展开',
        },
        collapseText: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            tmpTxt: '',
            show: false,
            marginLeft: 0,
            collapseMarginLeft: 0,
            moreStyle: {},
        };
    },
    mounted() {
        if (!this.line) {
            return;
        }
        const everywidth = this.$refs.txt.offsetWidth;  // 每个字的长度
        const lineHeight = this.$refs.container.offsetHeight; // 内容行高
        const containerWidth = this.$refs.container.offsetWidth; // 内容宽度
        // const containerLeft = this.$refs.container.offsetLeft; // 内容左距离
        const ellipsisWidth = this.$refs.ellipsis.offsetWidth; // 省略号宽度
        let btnWidth = 0; // 收起按钮宽度
        this.$refs.txt.innerHTML = this.text;
        if (this.showButton) { // 有按钮
            btnWidth = Math.ceil(parseFloat(window.getComputedStyle(this.$refs.more, null).width.replace('px', '')));
            this.$refs.more.style.display = 'inline-block';
            this.$refs.ellipsis.style.display = 'inline-block';
        }
        if (Math.floor(this.$refs.container.offsetHeight / lineHeight) <= this.line) { // 直接展开
            this.tmpTxt = this.text;
            this.show = true;
            return;
        }
        const initNum = Math.floor(((containerWidth * this.line) - btnWidth - ellipsisWidth) / everywidth);
        let increase = 1;
        this.$refs.txt.innerHTML = this.text.substr(0, initNum);
        if (Math.round(this.$refs.container.offsetHeight / lineHeight) > this.line) { // 超出行数
            increase = -1;
        }
        for (let i = initNum; i < this.text.length; (i += increase)) {
            if (i < 0) {
                return;
            }
            this.$refs.txt.innerHTML = this.text.substr(0, i);
            if (increase === 1 && Math.round(this.$refs.container.offsetHeight / lineHeight) > this.line) {
                this.tmpTxt = this.text.substr(0, i - 1);
                this.$refs.txt.innerHTML = this.tmpTxt;
                if (this.showButton) { // 有按钮
                    this.moreStyle = {
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        'line-height': 'inherit',
                    };
                }
                break;
            } else if (increase === -1 && Math.round(this.$refs.container.offsetHeight / lineHeight) === this.line) {
                this.tmpTxt = this.text.substr(0, i);
                this.$refs.txt.innerHTML = this.tmpTxt;
                if (this.showButton) { // 有按钮
                    this.moreStyle = {
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        'line-height': 'inherit',
                    };
                }
                break;
            }
        }
    },
    methods: {
        handleClick() {
            if (this.show) {
                this.collapse();
            } else {
                this.expand();
            }
        },
        expand() {
            if (!this.show) {
                this.show = true;
                this.$refs.txt.innerHTML = this.text;
            }
        },
        collapse() {
            if (this.show) {
                this.show = false;
                this.$refs.txt.innerHTML = this.tmpTxt;
            }
        },
    },
};
</script>

<style>
    .ellipsis{
        position: relative;
        text-align: justify;
    }
    .ellipsis-button{
        display: inline-block;
        color:red;
    }
</style>
