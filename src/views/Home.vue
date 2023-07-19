<template>
  <div data-tauri-drag-region class="calcalator-wrapper">
    <div class="head-operation" @click="closeWindow">
      <svg
        t="1689731756058"
        class="icon"
        viewBox="0 0 1025 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3120"
      >
        <path
          d="M997.553471 154.252491 639.804427 512.001535 997.553471 869.751602l0 0c16.34988 16.374439 26.450623 38.948897 26.450623 63.898376 0 49.899981-40.450041 90.350022-90.351045 90.350022-24.949479 0-47.549519-10.100743-63.897353-26.475181l0 0L512.003581 639.775775 154.255561 997.525842l0 0c-16.34988 16.374439-38.948897 26.475181-63.899399 26.475181-49.901004 0-90.350022-40.450041-90.350022-90.350022 0-24.950502 10.099719-47.523938 26.449599-63.898376l0 0 357.750067-357.750067L26.454716 154.252491l0 0c-16.34988-16.350903-26.449599-38.949921-26.449599-63.900423 0-49.899981 40.449018-90.348999 90.350022-90.348999 24.950502 0 47.550543 10.099719 63.899399 26.474158l0 0 357.748021 357.749044L869.754672 26.477228l0 0c16.348857-16.374439 38.948897-26.474158 63.897353-26.474158 49.901004 0 90.351045 40.449018 90.351045 90.348999C1024.00307 115.301547 1013.902327 137.901588 997.553471 154.252491L997.553471 154.252491z"
          p-id="3121"
        ></path>
      </svg>
    </div>

    <div class="wrapper">
      <form class="form__contact" action="">
        <fieldset>
          <div class="form-wrapper flex flex-col justify-between">
            <div class="top-item">
              <div class="form-item flex-start">
                <div class="value">
                  <input
                    v-model="form.projectName"
                    class="gate form__field"
                    id="class"
                    type="text"
                    placeholder="项目名称"
                  />
                  <label for="class">项目名称</label>
                </div>
              </div>
              <div class="form-item flex-start">
                <div class="value">
                  <input
                    v-model="form.userName"
                    class="gate form__field"
                    id="class"
                    type="text"
                    placeholder="工种圈名"
                  />
                  <label for="class">工种圈名</label>
                </div>
              </div>
              <div class="form-item flex-start">
                <div class="value">
                  <input
                    v-limit-integer
                    v-model="form.price"
                    class="gate form__field"
                    id="class"
                    type="text"
                    placeholder="单价(分钟)"
                  />
                  <label for="class">单价</label>
                </div>
              </div>
              <div class="form-item flex-start">
                <div class="value">
                  <input v-model="form.remark" class="gate form__field" id="class" type="text" placeholder="备注" />
                  <label for="class">备注</label>
                </div>
              </div>
              <div class="form-item">
                <div class="time space-between">
                  <div class="left-item space-between">
                    <div class="time-item flex-start">
                      <input
                        v-limit-integer
                        v-model="form.hour"
                        class="form__field field--name time-input"
                        type="text"
                      />
                      <span class="mr-20">时</span>
                    </div>
                    <div class="time-item flex-start">
                      <input
                        v-limit-integer
                        v-model="form.minutes"
                        class="form__field field--name time-input"
                        type="text"
                      />
                      <span class="mr-20">分</span>
                    </div>
                    <div class="time-item flex-start">
                      <input
                        v-limit-integer
                        v-model="form.seconds"
                        class="form__field field--name time-input"
                        type="text"
                      />
                      <span class="mr-20">秒</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bottom-item">
              <div class="form-item flex flex-col justify-end">
                <div class="total left-item space-between">
                  <div class="num-wrapper">
                    总共 <span class="num">{{ computedTotalMinutes || 0 }}</span> 分钟
                  </div>
                  <div class="num-wrapper">
                    总金额 <span class="num">￥{{ computedAmount || 0 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>

    <img class="bf" src="../assets/bf.png" alt="" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { appWindow } from '@tauri-apps/api/window';
import { formatNumber } from '@/utils/index';
// 关闭窗口
const closeWindow = () => {
  appWindow.close();
};
let form = ref({
  projectName: '',
  hour: '',
  minutes: '',
  seconds: '',
  price: '',
  remark: '',
  userName: '',
});

const computedSeconds = computed(() => form.value.seconds);
const computedMinutes = computed(() => form.value.minutes);

watch(computedSeconds, (newVal, oldVal) => {
  const num = Number(newVal);
  if (num >= 60) {
    form.value.seconds = 60;
  }
});

watch(computedMinutes, (newVal, oldVal) => {
  const num = Number(newVal);
  if (num >= 60) {
    form.value.minutes = 60;
  }
});

const computedTotalMinutes = computed(() => {
  const minutes = form?.value?.minutes || 0;
  const seconds = form?.value?.seconds || 0;
  const hour = form?.value?.hour || 0;
  const total = parseFloat(hour) * 60 + parseFloat(minutes) + parseFloat(seconds) / 60;
  return formatNumber(total);
});

const computedAmount = computed(() => {
  const totalMinutes = computedTotalMinutes.value || 0;
  const price = Number(form.value.price);
  const amount = price * totalMinutes;
  return formatNumber(amount);
});
</script>

<style lang="scss" scoped>
@mixin epic-sides() {
  // https://codepen.io/MichaelArestad/pen/qltuk
  position: relative;
  z-index: 1;

  &:before {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    left: -5000px;
    height: 100%;
    width: 15000px;
    z-index: -1;
    @content;
  }
}
$line-height: 36px;
$input-length: 66.66%;

.calcalator-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
  background-color: #f19ba5;
  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .bf {
    position: absolute;
    bottom: 10px;
    right: 10px;
    max-width: 180px;
    height: auto;
    z-index: 1;
  }

  .head-operation {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    color: #fff;
    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
    &:hover {
      color: rgba(55, 125, 106, 0.8);
    }
  }
}

.form__contact {
  box-sizing: border-box;
  width: 600px;
  margin: 0 auto;
  border-left: 30px solid white;
  border-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI0MS44NnB4IiBoZWlnaHQ9IjUyLjMyNnB4IiB2aWV3Qm94PSIwIDAgNDEuODYgNTIuMzI2IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0MS44NiA1Mi4zMjYiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0wLDB2MjUuMTYzaDcuMDk3YzAuNTAxLTQuOTg5LDQuNzEyLTguODg0LDkuODMzLTguODg0YzUuNDU4LDAsOS44ODQsNC40MjUsOS44ODQsOS44ODRzLTQuNDI1LDkuODg0LTkuODg0LDkuODg0Yy01LjEyMSwwLTkuMzMyLTMuODk1LTkuODMzLTguODg0SDB2MjUuMTYzaDQxLjg2VjBIMHoiLz48L3N2Zz4=)
    5% 100% repeat;
  border-image-width: 0px 0px 0px 30px;
  transform: translateY(100%);
  animation: init 1s ease-in-out forwards;

  fieldset {
    height: 320px;
    position: relative;
    margin: 0;
    padding: 20px 30px 20px 80px;
    border: none;
    border-radius: 0 20px 20px 0;
    font-size: 14px;
    font-weight: 400;
    font-family: 'ZCOOL KuaiLe', sans-serif !important;
    background: #fff linear-gradient(rgba(0, 0, 0, 0.1) 0px, transparent 0) 0 20px / 100% $line-height;
    &:after {
      position: absolute;
      top: 0;
      left: 50px;
      content: '';
      height: 100%;
      width: 1px;
      border-left: double #e08183;
    }
    .form-wrapper {
      width: 100%;
      height: 100%;
    }
  }

  .form-item {
    color: #333;
    margin-bottom: 10px;
    .last-item {
      border-bottom: none !important;
    }
    .value {
      width: $input-length;
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      height: $line-height;
    }

    .time {
      width: 100%;
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      .left-item {
        width: $input-length;
        .time-item {
          box-sizing: border-box;
          width: 90px;
          height: $line-height;
          background: #efefef;
          .time-input {
            box-sizing: border-box;
            width: 60px;
            padding-left: 16px;
            padding-right: 5px;
          }
        }
      }
    }
    .total {
      width: $input-length;
    }
  }
}

.form__field {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  border: none;
  color: #377d6a;
  outline: none;
  padding: 0 12px;
  background: #efefef;
}

@keyframes init {
  75% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0);
  }
}

.num {
  font-size: 20px;
  // font-family: "Shadows Into Light", cursive;
  color: #e07d70;
}

.gate {
  display: inline-block;
  font-weight: 400;
  color: #377d6a;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 78px; // Arbitrary.
  transition: all 0.3s ease-in-out;

  &::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
    font-size: 12px;
    letter-spacing: 1px;
  }

  + label {
    display: inline-block;
    box-sizing: border-box;
    width: 80px;
    height: $line-height;
    text-align: center;
    line-height: $line-height;

    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    text-shadow: 0 1px 0 rgba(19, 74, 70, 0.4);
    background: #7ab893;
    transition: all 0.4s ease-in-out;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    transform-origin: left bottom;
    z-index: 99;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 3px;
      background: #377d6a;
      transform-origin: left bottom;
      transition: all 0.4s ease-in-out;
      pointer-events: none;
      z-index: -1;
    }
    &:before {
      background: rgba(3, 36, 41, 0.2);
      z-index: -2;
      right: 20%;
    }
  }
}
span:nth-child(2) .gate {
  text-indent: 100px;
}
span:nth-child(2) .gate:focus,
span:nth-child(2) .gate:active {
  text-indent: 0;
}
.gate:focus,
.gate:active {
  color: #377d6a;
  text-indent: 0;
  // background: #fff;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;

  &::-webkit-input-placeholder {
    color: #aaa;
  }
  + label {
    transform: rotate(-66deg);
    border-radius: 3px;

    &:before {
      transform: rotate(10deg);
    }
  }
}

.bottom-item {
  width: 100%;
  height: $line-height;
  .form-item {
    height: 100%;
    margin-bottom: 0;
  }
}
</style>
