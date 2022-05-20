import GuessSlot from "./components/GuessSlot/GuessSlot.vue";
import { pinyin } from "pinyin-pro";
import { quiz } from "./resources/phase";

export default {
  name: "App",
  components: {
    GuessSlot,
  },
  data() {
    return {
      // 页面控制
      rowIndex: 0,
      // 猜题控制
      quizArr: [],
      word: "",
      wordPinyinStr: "",
      wordPinyinList: [],
      freq: {},
      isEnd: false,
      // 多行显示控制
      lens: 0,
      lensList: [],
      guessClass: [],
      guess: [],
    };
  },
  computed: {
    wordGrid() {
      const [len0, len1, len2, len3] = this.lensList;
      return `display: grid; grid-template-columns: ${len0}fr ${len1}fr ${len2}fr ${len3}fr; gap: 1rem`;
    },
    letterGrid() {
      return "display: flex;";
    },
  },
  created() {
    this.processWord();
    this.process();
  },
  mounted() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Backspace") {
        this.guess[this.rowIndex].pop();
        return;
      }
      if (event.key === "Enter") {
        this.check();
        return;
      }
      const keyCode = event.key.toLowerCase().charCodeAt(0);
      if (
        event.key.toLowerCase().length === 1 &&
        keyCode >= 97 &&
        keyCode <= 122 &&
        this.guess[this.rowIndex].length < this.lens
      ) {
        this.guess[this.rowIndex].push(event.key);
      }
    });
  },
  methods: {
    letterPosition(wordKey, letterKey) {
      let num = 0;
      for (let i = 0; i < wordKey; i++) {
        num += this.lensList[i];
      }
      return num + letterKey;
    },
    processWord() {
      const arr = [];
      for (let i = 0; i < 800; i += 4) {
        arr.push(quiz.substring(i, i + 4));
      }
      this.quizArr = arr;
    },
    process() {
      this.word = this.quizArr[Math.floor(Math.random() * this.quizArr.length)];
      this.wordPinyinList = pinyin(this.word, {
        toneType: "none",
        type: "array",
      });
      this.wordPinyinStr = pinyin(this.word, {
        toneType: "none",
      })
        .split(" ")
        .join("");
      // 频数统计
      this.wordPinyinStr.split("").forEach((element) => {
        if (this.freq[element]) {
          this.freq[element]++;
        } else {
          this.freq[element] = 1;
        }
      });
      // 变量初始化
      this.rowIndex = 0;
      // 长度
      this.lens = this.wordPinyinStr.length;
      this.lensList = [
        this.wordPinyinList[0].length,
        this.wordPinyinList[1].length,
        this.wordPinyinList[2].length,
        this.wordPinyinList[3].length,
      ];
      // 猜测
      this.guess = new Array(6).fill(0).map(() => new Array());
      // 类控制
      this.guessClass = new Array(6)
        .fill(0)
        .map(() => new Array(this.lens).fill("guess-normal"));
    },
    check() {
      if (this.isEnd) {
        return;
      }
      const freq = JSON.parse(JSON.stringify(this.freq));
      for (let i = 0; i < this.lens; i++) {
        if (this.wordPinyinStr[i] === this.guess[this.rowIndex][i]) {
          this.guessClass[this.rowIndex][i] = "guess-green";
          freq[this.guess[this.rowIndex][i]]--;
        }
      }
      for (let i = 0; i < this.lens; i++) {
        if (this.guessClass[this.rowIndex][i] === "guess-green") {
          continue;
        }
        if (freq[this.guess[this.rowIndex][i]]) {
          this.guessClass[this.rowIndex][i] = "guess-yellow";
          freq[this.guess[this.rowIndex][i]]--;
        } else {
          this.guessClass[this.rowIndex][i] = "guess-grey";
        }
      }
      let correct = true;
      for (let i = 0; i < this.lens; i++) {
        if (this.guessClass[this.rowIndex][i] !== "guess-green") {
          correct = false;
        }
      }
      if (correct) {
        this.$message({
          message: "答案正确！",
          type: "success",
          duration: 5000,
        });
      }
      // 逻辑结束
      this.rowIndex++;
      if (this.rowIndex === 6) {
        this.isEnd = true;
        this.$message({
          message: this.word,
          duration: 5000,
        });
      }
    },
  },
};
