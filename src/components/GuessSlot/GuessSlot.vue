<template>
  <div class="block">{{ getGuess }}</div>
</template>

<script>

export default {
  name: 'GuessSlot',
  props: {
    guess: {
      type: String
    }
  },
  created() {
  },
  computed: {
    getGuess() {
      if (this.guess) {
        return this.guess.toUpperCase();
      } else {
        return '';
      }
    }
  },
}
</script>

<style>
.block {
  height: 80px;
  width: 60px;
  margin: 0 1px;
  color: white;
  font-size: 70px;
}

.guess-normal {
  background-color:lightgray;
}

.guess-green {
  background-color: green;
}

.guess-yellow {
  background-color: orange;
}

.guess-grey {
  background-color: gray;
}
</style>
