# OpenData API 串接
Demo link http://220.128.133.15/s1100217/portfolio/walkingTrail_api/
<hr>
<h3>網頁技術</h3>
• Boostrap5 gird排版並RWD設計<br>
• datatable moment.js chart.js套件<br>
• Google Analytics流量統計 分析數據<br>
• 天氣預報使用moment.js來存取時間<br>
<pre>
  const
    time0 = moment(new Date(data[21].weatherElement[0].time[0].startTime)),
    time1 = moment(new Date(data[21].weatherElement[0].time[1].startTime)),
    time2 = moment(new Date(data[21].weatherElement[0].time[2].startTime)),

    timeTxt0 = `${time0.format("ll")} ${hurTxt[time0.hour()]}`,
    timeTxt1 = `${time1.format("ll")} ${hurTxt[time1.hour()]}`,
    timeTxt2 = `${time2.format("ll")} ${hurTxt[time2.hour()]}`;
</pre>
• 重複步道資料過濾 宣告空陣列 每次迴圈都判斷<br>
<pre>const chkName = new Array();//檢查重複步道
    for (let i = 0; i < walk.length; i++) {
      const row = walk[i];
      if (!chkName.includes(row.Name)) {
        chkName.push(row.Name);
        $("#walkTable tbody").append(`
</pre>
• 透過後端伺服器php curl取得api轉交給同網域之 JS(CORS 禁止連線）<br>
<pre>
<?php
// 初始化 CURL
$curl = curl_init();

// 識別發出請求的軟體類型或版本號、該軟體使用的作業系統、還有軟體開發者的字詞串。
// 參考 https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers/User-Agent
curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36");

//要驗證伺服器 SSL 憑證，當拜訪 https 網站時，若未做任何 SSL 相關設定，會出現錯誤。
// 設為 false 為可以接受任何伺服器憑證。
// 參考 https://www.plurk.com/p/e797gs
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

// 將 curl_exec() 獲取結果以文字串方式返回，而不是直接印出。
// 如果你只是要轉給前端可以不寫此行（預設 false)，剛好省下最後的 echo 動作
// 反之為 true 可事後要做 echo 給前端（用 Ajax 來取）或透過 php 輸出 HTML
// curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

// 設定 URL 位置
curl_setopt($curl, CURLOPT_URL, "https://data.coa.gov.tw/Service/OpenData/ForestRtBasic.aspx");


// 執行 curl
$result = curl_exec($curl);

// 關閉 curl
curl_close($curl);

?>
</pre>
