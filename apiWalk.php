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
curl_setopt($curl, CURLOPT_URL, "https://gis.taiwan.net.tw/XMLReleaseALL_public/Walk_f.json");

//  基隆港歷年國際郵輪船期報表 https://www.twport.com.tw/Common/OdApi.ashx?n=25D5AEB455D55738&t=DB220A73A303F612

// 來台郵輪旅客國籍(以入境外籍旅客國籍人次進行統計) https://www.twport.com.tw/Common/OdApi.ashx?n=DEA2DA9CB50CB36C&t=DB220A73A303F612

// 景點 - 觀光資訊資料庫	https://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json

// 步道 https://gis.taiwan.net.tw/XMLReleaseALL_public/Walk_f.json

// 林務局自然步道基本資料 https://data.coa.gov.tw/Service/OpenData/ForestRtBasic.aspx

// 林務局自然步道路況資訊	https://data.coa.gov.tw/Service/OpenData/ForestRtOpen.aspx

// 執行 curl
$result = curl_exec($curl);

// 關閉 curl
curl_close($curl);

// echo $result;
?>