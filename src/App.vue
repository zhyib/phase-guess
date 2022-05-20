<template>
  <div class="flex">
    <div v-for="(item, rowKey) in 6" :key="rowKey">
      <span :style="wordGrid">
        <span v-for="(wordKeyItem, wordKey) in 4" :key="wordKey">
          <span :style="letterGrid">
            <span v-for="(letterKeyItem, letterKey) in wordPinyinList[wordKey]" :key="letterKey">
              <GuessSlot
                :key="letterKey"
                :guess="guess[rowKey][letterPosition(wordKey, letterKey)]"
                :class="guessClass[rowKey][letterPosition(wordKey, letterKey)]">
              </GuessSlot>
            </span>
          </span>
        </span>
      </span>
    </div>
    <el-button @click="check()">check</el-button>
  </div>
</template>

<script src="./core"></script>

<style>
.flex {
  display: flex;
  flex-direction: column;
  gap: 1rem
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  display: flex;
  justify-content: space-around;
}

@media screen and (max-width: 800px){
  html {
    font-size: 5px;
  }
}
</style>
