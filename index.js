class Chart {
  constructor(xData, yData, canvasId, chartContainer) {
    this.canvas = document.getElementById("canvasChart");
    this.chartContainer = document.getElementById("chartContainer");
    this.canvas.width = 1000;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext("2d");
    this.xData = xData;
    this.yData = yData;
    this.xUnit = this.canvas.width / xData.length;
    this.maxValue = Math.max(...yData);
    this.yUnit = this.canvas.height / this.maxValue;
  }
  createBottomLabelContainer() {
    this.bottomLabelContainer = document.createElement("div");
    this.bottomLabelContainer.style.position = "absolute";
    this.bottomLabelContainer.style.width = "100%";
    this.bottomLabelContainer.style.height = "50px";
    this.bottomLabelContainer.style.left = "0px";
    this.bottomLabelContainer.style.bottom = "-50px";
    chartContainer.appendChild(this.bottomLabelContainer);
  }
  createLeftLabelContainer() {
    this.leftLabelContainer = document.createElement("div");
    this.leftLabelContainer.style.position = "absolute";
    this.leftLabelContainer.style.width = "50px";
    this.leftLabelContainer.style.top = "0px";
    this.leftLabelContainer.style.left = "-60px";
    this.leftLabelContainer.style.height = "100%";
    this.chartContainer.appendChild(this.leftLabelContainer);
  }

  createSubLeftLabel(value, yUnit) {
    const spanCol = document.createElement("span");
    spanCol.textContent = value;
    spanCol.style.display = "block";
    spanCol.style.position = "absolute";
    spanCol.style.left = "50%";
    spanCol.style.transform = "translateX(-50%)";
    spanCol.style.fontSize = "13px";
    spanCol.style.bottom = value * yUnit + "px";
    spanCol.style.color = "white";
    return spanCol;
  }
  createSubBottomLabel(value, xUnit, index) {
    const spanRow = document.createElement("span");
    spanRow.textContent = value;
    spanRow.style.display = "block";
    spanRow.style.position = "absolute";
    spanRow.style.top = "50%";
    spanRow.style.fontSize = "13px";
    spanRow.style.transform = "translateY(-50%)";
    spanRow.style.left = index * xUnit + xUnit / 4 + "px";
    spanRow.style.color = "white";
    return spanRow;
  }

  draw() {
    this.createLeftLabelContainer();
    this.createBottomLabelContainer();
    if (!Array.isArray(this.xData) || !Array.isArray(this.yData)) {
      throw new Error("xData and yData must be an array");
    } else if (this.xData.length !== this.yData.length) {
      throw new Error("xData and yData must be the same length");
    }

    for (let i = 0; i < this.xData.length; i++) {
      const gradientColor = this.ctx.createLinearGradient(
        i * this.xUnit + this.xUnit / 4,
        this.canvas.height - xData[i] * this.yUnit,
        i * this.xUnit + this.xUnit / 4 + this.xUnit / 2,
        this.canvas.height - xData[i] * this.yUnit
      );
      gradientColor.addColorStop(0, "green");
      gradientColor.addColorStop(0.8, "white");
      this.ctx.fillStyle = gradientColor;

      this.ctx.beginPath();
      this.ctx.arc(
        i * this.xUnit + this.xUnit / 4,
        this.canvas.height - yData[i] * this.yUnit,
        5,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      this.ctx.moveTo(
        i * this.xUnit + this.xUnit / 4,
        this.canvas.height - yData[i] * this.yUnit
      );
      this.ctx.lineTo(
        (i + 1) * this.xUnit + this.xUnit / 4,
        this.canvas.height - yData[i + 1] * this.yUnit
      );
      this.ctx.strokeStyle = gradientColor;
      this.ctx.stroke();
      this.ctx.closePath();
      //   this.ctx.fillRect(
      //     i * this.xUnit + this.xUnit / 4,
      //     this.canvas.height - yData[i] * this.yUnit,
      //     this.xUnit / 2,
      //     yData[i] * this.yUnit
      //   );

      const subBottom = this.createSubBottomLabel(xData[i], this.xUnit, i);
      const subLeft = this.createSubLeftLabel(yData[i], this.yUnit);
      this.bottomLabelContainer.appendChild(subBottom);
      this.leftLabelContainer.appendChild(subLeft);
    }
  }
}

const xData = new Array(30).fill(0).map((_, index) => {
  return new Date(2000 + index + 1, 1, 1).getFullYear();
});

const yData = new Array(30).fill(0).map((_, index) => {
  const randomValue = (Math.random() * (10 * (index + 1))).toFixed(2);
  return randomValue;
});

const chart = new Chart(xData, yData);
try {
  chart.draw();
} catch (error) {
  console.log(error);
}
