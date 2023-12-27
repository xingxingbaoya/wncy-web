<template>
  <div  class="project-publish">
    <img src="~img/projectManage/project-search.png"/>
    <p>当前位置：首页 > 所有项目</p>
    <div class="project-publish-wrap">
        <div class="project-publish-wrap-left">
            <div class="project-wrap">

            </div>
            <div class="project-wrap">

            </div>
            <div class="project-wrap">

            </div>
        </div>
        <div class="project-publish-wrap-right">
            <div class="project-wrap">

            </div>
            <div class="project-wrap">

            </div>
        </div>

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}
.project-publish {
    margin-top: 90px;
    width: 100%;
    background-image: url("~img/projectManage/projdetail-back.png");
    background-size: 100%;
    background-repeat: no-repeat;
    padding: 55px pxToVW(270);

    &-wrap {
        width: 100%;
        display: flex;
        &-left {
            width: pxToVW(1030);
            margin-right: pxToVW(20);
            .project-wrap {
                padding: 50px 40px;
                background-color: #fff;
                border-radius: 16px;
                margin-bottom: 22px;
            }
        }
        &-right {
            flex: 1;
            .project-wrap {
                padding: 50px 40px;
                background-color: #fff;
                border-radius: 16px;
                margin-bottom: 22px;
            }
        }
    }
}
</style>