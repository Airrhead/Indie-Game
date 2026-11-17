$(document).ready(function () {
  var THRESHOLD = 100; // fixed minimum review count for the comparison sample
  var eventnum = 1;
  var drawnEvents = [];

  var swiper = new Swiper(".calculator", {
    allowTouchMove: false,
    effect: "fade",
    fadeEffect: { crossFade: true },
  });

  // 第1页
  $("#slide1-btn").on("mouseover", function () {
    this.setAttribute("src", "images/button2-en.svg");
  });
  $("#slide1-btn").on("mouseout", function () {
    this.setAttribute("src", "images/button1-en.svg");
  });
  $("#slide1-btn").on("click", function () {
    $("#fanye")[0].play();
    swiper.slideNext();
  });

  // 第2页
  $("#price").on("input", function () {
    $("#priceSpan").html(this.value);
  });
  $("#salary").on("input", function () {
    $("#salarySpan").html(this.value);
  });
  $("#peoplenum").on("input", function () {
    $("#peoplenumSpan").html(this.value);
  });
  $("#period").on("input", function () {
    $("#periodSpan").html(this.value);
  });
  $("#slide2-btn").on("click", function () {
    $("#fanye")[0].play();
    var arrIndex = [];
    for (var k = 0; k < events.length; k++) arrIndex.push(k);
    shuffleArray(arrIndex);
    drawnEvents = [events[arrIndex[0]], events[arrIndex[1]], events[arrIndex[2]]];

    for (var n = 0; n < 3; n++) {
      var ev = drawnEvents[n];
      $(".eventname" + (n + 1)).html(
        ev.name + ' <span class="event-effect">' + effectLabel(ev) + "</span>"
      );
      $(".eventsource" + (n + 1)).html(ev.source);
    }
    swiper.slideNext();
    $(".randomevent1").addClass("animate__bounceInDown");
  });

  // 第3页
  $("#slide3-btn").on("click", function () {
    $("#fanye")[0].play();
    switch (eventnum) {
      case 1:
        $(".randomevent2").addClass("animate__bounceInDown");
        eventnum++;
        break;
      case 2:
        $(".randomevent3").addClass("animate__bounceInDown");
        eventnum++;
        break;
      default:
        begin_calc();
        swiper.slideNext();
    }
  });

  // 第4页：重玩（移出第3页的回调，避免重复绑定）
  $("#slide4-btn").on("click", function () {
    eventnum = 1;
    drawnEvents = [];
    swiper.slideTo(1);
    $(".randomevent1").removeClass("animate__bounceInDown");
    $(".randomevent2").removeClass("animate__bounceInDown");
    $(".randomevent3").removeClass("animate__bounceInDown");
  });

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 生成一个随机数，范围为[0,i]
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换位置
    }
    return arr;
  }

  // 事件卡上显示的效果标签
  function effectLabel(ev) {
    var parts = [];
    if (ev.months > 0) parts.push("Development +" + ev.months + (ev.months === 1 ? " month" : " months"));
    if (ev.months < 0) parts.push("Development " + ev.months + (ev.months === -1 ? " month" : " months"));
    if (ev.cost < 0) parts.push("Costs −CNY " + Math.abs(ev.cost).toLocaleString("en-US"));
    if (ev.cost > 0) parts.push("Costs +CNY " + ev.cost.toLocaleString("en-US"));
    if (ev.revenue !== 1) {
      var pct = Math.round((ev.revenue - 1) * 100);
      parts.push("Revenue " + (pct > 0 ? "+" : "−") + Math.abs(pct) + "%");
    }
    return parts.join(" · ");
  }

  function begin_calc() {
    var price = Number($("#price").val());
    var salary = Number($("#salary").val());
    var peoplenum = Number($("#peoplenum").val());
    var period = Number($("#period").val());

    // 叠加三个事件的效果
    var extraMonths = 0;
    var costChange = 0;
    var revenueMultiplier = 1;
    for (var n = 0; n < drawnEvents.length; n++) {
      extraMonths += drawnEvents[n].months;
      costChange += drawnEvents[n].cost;
      revenueMultiplier *= drawnEvents[n].revenue;
    }

    var months = Math.max(1, period + extraMonths);
    var dev_expenses = Math.max(0, salary * 1000 * peoplenum * months + costChange);

    var alive_gamenum = 0;
    var dead_gamenum = 0;
    for (var i = 0; i < gameArr.length; i++) {
      var all_comments = gameArr[i].good_comments + gameArr[i].bad_comments;
      if (all_comments < THRESHOLD) continue;
      var income_forecast = all_comments * 30 * price * 0.65 * revenueMultiplier;
      if (income_forecast > dev_expenses) {
        alive_gamenum += 1;
      } else {
        dead_gamenum += 1;
      }
    }

    var total_gamenum = alive_gamenum + dead_gamenum;
    var death_rate = dead_gamenum / total_gamenum;
    $("#result").html((death_rate * 100).toFixed(1) + "%");
    if (death_rate < 0.5) {
      $("#gameresult").attr("src", "images/活.png");
    } else {
      $("#gameresult").attr("src", "images/死.png");
    }
  }
});