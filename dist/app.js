/* ===========================================================================
   Altametrics Back Office — application script
   ---------------------------------------------------------------------------
   Part 1: a ~140-line template renderer. index.html holds the markup with
           {{ value }} holes plus <sc-for> / <sc-if> blocks; this walks that
           template and builds real DOM from the values the app exposes.
   Part 2: the application logic (state + all derived view values).
   Part 3: boot + re-render on state change.
   No framework, no build step. Open index.html in a browser.
   =========================================================================== */
(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var WHOLE = /^\s*\{\{\s*([^{}]+?)\s*\}\}\s*$/;
  var HOLES = /\{\{\s*([^{}]+?)\s*\}\}/g;

  function resolve(expr, scope) {
    expr = String(expr).trim().replace(/^\{\{|\}\}$/g, "").trim();
    if (expr === "true") return true;
    if (expr === "false") return false;
    if (expr === "null" || expr === "") return null;
    if (/^-?\d+(\.\d+)?$/.test(expr)) return Number(expr);
    var cur = scope, parts = expr.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function interpolate(str, scope) {
    return str.replace(HOLES, function (m, p) {
      var v = resolve(p, scope);
      return v == null ? "" : String(v);
    });
  }

  function eventNameFor(node, attr) {
    var name = attr.slice(2).toLowerCase();
    if (name !== "change") return name;
    var tag = node.tagName.toLowerCase();
    var type = (node.getAttribute("type") || "text").toLowerCase();
    var typed = tag === "input" && ["checkbox", "radio", "file", "range"].indexOf(type) === -1;
    return typed || tag === "textarea" ? "input" : "change";
  }

  function renderList(nodes, scope, out, path) {
    for (var i = 0; i < nodes.length; i++) renderNode(nodes[i], scope, out, path + "." + i);
  }

  function renderNode(node, scope, out, path) {
    if (node.nodeType === 3) {
      var text = interpolate(node.nodeValue, scope);
      if (text) out.push(document.createTextNode(text));
      return;
    }
    if (node.nodeType !== 1) return;
    var tag = node.tagName.toLowerCase();

    if (tag === "sc-for") {
      var list = resolve(node.getAttribute("list"), scope) || [];
      var as = node.getAttribute("as") || "item";
      for (var i = 0; i < list.length; i++) {
        var inner = Object.create(scope);
        inner[as] = list[i];
        inner.$index = i;
        renderList(node.childNodes, inner, out, path + "." + i);
      }
      return;
    }
    if (tag === "sc-if") {
      if (resolve(node.getAttribute("value"), scope)) renderList(node.childNodes, scope, out, path);
      return;
    }

    var el = node.namespaceURI === SVG_NS
      ? document.createElementNS(SVG_NS, tag)
      : document.createElement(tag);
    var isField = tag === "input" || tag === "select" || tag === "textarea";

    for (var a = 0; a < node.attributes.length; a++) {
      var attr = node.attributes[a], name = attr.name, raw = attr.value;
      var whole = WHOLE.exec(raw);
      var val = whole ? resolve(whole[1], scope)
        : raw.indexOf("{{") !== -1 ? interpolate(raw, scope) : raw;

      if (name.indexOf("on") === 0 && name.length > 2) {
        if (typeof val === "function") el.addEventListener(eventNameFor(node, name), val);
        continue;
      }
      if (val == null || val === false) continue;
      if (val === true) { el.setAttribute(name, ""); continue; }
      if (name === "checked") { el.checked = !!val; continue; }
      if (name === "value" && isField) { el.value = String(val); }
      el.setAttribute(name, String(val));
    }
    if (isField) el.setAttribute("data-field-path", path);

    var kids = [];
    renderList(node.childNodes, scope, kids, path);
    for (var k = 0; k < kids.length; k++) el.appendChild(kids[k]);
    out.push(el);
  }

  /* ---- base class: state + scheduled re-render ---------------------------- */
  var schedule = function () {};

  function DCBase() {
    this.state = {};
    this.props = {};
  }
  DCBase.prototype.setState = function (update) {
    var patch = typeof update === "function" ? update(this.state, this.props) : update;
    if (patch) {
      var next = {}, k;
      for (k in this.state) next[k] = this.state[k];
      for (k in patch) next[k] = patch[k];
      this.state = next;
    }
    schedule();
  };
  DCBase.prototype.forceUpdate = function () { schedule(); };

  /* ======================= application logic ============================== */
  const LSM_DATA = "Afternoon_Biscuit_Core|1001655\nAfternoon_Biscuit_Core_24 Hour|1002011\nAfternoon_DT_Core|1001654\nAfternoon_DT_Core_24 Hour|1002010\nAfternoon_FC_Core|1001653\nAfternoon_FC_Core_24 Hour|1002009\nAfternoon_Kitchen_Core|1001652\nAfternoon_Kitchen_Core_24 Hour|1002008\nBreakfast_Biscuit_Core|1001646\nBreakfast_Biscuit_Core_24 Hour|1002034\nBreakfast_DT_Core|1001644\nBreakfast_DT_Core_24 Hour|1002032\nBreakfast_FC_Core|1001645\nBreakfast_FC_Core_24 Hour|1002033\nBreakfast_Kitchen_Core|1001647\nBreakfast_Kitchen_Core_24 Hour|1002035\nCore AI_Afternoon_Biscuit|1001766\nCore AI_Afternoon_Biscuit_24 Hour|1001981\nCore AI_Afternoon_DT|1001785\nCore AI_Afternoon_DT_24 Hour|1001999\nCore AI_Afternoon_FC|1001781\nCore AI_Afternoon_FC_24 Hour|1001986\nCore AI_Afternoon_Kitchen|1001771\nCore AI_Afternoon_Kitchen_24 Hour|1002028\nCore AI_Afternoon_MIC|1001776\nCore AI_Afternoon_MIC_24 Hour|1001984\nCore AI_Breakfast_Biscuit|1001764\nCore AI_Breakfast_Biscuit_24 Hour|1002025\nCore AI_Breakfast_DT|1001784\nCore AI_Breakfast_DT_24 Hour|1001994\nCore AI_Breakfast_FC|1001780\nCore AI_Breakfast_FC_24 Hour|1001987\nCore AI_Breakfast_Kitchen|1001769\nCore AI_Breakfast_Kitchen_24 Hour|1002027\nCore AI_Breakfast_MIC|1001775\nCore AI_Breakfast_MIC_24 Hour|1001989\nCore AI_Daypart_Afternoon|1001792\nCore AI_Daypart_Afternoon_24 Hour|1001997\nCore AI_Daypart_Breakfast|1001791\nCore AI_Daypart_Breakfast_24 Hour|1002029\nCore AI_Daypart_Dinner|1001794\nCore AI_Daypart_Dinner_24 Hour|1001988\nCore AI_Daypart_Late Night|1001795\nCore AI_Daypart_Late Night_24 Hour|1001995\nCore AI_Daypart_Lunch|1001793\nCore AI_Daypart_Lunch_24 Hour|1001991\nCore AI_Dinner_Biscuit|1001767\nCore AI_Dinner_Biscuit_24 Hour|1001980\nCore AI_Dinner_DT|1001787\nCore AI_Dinner_DT_24 Hour|1002003\nCore AI_Dinner_FC|1001782\nCore AI_Dinner_FC_24 Hour|1001983\nCore AI_Dinner_Kitchen|1001773\nCore AI_Dinner_Kitchen_24 Hour|1001998\nCore AI_Dinner_MIC|1001778\nCore AI_Dinner_MIC_24 Hour|1001985\nCore AI_Late Night_Biscuit|1001768\nCore AI_Late Night_Biscuit_24 Hour|1002026\nCore AI_Late Night_DT|1001788\nCore AI_Late Night_DT_24 Hour|1002001\nCore AI_Late Night_FC|1001783\nCore AI_Late Night_FC_24 Hour|1001993\nCore AI_Late Night_Kitchen|1001774\nCore AI_Late Night_Kitchen_24 Hour|1001992\nCore AI_Late Night_MIC|1001779\nCore AI_Late Night_MIC_24 Hour|1002000\nCore AI_Lunch_Biscuit|1001765\nCore AI_Lunch_Biscuit_24 Hour|1001982\nCore AI_Lunch_DT|1001786\nCore AI_Lunch_DT_24 Hour|1002002\nCore AI_Lunch_FC|1001789\nCore AI_Lunch_FC_24 Hour|1002031\nCore AI_Lunch_Kitchen|1001772\nCore AI_Lunch_Kitchen_24 Hour|1001990\nCore AI_Lunch_MIC|1001777\nCore AI_Lunch_MIC_24 Hour|1001996\nCore AI_Utility|1001790\nCore AI_Utility_24 Hour|1002030\nCore_Afternoon_Biscuit_PMIX|1001674\nCore_Afternoon_DT_PMIX|1001685\nCore_Afternoon_FC_PMIX|1001690\nCore_Afternoon_Kitchen_PMIX|1001679\nCore_Afternoon_MIC_PMIX|1001695\nCore_Breakfast_Biscuit_PMIX|1001675\nCore_Breakfast_DT_PMIX|1001686\nCore_Breakfast_FC_PMIX|1001691\nCore_Breakfast_Kitchen_PMIX|1001680\nCore_Breakfast_MIC_PMIX|1001696\nCore_Daypart_Afternoon_PMIX|1001732\nCore_Daypart_Breakfast_PMIX|1001733\nCore_Daypart_Dinner_PMIX|1001734\nCore_Daypart_Late Night_PMIX|1001735\nCore_Daypart_Lunch_PMIX|1001736\nCore_Dinner_Biscuit_PMIX|1001676\nCore_Dinner_DT_PMIX|1001687\nCore_Dinner_FC_PMIX|1001692\nCore_Dinner_Kitchen_PMIX|1001681\nCore_Dinner_MIC_PMIX|1001697\nCore_Late Night_Biscuit_PMIX|1001677\nCore_Late Night_DT_PMIX|1001688\nCore_Late Night_FC_PMIX|1001693\nCore_Late Night_Kitchen_PMIX|1001682\nCore_Late Night_MIC_PMIX|1001698\nCore_Lunch_Biscuit_PMIX|1001678\nCore_Lunch_DT_PMIX|1001689\nCore_Lunch_FC_PMIX|1001694\nCore_Lunch_Kitchen_PMIX|1001684\nCore_Lunch_MIC_PMIX|1001699\nCore_Utility_PMIX|1001700\nDaypart_Afternoon_Core|1001667\nDaypart_Afternoon_Core_24 Hour|1002022\nDaypart_Breakfast_Core|1001665\nDaypart_Breakfast_Core_24 Hour|1002020\nDaypart_Dinner_Core|1001668\nDaypart_Dinner_Core_24 Hour|1002023\nDaypart_Late Night_Core|1001669\nDaypart_Late Night_Core_24 Hour|1002024\nDaypart_Lunch_Core|1001666\nDaypart_Lunch_Core_24 Hour|1002021\nDinner_Biscuit_Core|1001656\nDinner_Biscuit_Core_24 Hour|1002012\nDinner_DT_Core|1001657\nDinner_DT_Core_24 Hour|1002013\nDinner_FC_Core|1001658\nDinner_FC_Core_24 Hour|1002014\nDinner_Kitchen_Core|1001659\nDinner_Kitchen_Core_24 Hour|1002015\nEnter Name Here|1001923\nExpansion_Afternoon_Biscuit_PMIX|1001708\nExpansion_Afternoon_DT_PMIX|1001709\nExpansion_Afternoon_FC_PMIX|1001710\nExpansion_Afternoon_Kitchen_PMIX|1001711\nExpansion_Afternoon_MIC_PMIX|1001712\nExpansion_Breakfast_Biscuit_PMIX|1001702\nExpansion_Breakfast_DT_PMIX|1001703\nExpansion_Breakfast_FC_PMIX|1001704\nExpansion_Breakfast_Kitchen_PMIX|1001705\nExpansion_Breakfast_MIC_PMIX|1001706\nExpansion_Daypart_Afternoon_PMIX|1001713\nExpansion_Daypart_Breakfast_PMIX|1001707\nExpansion_Daypart_Dinner_PMIX|1001730\nExpansion_Daypart_Late Night_PMIX|1001731\nExpansion_Daypart_Lunch_PMIX|1001714\nExpansion_Dinner_Biscuit_PMIX|1001721\nExpansion_Dinner_DT_PMIX|1001673\nExpansion_Dinner_FC_PMIX|1001720\nExpansion_Dinner_Kitchen_PMIX|1001722\nExpansion_Dinner_MIC_PMIX|1001723\nExpansion_Late_Night_Biscuit_PMIX|1001725\nExpansion_Late_Night_DT_PMIX|1001726\nExpansion_Late_Night_FC_PMIX|1001727\nExpansion_Late_Night_Kitchen_PMIX|1001728\nExpansion_Late_Night_MIC_PMIX|1001729\nExpansion_Lunch_Biscuit_PMIX|1001716\nExpansion_Lunch_DT_PMIX|1001715\nExpansion_Lunch_FC_PMIX|1001717\nExpansion_Lunch_Kitchen_PMIX|1001718\nExpansion_Lunch_MIC_PMIX|1001719\nExpansion_Utility_PMIX|1001701\nLate Night_Biscuit_Core|1001660\nLate Night_Biscuit_Core_24 Hour|1002016\nLate Night_DT_Core|1001661\nLate Night_DT_Core_24 Hour|1002017\nLate Night_FC_Core|1001662\nLate Night_FC_Core_24 Hour|1002018\nLate Night_Kitchen_Core|1001663\nLate Night_Kitchen_Core_24 Hour|1002019\nLunch_Biscuit_Core|1001648\nLunch_Biscuit_Core_24 Hour|1002004\nLunch_DT_Core|1001649\nLunch_DT_Core_24 Hour|1002005\nLunch_FC_Core|1001650\nLunch_FC_Core_24 Hour|1002006\nLunch_Kitchen_Core|1001651\nLunch_Kitchen_Core_24 Hour|1002007\nMIC_Core|1001613\nMIC_Core_24 Hour|1002037\nNon Service|1001614\nUtility_Core|1001664\nUtility_Core_24 Hour|1002038"
    .split("\n").map(l => { const p = l.split("|"); return { name: p[0], key: p[1] }; });

  const MATRIX_SEED = {
    "Afternoon_DT_Core": [[0,90,1],[90,150,2],[150,255,3],[255,345,4],[345,435,5],[435,9999,6]],
    "Core AI_Breakfast_FC": [[1,166,1],[166,296,2],[296,397,3],[397,430,4],[430,9999,5]]
  };

  function fmtNum(v) {
    const n = Math.round(Number(v) * 100) / 100;
    return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function parseNum(v) {
    const n = parseFloat(String(v).replace(/,/g, ""));
    return isNaN(n) ? 0 : n;
  }
  function scaleRows(rows, pct, field) {
    const up = (v) => Math.ceil(Math.round(v * (1 + pct) * 1e6) / 1e6);
    const out = [];
    rows.forEach((row, i) => {
      const o = Object.assign({}, row);
      if (field === "emp") { o.emp = Math.max(1, Math.round(o.emp * (1 + pct))); out.push(o); return; }
      if (field === "both" || field === "end") {
        o.end = o.end === 9999 ? 9999 : up(o.end);
      }
      if (field === "both") {
        o.start = i === 0 ? up(row.start) : out[i - 1].end;
      } else if (field === "start") {
        o.start = up(o.start);
      }
      out.push(o);
    });
    return out;
  }

  function buildMatrix(rec) {
    if (MATRIX_SEED[rec.name]) {
      return MATRIX_SEED[rec.name].map((r, i) => ({ index: i + 1, start: r[0], end: r[1], emp: r[2] }));
    }
    let seed = Number(rec.key) % 100000;
    const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
    rnd();
    const n = 4 + Math.floor(rnd() * 4);
    const rows = [];
    let v = Math.round(rnd() * 5) * 25;
    for (let i = 0; i < n; i++) {
      const start = v;
      v = start + 55 + Math.round(rnd() * 26) * 5;
      rows.push({ index: i + 1, start: start, end: i === n - 1 ? 9999 : v, emp: i + 1 });
    }
    return rows;
  }

  const SHIFT_COLORS = {
    MIC: { bg: "#e16676", bd: "#cd001a" },
    Kitchen: { bg: "#6692ce", bd: "#2c5fa8" },
    DT: { bg: "#67bc93", bd: "#2f9163" },
    Utility: { bg: "#66c1d1", bd: "#2f8fa3" },
    "Multi Job": { bg: "#67bc93", bd: "#2f9163" }
  };

  const EMPLOYEES = [
    ["CS", "Chelsey Sallie", "37:00", "#90411e", false, ["", "5:00a-2:00p|Kitchen", "", "2:00p-10:30p|Kitchen", "6:00p-10:30p|Multi Job", "2:30p-10:30p|MIC", "3:30p-10:30p|MIC"]],
    ["CF", "Crystal Fulton", "38:00", "#2f8f8a", false, ["4:00a-12:00p|Utility", "4:00a-11:30a|DT", "", "4:00a-11:00a|MIC", "4:00a-11:30a|MIC", "4:00a-12:00p|Utility", ""]],
    ["HE", "Hanna Edlin", "50:00", "#c8a02e", true, ["7:00a-5:00p|MIC", "7:30a-5:30p|MIC", "", "7:30a-5:30p|MIC", "7:30a-5:30p|MIC", "", "7:00a-5:00p|MIC"]],
    ["KH", "Kaitlyn Hamson", "45:30", "#5b6b7a", true, ["1:30p-10:30p|MIC", "", "4:00a-2:00p|MIC", "6:00a-2:30p|DT", "5:00a-2:00p|DT", "6:00a-3:00p|Kitchen", ""]],
    ["MH", "Makayla Harris", "47:30", "#d98324", true, true, ["", "11:00a-7:30p|MIC", "8:00a-6:00p|MIC", "1:30p-10:30p|MIC", "", "7:00a-5:00p|MIC", "5:00a-3:00p|MIC"]],
    ["SO", "Samuel Overby", "39:30", "#9b59d0", false, ["12:00p-7:00p|MIC", "2:30p-10:30p|DT", "2:30p-10:30p|MIC", "", "2:00p-10:30p|MIC", "2:30p-10:30p|Kitchen", ""]],
    ["TM", "TaRanda McRae", "35:30", "#c0392b", false, ["", "2:00p-10:30p|MIC", "12:00p-8:00p|MIC", "", "", "8:00a-5:00p|Multi Job", "8:30a-6:30p|MIC"]],
    ["WA", "Wanda Archer", "32:00", "#7b4fa0", false, ["", "", "9:00a-5:00p|MIC", "", "10:00a-6:00p|Kitchen", "", "9:00a-5:00p|MIC"]]
  ];

  const SUMMARY = [
    ["Employee Hours -  754:30", ["101:30", "98:30", "105:30", "107:00", "117:00", "119:00", "106:00"], "head"],
    ["Budgeted Hourly Manager % ( 3.42)", ["3.51 %", "3.58 %", "3.39 %", "3.28 %", "3.36 %", "3.47 %", "3.35 %"], "alt"],
    ["Budgeted Crew % ( 11.46)", ["11.54 %", "11.63 %", "11.28 %", "10.56 %", "11.05 %", "11.58 %", "10.47 %"], "plain"],
    ["Total Budgeted % ( 14.20)", ["14.30 %", "14.55 %", "13.90 %", "13.40 %", "13.75 %", "14.60 %", "14.05 %"], "alt"],
    ["Total Scheduled Hours (754:30)", ["101:30", "98:30", "105:30", "107:00", "117:00", "119:00", "106:00"], "plain"],
    ["Forecasted Sales $(54950.00)", ["$ 7100.00", "$ 6900.00", "$ 7500.00", "$ 7850.00", "$ 8500.00", "$ 8700.00", "$ 8400.00"], "alt"],
    ["Forecasted Hours (732:30)", ["97:30", "96:45", "102:00", "104:15", "112:45", "112:00", "107:15"], "plain"],
    ["Variance Hours (22:00)", ["4:00", "1:45", "3:30", "2:45", "4:15", "7:00", "-1:15"], "alt"],
    ["Forecasted Labor % ( 17.1)", ["17.62 %", "17.99 %", "17.45 %", "17.04 %", "17.02 %", "16.52 %", "16.38 %"], "plain"],
    ["Scheduled Labor % ( 14.88)", ["15.05 %", "15.21 %", "14.67 %", "13.84 %", "14.41 %", "15.05 %", "13.82 %"], "alt"]
  ];

  const SCHED_PCT = ["15.05 %", "15.21 %", "14.67 %", "13.84 %", "14.41 %", "15.05 %", "13.82 %"];
  const TB_PCT = ["14.30 %", "14.55 %", "13.90 %", "13.40 %", "13.75 %", "14.60 %", "14.05 %"];
  const VARIANCE_ROW = ["Variance (S - TB) ( 0.68)", SCHED_PCT.map((v, i) => {
    const d = Math.round((parseFloat(v) - parseFloat(TB_PCT[i])) * 100) / 100;
    return (d >= 0 ? "+" : "") + d.toFixed(2) + " %";
  }), "plain"];
  SUMMARY.push(VARIANCE_ROW);

  const LBU_ROWS = [
    ["1018", "Eden", "P09", "W2", 3.42, 11.46],
    ["1024", "Burlington", "P09", "W2", 3.55, 11.62],
    ["1031", "Greensboro South", "P09", "W2", 3.28, 10.78],
    ["1047", "Kernersville", "P09", "W2", 3.71, 12.04],
    ["1052", "Mebane", "P09", "W2", 3.36, 11.19],
    ["1068", "Reidsville", "P09", "W2", 3.49, 11.35],
    ["1073", "Madison", "P09", "W2", 3.24, 10.62],
    ["1085", "Yanceyville", "P09", "W2", 3.63, 11.88]
  ];

  const LBU_COLS = [
    ["Store No", 120, "left"], ["Store Name", 230, "left"], ["Period No", 110, "center"], ["Week No", 110, "center"],
    ["Budgeted Hourly Mgr %", 220, "right"], ["Budgeted Crew %", 200, "right"], ["Total Budget %", 200, "right"]
  ];

  const LBU_TABS = [
    { id: "summary", label: "Summary", icon: "#ic-grid" },
    { id: "stats", label: "Stats", icon: "#ic-stats" },
    { id: "audit", label: "Audit Trail", icon: "#ic-report" }
  ];


  const MLMU_TABS = [
    { id: "stats", label: "Stats", icon: "#ic-stats" },
    { id: "assign", label: "Matrix Assignment", icon: "#ic-matrix" },
    { id: "audit", label: "Audit Trail", icon: "#ic-report" }
  ];

  const DETAIL_TABS = [
    { id: "stats", label: "Stats", icon: "#ic-stats" },
    { id: "matrix", label: "Labor Matrix", icon: "#ic-matrix" },
    { id: "jobcode", label: "Add Job Code Matrix", icon: "#ic-jobcode" },
    { id: "jobdept", label: "Add Job Dept Matrix", icon: "#ic-jobdept" },
    { id: "backup", label: "Backup of Old Setup", icon: "#ic-backup" }
  ];

  const NAV = [
    { id: "home", label: "BoHome", icon: "#ic-home", children: [] },
    { id: "cash", label: "BoCash", icon: "#ic-cash", children: [] },
    { id: "food", label: "BoFood", icon: "#ic-food", children: [] },
    { id: "labor", label: "BoWorkforce", icon: "#ic-labor", children: [
      { id: "hr", label: "Human Resource", children: [] },
      { id: "tk", label: "Timekeeping", children: [] },
      { id: "sched", label: "Scheduling", children: [
        { id: "wfs", label: "Weekly Fixed Shifts" },
        { id: "wms", label: "Weekly Manager Schedule" },
        { id: "ws", label: "Weekly Schedule", route: "wsched" },
        { id: "fhg", label: "Fixed Hours Guide" },
        { id: "fts", label: "Fixed Task Shifts" },
        { id: "msch", label: "Manager Scheduler" },
        { id: "wls", label: "Weekly Labor Scheduler" },
        { id: "psw", label: "Predictive Scheduling Workflow" }
      ] }
    ] },
    { id: "reports", label: "BoReports", icon: "#ic-report", children: [] },
    { id: "advreports", label: "BoAdv. Reports", icon: "#ic-report", children: [] },
    { id: "admin", label: "BoAdmin", icon: "#ic-admin", children: [
      { id: "setup", label: "Setup", children: [] },
      { id: "adminsub", label: "Admin", children: [
        { id: "ssc", label: "Store Setup & Configuration", children: [
          { id: "ss", label: "Store Setup" },
          { id: "sp", label: "Store Profile" },
          { id: "sclose", label: "Store Close" },
          { id: "ia", label: "Integration Admin" },
          { id: "ols", label: "Operation Level Setup" },
          { id: "dsv", label: "Deployment Services" },
          { id: "lsched", label: "Labor Scheduler", children: [
            { id: "lsm", label: "Labor Service Matrix", route: "list" }
          ] },
          { id: "fsetup", label: "Forecast Setup", children: [] }
        ] },
        { id: "usc", label: "User Setup & Configuration", children: [] },
        { id: "appsetup", label: "Application Setup", children: [] },
        { id: "globalorg", label: "Global Org Admin", children: [] },
        { id: "orgadmin", label: "Organization Admin", children: [] },
        { id: "vim", label: "Vendor Item Mapping Setup" },
        { id: "vendor", label: "Vendor Setup" },
        { id: "mlmu", label: "Mass Labor Matrices Update", route: "mlmuList" },
        { id: "lbu", label: "Labor Budget Upload", route: "lbu" }
      ] }
    ] },
    { id: "help", label: "BoHelp", icon: "#ic-help", children: [] }
  ];

  const DEPTH = [
    { h: 59, band: 0, pad: 22, font: 15.5 },
    { h: 45, band: 24, pad: 18, font: 15 },
    { h: 45, band: 45, pad: 16, font: 15 },
    { h: 45, band: 61, pad: 16, font: 15 },
    { h: 45, band: 85, pad: 10, font: 15 }
  ];

  class Component extends DCBase {
    state = {
      navOpen: false, openIds: {},
      route: "workflow", record: null, detailTab: "stats",
      perPage: 25, page: 1, search: "", matrixSearch: "", matrixPerPage: 25,
      setups: [
        { id: "s1", name: "Holiday Uplift", impact: "10.00", matrices: ["1001655", "1001654"] },
        { id: "s2", name: "Summer Peak", impact: "7.50", matrices: ["1001646"] },
        { id: "s3", name: "Remodel Recovery", impact: "-5.00", matrices: [] }
      ], setupId: "s1", mlmuTab: "stats", availSel: [], assignedSel: [], assignNotice: "", impactNotice: "", audit: [], analysisOpen: true, lbuFile: "", lbuFileMeta: "", lbuErr: false, lbuLoaded: false, lbuNotice: "", lbuTab: "summary", lbuData: [], lbuDraft: [], lbuEdit: false, lbuSel: {}, lbuAudit: [],
      matrices: {}, selected: {}, pctOpen: false, pctDir: "inc", pctValue: "10", pctField: "both", pctBanner: ""
    };

    logAudit(setupId, action, detail) {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const when = pad(d.getMonth() + 1) + "/" + pad(d.getDate()) + "/" + d.getFullYear() + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
      this.setState(st => ({ audit: [{ id: Math.random(), setupId: setupId, when: when, action: action, detail: detail, user: "CorpAdmin@altametrics.com" }].concat(st.audit) }));
    }

    downloadLbuSample() {
      const cols = ["Store Number", "Period", "Week", "Budgeted Hourly Mgr %", "Budgeted Crew %"];
      const sample = [["1018", "9", "2", "7.25", "18.40"]];
      const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const cell = (v, type) => '<Cell><Data ss:Type="' + type + '">' + esc(v) + "</Data></Cell>";
      const rows = ['<Row ss:StyleID="hdr">' + cols.map((c) => cell(c, "String")).join("") + "</Row>"]
        .concat(sample.map((r) => "<Row>" + r.map((v) => cell(v, "Number")).join("") + "</Row>"));
      const xml = '<?xml version="1.0"?>\n<?mso-application progid="Excel.Sheet"?>\n' +
        '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">' +
        '<Styles><Style ss:ID="hdr"><Font ss:Bold="1"/><Interior ss:Color="#ECECEC" ss:Pattern="Solid"/></Style></Styles>' +
        '<Worksheet ss:Name="Labor Budget"><Table>' +
        '<Column ss:Width="90"/><Column ss:Width="55"/><Column ss:Width="50"/><Column ss:Width="145"/><Column ss:Width="120"/>' +
        rows.join("") + "</Table></Worksheet></Workbook>";
      const blob = new Blob([xml], { type: "application/vnd.ms-excel" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "LaborBudget_Template.xls";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    validateLbuFile(file) {
      const MAX_MB = 5;
      const ALLOWED = ["xls", "xlsx", "csv"];
      const name = file.name || "";
      const dot = name.lastIndexOf(".");
      const ext = dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
      if (!ext) return "Invalid file \u2014 the file has no extension. Accepted formats : .xls, .xlsx, .csv.";
      if (ALLOWED.indexOf(ext) === -1) return "Invalid format \u2014 \u201C." + ext + "\u201D is not supported. Accepted formats : .xls, .xlsx, .csv.";
      if (/\.(exe|bat|cmd|sh|js|zip)\./i.test(name)) return "Invalid file name \u2014 double extensions are not permitted.";
      if (name.length > 120) return "File name too long \u2014 keep it under 120 characters.";
      if (file.size === 0) return "Empty file \u2014 the selected file contains no data.";
      if (file.size > MAX_MB * 1024 * 1024) {
        return "File too large \u2014 " + (file.size / 1048576).toFixed(2) + " MB exceeds the " + MAX_MB + " MB limit.";
      }
      return null;
    }

    logLbu(action, detail) {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const when = pad(d.getMonth() + 1) + "/" + pad(d.getDate()) + "/" + d.getFullYear() + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
      this.setState(st => ({ lbuAudit: [{ when: when, action: action, detail: detail, user: "CorpAdmin@altametrics.com" }].concat(st.lbuAudit) }));
    }

    matrixFor(rec) {
      if (!rec) return [];
      if (!this.state.matrices[rec.key]) this.state.matrices[rec.key] = buildMatrix(rec);
      return this.state.matrices[rec.key];
    }

    setCell(key, idx, field, value) {
      this.setState(s => {
        const next = Object.assign({}, s.matrices);
        next[key] = next[key].map((r, i) => i === idx ? Object.assign({}, r, { [field]: parseNum(value) }) : r);
        return { matrices: next };
      });
    }

    go(route, record) {
      this.setState({ route: route, record: record || null, navOpen: false, detailTab: "stats" });
    }

    flattenNav(items, depth, out) {
      const { openIds, route, record } = this.state;
      items.forEach(item => {
        const expandable = Array.isArray(item.children);
        const open = !!openIds[item.id];
        const d = DEPTH[Math.min(depth, 4)];
        const isActive = (item.route === "list" && (route === "list" || route === "detail")) || (item.route === "mlmuList" && (route === "mlmuList" || route === "mlmu")) || (item.route === "wsched" && route === "wsched") || (item.route === "lbu" && route === "lbu");
        let bg = "transparent", fg = depth === 0 ? "#d3d7e0" : (depth >= 3 ? "#8b90a0" : "#c3c8d3");
        if (isActive) { bg = "#26282f"; fg = "#ffffff"; }
        else if (open && expandable && item.children.length) { bg = "#222326"; fg = "#ffffff"; }
        else if (open && depth > 0) { bg = "#222326"; fg = "#ffffff"; }
        out.push({
          label: item.label,
          is_home: depth === 0 && item.icon === "#ic-home",
          is_cash: depth === 0 && item.icon === "#ic-cash",
          is_food: depth === 0 && item.icon === "#ic-food",
          is_labor: depth === 0 && item.icon === "#ic-labor",
          is_report: depth === 0 && item.icon === "#ic-report",
          is_admin: depth === 0 && item.icon === "#ic-admin",
          is_help: depth === 0 && item.icon === "#ic-help",
          expandable: expandable,
          style: "display:flex;align-items:center;width:calc(100% - " + d.band + "px);margin-left:" + d.band +
            "px;height:" + d.h + "px;padding:0 18px 0 " + d.pad + "px;border:none;cursor:pointer;font-family:Arial, Helvetica, sans-serif;font-size:" +
            d.font + "px;font-weight:400;text-align:left;background:" + bg + ";color:" + fg,
          chevronStyle: "color:#9aa1b2;flex:0 0 15px;transform:rotate(" + (open ? "180deg" : "0deg") + ")",
          onClick: () => {
            if (item.route) { this.go(item.route); return; }
            this.setState(s => {
              const next = Object.assign({}, s.openIds);
              next[item.id] = !next[item.id];
              return { openIds: next };
            });
          }
        });
        if (open && expandable && item.children.length) this.flattenNav(item.children, depth + 1, out);
      });
      return out;
    }

    crumbFor(route, record) {
      const link = "font-size:13px;color:#1a5c8f;cursor:pointer";
      const plain = "font-size:13px;color:#1f2430";
      if (route === "workflow") return [{ text: "DashBoard | (User: CorpAdmin@altametrics.com)", style: "font-size:13px;font-weight:700;color:#1f2430" }];
      if (route === "wsched") {
        const seg = ["BoWorkforce", "Scheduling", "Weekly Schedule", "1018, Eden", "09/07/2026"];
        const o = [];
        seg.forEach((b, i) => {
          o.push({ text: b, style: i >= 3 ? link : "font-size:13px;color:#1f2430" });
          if (i < seg.length - 1) o.push({ text: "\u00a0>\u00a0", style: plain });
        });
        o.push({ text: "\u00a0| (User: ErsAdmin11)", style: plain });
        return o;
      }
      if (route === "lbu") {
        const o = [];
        ["BoAdmin", "Admin", "Labor Budget Upload"].forEach((b, i) => {
          o.push({ text: b, style: i === 2 ? link + ";text-decoration:underline" : "font-size:13px;color:#1a5c8f" });
          if (i < 2) o.push({ text: "\u00a0>\u00a0", style: plain });
        });
        o.push({ text: "\u00a0| (User: CorpAdmin@altametrics.com)", style: plain });
        return o;
      }
      if (route === "mlmuList" || route === "mlmu") {
        const out2 = [];
        ["BoAdmin", "Admin", "Mass Labor Matrices Update"].forEach((b, i) => {
          out2.push({ text: b, style: i === 2 ? link + ";text-decoration:underline" : "font-size:13px;color:#1a5c8f", onClick: () => { if (i === 2) this.go("mlmuList"); } });
          if (i < 2) out2.push({ text: "\u00a0>\u00a0", style: plain });
        });
        if (route === "mlmu") {
          const su = this.state.setups.find(x => x.id === this.state.setupId);
          out2.push({ text: "\u00a0>\u00a0", style: plain });
          out2.push({ text: su ? su.name : "", style: link });
        }
        out2.push({ text: "\u00a0| (User: CorpAdmin@altametrics.com)", style: plain });
        return out2;
      }
      const base = ["BoAdmin", "Admin", "Store Setup & Configuration", "Labor Scheduler", "Labor Service Matrix"];
      const out = [];
      base.forEach((b, i) => {
        out.push({ text: b, style: i === 4 ? link + ";text-decoration:underline" : "font-size:13px;color:#1a5c8f", onClick: () => { if (i === 4) this.go("list"); } });
        if (i < base.length - 1) out.push({ text: "\u00a0>\u00a0", style: plain });
      });
      if (route === "detail" && record) {
        out.push({ text: "\u00a0>\u00a0", style: plain });
        out.push({ text: record.name, style: link });
      }
      out.push({ text: "\u00a0| (User: CorpAdmin@altametrics.com)", style: plain });
      return out;
    }

    renderVals() {
      const s = this.state;
      const filtered = s.search
        ? LSM_DATA.filter(r => r.name.toLowerCase().indexOf(s.search.toLowerCase()) >= 0 || r.key.indexOf(s.search) >= 0)
        : LSM_DATA;
      const per = Number(s.perPage);
      const totalPages = Math.max(1, Math.ceil(filtered.length / per));
      const page = Math.min(s.page, totalPages);
      const start = (page - 1) * per;
      const slice = filtered.slice(start, start + per);
      const pageBtn = (active) => "min-width:34px;height:30px;padding:0 11px;border:1px solid " +
        (active ? "#015683" : "#cfd6dc") + ";background:" + (active ? "#015683" : "#ffffff") +
        ";color:" + (active ? "#ffffff" : "#1a5c8f") + ";font-family:Arial, Helvetica, sans-serif;font-size:13.5px;cursor:pointer;margin-left:-1px";
      const edgeBtn = (disabled) => "height:30px;padding:0 14px;border:1px solid #cfd6dc;background:" +
        (disabled ? "#f3f5f6" : "#ffffff") + ";color:" + (disabled ? "#9aa4ac" : "#1a5c8f") +
        ";font-family:Arial, Helvetica, sans-serif;font-size:13.5px;cursor:" + (disabled ? "default" : "pointer") + ";margin-left:-1px";
      const pageNums = [];
      let from = Math.max(1, page - 2);
      let to = Math.min(totalPages, from + 4);
      from = Math.max(1, to - 4);
      for (let n = from; n <= to; n++) pageNums.push(n);

      const selectedKeys = Object.keys(s.selected).filter(k => s.selected[k]);
      const rec = s.record;
      const allMrows = rec ? this.matrixFor(rec) : [];
      const mq = s.matrixSearch.trim().toLowerCase();
      const mrows = mq
        ? allMrows.filter(m => [m.index, m.start, m.end, m.emp].some(v => fmtNum(v).toLowerCase().indexOf(mq) >= 0 || String(v).indexOf(mq) >= 0))
        : allMrows.slice(0, Number(s.matrixPerPage));
      const pctReady = selectedKeys.length > 0 && parseNum(s.pctValue) > 0;
      const lbuActive = s.lbuEdit ? s.lbuDraft : s.lbuData;


      const setup = s.setups.find(x => x.id === s.setupId) || s.setups[0];
      const ownerOf = {};
      s.setups.forEach(su => su.matrices.forEach(k => { ownerOf[k] = su; }));
      const mineKeys = setup ? setup.matrices : [];
      const listBtn = (on) => "height:30px;padding:0 14px;border-radius:3px;font-family:Arial, Helvetica, sans-serif;font-size:13.5px;font-weight:700;background:" +
        (on ? "#015683" : "#eceff1") + ";color:" + (on ? "#ffffff" : "#9aa4ac") + ";border:1px solid " + (on ? "#01486e" : "#d6dce0") +
        ";cursor:" + (on ? "pointer" : "default");

      return {
        isWsched: s.route === "wsched",
        weekCols: [1, 2, 3, 4, 5, 6, 7].map(n => ({ n: n })),
        employees: EMPLOYEES.map(e => ({
          initials: e[0], name: e[1], hours: "\u25f7 " + e[2], warn: e[5] === true,
          avatarStyle: "width:36px;height:36px;flex:0 0 36px;border-radius:4px;background:" + e[3] +
            ";color:#ffffff;font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center",
          hoursStyle: "font-size:12.5px;color:" + (e[4] ? "#cd001a" : "#4a4a4a"),
          cells: (e[5] === true ? e[6] : e[5]).map(v => {
            if (!v) return { has: false, label: "", style: "" };
            const parts = v.split("|");
            const c = SHIFT_COLORS[parts[1]] || SHIFT_COLORS.MIC;
            const multi = parts[1] === "Multi Job";
            return {
              has: true,
              label: parts[0] + " | " + parts[1],
              style: "display:flex;align-items:center;justify-content:center;width:100%;height:38px;border-radius:4px;background:" +
                c.bg + ";border:1px solid " + c.bd + ";color:#1a1a1a;font-size:13px;font-weight:" + (multi ? "700" : "400") +
                ";white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 6px"
            };
          })
        })),
        analysisHeadLabel: SUMMARY[0][0],
        analysisHeadValues: SUMMARY[0][1].map(t => ({ t: t })),
        analysisArrowStyle: "display:inline-block;font-size:11px;color:#0561f6;transition:none;transform:rotate(" +
          (s.analysisOpen ? "90deg" : "0deg") + ")",
        toggleAnalysis: () => this.setState(st => ({ analysisOpen: !st.analysisOpen })),
        summaryRows: (s.analysisOpen ? SUMMARY.slice(1) : []).map(r => ({
          label: r[0],
          values: r[1].map(t => ({ t: t })),
          rowStyle: "display:flex;align-items:center;height:34px;border-bottom:1px solid #e2e2e2;font-weight:" +
            (r[2] === "head" ? "700" : "400") + ";background:" + (r[2] === "head" ? "#ebebfd" : (r[2] === "alt" ? "#f8f8ff" : "#ffffff"))
        })),
        isLbu: s.route === "lbu",
        isLbuSummary: s.lbuTab === "summary",
        isLbuStats: s.lbuTab === "stats",
        isLbuAudit: s.lbuTab === "audit",
        lbuTabs: LBU_TABS.map(t => ({
          label: t.label,
          is_grid: t.icon === "#ic-grid", is_stats: t.icon === "#ic-stats", is_report: t.icon === "#ic-report",
          onClick: () => this.setState({ lbuTab: t.id }),
          style: "display:flex;align-items:center;gap:10px;padding:0 20px;border:none;cursor:pointer;font-family:Arial, Helvetica, sans-serif;font-size:15.5px;white-space:nowrap;color:#ffffff;font-weight:" +
            (s.lbuTab === t.id ? "700" : "400") + ";background:" + (s.lbuTab === t.id ? "#3b3d4a" : "transparent")
        })),
        lbuFileName: s.lbuFile ? s.lbuFile + (s.lbuFileMeta ? "  (" + s.lbuFileMeta + ")" : "") : "No file selected",
        lbuNotice: s.lbuNotice,
        lbuPick: (e) => {
          const f = e && e.target && e.target.files ? e.target.files[0] : null;
          if (e && e.target) e.target.value = "";
          if (!f) return;
          const err = this.validateLbuFile(f);
          if (err) {
            this.setState({ lbuFile: "", lbuFileMeta: "", lbuErr: true, lbuNotice: err });
            this.logLbu("Upload rejected", f.name + " \u2014 " + err);
            return;
          }
          const kb = f.size / 1024;
          const size = kb < 1024 ? kb.toFixed(1) + " KB" : (kb / 1024).toFixed(2) + " MB";
          this.setState({ lbuFile: f.name, lbuFileMeta: size, lbuErr: false, lbuNotice: "File validated \u2014 " + f.name + " (" + size + "). Click Upload to import." });
          this.logLbu("File validated", f.name + " \u2014 " + size);
        },
        lbuBrowse: () => {
          const input = document.getElementById("lbuFileInput");
          if (input) input.click();
        },
        lbuNoticeStyle: "margin-top:14px;font-size:13px;font-weight:700;padding:8px 12px;border-radius:3px;border:1px solid " +
          (s.lbuErr ? "#e0b4b4" : "#b7dcbb") + ";background:" + (s.lbuErr ? "#fdecec" : "#e9f6ea") +
          ";color:" + (s.lbuErr ? "#9b1c1c" : "#1f5b28"),
        lbuUploadStyle: "height:30px;padding:0 24px;border-radius:3px;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:700;white-space:nowrap;background:" +
          (s.lbuFile ? "#015683" : "#eceff1") + ";color:" + (s.lbuFile ? "#ffffff" : "#9aa4ac") +
          ";border:1px solid " + (s.lbuFile ? "#01486e" : "#d6dce0") + ";cursor:" + (s.lbuFile ? "pointer" : "default"),
        lbuUpload: () => {
          if (!s.lbuFile) {
            this.setState({ lbuErr: true, lbuNotice: "No file selected \u2014 choose a .xls, .xlsx or .csv budget file to upload." });
            return;
          }
          this.setState({
            lbuLoaded: true, lbuEdit: false, lbuSel: {},
            lbuData: LBU_ROWS.map(r => r.slice()),
            lbuNotice: LBU_ROWS.length + " rows uploaded from " + s.lbuFile + " \u2014 Total Budget % calculated for each row."
          });
          this.logLbu("File uploaded", s.lbuFile + " \u2014 " + LBU_ROWS.length + " rows imported for P09 / W2.");
        },
        lbuSample: () => { this.downloadLbuSample(); this.setState({ lbuNotice: "Sample file LaborBudget_Template.xls downloaded." }); this.logLbu("Sample downloaded", "LaborBudget_Template.xls"); },
        lbuClear: () => this.setState({ lbuFile: "", lbuFileMeta: "", lbuErr: false, lbuLoaded: false, lbuData: [], lbuSel: {}, lbuEdit: false, lbuNotice: "" }),
        lbuCountText: s.lbuLoaded ? "Showing 1 - " + s.lbuData.length + " of " + s.lbuData.length + " records" : "No budget uploaded yet \u2014 upload a file to populate the summary.",
        lbuCols: LBU_COLS.map(c => ({
          label: c[0],
          headStyle: "width:" + c[1] + "px;flex:0 0 " + c[1] + "px;padding:0 12px;font-size:13.5px;font-weight:700;color:#1f1f1f;text-align:" + c[2]
        })),
        lbuRows: lbuActive.map((r, i) => {
          const total = Math.round((Number(r[4]) + Number(r[5])) * 100) / 100;
          const vals = [r[0], r[1], r[2], r[3], Number(r[4]).toFixed(2) + " %", Number(r[5]).toFixed(2) + " %", total.toFixed(2) + " %"];
          return {
            rowStyle: "display:flex;align-items:center;height:33px;border-left:1px solid #d9d9d9;border-right:1px solid #d9d9d9;border-bottom:1px solid #e6e6e6;background:" +
              (i % 2 ? "#f8f8f8" : "#ffffff"),
            cells: vals.map((t, j) => ({
              t: t,
              style: "width:" + LBU_COLS[j][1] + "px;flex:0 0 " + LBU_COLS[j][1] + "px;padding:0 12px;font-size:13.5px;color:#1f1f1f;display:flex;align-items:center;justify-content:" +
                (LBU_COLS[j][2] === "right" ? "flex-end" : (LBU_COLS[j][2] === "center" ? "center" : "flex-start")) +
                ";font-variant-numeric:tabular-nums;font-weight:" + (j === 6 ? "700" : "400") + ";white-space:nowrap;overflow:hidden"
            }))
          };
        }),
        lbuStats: (function () {
          const d = lbuActive;
          if (!d.length) return [{ label: "Rows Uploaded", value: "0" }];
          const avg = (k) => (d.reduce((a, r) => a + Number(r[k]), 0) / d.length);
          const tot = d.map(r => Number(r[4]) + Number(r[5]));
          return [
            { label: "Rows Uploaded", value: String(d.length) },
            { label: "Stores Covered", value: String(d.map(r => r[0]).filter((v, i, a) => a.indexOf(v) === i).length) },
            { label: "Avg Budgeted Hourly Mgr %", value: avg(4).toFixed(2) + " %" },
            { label: "Avg Budgeted Crew %", value: avg(5).toFixed(2) + " %" },
            { label: "Avg Total Budget %", value: (tot.reduce((a, b) => a + b, 0) / tot.length).toFixed(2) + " %" },
            { label: "Highest Total Budget %", value: Math.max.apply(null, tot).toFixed(2) + " %" },
            { label: "Lowest Total Budget %", value: Math.min.apply(null, tot).toFixed(2) + " %" }
          ];
        })(),
        lbuAuditRows: s.lbuAudit,
        lbuAuditEmpty: s.lbuAudit.length === 0,
        isMlmuList: s.route === "mlmuList",
        showGridTab: s.route === "list" || s.route === "mlmuList",
        isMlmu: s.route === "mlmu",
        isMlmuStats: s.route === "mlmu" && s.mlmuTab === "stats",
        isMlmuAssign: s.route === "mlmu" && s.mlmuTab === "assign",
        isMlmuAudit: s.route === "mlmu" && s.mlmuTab === "audit",
        auditRows: s.audit.filter(a => a.setupId === s.setupId),
        auditEmpty: s.audit.filter(a => a.setupId === s.setupId).length === 0,
        mlmuTabs: MLMU_TABS.map(t => {
          const active = s.mlmuTab === t.id;
          return {
            label: t.label,
            is_stats: t.icon === "#ic-stats", is_matrix: t.icon === "#ic-matrix",
            is_jobcode: t.icon === "#ic-jobcode", is_jobdept: t.icon === "#ic-jobdept",
            is_backup: t.icon === "#ic-backup", is_report: t.icon === "#ic-report",
            onClick: () => this.setState({ mlmuTab: t.id, assignNotice: "" }),
            style: "display:flex;align-items:center;gap:10px;padding:0 20px;border:none;cursor:pointer;font-family:Arial, Helvetica, sans-serif;font-size:15.5px;font-weight:400;white-space:nowrap;background:" +
              (active ? "#3b3d4a" : "transparent") + ";color:#ffffff",
            iconStyle: "color:#ffffff;flex:0 0 22px"
          };
        }),
        setupRows: s.setups.map(su => ({
          name: su.name, impact: su.impact + "%", count: String(su.matrices.length),
          onOpen: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ route: "mlmu", setupId: su.id, mlmuTab: "stats", availSel: [], assignedSel: [], assignNotice: "", impactNotice: "", audit: [], analysisOpen: true, lbuFile: "", lbuFileMeta: "", lbuErr: false, lbuLoaded: false, lbuNotice: "", lbuTab: "summary", lbuData: [], lbuDraft: [], lbuEdit: false, lbuSel: {}, lbuAudit: [], navOpen: false }); }
        })),
        addSetup: () => this.setState(st => {
          const id = "s" + (st.setups.length + 1) + Date.now().toString().slice(-4);
          return { setups: st.setups.concat([{ id: id, name: "New Setup", impact: "0.00", matrices: [] }]), route: "mlmu", setupId: id, mlmuTab: "stats" };
        }),
        setupName: setup ? setup.name : "",
        setupImpact: setup ? setup.impact : "",
        onSetupName: (e) => { const v = e.target.value; const old = setup ? setup.name : ""; if (v === old) return; this.setState(st => ({ setups: st.setups.map(su => su.id === st.setupId ? Object.assign({}, su, { name: v }) : su) })); this.logAudit(s.setupId, "Name changed", "\u201c" + old + "\u201d \u2192 \u201c" + v + "\u201d"); },
        onSetupImpact: (e) => { const v = e.target.value; const old = setup ? setup.impact : ""; if (v === old) return; this.setState(st => ({ setups: st.setups.map(su => su.id === st.setupId ? Object.assign({}, su, { impact: v }) : su) })); this.logAudit(s.setupId, "Impact % changed", old + "% \u2192 " + v + "%"); },
        availOptions: LSM_DATA.filter(r => mineKeys.indexOf(r.key) < 0).map(r => ({
          key: r.key,
          label: ownerOf[r.key] ? r.name + "  —  assigned to " + ownerOf[r.key].name : r.name,
          style: ownerOf[r.key] ? "color:#a35a00" : "color:#1f1f1f"
        })),
        assignedOptions: mineKeys.map(k => {
          const r = LSM_DATA.find(x => x.key === k);
          return { key: k, label: r ? r.name : k };
        }),
        availSel: s.availSel,
        assignedSel: s.assignedSel,
        onAvailSel: (e) => this.setState({ availSel: Array.from(e.target.selectedOptions).map(o => o.value) }),
        onAssignedSel: (e) => this.setState({ assignedSel: Array.from(e.target.selectedOptions).map(o => o.value) }),
        addBtnStyle: listBtn(s.availSel.length > 0),
        removeBtnStyle: listBtn(s.assignedSel.length > 0),
        onAdd: () => {
          if (!s.availSel.length) return;
          const taken0 = [];
          s.setups.forEach(su => { if (su.id !== s.setupId && su.matrices.some(k => s.availSel.indexOf(k) >= 0)) taken0.push(su.name); });
          this.setState(st => {
            const taken = [];
            const setups = st.setups.map(su => {
              if (su.id === st.setupId) return su;
              const keep = su.matrices.filter(k => {
                if (st.availSel.indexOf(k) >= 0) { taken.push({ key: k, from: su.name }); return false; }
                return true;
              });
              return keep.length === su.matrices.length ? su : Object.assign({}, su, { matrices: keep });
            }).map(su => su.id === st.setupId ? Object.assign({}, su, { matrices: su.matrices.concat(st.availSel.filter(k => su.matrices.indexOf(k) < 0)) }) : su);
            const notice = taken.length
              ? taken.length + " matri" + (taken.length === 1 ? "x" : "ces") + " moved here from " +
                taken.map(t => t.from).filter((v, i, a) => a.indexOf(v) === i).join(", ") + "."
              : "";
            return { setups: setups, availSel: [], assignNotice: notice };
          });
          const names = s.availSel.map(k => (LSM_DATA.find(x => x.key === k) || {}).name).filter(Boolean);
          this.logAudit(s.setupId, "Matrices assigned", names.join(", ") + (taken0.length ? " (moved from " + taken0.join(", ") + ")" : ""));
        },
        onRemove: () => {
          if (!s.assignedSel.length) return;
          this.setState(st => ({
            setups: st.setups.map(su => su.id === st.setupId ? Object.assign({}, su, { matrices: su.matrices.filter(k => st.assignedSel.indexOf(k) < 0) }) : su),
            assignedSel: [], assignNotice: ""
          }));
          this.logAudit(s.setupId, "Matrices unassigned", s.assignedSel.map(k => (LSM_DATA.find(x => x.key === k) || {}).name).filter(Boolean).join(", "));
        },
        assignNotice: s.assignNotice,
        impactNotice: s.impactNotice,
        impactBtnStyle: listBtn(!!setup && mineKeys.length > 0 && parseNum(setup.impact) !== 0) + ";white-space:nowrap;flex:0 0 auto",
        applyImpact: () => {
          if (!setup || !mineKeys.length) return;
          const pct = parseNum(setup.impact) / 100;
          if (!pct) return;
          this.setState(st => {
            const next = Object.assign({}, st.matrices);
            mineKeys.forEach(k => {
              const r = LSM_DATA.find(x => x.key === k);
              next[k] = scaleRows(next[k] || buildMatrix(r), pct, "both");
            });
            return {
              matrices: next,
              impactNotice: mineKeys.length + " assigned matri" + (mineKeys.length === 1 ? "x" : "ces") +
                " updated by " + (pct < 0 ? "" : "+") + parseNum(setup.impact) + "%."
            };
          });
          this.logAudit(setup.id, "Impact applied", (pct < 0 ? "" : "+") + parseNum(setup.impact) + "% applied to " + mineKeys.length + " assigned matri" + (mineKeys.length === 1 ? "x" : "ces") + " (End Value rounded up, Start Value chained).");
        },
        matrixRows: mrows.map((m) => ({
          index: m.index, start: fmtNum(m.start), end: fmtNum(m.end), emp: fmtNum(m.emp),
          onStart: (e) => this.setCell(rec.key, m.index - 1, "start", e.target.value),
          onEnd: (e) => this.setCell(rec.key, m.index - 1, "end", e.target.value),
          onEmp: (e) => this.setCell(rec.key, m.index - 1, "emp", e.target.value)
        })),
        allChecked: slice.length > 0 && slice.every(r => !!s.selected[r.key]),
        onToggleAll: (e) => {
          const on = e.target.checked;
          this.setState(st => {
            const next = Object.assign({}, st.selected);
            slice.forEach(r => { next[r.key] = on; });
            return { selected: next };
          });
        },
        selectionText: selectedKeys.length ? selectedKeys.length + " selected" : "",
        pctBtnStyle: "height:30px;padding:0 18px;border-radius:3px;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:700;background:" +
          (selectedKeys.length ? "#015683" : "#eceff1") + ";color:" + (selectedKeys.length ? "#ffffff" : "#9aa4ac") +
          ";border:1px solid " + (selectedKeys.length ? "#01486e" : "#d6dce0") + ";cursor:" + (selectedKeys.length ? "pointer" : "default"),
        applyBtnStyle: "height:30px;padding:0 22px;border-radius:3px;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:700;background:" +
          (pctReady ? "#015683" : "#eceff1") + ";color:" + (pctReady ? "#ffffff" : "#9aa4ac") +
          ";border:1px solid " + (pctReady ? "#01486e" : "#d6dce0") + ";cursor:" + (pctReady ? "pointer" : "default"),
        pctOpen: s.pctOpen,
        pctDir: s.pctDir,
        pctValue: s.pctValue,
        pctField: s.pctField,
        pctBanner: s.pctBanner,
        pctScopeText: selectedKeys.length + " matrix record" + (selectedKeys.length === 1 ? "" : "s") + " selected. The percentage is applied to every row of each selected matrix.",
        openPct: () => { if (selectedKeys.length) this.setState({ pctOpen: true, pctBanner: "" }); },
        closePct: () => this.setState({ pctOpen: false }),
        onPctDir: (e) => this.setState({ pctDir: e.target.value }),
        onPctValue: (e) => this.setState({ pctValue: e.target.value }),
        onPctField: (e) => this.setState({ pctField: e.target.value }),
        applyPct: () => {
          if (!pctReady) return;
          const pct = parseNum(s.pctValue) / 100 * (s.pctDir === "dec" ? -1 : 1);
          this.setState(st => {
            const next = Object.assign({}, st.matrices);
            selectedKeys.forEach(k => {
              const r = LSM_DATA.find(x => x.key === k);
              const base = next[k] || buildMatrix(r);
              next[k] = scaleRows(base, pct, st.pctField);
            });
            return {
              matrices: next, pctOpen: false, selected: {},
              pctBanner: selectedKeys.length + " matrix record" + (selectedKeys.length === 1 ? "" : "s") + " updated by " +
                (pct < 0 ? "-" : "+") + parseNum(st.pctValue) + "%."
            };
          });
        },
        isWorkflow: s.route === "workflow",
        isList: s.route === "list",
        isDetail: s.route === "detail",
        isStatsTab: s.route === "detail" && s.detailTab === "stats",
        isMatrixTab: s.route === "detail" && s.detailTab === "matrix",
        isOtherTab: s.route === "detail" && s.detailTab !== "stats" && s.detailTab !== "matrix",
        otherTabLabel: (DETAIL_TABS.find(t => t.id === s.detailTab) || {}).label,
        recordName: s.record ? s.record.name : "",
        crumbs: this.crumbFor(s.route, s.record),
        detailTabs: DETAIL_TABS.map(t => {
          const active = s.detailTab === t.id;
          return {
            label: t.label,
            is_stats: t.icon === "#ic-stats", is_matrix: t.icon === "#ic-matrix",
            is_jobcode: t.icon === "#ic-jobcode", is_jobdept: t.icon === "#ic-jobdept",
            is_backup: t.icon === "#ic-backup", is_report: t.icon === "#ic-report",
            onClick: () => this.setState({ detailTab: t.id }),
            style: "display:flex;align-items:center;gap:10px;padding:0 20px;border:none;cursor:pointer;font-family:Arial, Helvetica, sans-serif;font-size:15.5px;font-weight:400;white-space:nowrap;background:" +
              (active ? "#3b3d4a" : "transparent") + ";color:#ffffff",
            iconStyle: "color:#ffffff;flex:0 0 22px"
          };
        }),
        perPage: String(s.perPage),
        onPerPage: (e) => this.setState({ perPage: Number(e.target.value), page: 1 }),
        search: s.search,
        matrixSearch: s.matrixSearch,
        matrixPerPage: String(s.matrixPerPage),
        onMatrixSearch: (e) => this.setState({ matrixSearch: e.target.value }),
        onMatrixPerPage: (e) => this.setState({ matrixPerPage: Number(e.target.value) }),
        onSearch: (e) => this.setState({ search: e.target.value, page: 1 }),
        pageRows: slice.map(r => ({
          name: r.name, key: r.key,
          checked: !!s.selected[r.key],
          rowStyle: "display:flex;align-items:center;height:33px;border-left:1px solid #d9d9d9;border-right:1px solid #d9d9d9;border-bottom:1px solid #e6e6e6;background:" +
            (s.selected[r.key] ? "#eef5fb" : "#ffffff"),
          onCheck: () => this.setState(st => {
            const next = Object.assign({}, st.selected);
            next[r.key] = !next[r.key];
            return { selected: next };
          }),
          onOpen: (e) => { if (e && e.preventDefault) e.preventDefault(); this.go("detail", r); }
        })),
        showingText: filtered.length
          ? "Showing " + (start + 1) + " - " + Math.min(start + per, filtered.length) + " of " + filtered.length + " records"
          : "No records found",
        pages: pageNums.map(n => ({ n: n, style: pageBtn(n === page), onClick: () => this.setState({ page: n }) })),
        prevStyle: edgeBtn(page <= 1),
        nextStyle: edgeBtn(page >= totalPages),
        onPrev: () => this.setState(st => ({ page: Math.max(1, st.page - 1) })),
        onNext: () => this.setState(st => ({ page: Math.min(totalPages, st.page + 1) })),
        toggleNav: () => this.setState(st => ({ navOpen: !st.navOpen })),
        drawerStyle: [
          "position:absolute", "top:-50px", "left:0", "bottom:0", "width:285px",
          "background:#292b37", "display:flex", "flex-direction:column",
          "box-shadow:2px 0 6px rgba(0,0,0,.35)", "z-index:40",
          "transition:transform .18s ease",
          "transform:translateX(" + (s.navOpen ? "0" : "-100%") + ")",
          "pointer-events:" + (s.navOpen ? "auto" : "none")
        ].join(";"),
        navRows: this.flattenNav(NAV, 0, [])
      };
    }
  }
  /* ============================== boot ==================================== */
  var template = document.getElementById("app-template");
  var root = document.getElementById("app");
  var app = new Component();
  var queued = false;

  schedule = function () {
    if (queued) return;
    queued = true;
    Promise.resolve().then(function () { queued = false; render(); });
  };

  function render() {
    var active = document.activeElement;
    var focusPath = null, selStart = null, selEnd = null;
    if (active && active.getAttribute && active.getAttribute("data-field-path")) {
      focusPath = active.getAttribute("data-field-path");
      try { selStart = active.selectionStart; selEnd = active.selectionEnd; } catch (e) {}
    }

    var vals = app.renderVals ? app.renderVals() : {};
    var scope = Object.create(null), k;
    for (k in app.props) scope[k] = app.props[k];
    for (k in vals) scope[k] = vals[k];

    var out = [];
    renderList(template.content.childNodes, scope, out, "r");
    root.replaceChildren.apply(root, out);

    if (focusPath) {
      var el = root.querySelector('[data-field-path="' + focusPath + '"]');
      if (el) {
        el.focus();
        if (selStart != null && el.setSelectionRange) {
          try { el.setSelectionRange(selStart, selEnd); } catch (e) {}
        }
      }
    }
  }

  if (app.componentDidMount) render(), app.componentDidMount();
  else render();
})();
