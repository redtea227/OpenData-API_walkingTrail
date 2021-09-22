# OpenData API 串接
Demo link http://220.128.133.15/s1100217/portfolio/walkingTrail_api/
<hr>
<h3>網頁技術</h3>
• Boostrap5 gird排版並RWD設計<br>
• datatable moment.js chart.js套件<br>
• Google Analytics流量統計 分析數據<br>
• 天氣預報使用moment.js來存取時間<br>
<pre>const
    time0 = moment(new Date(data[21].weatherElement[0].time[0].startTime)),
    time1 = moment(new Date(data[21].weatherElement[0].time[1].startTime)),
    time2 = moment(new Date(data[21].weatherElement[0].time[2].startTime)),

    timeTxt0 = `${time0.format("ll")} ${hurTxt[time0.hour()]}`,
    timeTxt1 = `${time1.format("ll")} ${hurTxt[time1.hour()]}`,
    timeTxt2 = `${time2.format("ll")} ${hurTxt[time2.hour()]}`;</pre>
• 重複步道資料過濾 宣告空陣列 每次迴圈都判斷<br>
<pre>const chkName = new Array();//檢查重複步道
    for (let i = 0; i < walk.length; i++) {
      const row = walk[i];
      if (!chkName.includes(row.Name)) {
        chkName.push(row.Name);
        $("#walkTable tbody").append(`</pre>
• 透過後端伺服器php curl取得api轉交給同網域之 JS(CORS 禁止連線）<br>
