//ref https://www.sciencedirect.com/topics/computer-science/cosine-similarity#:~:text=Cosine%20similarity%20measures%20the%20similarity,document%20similarity%20in%20text%20analysis.
//ref https://www.kaggle.com/code/yassinehamdaoui1/creating-tf-idf-model-from-scratch/notebook
import { fork } from "child_process";
import path from "path";
import { HMMModel, IDF, JiebaDict, StopWords, UserDict } from "jieba-zh-tw";
import createJieba from "js-jieba";
import { IVideo } from "../interface/video.interface";
import { IYourVideoLiked } from "../interface/liked.interface";

const jieba = createJieba(JiebaDict, HMMModel, UserDict, IDF, StopWords);

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
    this._getTfidfMatrix();
    this._calculateCosineMatrix();
  }
  private _processData() {
    try {
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
    } catch (error) {
      console.log("cant not cut text ...");
    }
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
  private _calculateCosineMatrix() {
    this._tfidfMatrix.forEach((row) => {
      const cosineArray: number[] = [];
      this._tfidfMatrix.forEach((rowInner) => {
        const value = this._cosineSim.cosineSimilarity(row, rowInner);
        cosineArray.push(value || 0);
      });
      this._cosineMatrix.push(cosineArray);
    });
  }
  getRecommendation(index: number) {}
  public getCosineMatrix() {
    return this._cosineMatrix;
  }
}

interface ITrainingData {
  [key: string]: {
    data: string;
    list: IVideo[];
    likedList: IYourVideoLiked[];
  };
}

// Bug??? Need to run training again when upload video
export class RecommendationUtils {
  private static index = 0;
  private static cosineMatrix: number[][] = [];
  private static trainingData: ITrainingData | null = null;
  private static _sortCosine(cosineSimMap: { id: number; value: number }[]) {
    cosineSimMap?.sort((x, y) => {
      if (x.value > y.value) return -1;
      else if (x.value < y.value) return 1;
      else return 0;
    });
  }
  public static saveTrainingData(
    key: string,
    data: { data: string; list: IVideo[]; likedList: IYourVideoLiked[] }
  ) {
    if (!RecommendationUtils.trainingData)
      RecommendationUtils.trainingData = { [key]: data };
    else RecommendationUtils.trainingData[key] = data;
  }
  public static getTrainingData(key: string) {
    return (
      RecommendationUtils.trainingData && RecommendationUtils.trainingData[key]
    );
  }
  public static getRecommendedBasedOnVideoIndexes(index: number) {
    if (this.cosineMatrix) {
      const cosineSimMap = RecommendationUtils.cosineMatrix[index]?.map(
        (value, index) => {
          return value
            ? {
                id: index,
                value,
              }
            : {
                id: index,
                value: 0,
              };
        }
      );
      this._sortCosine(cosineSimMap);
      const recommendedIndexes = cosineSimMap
        ?.filter((cosineS) => {
          return cosineS.value > 0.1;
        })
        ?.map((value) => {
          return value.id;
        });
      recommendedIndexes?.splice(0, 1);
      return recommendedIndexes ? recommendedIndexes : undefined;
    } else {
      return undefined;
    }
  }
  public static trainRecommendedBasedOnVideo(): Promise<boolean> {
    console.log("training ...");

    return new Promise((resolve, reject) => {
      const childProcess = fork(path.join(__dirname, "rbc_training.ts"));
      childProcess.on("close", (c) => {
        console.log({ c });
      });
      childProcess.on("message", (data: number[][]) => {
        if (data) {
          this.cosineMatrix = data;
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
  public static getSearchRecommended = (text: string, limit: string) => {
    return new Promise<string[]>((resolve, reject) => {
      const childProcess = fork(path.join(__dirname, "search_training.ts"));
      childProcess.send({ text, limit });
      childProcess.on("close", (c) => {
        console.log({ c });
      });
      childProcess.on("message", (data: string[]) => {
        if (!data) {
          reject(new Error("No match found"));
        } else {
          resolve(data);
        }
      });
      childProcess.on("error", (err) => {
        reject(err);
      });
    });
  };
}
