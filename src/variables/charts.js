// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################

const dailySalesChart = {
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [[12, 17, 7, 17, 23, 18, 38]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  // for animation
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

// ##############################
// // // Email Subscriptions
// #############################

const emailsSubscriptionChart = {
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
  },
  options: {
    axisX: {
      showGrid: false
    },
    low: 0,
    high: 1000,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

// ##############################
// // // Completed Tasks
// #############################

const completedTasksChart = {
  data: {
    labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
    series: [[230, 750, 450, 300, 280, 240, 200, 190]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};


const data_day = [
  {
    id: "day",
    day: "Monday",
    "recorded meeting": 10,
  },
  {
    day: "Tuesday",
    "recorded meeting": 11,
  },
  {
    day: "Wednesday",
    "recorded meeting": 15,
  },
  {
    day: "Thursday ",
    "recorded meeting": 7,
  },
  {
    day: "Friday ",
    "recorded meeting": 27,
  },
  {
    day: "Saturday ",
    "recorded meeting": 3,
  },
  {
    day: "Sunday ",
    "recorded meeting": 4,
  },
];

const data_week = [
  {
    id: "week",
    week: "firstweek",
    "recorded meeting": 30,
  },
  {
    week: "secondweek",
    "recorded meeting": 40,
  },
  {
    week: "thirdweek",
    "recorded meeting": 50,
  },
  {
    week: "fourthweek ",
    "recorded meeting": 60,
  },
  {
    week: "fifthweek ",
    "recorded meeting": 70,
  },
  {
    week: "sixthhweek ",
    "recorded meeting": 80,
  },
  {
    week: "seventhweek ",
    "recorded meeting": 90,
  },
];
const data_month = [
  {
    id: "month",
    month: "Jan",
    "recorded meeting": 100,
  },
  {
    month: "Feb",
    "recorded meeting": 200,
  },
  {
    month: "Mar",
    "recorded meeting": 500,
  },
  {
    month: "Apr ",
    "recorded meeting": 700,
  },
  {
    month: "May ",
    "recorded meeting": 100,
  },
  {
    month: "June ",
    "recorded meeting": 400,
  },
  {
    month: "July ",
    "recorded meeting": 50,
  },
];

module.exports = {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  data_day,
  data_week,
  data_month
};
