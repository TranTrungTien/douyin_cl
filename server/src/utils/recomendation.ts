//ref https://www.sciencedirect.com/topics/computer-science/cosine-similarity#:~:text=Cosine%20similarity%20measures%20the%20similarity,document%20similarity%20in%20text%20analysis.
//ref https://www.kaggle.com/code/yassinehamdaoui1/creating-tf-idf-model-from-scratch/notebook
import { HMMModel, IDF, JiebaDict, StopWords, UserDict } from "jieba-zh-tw";
import createJieba from "js-jieba";

const jieba = createJieba(JiebaDict, HMMModel, UserDict, IDF, StopWords);

const videoMetaData = [
  "花开花落自有时#飞花#要像飞花一样洒脱",
  "我是真的讨厌异地恋 也是真的喜欢你#异地恋",
  "6月13日，浙江余姚。女子突发疾病倒地抽搐，好心小伙询问120后先行急救。感谢好人带给我们的感动",
  "이쁘면 된다 ?",
  "给大家播个猫片  #铲屎官的乐趣 #猫咪的迷惑行为",
  "“突破感觉后背发凉”#猫咪",
  "“猫猫吵架后生气的样子”#猫咪#萌宠#猫",
  "一个平平无奇安静拍照的乖宝宝罢了#毕业",
  "长按复制此条消息，打开抖音搜索，查看TA的更多作品",
  "哥们儿真乃性情中人#原谅我不厚道的笑了 #一定要看到最后 #看一遍笑一遍 #惊不惊喜意不意外 #猝不及防 #人间奇趣记录仪 #流鼻血",
  "狗子竟然把房东的裙子夹在门上了😓我真的栓q了……#哈士奇",
  "挺急的这件事》#情侣日常",
  "#有你是我的福气 有我是你的福气",
  "#家有傻狗 #动物的迷惑行为 直接嚼了，还呑了？#这操作都看傻了 #后续来啦",
  "快进来躲雨啊",
  "虎门销包 #内容过于真实 #看一遍笑一遍 后续在下一个视频",
  "长按复制此条消息，打开抖音搜索，查看TA的更多作品。",
  "声音稍微有点小 可以戴上耳机然后调大一点点哦～戴耳机听更有感觉",
  "也是真的喜欢你 讨厌异地恋",
  "讨厌异地恋",
];
class Tfidf {
  constructor() {}
  private _tf(word: string, sentence: string[]): number {
    return sentence.filter((w) => w === word).length / sentence.length;
  }

  private _df(word: string, document: string[][]): number {
    let count = 0;
    document.forEach((s) => {
      s.includes(word) && ++count;
    });
    return count;
  }

  private _idf(word: string, document: string[][]) {
    return Math.log10(document.length / this._df(word, document) + 1);
  }

  tfidf(word: string, sentence: string[], document: string[][]) {
    return this._tf(word, sentence) * this._idf(word, document);
  }
}

class CosineSimilarity {
  constructor() {}
  private _dot(x: number[], y: number[]): number {
    let total = 0;
    if (x.length !== y.length) {
      throw new Error("x and y array must the same length");
    }
    for (let i = 0; i < x.length; ++i) {
      total += x[i] * y[i];
    }
    return total;
  }

  private _norm(x: number[]): number {
    return Math.sqrt(
      x.reduce((preValue, currentValue) => {
        return (preValue += currentValue ** 2);
      }, 0)
    );
  }

  cosineSimilarity(x: number[], y: number[]): number | undefined {
    try {
      return this._dot(x, y) / (this._norm(x) * this._norm(y));
    } catch (e) {
      console.log(e);
    }
  }
}

export default class Recommendation {
  private _data: string[] = [];
  private _tfidf = new Tfidf();
  private _cosineSim = new CosineSimilarity();
  //contain the weight of each word in array in array
  private _tfidfMatrix: number[][] = [];

  // contain all the words in array;
  private _metaDataDocument: string[] = [];

  // contain each the word of video meta in array in array
  private _metaDataDocumentMatrix: string[][] = [];

  private _cosineMatrix: number[][] = [];
  constructor(data: string[]) {
    this._data = data;
    this._processData();
  }
  private _processData() {
    this._data.forEach((d) => {
      const separate = jieba
        .cut(d)
        .filter(
          (value) =>
            value !== "#" &&
            value !== "~" &&
            value !== " " &&
            value !== "。" &&
            value !== ","
        );
      this._metaDataDocument.push(...separate);
      this._metaDataDocumentMatrix.push(separate);
    });
  }
  private _getTfidfMatrix() {
    const vocabDocument = Array.from(new Set(this._metaDataDocument));
    this._metaDataDocumentMatrix.forEach((sentence) => {
      const tfidfArray: number[] = [];
      vocabDocument.forEach((word) => {
        const value = this._tfidf.tfidf(
          word,
          sentence,
          this._metaDataDocumentMatrix
        );
        Number.isNaN(value) ? tfidfArray.push(0) : tfidfArray.push(value);
      });

      this._tfidfMatrix.push(tfidfArray);
    });
  }
  private _sortCosine(cosineSimMap: { id: number; value: number }[]) {
    cosineSimMap.sort((x, y) => {
      if (x.value > y.value) return -1;
      else if (x.value < y.value) return 1;
      else return 0;
    });
  }
  getRecommendation() {
    this._getTfidfMatrix();
    this._tfidfMatrix.forEach((row) => {
      const cosineArray: number[] = [];
      this._tfidfMatrix.forEach((rowInner) => {
        const value = this._cosineSim.cosineSimilarity(row, rowInner);
        cosineArray.push(value ?? 0);
      });
      this._cosineMatrix.push(cosineArray);
    });
    const cosineSimMap = this._cosineMatrix[1].map((value, index) => {
      return {
        id: index,
        value,
      };
    });
    this._sortCosine(cosineSimMap);
    const recommendedIndexes = cosineSimMap
      .filter((cosineS) => {
        return cosineS.value > 0;
      })
      .map((value) => {
        return value.id;
      });

    recommendedIndexes.splice(0, 1);
    return recommendedIndexes;
  }
}

const recommendationEngine = new Recommendation(videoMetaData);

const recommendedIndexes = recommendationEngine.getRecommendation();
console.log(recommendedIndexes);

console.log("Recommended for you :");

recommendedIndexes.forEach((recommendedIndex) => {
  console.log(videoMetaData[recommendedIndex]);
});
