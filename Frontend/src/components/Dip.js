import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/starFeul_Petroleum.png";
import "../css/output.css";

const Dip = () => {
  const [fuelType, setFuelType] = useState("");
  const [mmValue, setMmValue] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");

  const petrolData = [
    {
      mm: 5,
      litres: 4,
    },
    {
      mm: 10,
      litres: 9,
    },
    {
      mm: 15,
      litres: 14,
    },
    {
      mm: 20,
      litres: 21,
    },
    {
      mm: 25,
      litres: 32,
    },
    {
      mm: 30,
      litres: 40,
    },
    {
      mm: 35,
      litres: 49,
    },
    {
      mm: 40,
      litres: 59,
    },
    {
      mm: 45,
      litres: 74,
    },
    {
      mm: 50,
      litres: 85,
    },
    {
      mm: 55,
      litres: 113,
    },
    {
      mm: 60,
      litres: 126,
    },
    {
      mm: 65,
      litres: 138,
    },
    {
      mm: 70,
      litres: 151,
    },
    {
      mm: 75,
      litres: 172,
    },
    {
      mm: 80,
      litres: 180,
    },
    {
      mm: 85,
      litres: 200,
    },
    {
      mm: 90,
      litres: 215,
    },
    {
      mm: 95,
      litres: 237,
    },
    {
      mm: 100,
      litres: 253,
    },
    {
      mm: 105,
      litres: 260,
    },
    {
      mm: 110,
      litres: 285,
    },
    {
      mm: 115,
      litres: 309,
    },
    {
      mm: 120,
      litres: 326,
    },
    {
      mm: 125,
      litres: 343,
    },
    {
      mm: 130,
      litres: 361,
    },
    {
      mm: 135,
      litres: 387,
    },
    {
      mm: 140,
      litres: 405,
    },
    {
      mm: 145,
      litres: 424,
    },
    {
      mm: 150,
      litres: 452,
    },
    {
      mm: 155,
      litres: 470,
    },
    {
      mm: 160,
      litres: 490,
    },
    {
      mm: 165,
      litres: 509,
    },
    {
      mm: 170,
      litres: 539,
    },
    {
      mm: 175,
      litres: 559,
    },
    {
      mm: 180,
      litres: 579,
    },
    {
      mm: 185,
      litres: 599,
    },
    {
      mm: 190,
      litres: 630,
    },
    {
      mm: 195,
      litres: 651,
    },
    {
      mm: 200,
      litres: 672,
    },
    {
      mm: 205,
      litres: 694,
    },
    {
      mm: 210,
      litres: 726,
    },
    {
      mm: 215,
      litres: 748,
    },
    {
      mm: 220,
      litres: 770,
    },
    {
      mm: 225,
      litres: 792,
    },
    {
      mm: 230,
      litres: 826,
    },
    {
      mm: 235,
      litres: 849,
    },
    {
      mm: 240,
      litres: 872,
    },
    {
      mm: 245,
      litres: 906,
    },
    {
      mm: 250,
      litres: 930,
    },
    {
      mm: 255,
      litres: 953,
    },
    {
      mm: 260,
      litres: 977,
    },
    {
      mm: 265,
      litres: 1013,
    },
    {
      mm: 270,
      litres: 1037,
    },
    {
      mm: 275,
      litres: 1061,
    },
    {
      mm: 280,
      litres: 1085,
    },
    {
      mm: 285,
      litres: 1122,
    },
    {
      mm: 290,
      litres: 1147,
    },
    {
      mm: 295,
      litres: 1172,
    },
    {
      mm: 300,
      litres: 1197,
    },
    {
      mm: 305,
      litres: 1236,
    },
    {
      mm: 310,
      litres: 1261,
    },
    {
      mm: 315,
      litres: 1287,
    },
    {
      mm: 320,
      litres: 1313,
    },
    {
      mm: 325,
      litres: 1357,
    },
    {
      mm: 330,
      litres: 1378,
    },
    {
      mm: 335,
      litres: 1404,
    },
    {
      mm: 340,
      litres: 1444,
    },
    {
      mm: 345,
      litres: 1471,
    },
    {
      mm: 350,
      litres: 1498,
    },
    {
      mm: 355,
      litres: 1524,
    },
    {
      mm: 360,
      litres: 1580,
    },
    {
      mm: 365,
      litres: 1592,
    },
    {
      mm: 370,
      litres: "",
    },
    {
      mm: 375,
      litres: 1619,
    },
    {
      mm: 380,
      litres: 1647,
    },
    {
      mm: 385,
      litres: 1680,
    },
    {
      mm: 390,
      litres: 1717,
    },
    {
      mm: 395,
      litres: 1745,
    },
    {
      mm: 400,
      litres: 1773,
    },
    {
      mm: 405,
      litres: 1815,
    },
    {
      mm: 410,
      litres: 1844,
    },
    {
      mm: 415,
      litres: 1872,
    },
    {
      mm: 420,
      litres: 1901,
    },
    {
      mm: 425,
      litres: 1944,
    },
    {
      mm: 430,
      litres: 1873,
    },
    {
      mm: 435,
      litres: 2002,
    },
    {
      mm: 440,
      litres: 2031,
    },
    {
      mm: 445,
      litres: 2075,
    },
    {
      mm: 450,
      litres: 2105,
    },
    {
      mm: 455,
      litres: 2134,
    },
    {
      mm: 460,
      litres: 2179,
    },
    {
      mm: 465,
      litres: 2208,
    },
    {
      mm: 470,
      litres: 2239,
    },
    {
      mm: 475,
      litres: 2269,
    },
    {
      mm: 480,
      litres: 2314,
    },
    {
      mm: 485,
      litres: 2344,
    },
    {
      mm: 490,
      litres: 2374,
    },
    {
      mm: 495,
      litres: 2405,
    },
    {
      mm: 500,
      litres: 2451,
    },
    {
      mm: 505,
      litres: 2481,
    },
    {
      mm: 510,
      litres: 2512,
    },
    {
      mm: 515,
      litres: 2543,
    },
    {
      mm: 520,
      litres: 2590,
    },
    {
      mm: 525,
      litres: 2621,
    },
    {
      mm: 530,
      litres: 2652,
    },
    {
      mm: 535,
      litres: 2683,
    },
    {
      mm: 540,
      litres: 2730,
    },
    {
      mm: 545,
      litres: 2762,
    },
    {
      mm: 550,
      litres: 2794,
    },
    {
      mm: 555,
      litres: 2841,
    },
    {
      mm: 560,
      litres: 2873,
    },
    {
      mm: 565,
      litres: 2905,
    },
    {
      mm: 570,
      litres: 2937,
    },
    {
      mm: 575,
      litres: 2985,
    },
    {
      mm: 580,
      litres: 3017,
    },
    {
      mm: 585,
      litres: 3049,
    },
    {
      mm: 590,
      litres: 3082,
    },
    {
      mm: 595,
      litres: 3130,
    },
    {
      mm: 600,
      litres: 3163,
    },
    {
      mm: 605,
      litres: 3195,
    },
    {
      mm: 610,
      litres: 3228,
    },
    {
      mm: 615,
      litres: 3277,
    },
    {
      mm: 620,
      litres: 3310,
    },
    {
      mm: 625,
      litres: 3343,
    },
    {
      mm: 630,
      litres: 3376,
    },
    {
      mm: 635,
      litres: 3426,
    },
    {
      mm: 640,
      litres: 3459,
    },
    {
      mm: 645,
      litres: 3492,
    },
    {
      mm: 650,
      litres: 3542,
    },
    {
      mm: 655,
      litres: 3576,
    },
    {
      mm: 660,
      litres: 3609,
    },
    {
      mm: 665,
      litres: 3643,
    },
    {
      mm: 670,
      litres: 3693,
    },
    {
      mm: 675,
      litres: 3727,
    },
    {
      mm: 680,
      litres: 3760,
    },
    {
      mm: 685,
      litres: 3794,
    },
    {
      mm: 690,
      litres: 3845,
    },
    {
      mm: 695,
      litres: 3879,
    },
    {
      mm: 700,
      litres: 3913,
    },
    {
      mm: 705,
      litres: 3947,
    },
    {
      mm: 710,
      litres: 3998,
    },
    {
      mm: 715,
      litres: 4033,
    },
    {
      mm: 720,
      litres: 4067,
    },
    {
      mm: 725,
      litres: 4101,
    },
    {
      mm: 730,
      litres: 4153,
    },
    {
      mm: 735,
      litres: 4187,
    },
    {
      mm: 740,
      litres: 4208,
    },
    {
      mm: 745,
      litres: 4256,
    },
    {
      mm: 750,
      litres: 4308,
    },
    {
      mm: 755,
      litres: 4343,
    },
    {
      mm: 760,
      litres: 4378,
    },
    {
      mm: 765,
      litres: 4430,
    },
    {
      mm: 770,
      litres: 4465,
    },
    {
      mm: 775,
      litres: 4500,
    },
    {
      mm: 780,
      litres: 4535,
    },
    {
      mm: 785,
      litres: 4587,
    },
    {
      mm: 790,
      litres: 4622,
    },
    {
      mm: 795,
      litres: 4657,
    },
    {
      mm: 800,
      litres: 4693,
    },
    {
      mm: 805,
      litres: 4745,
    },
    {
      mm: 810,
      litres: 4781,
    },
    {
      mm: 815,
      litres: 4816,
    },
    {
      mm: 820,
      litres: 4851,
    },
    {
      mm: 825,
      litres: 4904,
    },
    {
      mm: 830,
      litres: 4940,
    },
    {
      mm: 835,
      litres: 4975,
    },
    {
      mm: 840,
      litres: 5011,
    },
    {
      mm: 845,
      litres: 5064,
    },
    {
      mm: 850,
      litres: 5100,
    },
    {
      mm: 855,
      litres: 5135,
    },
    {
      mm: 860,
      litres: 5189,
    },
    {
      mm: 865,
      litres: 5224,
    },
    {
      mm: 870,
      litres: 5260,
    },
    {
      mm: 875,
      litres: 5296,
    },
    {
      mm: 880,
      litres: 5350,
    },
    {
      mm: 885,
      litres: 5386,
    },
    {
      mm: 890,
      litres: 5421,
    },
    {
      mm: 895,
      litres: 5457,
    },
    {
      mm: 900,
      litres: 5511,
    },
    {
      mm: 905,
      litres: 5547,
    },
    {
      mm: 910,
      litres: 5583,
    },
    {
      mm: 915,
      litres: 5619,
    },
    {
      mm: 920,
      litres: 5673,
    },
    {
      mm: 925,
      litres: 5709,
    },
    {
      mm: 930,
      litres: 5746,
    },
    {
      mm: 935,
      litres: 5782,
    },
    {
      mm: 940,
      litres: 5836,
    },
    {
      mm: 945,
      litres: 5872,
    },
    {
      mm: 950,
      litres: 5908,
    },
    {
      mm: 955,
      litres: 5963,
    },
    {
      mm: 960,
      litres: 5999,
    },
    {
      mm: 965,
      litres: 6035,
    },
    {
      mm: 970,
      litres: 6072,
    },
    {
      mm: 975,
      litres: 6126,
    },
    {
      mm: 980,
      litres: 6163,
    },
    {
      mm: 985,
      litres: 6199,
    },
    {
      mm: 990,
      litres: 6235,
    },
    {
      mm: 995,
      litres: 6290,
    },
    {
      mm: 1000,
      litres: 6326,
    },
    {
      mm: 1005,
      litres: 6363,
    },
    {
      mm: 1010,
      litres: 6399,
    },
    {
      mm: 1015,
      litres: 6454,
    },
    {
      mm: 1020,
      litres: 6490,
    },
    {
      mm: 1025,
      litres: 6527,
    },
    {
      mm: 1030,
      litres: 6563,
    },
    {
      mm: 1035,
      litres: 6618,
    },
    {
      mm: 1040,
      litres: 6657,
    },
    {
      mm: 1045,
      litres: 6691,
    },
    {
      mm: 1050,
      litres: 6746,
    },
    {
      mm: 1055,
      litres: 6783,
    },
    {
      mm: 1060,
      litres: 6819,
    },
    {
      mm: 1065,
      litres: 6856,
    },
    {
      mm: 1070,
      litres: 6910,
    },
    {
      mm: 1075,
      litres: 6947,
    },
    {
      mm: 1080,
      litres: 6984,
    },
    {
      mm: 1085,
      litres: 7020,
    },
    {
      mm: 1090,
      litres: 7075,
    },
    {
      mm: 1095,
      litres: 7112,
    },
    {
      mm: 1100,
      litres: 7145,
    },
    {
      mm: 1105,
      litres: 7195,
    },
    {
      mm: 1110,
      litres: 7222,
    },
    {
      mm: 1115,
      litres: 7258,
    },
    {
      mm: 1120,
      litres: 7295,
    },
    {
      mm: 1125,
      litres: 7350,
    },
    {
      mm: 1130,
      litres: 7380,
    },
    {
      mm: 1135,
      litres: 7423,
    },
    {
      mm: 1140,
      litres: 7460,
    },
    {
      mm: 1145,
      litres: 7514,
    },
    {
      mm: 1150,
      litres: 7551,
    },
    {
      mm: 1155,
      litres: 7587,
    },
    {
      mm: 1160,
      litres: 7624,
    },
    {
      mm: 1165,
      litres: 7679,
    },
    {
      mm: 1170,
      litres: 7715,
    },
    {
      mm: 1175,
      litres: 7752,
    },
    {
      mm: 1180,
      litres: 7807,
    },
    {
      mm: 1185,
      litres: 7843,
    },
    {
      mm: 1190,
      litres: 7880,
    },
    {
      mm: 1195,
      litres: 7916,
    },
    {
      mm: 1200,
      litres: 7971,
    },
    {
      mm: 1205,
      litres: 8007,
    },
    {
      mm: 1210,
      litres: 8044,
    },
    {
      mm: 1215,
      litres: 8080,
    },
    {
      mm: 1220,
      litres: 8135,
    },
    {
      mm: 1225,
      litres: 8171,
    },
    {
      mm: 1230,
      litres: 8207,
    },
    {
      mm: 1235,
      litres: 8244,
    },
    {
      mm: 1240,
      litres: 8298,
    },
    {
      mm: 1245,
      litres: 8335,
    },
    {
      mm: 1250,
      litres: 8371,
    },
    {
      mm: 1255,
      litres: 8407,
    },
    {
      mm: 1260,
      litres: 8462,
    },
    {
      mm: 1265,
      litres: 8498,
    },
    {
      mm: 1270,
      litres: 8534,
    },
    {
      mm: 1275,
      litres: 8588,
    },
    {
      mm: 1280,
      litres: 8624,
    },
    {
      mm: 1285,
      litres: 8661,
    },
    {
      mm: 1290,
      litres: 8697,
    },
    {
      mm: 1295,
      litres: 8751,
    },
    {
      mm: 1300,
      litres: 8787,
    },
    {
      mm: 1305,
      litres: 8823,
    },
    {
      mm: 1310,
      litres: 8859,
    },
    {
      mm: 1315,
      litres: 8913,
    },
    {
      mm: 1320,
      litres: 8949,
    },
    {
      mm: 1325,
      litres: 8984,
    },
    {
      mm: 1330,
      litres: 9020,
    },
    {
      mm: 1335,
      litres: 9074,
    },
    {
      mm: 1340,
      litres: 9110,
    },
    {
      mm: 1345,
      litres: 9146,
    },
    {
      mm: 1350,
      litres: 9181,
    },
    {
      mm: 1355,
      litres: 9235,
    },
    {
      mm: 1360,
      litres: 9270,
    },
    {
      mm: 1365,
      litres: 9306,
    },
    {
      mm: 1370,
      litres: 9359,
    },
    {
      mm: 1375,
      litres: 9395,
    },
    {
      mm: 1380,
      litres: 9430,
    },
    {
      mm: 1385,
      litres: 9466,
    },
    {
      mm: 1390,
      litres: 9519,
    },
    {
      mm: 1395,
      litres: 9554,
    },
    {
      mm: 1400,
      litres: 9589,
    },
    {
      mm: 1405,
      litres: 9625,
    },
    {
      mm: 1410,
      litres: 9677,
    },
    {
      mm: 1415,
      litres: 9713,
    },
    {
      mm: 1420,
      litres: 9748,
    },
    {
      mm: 1425,
      litres: 9783,
    },
    {
      mm: 1430,
      litres: 9835,
    },
    {
      mm: 1435,
      litres: 9870,
    },
    {
      mm: 1440,
      litres: 9905,
    },
    {
      mm: 1445,
      litres: 9940,
    },
    {
      mm: 1450,
      litres: 9992,
    },
    {
      mm: 1455,
      litres: 10027,
    },
    {
      mm: 1460,
      litres: 10062,
    },
    {
      mm: 1465,
      litres: 10114,
    },
    {
      mm: 1470,
      litres: 10148,
    },
    {
      mm: 1475,
      litres: 10183,
    },
    {
      mm: 1480,
      litres: 10217,
    },
    {
      mm: 1485,
      litres: 10260,
    },
    {
      mm: 1490,
      litres: 10303,
    },
    {
      mm: 1495,
      litres: 10337,
    },
    {
      mm: 1500,
      litres: 10372,
    },
    {
      mm: 1505,
      litres: 10423,
    },
    {
      mm: 1510,
      litres: 10457,
    },
    {
      mm: 1515,
      litres: 10491,
    },
    {
      mm: 1520,
      litres: 10525,
    },
    {
      mm: 1525,
      litres: 10576,
    },
    {
      mm: 1530,
      litres: 10610,
    },
    {
      mm: 1535,
      litres: 10643,
    },
    {
      mm: 1540,
      litres: 10677,
    },
    {
      mm: 1545,
      litres: 10727,
    },
    {
      mm: 1550,
      litres: 10761,
    },
    {
      mm: 1555,
      litres: 10794,
    },
    {
      mm: 1560,
      litres: 10828,
    },
    {
      mm: 1565,
      litres: 10878,
    },
    {
      mm: 1570,
      litres: 10911,
    },
    {
      mm: 1575,
      litres: 10944,
    },
    {
      mm: 1580,
      litres: 10984,
    },
    {
      mm: 1585,
      litres: 11027,
    },
    {
      mm: 1590,
      litres: 11060,
    },
    {
      mm: 1595,
      litres: 11093,
    },
    {
      mm: 1600,
      litres: 11142,
    },
    {
      mm: 1605,
      litres: 11175,
    },
    {
      mm: 1610,
      litres: 11207,
    },
    {
      mm: 1615,
      litres: 11240,
    },
    {
      mm: 1620,
      litres: 11288,
    },
    {
      mm: 1625,
      litres: 11321,
    },
    {
      mm: 1630,
      litres: 11353,
    },
    {
      mm: 1635,
      litres: 11385,
    },
    {
      mm: 1640,
      litres: 11433,
    },
    {
      mm: 1645,
      litres: 11465,
    },
    {
      mm: 1650,
      litres: 11497,
    },
    {
      mm: 1655,
      litres: 11529,
    },
    {
      mm: 1660,
      litres: 11576,
    },
    {
      mm: 1665,
      litres: 11606,
    },
    {
      mm: 1670,
      litres: 11640,
    },
    {
      mm: 1675,
      litres: 11687,
    },
    {
      mm: 1680,
      litres: 11718,
    },
    {
      mm: 1685,
      litres: 11748,
    },
    {
      mm: 1690,
      litres: 11780,
    },
    {
      mm: 1695,
      litres: 11827,
    },
    {
      mm: 1700,
      litres: 11858,
    },
    {
      mm: 1705,
      litres: 11889,
    },
    {
      mm: 1710,
      litres: 11919,
    },
    {
      mm: 1715,
      litres: 11965,
    },
    {
      mm: 1720,
      litres: 11996,
    },
    {
      mm: 1725,
      litres: 12056,
    },
    {
      mm: 1730,
      litres: 12101,
    },
    {
      mm: 1735,
      litres: 12131,
    },
    {
      mm: 1740,
      litres: 12162,
    },
    {
      mm: 1745,
      litres: 12191,
    },
    {
      mm: 1750,
      litres: 12236,
    },
    {
      mm: 1755,
      litres: 12265,
    },
    {
      mm: 1760,
      litres: 12295,
    },
    {
      mm: 1765,
      litres: 12339,
    },
    {
      mm: 1770,
      litres: 12360,
    },
    {
      mm: 1775,
      litres: 12397,
    },
    {
      mm: 1780,
      litres: 12426,
    },
    {
      mm: 1785,
      litres: 12469,
    },
    {
      mm: 1790,
      litres: 12498,
    },
    {
      mm: 1795,
      litres: 12526,
    },
    {
      mm: 1800,
      litres: 12555,
    },
    {
      mm: 1805,
      litres: 12597,
    },
    {
      mm: 1810,
      litres: 12625,
    },
    {
      mm: 1815,
      litres: 12653,
    },
    {
      mm: 1820,
      litres: 12681,
    },
    {
      mm: 1825,
      litres: 12723,
    },
    {
      mm: 1830,
      litres: 12751,
    },
    {
      mm: 1835,
      litres: 12778,
    },
    {
      mm: 1840,
      litres: 12790,
    },
    {
      mm: 1845,
      litres: 12845,
    },
    {
      mm: 1850,
      litres: "",
    },
    {
      mm: 1855,
      litres: 12872,
    },
    {
      mm: 1860,
      litres: 12899,
    },
    {
      mm: 1865,
      litres: 12928,
    },
    {
      mm: 1870,
      litres: 12960,
    },
    {
      mm: 1875,
      litres: 12992,
    },
    {
      mm: 1880,
      litres: 13013,
    },
    {
      mm: 1885,
      litres: 13057,
    },
    {
      mm: 1890,
      litres: 13088,
    },
    {
      mm: 1895,
      litres: 13109,
    },
    {
      mm: 1900,
      litres: 13134,
    },
    {
      mm: 1905,
      litres: 13173,
    },
    {
      mm: 1910,
      litres: 13198,
    },
    {
      mm: 1915,
      litres: 13223,
    },
    {
      mm: 1920,
      litres: 13248,
    },
    {
      mm: 1925,
      litres: 13285,
    },
    {
      mm: 1930,
      litres: 13300,
    },
    {
      mm: 1935,
      litres: 13333,
    },
    {
      mm: 1940,
      litres: 13357,
    },
    {
      mm: 1945,
      litres: 13393,
    },
    {
      mm: 1950,
      litres: 13417,
    },
    {
      mm: 1955,
      litres: 13440,
    },
    {
      mm: 1960,
      litres: 13464,
    },
    {
      mm: 1965,
      litres: 13498,
    },
    {
      mm: 1970,
      litres: 13521,
    },
    {
      mm: 1975,
      litres: 13544,
    },
    {
      mm: 1980,
      litres: 13578,
    },
    {
      mm: 1985,
      litres: 13600,
    },
    {
      mm: 1990,
      litres: 13622,
    },
    {
      mm: 1995,
      litres: 13644,
    },
    {
      mm: 2000,
      litres: 13676,
    },
    {
      mm: 2005,
      litres: 13698,
    },
    {
      mm: 2010,
      litres: 13719,
    },
    {
      mm: 2015,
      litres: 13740,
    },
    {
      mm: 2020,
      litres: 13771,
    },
    {
      mm: 2025,
      litres: 13791,
    },
    {
      mm: 2030,
      litres: 13811,
    },
    {
      mm: 2035,
      litres: 13831,
    },
    {
      mm: 2040,
      litres: 13861,
    },
    {
      mm: 2045,
      litres: 13880,
    },
    {
      mm: 2050,
      litres: 13900,
    },
    {
      mm: 2055,
      litres: 13918,
    },
    {
      mm: 2060,
      litres: 13946,
    },
    {
      mm: 2065,
      litres: 13965,
    },
    {
      mm: 2070,
      litres: 13983,
    },
    {
      mm: 2075,
      litres: 14009,
    },
    {
      mm: 2080,
      litres: 14027,
    },
    {
      mm: 2085,
      litres: 14044,
    },
    {
      mm: 2090,
      litres: 14061,
    },
    {
      mm: 2095,
      litres: 14085,
    },
    {
      mm: 2100,
      litres: 14101,
    },
    {
      mm: 2105,
      litres: 14117,
    },
    {
      mm: 2110,
      litres: 14133,
    },
    {
      mm: 2115,
      litres: 14155,
    },
    {
      mm: 2120,
      litres: 14170,
    },
    {
      mm: 2125,
      litres: 14184,
    },
    {
      mm: 2130,
      litres: 14198,
    },
    {
      mm: 2135,
      litres: 14219,
    },
    {
      mm: 2140,
      litres: 14232,
    },
    {
      mm: 2145,
      litres: 14244,
    },
    {
      mm: 2150,
      litres: 14257,
    },
    {
      mm: 2155,
      litres: 14272,
    },
    {
      mm: 2160,
      litres: 14285,
    },
    {
      mm: 2165,
      litres: 14296,
    },
    {
      mm: 2170,
      litres: 14311,
    },
    {
      mm: 2175,
      litres: 14321,
    },
    {
      mm: 2180,
      litres: 14330,
    },
    {
      mm: 2185,
      litres: 14338,
    },
    {
      mm: 2190,
      litres: 14349,
    },
    {
      mm: 2195,
      litres: 14356,
    },
    {
      mm: 2200,
      litres: 14361,
    },
    {
      mm: 2205,
      litres: 14366,
    },
    {
      mm: 2210,
      litres: 14370,
    },
  ];

  const dieselData = [
    {
      mm: 5,
      litres: 1,
    },
    {
      mm: 10,
      litres: 10,
    },
    {
      mm: 15,
      litres: 19,
    },
    {
      mm: 20,
      litres: 28,
    },
    {
      mm: 25,
      litres: 40,
    },
    {
      mm: 30,
      litres: 53,
    },
    {
      mm: 35,
      litres: 67,
    },
    {
      mm: 40,
      litres: 82,
    },
    {
      mm: 45,
      litres: 98,
    },
    {
      mm: 50,
      litres: 114,
    },
    {
      mm: 55,
      litres: 132,
    },
    {
      mm: 60,
      litres: 150,
    },
    {
      mm: 65,
      litres: 159,
    },
    {
      mm: 70,
      litres: 179,
    },
    {
      mm: 75,
      litres: 199,
    },
    {
      mm: 80,
      litres: 220,
    },
    {
      mm: 85,
      litres: 241,
    },
    {
      mm: 90,
      litres: 263,
    },
    {
      mm: 95,
      litres: 286,
    },
    {
      mm: 100,
      litres: 309,
    },
    {
      mm: 105,
      litres: 333,
    },
    {
      mm: 110,
      litres: 357,
    },
    {
      mm: 115,
      litres: 382,
    },
    {
      mm: 120,
      litres: 408,
    },
    {
      mm: 125,
      litres: 434,
    },
    {
      mm: 130,
      litres: 461,
    },
    {
      mm: 135,
      litres: 488,
    },
    {
      mm: 140,
      litres: 501,
    },
    {
      mm: 145,
      litres: 529,
    },
    {
      mm: 150,
      litres: 557,
    },
    {
      mm: 155,
      litres: 586,
    },
    {
      mm: 160,
      litres: 615,
    },
    {
      mm: 165,
      litres: 645,
    },
    {
      mm: 170,
      litres: 675,
    },
    {
      mm: 175,
      litres: 705,
    },
    {
      mm: 180,
      litres: 736,
    },
    {
      mm: 185,
      litres: 768,
    },
    {
      mm: 190,
      litres: 799,
    },
    {
      mm: 195,
      litres: 831,
    },
    {
      mm: 200,
      litres: 864,
    },
    {
      mm: 205,
      litres: 897,
    },
    {
      mm: 210,
      litres: 913,
    },
    {
      mm: 215,
      litres: 947,
    },
    {
      mm: 220,
      litres: 981,
    },
    {
      mm: 225,
      litres: 1015,
    },
    {
      mm: 230,
      litres: 1032,
    },
    {
      mm: 235,
      litres: 1084,
    },
    {
      mm: 240,
      litres: 1119,
    },
    {
      mm: 245,
      litres: 1155,
    },
    {
      mm: 250,
      litres: 1191,
    },
    {
      mm: 255,
      litres: 1227,
    },
    {
      mm: 260,
      litres: 1263,
    },
    {
      mm: 265,
      litres: 1300,
    },
    {
      mm: 270,
      litres: 1338,
    },
    {
      mm: 275,
      litres: 1375,
    },
    {
      mm: 280,
      litres: 14013,
    },
    {
      mm: 285,
      litres: 1432,
    },
    {
      mm: 290,
      litres: 1470,
    },
    {
      mm: 295,
      litres: 1509,
    },
    {
      mm: 300,
      litres: 1548,
    },
    {
      mm: 305,
      litres: 1587,
    },
    {
      mm: 310,
      litres: 1626,
    },
    {
      mm: 315,
      litres: 1666,
    },
    {
      mm: 320,
      litres: 1706,
    },
    {
      mm: 325,
      litres: 1746,
    },
    {
      mm: 330,
      litres: 1787,
    },
    {
      mm: 335,
      litres: 1827,
    },
    {
      mm: 340,
      litres: 1869,
    },
    {
      mm: 345,
      litres: 1910,
    },
    {
      mm: 350,
      litres: 1952,
    },
    {
      mm: 355,
      litres: 1973,
    },
    {
      mm: 360,
      litres: 2015,
    },
    {
      mm: 365,
      litres: 2057,
    },
    {
      mm: 370,
      litres: 2100,
    },
    {
      mm: 375,
      litres: 2142,
    },
    {
      mm: 380,
      litres: 2185,
    },
    {
      mm: 385,
      litres: 2229,
    },
    {
      mm: 390,
      litres: 2272,
    },
    {
      mm: 395,
      litres: 2316,
    },
    {
      mm: 400,
      litres: 2360,
    },
    {
      mm: 405,
      litres: 2404,
    },
    {
      mm: 410,
      litres: 2449,
    },
    {
      mm: 415,
      litres: 2493,
    },
    {
      mm: 420,
      litres: 2538,
    },
    {
      mm: 425,
      litres: 2561,
    },
    {
      mm: 430,
      litres: 2606,
    },
    {
      mm: 435,
      litres: 2651,
    },
    {
      mm: 440,
      litres: 2697,
    },
    {
      mm: 445,
      litres: 2743,
    },
    {
      mm: 450,
      litres: 2789,
    },
    {
      mm: 455,
      litres: 2835,
    },
    {
      mm: 460,
      litres: 2859,
    },
    {
      mm: 465,
      litres: 2929,
    },
    {
      mm: 470,
      litres: 2976,
    },
    {
      mm: 475,
      litres: 3023,
    },
    {
      mm: 480,
      litres: 3070,
    },
    {
      mm: 485,
      litres: 3117,
    },
    {
      mm: 490,
      litres: 3165,
    },
    {
      mm: 495,
      litres: 3213,
    },
    {
      mm: 500,
      litres: 3237,
    },
    {
      mm: 505,
      litres: 3285,
    },
    {
      mm: 510,
      litres: 3334,
    },
    {
      mm: 515,
      litres: 3382,
    },
    {
      mm: 520,
      litres: 3431,
    },
    {
      mm: 525,
      litres: 3480,
    },
    {
      mm: 530,
      litres: 3529,
    },
    {
      mm: 535,
      litres: 3578,
    },
    {
      mm: 540,
      litres: 3628,
    },
    {
      mm: 545,
      litres: 3677,
    },
    {
      mm: 550,
      litres: 3727,
    },
    {
      mm: 555,
      litres: 3777,
    },
    {
      mm: 560,
      litres: 3827,
    },
    {
      mm: 565,
      litres: 3878,
    },
    {
      mm: 570,
      litres: 3903,
    },
    {
      mm: 575,
      litres: 3953,
    },
    {
      mm: 580,
      litres: 4004,
    },
    {
      mm: 585,
      litres: 4056,
    },
    {
      mm: 590,
      litres: 4106,
    },
    {
      mm: 595,
      litres: 4157,
    },
    {
      mm: 600,
      litres: 4209,
    },
    {
      mm: 605,
      litres: 4260,
    },
    {
      mm: 610,
      litres: 4312,
    },
    {
      mm: 615,
      litres: 4364,
    },
    {
      mm: 620,
      litres: 4416,
    },
    {
      mm: 625,
      litres: 4468,
    },
    {
      mm: 630,
      litres: 4520,
    },
    {
      mm: 635,
      litres: 4572,
    },
    {
      mm: 640,
      litres: 4623,
    },
    {
      mm: 645,
      litres: 4651,
    },
    {
      mm: 650,
      litres: 4704,
    },
    {
      mm: 655,
      litres: 4757,
    },
    {
      mm: 660,
      litres: 4810,
    },
    {
      mm: 665,
      litres: 4867,
    },
    {
      mm: 670,
      litres: 4916,
    },
    {
      mm: 675,
      litres: 4970,
    },
    {
      mm: 680,
      litres: 5023,
    },
    {
      mm: 685,
      litres: 5077,
    },
    {
      mm: 690,
      litres: 5131,
    },
    {
      mm: 695,
      litres: 5185,
    },
    {
      mm: 700,
      litres: 5239,
    },
    {
      mm: 705,
      litres: 5293,
    },
    {
      mm: 710,
      litres: 5348,
    },
    {
      mm: 715,
      litres: 5375,
    },
    {
      mm: 720,
      litres: 5429,
    },
    {
      mm: 725,
      litres: 5484,
    },
    {
      mm: 730,
      litres: 5539,
    },
    {
      mm: 735,
      litres: 5594,
    },
    {
      mm: 740,
      litres: 5649,
    },
    {
      mm: 745,
      litres: 5704,
    },
    {
      mm: 750,
      litres: 5759,
    },
    {
      mm: 755,
      litres: 5814,
    },
    {
      mm: 760,
      litres: 5870,
    },
    {
      mm: 765,
      litres: 5925,
    },
    {
      mm: 770,
      litres: 5981,
    },
    {
      mm: 775,
      litres: 6037,
    },
    {
      mm: 780,
      litres: 6093,
    },
    {
      mm: 785,
      litres: 6121,
    },
    {
      mm: 790,
      litres: 6177,
    },
    {
      mm: 795,
      litres: 6233,
    },
    {
      mm: 800,
      litres: 6289,
    },
    {
      mm: 805,
      litres: 6340,
    },
    {
      mm: 810,
      litres: 6402,
    },
    {
      mm: 815,
      litres: 6459,
    },
    {
      mm: 820,
      litres: 6515,
    },
    {
      mm: 825,
      litres: 6572,
    },
    {
      mm: 830,
      litres: 6629,
    },
    {
      mm: 835,
      litres: 6686,
    },
    {
      mm: 840,
      litres: 6743,
    },
    {
      mm: 845,
      litres: 6800,
    },
    {
      mm: 850,
      litres: 6857,
    },
    {
      mm: 855,
      litres: 6914,
    },
    {
      mm: 860,
      litres: 6943,
    },
    {
      mm: 865,
      litres: 7000,
    },
    {
      mm: 870,
      litres: 7059,
    },
    {
      mm: 875,
      litres: 7118,
    },
    {
      mm: 880,
      litres: 7173,
    },
    {
      mm: 885,
      litres: 7231,
    },
    {
      mm: 890,
      litres: 7289,
    },
    {
      mm: 895,
      litres: 7347,
    },
    {
      mm: 900,
      litres: 7405,
    },
    {
      mm: 905,
      litres: 7463,
    },
    {
      mm: 910,
      litres: 7521,
    },
    {
      mm: 915,
      litres: 7579,
    },
    {
      mm: 920,
      litres: 7638,
    },
    {
      mm: 925,
      litres: 7696,
    },
    {
      mm: 930,
      litres: 7725,
    },
    {
      mm: 935,
      litres: 7784,
    },
    {
      mm: 940,
      litres: 7842,
    },
    {
      mm: 945,
      litres: 7901,
    },
    {
      mm: 950,
      litres: 7960,
    },
    {
      mm: 955,
      litres: 8018,
    },
    {
      mm: 960,
      litres: 8077,
    },
    {
      mm: 965,
      litres: 8136,
    },
    {
      mm: 970,
      litres: 8195,
    },
    {
      mm: 975,
      litres: 8254,
    },
    {
      mm: 980,
      litres: 8313,
    },
    {
      mm: 985,
      litres: 8372,
    },
    {
      mm: 990,
      litres: 8432,
    },
    {
      mm: 995,
      litres: 8491,
    },
    {
      mm: 1000,
      litres: 8550,
    },
    {
      mm: 1005,
      litres: 8580,
    },
    {
      mm: 1010,
      litres: 8659,
    },
    {
      mm: 1015,
      litres: 8699,
    },
    {
      mm: 1020,
      litres: 8758,
    },
    {
      mm: 1025,
      litres: 8818,
    },
    {
      mm: 1030,
      litres: 8877,
    },
    {
      mm: 1035,
      litres: 8937,
    },
    {
      mm: 1040,
      litres: 8997,
    },
    {
      mm: 1045,
      litres: 9057,
    },
    {
      mm: 1050,
      litres: 9116,
    },
    {
      mm: 1055,
      litres: 9176,
    },
    {
      mm: 1060,
      litres: 9236,
    },
    {
      mm: 1065,
      litres: 9296,
    },
    {
      mm: 1070,
      litres: 9356,
    },
    {
      mm: 1075,
      litres: 9386,
    },
    {
      mm: 1080,
      litres: 9446,
    },
    {
      mm: 1085,
      litres: 9506,
    },
    {
      mm: 1090,
      litres: 9566,
    },
    {
      mm: 1095,
      litres: 9627,
    },
    {
      mm: 1100,
      litres: 9687,
    },
    {
      mm: 1105,
      litres: 9747,
    },
    {
      mm: 1110,
      litres: 9807,
    },
    {
      mm: 1115,
      litres: 9868,
    },
    {
      mm: 1120,
      litres: 9928,
    },
    {
      mm: 1125,
      litres: 9988,
    },
    {
      mm: 1130,
      litres: 10049,
    },
    {
      mm: 1135,
      litres: 10109,
    },
    {
      mm: 1140,
      litres: 10169,
    },
    {
      mm: 1145,
      litres: 10200,
    },
    {
      mm: 1150,
      litres: 10260,
    },
    {
      mm: 1155,
      litres: 10321,
    },
    {
      mm: 1160,
      litres: 10382,
    },
    {
      mm: 1165,
      litres: 10442,
    },
    {
      mm: 1170,
      litres: 10503,
    },
    {
      mm: 1175,
      litres: 10564,
    },
    {
      mm: 1180,
      litres: 10624,
    },
    {
      mm: 1185,
      litres: 10665,
    },
    {
      mm: 1190,
      litres: 10746,
    },
    {
      mm: 1195,
      litres: 10808,
    },
    {
      mm: 1200,
      litres: 10867,
    },
    {
      mm: 1205,
      litres: 10928,
    },
    {
      mm: 1210,
      litres: 10989,
    },
    {
      mm: 1215,
      litres: 11050,
    },
    {
      mm: 1220,
      litres: 11080,
    },
    {
      mm: 1225,
      litres: 11141,
    },
    {
      mm: 1230,
      litres: 11202,
    },
    {
      mm: 1235,
      litres: 11263,
    },
    {
      mm: 1240,
      litres: 11323,
    },
    {
      mm: 1245,
      litres: 11384,
    },
    {
      mm: 1250,
      litres: 11445,
    },
    {
      mm: 1255,
      litres: 11506,
    },
    {
      mm: 1260,
      litres: 11567,
    },
    {
      mm: 1265,
      litres: 11628,
    },
    {
      mm: 1270,
      litres: 11689,
    },
    {
      mm: 1275,
      litres: 11750,
    },
    {
      mm: 1280,
      litres: 11811,
    },
    {
      mm: 1285,
      litres: 11872,
    },
    {
      mm: 1290,
      litres: 11902,
    },
    {
      mm: 1295,
      litres: 11963,
    },
    {
      mm: 1300,
      litres: 12021,
    },
    {
      mm: 1305,
      litres: 12054,
    },
    {
      mm: 1310,
      litres: 12115,
    },
    {
      mm: 1315,
      litres: 12176,
    },
    {
      mm: 1320,
      litres: 12237,
    },
    {
      mm: 1325,
      litres: 12298,
    },
    {
      mm: 1330,
      litres: 12359,
    },
    {
      mm: 1335,
      litres: 12420,
    },
    {
      mm: 1340,
      litres: 12481,
    },
    {
      mm: 1345,
      litres: 12542,
    },
    {
      mm: 1350,
      litres: 12603,
    },
    {
      mm: 1355,
      litres: 12663,
    },
    {
      mm: 1360,
      litres: 12724,
    },
    {
      mm: 1365,
      litres: 12785,
    },
    {
      mm: 1370,
      litres: 12846,
    },
    {
      mm: 1375,
      litres: 12876,
    },
    {
      mm: 1380,
      litres: 12937,
    },
    {
      mm: 1385,
      litres: 12998,
    },
    {
      mm: 1390,
      litres: 13059,
    },
    {
      mm: 1395,
      litres: 13120,
    },
    {
      mm: 1400,
      litres: 13180,
    },
    {
      mm: 1405,
      litres: 13241,
    },
    {
      mm: 1410,
      litres: 13302,
    },
    {
      mm: 1415,
      litres: 13362,
    },
    {
      mm: 1420,
      litres: 13421,
    },
    {
      mm: 1425,
      litres: 13484,
    },
    {
      mm: 1430,
      litres: 13544,
    },
    {
      mm: 1435,
      litres: 13605,
    },
    {
      mm: 1440,
      litres: 13666,
    },
    {
      mm: 1445,
      litres: 13726,
    },
    {
      mm: 1450,
      litres: 13757,
    },
    {
      mm: 1455,
      litres: 13817,
    },
    {
      mm: 1460,
      litres: 13877,
    },
    {
      mm: 1465,
      litres: 13938,
    },
    {
      mm: 1470,
      litres: 13998,
    },
    {
      mm: 1475,
      litres: 14058,
    },
    {
      mm: 1480,
      litres: 14119,
    },
    {
      mm: 1485,
      litres: 14179,
    },
    {
      mm: 1490,
      litres: 14239,
    },
    {
      mm: 1495,
      litres: 14299,
    },
    {
      mm: 1500,
      litres: 14360,
    },
    {
      mm: 1505,
      litres: 14420,
    },
    {
      mm: 1510,
      litres: 14480,
    },
    {
      mm: 1515,
      litres: 14540,
    },
    {
      mm: 1520,
      litres: 14570,
    },
    {
      mm: 1525,
      litres: 14630,
    },
    {
      mm: 1530,
      litres: 14690,
    },
    {
      mm: 1535,
      litres: 14750,
    },
    {
      mm: 1540,
      litres: 14810,
    },
    {
      mm: 1545,
      litres: 14869,
    },
    {
      mm: 1550,
      litres: 14929,
    },
    {
      mm: 1555,
      litres: 14989,
    },
    {
      mm: 1560,
      litres: 15049,
    },
    {
      mm: 1565,
      litres: 15108,
    },
    {
      mm: 1570,
      litres: 15168,
    },
    {
      mm: 1575,
      litres: 15227,
    },
    {
      mm: 1580,
      litres: 15287,
    },
    {
      mm: 1585,
      litres: 15346,
    },
    {
      mm: 1590,
      litres: 15376,
    },
    {
      mm: 1595,
      litres: 15435,
    },
    {
      mm: 1600,
      litres: 15494,
    },
    {
      mm: 1605,
      litres: 15554,
    },
    {
      mm: 1610,
      litres: 15613,
    },
    {
      mm: 1615,
      litres: 15672,
    },
    {
      mm: 1620,
      litres: 15731,
    },
    {
      mm: 1625,
      litres: 15790,
    },
    {
      mm: 1630,
      litres: 15849,
    },
    {
      mm: 1635,
      litres: 15908,
    },
    {
      mm: 1640,
      litres: 15955,
    },
    {
      mm: 1645,
      litres: 16025,
    },
    {
      mm: 1650,
      litres: 16084,
    },
    {
      mm: 1655,
      litres: 16142,
    },
    {
      mm: 1660,
      litres: 16201,
    },
    {
      mm: 1665,
      litres: 16230,
    },
    {
      mm: 1670,
      litres: 16268,
    },
    {
      mm: 1675,
      litres: 16347,
    },
    {
      mm: 1680,
      litres: 16405,
    },
    {
      mm: 1685,
      litres: 16463,
    },
    {
      mm: 1690,
      litres: 16521,
    },
    {
      mm: 1695,
      litres: 16579,
    },
    {
      mm: 1700,
      litres: 16637,
    },
    {
      mm: 1705,
      litres: 16695,
    },
    {
      mm: 1710,
      litres: 16753,
    },
    {
      mm: 1715,
      litres: 16810,
    },
    {
      mm: 1720,
      litres: 16868,
    },
    {
      mm: 1725,
      litres: 16926,
    },
    {
      mm: 1730,
      litres: 16983,
    },
    {
      mm: 1735,
      litres: 17012,
    },
    {
      mm: 1740,
      litres: 17069,
    },
    {
      mm: 1745,
      litres: 17126,
    },
    {
      mm: 1750,
      litres: 17183,
    },
    {
      mm: 1755,
      litres: 17240,
    },
    {
      mm: 1760,
      litres: 17297,
    },
    {
      mm: 1765,
      litres: 17354,
    },
    {
      mm: 1770,
      litres: 17411,
    },
    {
      mm: 1775,
      litres: 17467,
    },
    {
      mm: 1780,
      litres: 17524,
    },
    {
      mm: 1785,
      litres: 17580,
    },
    {
      mm: 1790,
      litres: 17637,
    },
    {
      mm: 1795,
      litres: 17693,
    },
    {
      mm: 1800,
      litres: 17749,
    },
    {
      mm: 1805,
      litres: 17805,
    },
    {
      mm: 1810,
      litres: 17833,
    },
    {
      mm: 1815,
      litres: 17889,
    },
    {
      mm: 1820,
      litres: 17945,
    },
    {
      mm: 1825,
      litres: 18001,
    },
    {
      mm: 1830,
      litres: 18056,
    },
    {
      mm: 1835,
      litres: 18112,
    },
    {
      mm: 1840,
      litres: 18167,
    },
    {
      mm: 1845,
      litres: 18222,
    },
    {
      mm: 1850,
      litres: 18277,
    },
    {
      mm: 1855,
      litres: 18332,
    },
    {
      mm: 1860,
      litres: 18387,
    },
    {
      mm: 1865,
      litres: 18442,
    },
    {
      mm: 1870,
      litres: 18497,
    },
    {
      mm: 1875,
      litres: 18551,
    },
    {
      mm: 1880,
      litres: 18578,
    },
    {
      mm: 1885,
      litres: 18633,
    },
    {
      mm: 1890,
      litres: 18687,
    },
    {
      mm: 1895,
      litres: 18741,
    },
    {
      mm: 1900,
      litres: 18795,
    },
    {
      mm: 1905,
      litres: 18849,
    },
    {
      mm: 1910,
      litres: 18903,
    },
    {
      mm: 1915,
      litres: 18956,
    },
    {
      mm: 1920,
      litres: 19010,
    },
    {
      mm: 1925,
      litres: 19056,
    },
    {
      mm: 1930,
      litres: 19116,
    },
    {
      mm: 1935,
      litres: 19169,
    },
    {
      mm: 1940,
      litres: 19222,
    },
    {
      mm: 1945,
      litres: 19275,
    },
    {
      mm: 1950,
      litres: 19301,
    },
    {
      mm: 1955,
      litres: 19354,
    },
    {
      mm: 1960,
      litres: 19406,
    },
    {
      mm: 1965,
      litres: 19458,
    },
    {
      mm: 1970,
      litres: 19510,
    },
    {
      mm: 1975,
      litres: 19562,
    },
    {
      mm: 1980,
      litres: 19614,
    },
    {
      mm: 1985,
      litres: 19686,
    },
    {
      mm: 1990,
      litres: 19717,
    },
    {
      mm: 1995,
      litres: 19769,
    },
    {
      mm: 2000,
      litres: 19820,
    },
    {
      mm: 2005,
      litres: 19871,
    },
    {
      mm: 2010,
      litres: 19922,
    },
    {
      mm: 2015,
      litres: 19973,
    },
    {
      mm: 2020,
      litres: 20023,
    },
    {
      mm: 2025,
      litres: 20043,
    },
    {
      mm: 2030,
      litres: 20099,
    },
    {
      mm: 2035,
      litres: 20149,
    },
    {
      mm: 2040,
      litres: 20199,
    },
    {
      mm: 2045,
      litres: 20249,
    },
    {
      mm: 2050,
      litres: 20298,
    },
    {
      mm: 2055,
      litres: 20348,
    },
    {
      mm: 2060,
      litres: 20397,
    },
    {
      mm: 2065,
      litres: 20466,
    },
    {
      mm: 2070,
      litres: 20495,
    },
    {
      mm: 2075,
      litres: 20544,
    },
    {
      mm: 2080,
      litres: 20592,
    },
    {
      mm: 2085,
      litres: 20641,
    },
    {
      mm: 2090,
      litres: 20689,
    },
    {
      mm: 2095,
      litres: 20713,
    },
    {
      mm: 2100,
      litres: 20761,
    },
    {
      mm: 2105,
      litres: 20809,
    },
    {
      mm: 2110,
      litres: 20856,
    },
    {
      mm: 2115,
      litres: 20901,
    },
    {
      mm: 2120,
      litres: 20950,
    },
    {
      mm: 2125,
      litres: 20997,
    },
    {
      mm: 2130,
      litres: 21067,
    },
    {
      mm: 2135,
      litres: 21091,
    },
    {
      mm: 2140,
      litres: 21137,
    },
    {
      mm: 2145,
      litres: 21183,
    },
    {
      mm: 2150,
      litres: 21229,
    },
    {
      mm: 2155,
      litres: 21275,
    },
    {
      mm: 2160,
      litres: 21320,
    },
    {
      mm: 2165,
      litres: 21365,
    },
    {
      mm: 2170,
      litres: 21388,
    },
    {
      mm: 2175,
      litres: 21443,
    },
    {
      mm: 2180,
      litres: 21477,
    },
    {
      mm: 2185,
      litres: 21522,
    },
    {
      mm: 2190,
      litres: 21566,
    },
    {
      mm: 2195,
      litres: 21610,
    },
    {
      mm: 2200,
      litres: 21654,
    },
    {
      mm: 2205,
      litres: 21697,
    },
    {
      mm: 2210,
      litres: 21741,
    },
    {
      mm: 2215,
      litres: 21783,
    },
    {
      mm: 2220,
      litres: 21826,
    },
    {
      mm: 2225,
      litres: 21869,
    },
    {
      mm: 2230,
      litres: 21911,
    },
    {
      mm: 2235,
      litres: 21952,
    },
    {
      mm: 2240,
      litres: 21971,
    },
    {
      mm: 2245,
      litres: 22010,
    },
    {
      mm: 2250,
      litres: 22057,
    },
    {
      mm: 2255,
      litres: 22099,
    },
    {
      mm: 2260,
      litres: 22139,
    },
    {
      mm: 2265,
      litres: 22180,
    },
    {
      mm: 2270,
      litres: 22220,
    },
    {
      mm: 2275,
      litres: 22260,
    },
    {
      mm: 2280,
      litres: 22300,
    },
    {
      mm: 2285,
      litres: 22339,
    },
    {
      mm: 2290,
      litres: 22378,
    },
    {
      mm: 2295,
      litres: 22417,
    },
    {
      mm: 2300,
      litres: 22456,
    },
    {
      mm: 2305,
      litres: 22491,
    },
    {
      mm: 2310,
      litres: 22513,
    },
    {
      mm: 2315,
      litres: 22551,
    },
    {
      mm: 2320,
      litres: 22588,
    },
    {
      mm: 2325,
      litres: 22626,
    },
    {
      mm: 2330,
      litres: 22663,
    },
    {
      mm: 2335,
      litres: 22699,
    },
    {
      mm: 2340,
      litres: 22735,
    },
    {
      mm: 2345,
      litres: 22771,
    },
    {
      mm: 2350,
      litres: 22807,
    },
    {
      mm: 2355,
      litres: 22842,
    },
    {
      mm: 2360,
      litres: 22894,
    },
    {
      mm: 2365,
      litres: 22920,
    },
    {
      mm: 2370,
      litres: 22945,
    },
    {
      mm: 2375,
      litres: 22975,
    },
    {
      mm: 2380,
      litres: 23013,
    },
    {
      mm: 2385,
      litres: 23020,
    },
    {
      mm: 2390,
      litres: 23062,
    },
    {
      mm: 2395,
      litres: 23095,
    },
    {
      mm: 2400,
      litres: 23127,
    },
    {
      mm: 2405,
      litres: 23153,
    },
    {
      mm: 2410,
      litres: 23190,
    },
    {
      mm: 2415,
      litres: 23221,
    },
    {
      mm: 2420,
      litres: 23251,
    },
    {
      mm: 2425,
      litres: 23281,
    },
    {
      mm: 2430,
      litres: 23311,
    },
    {
      mm: 2435,
      litres: 23340,
    },
    {
      mm: 2440,
      litres: 23369,
    },
    {
      mm: 2445,
      litres: 23397,
    },
    {
      mm: 2450,
      litres: 23425,
    },
    {
      mm: 2455,
      litres: 23438,
    },
    {
      mm: 2460,
      litres: 23465,
    },
    {
      mm: 2465,
      litres: 23497,
    },
    {
      mm: 2470,
      litres: 23518,
    },
    {
      mm: 2475,
      litres: 23544,
    },
    {
      mm: 2480,
      litres: 23569,
    },
    {
      mm: 2485,
      litres: 23593,
    },
    {
      mm: 2490,
      litres: 23617,
    },
    {
      mm: 2495,
      litres: 23640,
    },
    {
      mm: 2500,
      litres: 23663,
    },
    {
      mm: 2505,
      litres: 23685,
    },
    {
      mm: 2510,
      litres: 23700,
    },
    {
      mm: 2515,
      litres: 23727,
    },
    {
      mm: 2520,
      litres: 23747,
    },
    {
      mm: 2525,
      litres: 23757,
    },
    {
      mm: 2530,
      litres: 23776,
    },
    {
      mm: 2535,
      litres: 23794,
    },
    {
      mm: 2540,
      litres: 23812,
    },
    {
      mm: 2545,
      litres: 23825,
    },
    {
      mm: 2550,
      litres: 23844,
    },
    {
      mm: 2555,
      litres: 23859,
    },
    {
      mm: 2560,
      litres: 23873,
    },
    {
      mm: 2565,
      litres: 23886,
    },
    {
      mm: 2570,
      litres: 23897,
    },
    {
      mm: 2575,
      litres: 23907,
    },
    {
      mm: 2580,
      litres: 23916,
    },
    {
      mm: 2585,
      litres: 23922,
    },
    {
      mm: 2590,
      litres: 23926,
    },
  ];

  const handleFuelTypeChange = (event) => {
    setFuelType(event.target.value);
  };

  const handleMmValueChange = (event) => {
    setMmValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const calculateLitres = () => {
    if (!fuelType) {
      toast.error("Please select a fuel type.");
      return;
    }

    const mmValueInt = parseInt(mmValue, 10);
    if (isNaN(mmValueInt)) {
      toast.error("Please enter a valid mm value.");
      return;
    }

    const fuelData = fuelType === "Petrol" ? petrolData : dieselData;
    let lower = null;
    let upper = null;
    let calculatedLitres = 0;

    for (let i = 0; i < fuelData.length; i++) {
      if (fuelData[i].mm === mmValueInt) {
        calculatedLitres = fuelData[i].litres;
        toast.info(`The ${fuelType} level is ${calculatedLitres} litres.`);
        postDipData(fuelType, mmValueInt, calculatedLitres);
        setMmValue("");
        return;
      } else if (fuelData[i].mm < mmValueInt) {
        lower = fuelData[i];
      } else if (fuelData[i].mm > mmValueInt && !upper) {
        upper = fuelData[i];
      }
    }

    if (!calculatedLitres && lower && upper) {
      calculatedLitres =
        lower.litres +
        ((upper.litres - lower.litres) * (mmValueInt - lower.mm)) /
          (upper.mm - lower.mm);
      toast.info(
        `The ${fuelType} level is approximately ${calculatedLitres.toFixed(
          2
        )} litres.`
      );
      postDipData(fuelType, mmValueInt, calculatedLitres.toFixed(2));
    } else {
      toast.error("No data available for this measurement.");
    }
  };

  const postDipData = (fuelType, mmValue, litres) => {
    const dipData = { fuelType, mmValue, litres };

    fetch("http://localhost:5000/api/dip/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dipData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Dip measurement has been saved successfully.");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to save dip measurement.");
      });
  };

  const handleGetDipFormSubmit = (event) => {
    event.preventDefault();
    const selectedDate = new Date(date);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0);

    if (!date) {
      toast.error("Please select a date.");
      return;
    }

    if (selectedDate > currentDate) {
      toast.error("You selected a future date!");
      return;
    }

    fetch(`http://localhost:5000/api/dip/date/${date}`)
      .then((response) => response.json())
      .then((data) => {
        displayDips(data);
      })
      .catch((error) => {
        console.error("Error fetching dip data:", error);
        toast.error("Failed to fetch dip data.");
      });
  };

  const displayDips = (dips) => {
    if (dips.length === 0) {
      toast.error("Dip data not found for this date.");
      return;
    }

    const resultHTML = dips.map((dip) => (
      <tr key={dip.mmValue}>
        <td className="py-2 px-4 border-b text-center">{dip.fuelType}</td>
        <td className="py-2 px-4 border-b text-center">{dip.mmValue}</td>
        <td className="py-2 px-4 border-b text-center">
          {dip.litres.$numberDecimal}
        </td>
      </tr>
    ));

    setResult(
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 border-b">Fuel Type</th>
            <th className="py-2 px-4 border-b">MM Value</th>
            <th className="py-2 px-4 border-b">Litres</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {resultHTML}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <header className="bg-yellow-200 text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            to="/"
          >
            <img
              src={logo}
              alt=""
              className="w-12 h-12 text-white p-2 bg-yellow-400 rounded-full"
            />
            <span className="ml-3 text-xl">STARFEUL PETROLEUM</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-red-900" to="/">
              Home
            </Link>
            <Link className="mr-5 hover:text-red-900" to="/sales">
              Sale/Stock
            </Link>
            <Link className="mr-5 hover:text-red-900" to="/mobile-oil">
              Mobile Oil
            </Link>
            <Link className="mr-5 hover:text-red-900" to="/expenditure">
              Expenditure
            </Link>
            <Link className="mr-5 hover:text-red-900" to="/khata">
              Khata Book
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          DIP Measurement
        </h2>
        <form id="addStockForm" className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="fuelType"
              className="block text-sm font-medium text-gray-700"
            >
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={fuelType}
              onChange={handleFuelTypeChange}
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
          <div>
            <label
              id="labelInput"
              htmlFor="mmInput"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Dip Rod Measurement (mm):
            </label>
            <input
              type="number"
              id="mmInput"
              name="mmInput"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={mmValue}
              onChange={handleMmValueChange}
            />
          </div>
          <div>
            <button
              type="button"
              id="calculateButton"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={calculateLitres}
            >
              Calculate Litres
            </button>
          </div>
        </form>
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Get Dip Measurement
        </h2>
        <form
          id="getDipForm"
          className="grid grid-cols-1 gap-6"
          onSubmit={handleGetDipFormSubmit}
        >
          <div id="getDipForDate">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Get Dip
            </button>
          </div>
        </form>
        <div id="result" className="mt-4">
          {result}
        </div>
      </section>

      <ToastContainer />
    </div>
  );
};

export default Dip;
