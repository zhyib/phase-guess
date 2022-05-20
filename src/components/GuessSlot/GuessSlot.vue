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
  height: 5rem;
  width: 4rem;
  margin: 0 0.1rem;
  color: white;
  font-size: 4.6rem;
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
