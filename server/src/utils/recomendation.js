"use strict";
exports.__esModule = true;
//ref https://www.sciencedirect.com/topics/computer-science/cosine-similarity#:~:text=Cosine%20similarity%20measures%20the%20similarity,document%20similarity%20in%20text%20analysis.
//ref https://www.kaggle.com/code/yassinehamdaoui1/creating-tf-idf-model-from-scratch/notebook
var jieba_zh_tw_1 = require("jieba-zh-tw");
var createJieba = require("js-jieba");
var jieba = createJieba(
  jieba_zh_tw_1.JiebaDict,
  jieba_zh_tw_1.HMMModel,
  jieba_zh_tw_1.UserDict,
  jieba_zh_tw_1.IDF,
  jieba_zh_tw_1.StopWords
);
var videoMetaData = [
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
var Tfidf = /** @class */ (function () {
  function Tfidf() {}
  Tfidf.prototype._tf = function (word, sentence) {
    return (
      sentence.filter(function (w) {
        return w === word;
      }).length / sentence.length
    );
  };
  Tfidf.prototype._df = function (word, document) {
    var count = 0;
    document.forEach(function (s) {
      s.includes(word) && ++count;
    });
    return count;
  };
  Tfidf.prototype._idf = function (word, document) {
    return Math.log10(document.length / this._df(word, document) + 1);
  };
  Tfidf.prototype.tfidf = function (word, sentence, document) {
    return this._tf(word, sentence) * this._idf(word, document);
  };
  return Tfidf;
})();
var CosineSimilarity = /** @class */ (function () {
  function CosineSimilarity() {}
  CosineSimilarity.prototype._dot = function (x, y) {
    var total = 0;
    if (x.length !== y.length) {
      throw new Error("x and y array must the same length");
    }
    for (var i = 0; i < x.length; ++i) {
      total += x[i] * y[i];
    }
    return total;
  };
  CosineSimilarity.prototype._norm = function (x) {
    return Math.sqrt(
      x.reduce(function (preValue, currentValue) {
        return (preValue += Math.pow(currentValue, 2));
      }, 0)
    );
  };
  CosineSimilarity.prototype.cosineSimilarity = function (x, y) {
    try {
      return this._dot(x, y) / (this._norm(x) * this._norm(y));
    } catch (e) {
      console.log(e);
    }
  };
  return CosineSimilarity;
})();
var Recommendation = /** @class */ (function () {
  function Recommendation(data) {
    this._data = [];
    this._tfidf = new Tfidf();
    this._cosineSim = new CosineSimilarity();
    //contain the weight of each word in array in array
    this._tfidfMatrix = [];
    // contain all the words in array;
    this._metaDataDocument = [];
    // contain each the word of video meta in array in array
    this._metaDataDocumentMatrix = [];
    this._cosineMatrix = [];
    this._data = data;
    this._processData();
  }
  Recommendation.prototype._processData = function () {
    var _this = this;
    this._data.forEach(function (d) {
      var _a;
      var separate = jieba.cut(d).filter(function (value) {
        return (
          value !== "#" &&
          value !== "~" &&
          value !== " " &&
          value !== "。" &&
          value !== ","
        );
      });
      (_a = _this._metaDataDocument).push.apply(_a, separate);
      _this._metaDataDocumentMatrix.push(separate);
    });
  };
  Recommendation.prototype._getTfidfMatrix = function () {
    var _this = this;
    var vocabDocument = Array.from(new Set(this._metaDataDocument));
    this._metaDataDocumentMatrix.forEach(function (sentence) {
      var tfidfArray = [];
      vocabDocument.forEach(function (word) {
        var value = _this._tfidf.tfidf(
          word,
          sentence,
          _this._metaDataDocumentMatrix
        );
        Number.isNaN(value) ? tfidfArray.push(0) : tfidfArray.push(value);
      });
      _this._tfidfMatrix.push(tfidfArray);
    });
  };
  Recommendation.prototype._sortCosine = function (cosineSimMap) {
    cosineSimMap.sort(function (x, y) {
      if (x.value > y.value) return -1;
      else if (x.value < y.value) return 1;
      else return 0;
    });
  };
  Recommendation.prototype.getRecommendation = function () {
    var _this = this;
    this._getTfidfMatrix();
    this._tfidfMatrix.forEach(function (row) {
      var cosineArray = [];
      _this._tfidfMatrix.forEach(function (rowInner) {
        var value = _this._cosineSim.cosineSimilarity(row, rowInner);
        cosineArray.push(value !== null && value !== void 0 ? value : 0);
      });
      _this._cosineMatrix.push(cosineArray);
    });
    var cosineSimMap = this._cosineMatrix[1].map(function (value, index) {
      return {
        id: index,
        value: value,
      };
    });
    this._sortCosine(cosineSimMap);
    var recommendedIndexes = cosineSimMap
      .filter(function (cosineS) {
        return cosineS.value > 0;
      })
      .map(function (value) {
        return value.id;
      });
    recommendedIndexes.splice(0, 1);
    return recommendedIndexes;
  };
  return Recommendation;
})();
exports["default"] = Recommendation;
var recommendationEngine = new Recommendation(videoMetaData);
var recommendedIndexes = recommendationEngine.getRecommendation();
console.log(recommendedIndexes);
console.log("Recommended for you :");
recommendedIndexes.forEach(function (recommendedIndex) {
  console.log(videoMetaData[recommendedIndex]);
});
