function deepCopy(data) {
  return JSON.parse(JSON.stringify(data))
}

let timeOld = undefined;

function fillData(n = 10) {
  if (!timeOld) {
    timeOld = new Date().getTime();
    return {
      x: [],
      y: []
    };
  }
  const timeNow = new Date().getTime();
  let y = [];
  let x = [];
  const dt = (timeNow - timeOld)
  for (let i = 0; i < n; i++) {
    x.push(timeOld + (dt * i) / n);
    y.push(Math.random().toFixed(2))
  }
  timeOld = timeNow;
  return {
    x: x,
    y: y
  }
}


let timeXYZOld = undefined;

function fillXYZData(n = 10) {
  let xyzData = [
    {
      x: [],
      y: []
    },
    {
      x: [],
      y: []
    },
    {
      x: [],
      y: []
    }]
  if (!timeXYZOld) {
    timeXYZOld = new Date().getTime();
    return xyzData;
  }
  const timeXYZNow = new Date().getTime();
  const dt = (timeXYZNow - timeXYZOld);

  for (let i = 0; i < n; i++) {
    const xData = timeXYZOld + (dt * i) / n;

    xyzData[0].x.push(xData);
    xyzData[1].x.push(xData);
    xyzData[2].x.push(xData);

    xyzData[0].y.push(Math.random().toFixed(3));
    xyzData[1].y.push(Math.random().toFixed(3));
    xyzData[2].y.push(Math.random().toFixed(3));

  }
  timeXYZOld = timeXYZNow;
  return xyzData
}


module.exports = { deepCopy, fillData, fillXYZData }