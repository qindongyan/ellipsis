<template>
  <div class="page-more">
    <div>
      <h6>无按钮</h6>
      <ellipsis ref="moreDemo" :text="text" :line="4" :show-button="false">
      </ellipsis>
    </div>
    <div>
      <h6>采用组件默认按钮</h6>
      <ellipsis ref="moreDemo" :text="text" :line="4">
      </ellipsis>
    </div>
    <div>
      <h6>在组件外部定义按钮</h6>
      <ellipsis ref="noButton"   :show-button="false" :text="text" :line="4">
      </ellipsis>
      <button class="outer-button" @click="expand">{{btnTxt}}</button>
    </div>
    <div>
      <h6>自定义省略符</h6>
      <ellipsis  ref="moreDemo" :ellipsis="'。。。'" :text="text" :line="4">
      </ellipsis>
    </div>
    <div>
      <h6>不带省略符</h6>
      <ellipsis  ref="moreDemo" :ellipsis="''" :text="text" :line="4">
      </ellipsis>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        text: '文本截断是我们前端经常会碰到的需求，有些字段文本比较长，设计师往往会在有限的空间内限制字符数量文本截断是我们前端经常会碰到的需求，有些字段文本比较长，设计师往往会在有限的空间内限制字符数量文本截断是我们前端经常会碰到的需求，有些字段文本比较长，设计师往往会在有限的空间内限制字符数量，以确保界面的美观性，设计师会在一些字符后面加上省略号来表示，这个时候我们前端往往就会使用',
        btnTxt: '',
        btnTxtExpand: '收起',
        btnTxtCollapse: '展开全部'
      }
    },
    created() {
      this.btnTxt = this.btnTxtCollapse
    },
    methods: {
      expand() {
        this.$refs.noButton.handleClick()
        this.btnTxt = this.$refs.noButton.show ? this.btnTxtExpand : this.btnTxtCollapse
      }
    }
  }
</script>

<style>
.page-more{
}
.hide{
  display:none;
}
</style>

