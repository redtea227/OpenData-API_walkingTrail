//快速搜尋區
let cityName = ["基隆", "臺北", "新北", "桃園", "新竹", "苗栗", "臺中", "南投", "彰化", "雲林", "嘉義", "臺南", "高雄", "屏東", "宜蘭", "花蓮", "臺東", "連江"]
for (let i = 0; i < cityName.length; i++) {
  city = cityName[i];
  // console.log(city)
  $(".cityButton").append(`
  <a href="#" class="btn btn-outline-primary rounded-circle">${city}</a>
  `)
}




//Load 3 api
$.when(
  $.getJSON('apiForestBasic.php').done(function (re) {
    forestBasic = re;
  }),
  $.getJSON('apiForestOpen.php').done(function (re) {
    forestOpen = re;
  }),
  $.getJSON('apiWalk.php').done(function (re) {
    walk = re.XML_Head.Infos.Info;
  }))
  .then(function () {
    //最新動態
    // console.log(walk)
    for (let i = 0; i < forestOpen.length; i++) {
      const row = forestOpen[i]
      $("#forestOpenTable tbody").append(`
    <tr>
      <td><div>${row.ANN_DATE}</div></td>
      <td><div>${row.DEP_NAME}</div></td>
      <td><div>${row.TR_CNAME}</div></td>
      <td><div>${row.Title}</div></td>
      <td><div>${row.TR_TYP}</div></td>
    </tr>
    `);
    };

    //步道資訊
    for (let i = 0; i < forestBasic.length; i++) {
      const row = forestBasic[i];

      $("#forestBasicTable tbody").append(`
    <tr>
      <td><div>${row.TRAILID}</div></td>
      <td><div>${row.TR_ENTRANCE}</div></td>
      <td><div>${row.TR_CNAME}</div></td>
      <td><div>${row.TR_LENGTH}</div></td>
      <td><div>${row.TR_ALT}m</div></td>
      <td><div>${row.TR_PAVE}</div></td>
      <td><div>${row.TR_BEST_SEASON}</div></td>
      <td><div>${row.TR_TOUR}</div></td>
      <td><div>${row.TR_SPECIAL}</div></td>
    </tr>
    `);
    }


    //休閒步道
    const chkName = new Array();//檢查重複步道
    for (let i = 0; i < walk.length; i++) {
      const row = walk[i];
      if (!chkName.includes(row.Name)) {
        chkName.push(row.Name);
        $("#walkTable tbody").append(`
      <tr>
        <td><div>${row.E_Place}</div></td>
        <td><div>${row.Name}</div></td>
        <td><div>${row.Toldescribe}</div></td>
        <td><div>${row.Height}m</div></td>
        <td><div>${row.Walkingtime}小時</div></td>
        <td><div>${row.Travellinginfo}</div></td>
      </tr>
      `);
      }
    }

    // datatable初始化
    let tables = $('.dataTable').DataTable();
    let tableOpen = $('#forestOpenTable').DataTable({
      "order": [[0, "desc"]]
    })

    //搜尋關鍵字
    $(".cityButton a").click(function () {
      cityName = this.innerHTML;
      tables.search(cityName).draw();
      tableOpen.search(cityName).draw();
    });

    //nav-button 頁籤切換
    $("#open").show();
    $('.dropdown-menu a').click(function () {
      $(".tableDiv").hide();
      $('.tableDiv[data-name="' + $(this).attr('data-target') + '"]').show();
      tables.search('').draw();
      tableOpen.search('').draw();
    })
  });
  
  
// forecast table
$.getJSON('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-77F7EF76-6578-458C-ACDF-72ABF4BE7727&downloadType=WEB&format=JSON').done(function (re) {
  // re => data => DOM write => HTML
  let data = re.cwbopendata.dataset.location;
  // console.log(data);
  //標題
  const hurTxt = new Array();
  hurTxt[0] = "凌晨"; //n
  hurTxt[6] = "白天"; //d
  hurTxt[12] = "下午"; //d
  hurTxt[18] = "晚上"; //n
  // console.log(hurTxt);

  const
    time0 = moment(new Date(data[21].weatherElement[0].time[0].startTime)),
    time1 = moment(new Date(data[21].weatherElement[0].time[1].startTime)),
    time2 = moment(new Date(data[21].weatherElement[0].time[2].startTime)),

    timeTxt0 = `${time0.format("ll")} ${hurTxt[time0.hour()]}`,
    timeTxt1 = `${time1.format("ll")} ${hurTxt[time1.hour()]}`,
    timeTxt2 = `${time2.format("ll")} ${hurTxt[time2.hour()]}`;
  // console.log(time0);

  // th文字嵌入
  $("#forecastTable tr>th").eq(2).text(timeTxt0);
  $("#forecastTable tr>th").eq(3).text(timeTxt1);
  $("#forecastTable tr>th").eq(4).text(timeTxt2);

  //白天夜晚icon判斷
  const
    iconTxt0 = (time0.hours() == 6 || time0.hours() == 12) ? "day" : "night",
    iconTxt1 = (time1.hours() == 6 || time1.hours() == 12) ? "day" : "night",
    iconTxt2 = (time2.hours() == 6 || time2.hours() == 12) ? "day" : "night";



  // 22個城市
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    $("#forecastTable tbody").append(`
    <tr>
      <td>${i + 1}</td>
      <td>${row.locationName}</td>
      <td>
        <img src="img/${iconTxt0}/${row.weatherElement[0].time[0].parameter.parameterValue}.svg" style="float:left;width:3rem">
        ${row.weatherElement[0].time[0].parameter.parameterName} <br>
        溫度 ${row.weatherElement[2].time[0].parameter.parameterName} ~ ${row.weatherElement[1].time[0].parameter.parameterName} ℃
      </td>
      <td>
        <img src="img/${iconTxt1}/${row.weatherElement[0].time[1].parameter.parameterValue}.svg" style="float:left;width:3rem;">
        ${row.weatherElement[0].time[1].parameter.parameterName}<br>
        溫度 ${row.weatherElement[2].time[1].parameter.parameterName} ~ ${row.weatherElement[1].time[1].parameter.parameterName} ℃
      </td>
      <td>
        <img src="img/${iconTxt2}/${row.weatherElement[0].time[2].parameter.parameterValue}.svg" style="float:left;width:3rem;">
        ${row.weatherElement[0].time[2].parameter.parameterName}<br>
        溫度 ${row.weatherElement[2].time[2].parameter.parameterName} ~ ${row.weatherElement[1].time[2].parameter.parameterName} ℃
      </td>
    
    </tr>
  `);
  }
}).fail(function (re) {
  console.log("api error!", re);
});

// terperature table
var dayprint = $('#dayChart');
var nightprint = $('#nightChart');
let tp, nt, tu, kl;
const
  xLabel = new Array(),
  tpTH = new Array(),
  ntTH = new Array(),
  tuTH = new Array(),
  klTH = new Array(),
  tpTL = new Array(),
  ntTL = new Array(),
  tuTL = new Array(),
  klTL = new Array();

$.getJSON('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-005?Authorization=CWB-77F7EF76-6578-458C-ACDF-72ABF4BE7727&downloadType=WEB&format=JSON')
  .done(function (re) {
    // console.log(re)
    tp = re.cwbopendata.dataset.location[0];
    nt = re.cwbopendata.dataset.location[1];
    tu = re.cwbopendata.dataset.location[2];
    kl = re.cwbopendata.dataset.location[6];

    for (const item of tp.weatherElement[0].time) {
      xLabel.push(item.startTime.substring(5, 13)); //14個時間做為X軸標題
    }
    for (const item of tp.weatherElement[1].time) {
      tpTH.push(item.parameter.parameterName); //tp 14個時間之最高溫度
    }
    for (const item of nt.weatherElement[1].time) {
      ntTH.push(item.parameter.parameterName); //nt 14個時間之最高溫度
    }
    for (const item of tu.weatherElement[1].time) {
      tuTH.push(item.parameter.parameterName); //tu 14個時間之最高溫度
    }
    for (const item of kl.weatherElement[1].time) {
      klTH.push(item.parameter.parameterName); //kl 14個時間之最高溫度
    }
    for (const item of tp.weatherElement[2].time) {
      tpTL.push(item.parameter.parameterName); //tp 14個時間之最低溫度
    }
    for (const item of nt.weatherElement[2].time) {
      ntTL.push(item.parameter.parameterName); //nt 14個時間之最低溫度
    }
    for (const item of tu.weatherElement[2].time) {
      tuTL.push(item.parameter.parameterName); //tu 14個時間之最低溫度
    }
    for (const item of kl.weatherElement[2].time) {
      klTL.push(item.parameter.parameterName); //kl 14個時間之最低溫度
    }


    var myChart = new Chart(dayprint, {
      type: 'line',
      data: {
        labels: xLabel, // X軸標題
        datasets: [{
          label: tp.locationName, //分類標籤
          data: tpTH,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          tension: 0.3, //圓滑度
          fill: true, //填滿
          borderDash: [5, 5], //點與點間距
        },
        {
          label: nt.locationName,
          data: ntTH,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          tension: 0.3,
          fill: true,
          borderDash: [5, 5],
        },
        {
          label: tu.locationName,
          data: tuTH,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.1)',
          tension: 0.3,
          fill: true,
          borderDash: [5, 5],
        },
        {
          label: kl.locationName,
          data: klTH,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          tension: 0.3,
          fill: true,
          borderDash: [5, 5],
        },
        ]
      },
      //y軸數值間距
      options: {
        scales: {
          y: {
            // beginAtZero: true
            ticks: { stepSize: 0.5 },
            grace: 1

          }
        }
      }
    });
    var myChart = new Chart(nightprint, {
      type: 'line',
      data: {
        labels: xLabel, // X軸標題
        datasets: [{
          label: tp.locationName,
          data: tpTL,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          tension: 0.3,
          fill: true,
          borderDash: [5, 5],
        },
        {
          label: nt.locationName,
          data: ntTL,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          tension: 0.3,
          fill: true,
          borderDash: [5, 5],
        },
        {
          label: tu.locationName,
          data: tuTL,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.1)',
          tension: 0.3,
          fill: true,
          borderDash: [5, 5],
        },
        {
          label: kl.locationName,
          data: klTL,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          tension: 0.3,
          fill: true,
          borderDash: [5, 5],
        },
        ]
      },
      options: {
        scales: {
          y: {
            // beginAtZero: true
            ticks: { stepSize: 0.5 },
            grace: 1
          }
        }
      }
    });
  });
