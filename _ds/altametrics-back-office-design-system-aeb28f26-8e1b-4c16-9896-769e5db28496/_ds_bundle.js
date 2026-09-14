/* @ds-bundle: {"format":3,"namespace":"AltametricsBackOfficeDesignSystem_aeb28f","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"ModuleButton","sourcePath":"components/core/ModuleButton.jsx"},{"name":"Panel","sourcePath":"components/core/Panel.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"KpiCard","sourcePath":"components/data/KpiCard.jsx"},{"name":"Pagination","sourcePath":"components/data/Pagination.jsx"},{"name":"StatusLock","sourcePath":"components/data/StatusLock.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"WorkflowTask","sourcePath":"components/feedback/WorkflowTask.jsx"},{"name":"DateSelector","sourcePath":"components/forms/DateSelector.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"SidebarNav","sourcePath":"components/navigation/SidebarNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Button.jsx":"75e1f9d151e2","components/core/ModuleButton.jsx":"d153a6c64f95","components/core/Panel.jsx":"50dab5aad157","components/data/DataTable.jsx":"cdbfafc87f6a","components/data/KpiCard.jsx":"5cbac23fd23c","components/data/Pagination.jsx":"5d5f6837969c","components/data/StatusLock.jsx":"2cfecf8efbe6","components/feedback/Badge.jsx":"e8d3e805e96c","components/feedback/WorkflowTask.jsx":"b9a5b899a953","components/forms/DateSelector.jsx":"83fab5567fcf","components/forms/Input.jsx":"92430c9783ee","components/forms/Select.jsx":"3e59205d68e5","components/navigation/SidebarNav.jsx":"2b304efa520b","components/navigation/Tabs.jsx":"e2620d28b852","ui_kits/back-office/Chrome.jsx":"ffd5fc27fb31","ui_kits/back-office/SummaryScreen.jsx":"ef710e4a1761","ui_kits/back-office/Workflow.jsx":"7dedd222f974","ui_kits/back-office/WorkflowScreen.jsx":"8e161e083d9d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AltametricsBackOfficeDesignSystem_aeb28f = window.AltametricsBackOfficeDesignSystem_aeb28f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — Button
 * Flat, square-ish enterprise button. Matches the "GO", form, and
 * action buttons throughout Back Office.
 */
function Button({
  children,
  variant = "primary",
  // primary | danger | secondary | link
  size = "md",
  // sm | md
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      height: 26,
      padding: "0 10px",
      font: "var(--text-sm)"
    },
    md: {
      height: 32,
      padding: "0 16px",
      font: "var(--text-md)"
    }
  };
  const variants = {
    primary: {
      background: "var(--action-primary)",
      color: "var(--white)",
      border: "1px solid var(--action-primary)"
    },
    danger: {
      background: "var(--red-500)",
      color: "var(--white)",
      border: "1px solid var(--red-600)"
    },
    secondary: {
      background: "var(--gray-150)",
      color: "var(--text-primary)",
      border: "1px solid var(--gray-400)"
    },
    link: {
      background: "transparent",
      color: "var(--text-link)",
      border: "1px solid transparent"
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-4)",
      height: s.height,
      padding: s.padding,
      fontFamily: "var(--font-ui)",
      fontSize: s.font,
      fontWeight: "var(--weight-bold)",
      lineHeight: 1,
      whiteSpace: "nowrap",
      borderRadius: "var(--radius-sm)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      textDecoration: variant === "link" ? "none" : undefined,
      ...v,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/ModuleButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — ModuleButton
 * The flat steel-blue navigation buttons on the dashboard
 * (Cash and Sales, Forecast, Food Management, Labor Management,
 * Payroll Management). A dark-navy rounded icon square on the left
 * holds a white glyph; the bold white label is centered in the rest.
 */
function ModuleButton({
  label,
  icon,
  // ReactNode (e.g. <i className="fa fa-..."/>) or img
  active = false,
  onClick,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      width: 188,
      height: "var(--module-btn-h)",
      padding: 6,
      border: "none",
      borderRadius: 6,
      background: active ? "var(--steel-600)" : "var(--steel-500)",
      boxShadow: active ? "inset 0 2px 4px rgba(0,0,0,0.32)" : "0 1px 2px rgba(0,0,0,0.25)",
      cursor: "pointer",
      overflow: "hidden",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "calc(var(--module-btn-h) - 12px)",
      height: "calc(var(--module-btn-h) - 12px)",
      flex: "0 0 auto",
      background: "var(--navy-icon)",
      borderRadius: 4,
      color: "var(--white)",
      fontSize: 20
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: "center",
      padding: "0 8px",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-md)",
      fontWeight: "var(--weight-bold)",
      color: "var(--white)",
      lineHeight: 1.15
    }
  }, label));
}
Object.assign(__ds_scope, { ModuleButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ModuleButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Panel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — Panel
 * Content panel with the navy title header used across Back Office
 * (e.g. "Start of Day", report containers). White body, hairline
 * border, subtle shadow.
 */
function Panel({
  title,
  actions,
  children,
  bodyStyle,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--gray-300)",
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-card)",
      overflow: "hidden",
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      background: "var(--navy-900)",
      color: "#fff",
      padding: "8px 12px",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-md)",
      fontWeight: "var(--weight-bold)"
    }
  }, /*#__PURE__*/React.createElement("span", null, title), actions && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, actions)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--content-pad)",
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Panel.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — DataTable
 * The standard report table: gray header with sortable (underlined)
 * column labels, white body rows with hairline rules, blue linked
 * first cells, right-aligned numerics.
 *
 * columns: [{ key, label, align, sortable, render }]
 * rows: array of objects keyed by column.key
 */
function DataTable({
  columns = [],
  rows = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("table", _extends({
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      background: "var(--surface-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      background: "var(--surface-table-head)",
      color: "var(--text-primary)",
      fontWeight: "var(--weight-bold)",
      textAlign: c.align || "left",
      padding: "9px 12px",
      borderBottom: "1px solid var(--gray-400)",
      borderTop: "1px solid var(--gray-300)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: c.sortable === false ? "none" : "underline",
      textUnderlineOffset: 2,
      cursor: c.sortable === false ? "default" : "pointer"
    }
  }, c.label))))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      background: i % 2 ? "var(--surface-stripe)" : "var(--white)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    className: c.numeric ? "ab-tabular" : undefined,
    style: {
      textAlign: c.align || "left",
      padding: "9px 12px",
      borderBottom: "1px solid var(--gray-300)",
      color: c.link ? "var(--text-link)" : "var(--text-primary)",
      whiteSpace: "nowrap"
    }
  }, c.render ? c.render(r[c.key], r) : r[c.key]))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/KpiCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — KpiCard
 * The gray gradient metric tile shown in a row across the dashboard
 * (Forecasted Sales, Actual Sales, Variance, Labor %, OT Hours,
 * Actual ICOS %). A title band over two stacked value rows
 * (lighter row = primary period, darker row = comparison).
 */
function KpiCard({
  title,
  primary,
  secondary,
  negative = false,
  width = 148,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width,
      borderRadius: "var(--radius-sm)",
      overflow: "hidden",
      border: "1px solid var(--gray-600)",
      boxShadow: "var(--shadow-card)",
      fontFamily: "var(--font-ui)",
      textAlign: "center",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--kpi-header)",
      color: "var(--white)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      padding: "6px 8px",
      lineHeight: 1.15
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "ab-tabular",
    style: {
      background: "var(--kpi-row-1)",
      color: "var(--white)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-bold)",
      padding: "8px 8px"
    }
  }, primary), secondary !== undefined && /*#__PURE__*/React.createElement("div", {
    className: "ab-tabular",
    style: {
      background: "var(--kpi-row-2)",
      color: negative ? "#ff9a9a" : "var(--white)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-bold)",
      padding: "8px 8px"
    }
  }, secondary));
}
Object.assign(__ds_scope, { KpiCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KpiCard.jsx", error: String((e && e.message) || e) }); }

// components/data/Pagination.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — Pagination
 * Compact numbered pager used under report tables. First/prev/next/
 * last chevrons with numbered pages; active page filled blue.
 */
function Pagination({
  page = 1,
  pageCount = 1,
  onChange,
  style,
  ...rest
}) {
  const go = p => onChange && p >= 1 && p <= pageCount && p !== page && onChange(p);

  // window of up to 5 page numbers around current
  const nums = [];
  const start = Math.max(1, Math.min(page - 2, pageCount - 4));
  const end = Math.min(pageCount, start + 4);
  for (let i = start; i <= end; i++) nums.push(i);
  const cell = (content, opts = {}) => /*#__PURE__*/React.createElement("button", {
    key: opts.key,
    type: "button",
    disabled: opts.disabled,
    onClick: opts.onClick,
    style: {
      minWidth: 26,
      height: 26,
      padding: "0 6px",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      color: opts.active ? "#fff" : opts.disabled ? "var(--gray-400)" : "var(--text-link)",
      background: opts.active ? "var(--blue-500)" : "var(--white)",
      border: "1px solid var(--gray-400)",
      cursor: opts.disabled ? "default" : "pointer"
    }
  }, content);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      gap: -1,
      ...style
    }
  }, rest), cell(/*#__PURE__*/React.createElement("i", {
    className: "fa fa-angle-double-left"
  }), {
    key: "first",
    disabled: page === 1,
    onClick: () => go(1)
  }), cell(/*#__PURE__*/React.createElement("i", {
    className: "fa fa-angle-left"
  }), {
    key: "prev",
    disabled: page === 1,
    onClick: () => go(page - 1)
  }), nums.map(n => cell(n, {
    key: n,
    active: n === page,
    onClick: () => go(n)
  })), cell(/*#__PURE__*/React.createElement("i", {
    className: "fa fa-angle-right"
  }), {
    key: "next",
    disabled: page === pageCount,
    onClick: () => go(page + 1)
  }), cell(/*#__PURE__*/React.createElement("i", {
    className: "fa fa-angle-double-right"
  }), {
    key: "last",
    disabled: page === pageCount,
    onClick: () => go(pageCount)
  }));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusLock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — StatusLock
 * The green padlock used in report "Status" columns to mark a row as
 * finalized/locked. Red variant marks an open/unlocked row.
 */
function StatusLock({
  locked = true,
  title,
  style,
  ...rest
}) {
  const color = locked ? "var(--green-500)" : "var(--red-500)";
  return /*#__PURE__*/React.createElement("i", _extends({
    className: `fa ${locked ? "fa-lock" : "fa-lock-open"}`,
    title: title || (locked ? "Locked" : "Open"),
    "aria-label": locked ? "Locked" : "Open",
    style: {
      color,
      fontSize: 16,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { StatusLock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusLock.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — Badge
 * Small status pill/label. Solid variants for status, soft variant
 * for counts/meta. Square-ish by default; set pill for rounded.
 */
function Badge({
  children,
  variant = "neutral",
  // success | danger | info | neutral | warning
  pill = false,
  style,
  ...rest
}) {
  const variants = {
    success: {
      background: "var(--green-500)",
      color: "#fff",
      border: "1px solid var(--green-600)"
    },
    danger: {
      background: "var(--red-500)",
      color: "#fff",
      border: "1px solid var(--red-600)"
    },
    info: {
      background: "var(--blue-500)",
      color: "#fff",
      border: "1px solid var(--blue-600)"
    },
    warning: {
      background: "var(--amber-500)",
      color: "#3a2c00",
      border: "1px solid #b88600"
    },
    neutral: {
      background: "var(--gray-150)",
      color: "var(--text-secondary)",
      border: "1px solid var(--gray-400)"
    }
  };
  const v = variants[variant] || variants.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      height: 18,
      padding: "0 7px",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-bold)",
      lineHeight: 1,
      borderRadius: pill ? "var(--radius-pill)" : "var(--radius-xs)",
      ...v,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/WorkflowTask.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — WorkflowTask
 * A task node in the dashboard's "My Workflow" / Start of Day flow.
 * Green = complete (with check), white/gray = pending. Optional
 * connector dot on the left to suggest the workflow chain.
 */
function WorkflowTask({
  label,
  state = "pending",
  // complete | pending | current
  onClick,
  style,
  ...rest
}) {
  const styles = {
    complete: {
      background: "var(--green-500)",
      color: "#fff",
      border: "1px solid var(--green-600)"
    },
    current: {
      background: "var(--blue-500)",
      color: "#fff",
      border: "1px solid var(--blue-600)"
    },
    pending: {
      background: "var(--white)",
      color: "var(--text-primary)",
      border: "1px solid var(--gray-400)"
    }
  };
  const v = styles[state] || styles.pending;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      width: "100%",
      minHeight: 34,
      padding: "6px 10px",
      textAlign: "left",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-card)",
      cursor: "pointer",
      ...v,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 16,
      height: 16,
      flex: "0 0 16px",
      borderRadius: "50%",
      background: state === "complete" ? "rgba(255,255,255,0.25)" : "var(--gray-150)",
      color: state === "complete" ? "#fff" : "var(--gray-500)",
      fontSize: 10
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `fa ${state === "complete" ? "fa-check" : "fa-circle"}`
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      lineHeight: 1.2
    }
  }, label));
}
Object.assign(__ds_scope, { WorkflowTask });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/WorkflowTask.jsx", error: String((e && e.message) || e) }); }

// components/forms/DateSelector.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — DateSelector
 * The purple period/date control from the dashboard. Shows a label
 * band over a value, with prev/next chevrons to step the period.
 */
function DateSelector({
  label = "Business Date",
  value,
  onPrev,
  onNext,
  style,
  ...rest
}) {
  const chevron = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    alignSelf: "stretch",
    color: "rgba(255,255,255,0.85)",
    cursor: "pointer",
    background: "rgba(0,0,0,0.12)",
    fontSize: 12
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "stretch",
      borderRadius: "var(--radius-sm)",
      overflow: "hidden",
      border: "1px solid var(--purple-900)",
      boxShadow: "var(--shadow-card)",
      fontFamily: "var(--font-ui)",
      background: "linear-gradient(180deg, var(--purple-400), var(--purple-700))",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: onPrev,
    style: chevron
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-chevron-left"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "5px 14px",
      color: "#fff",
      textAlign: "center",
      minWidth: 120
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-2xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      opacity: 0.8
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "ab-tabular",
    style: {
      fontSize: "var(--text-md)",
      fontWeight: "var(--weight-bold)"
    }
  }, value)), /*#__PURE__*/React.createElement("span", {
    onClick: onNext,
    style: chevron
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-chevron-right"
  })));
}
Object.assign(__ds_scope, { DateSelector });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DateSelector.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — Input
 * Standard text/number field with optional left label and leading icon.
 */
function Input({
  label,
  icon,
  type = "text",
  size = "md",
  // sm | md
  style,
  wrapStyle,
  ...rest
}) {
  const h = size === "sm" ? "var(--control-h-sm)" : "var(--control-h)";
  const field = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      height: h,
      background: "var(--white)",
      border: "1px solid var(--border-input)",
      borderRadius: "var(--radius-sm)",
      overflow: "hidden"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "0 8px",
      color: "var(--text-muted)"
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    style: {
      flex: 1,
      height: "100%",
      border: "none",
      outline: "none",
      padding: icon ? "0 8px 0 0" : "0 8px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-primary)",
      background: "transparent",
      minWidth: 0,
      ...style
    }
  }, rest)));
  if (!label) return field;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      ...wrapStyle
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-secondary)"
    }
  }, label), field);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — Select
 * Native dropdown styled to match Back Office filter controls
 * (e.g. "Records per page", store / period pickers).
 */
function Select({
  label,
  options = [],
  size = "md",
  style,
  wrapStyle,
  children,
  ...rest
}) {
  const h = size === "sm" ? "var(--control-h-sm)" : "var(--control-h)";
  const field = /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    style: {
      height: h,
      appearance: "none",
      WebkitAppearance: "none",
      padding: "0 28px 0 8px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-primary)",
      background: "var(--white)",
      border: "1px solid var(--border-input)",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      ...style
    }
  }, rest), children || options.map(o => {
    const value = typeof o === "object" ? o.value : o;
    const text = typeof o === "object" ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, text);
  })), /*#__PURE__*/React.createElement("i", {
    className: "fa fa-caret-down",
    style: {
      position: "absolute",
      right: 9,
      pointerEvents: "none",
      color: "var(--text-muted)",
      fontSize: 12
    }
  }));
  if (!label) return field;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      ...wrapStyle
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-secondary)"
    }
  }, label), field);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — SidebarNav
 * The dark navy left navigation. Each item has an icon and label;
 * the active item gets a red left accent + lighter fill. Collapses
 * to an icon-only rail when collapsed=true.
 *
 * items: [{ id, label, icon }]
 */
function SidebarNav({
  items = [],
  activeId,
  onSelect,
  collapsed = false,
  header,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      width: collapsed ? "var(--sidebar-w-rail)" : "var(--sidebar-w)",
      background: "var(--chrome-900)",
      color: "var(--text-on-dark)",
      fontFamily: "var(--font-ui)",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      ...style
    }
  }, rest), header && /*#__PURE__*/React.createElement("div", {
    style: {
      height: "var(--topbar-h)",
      display: "flex",
      alignItems: "center",
      padding: collapsed ? "0" : "0 12px",
      justifyContent: collapsed ? "center" : "flex-start",
      borderBottom: "1px solid rgba(255,255,255,0.08)"
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "6px 0"
    }
  }, items.map(it => {
    const active = it.id === activeId;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => onSelect && onSelect(it.id),
      title: collapsed ? it.label : undefined,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        height: 38,
        padding: collapsed ? "0" : "0 14px",
        justifyContent: collapsed ? "center" : "flex-start",
        background: active ? "rgba(255,255,255,0.08)" : "transparent",
        border: "none",
        borderLeft: active ? "3px solid var(--red-500)" : "3px solid transparent",
        color: active ? "#fff" : "rgba(255,255,255,0.72)",
        fontSize: "var(--text-md)",
        fontWeight: active ? "var(--weight-bold)" : "var(--weight-regular)",
        cursor: "pointer",
        textAlign: "left",
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        textAlign: "center",
        flex: "0 0 18px",
        fontSize: 15
      }
    }, it.icon), !collapsed && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, it.label));
  })));
}
Object.assign(__ds_scope, { SidebarNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Altametrics Back Office — Tabs
 * The dark workspace tab bar at the very top (My Workflow, open
 * report tabs). Active tab is darker with a red top accent.
 *
 * tabs: [{ id, label, closable }]
 */
function Tabs({
  tabs = [],
  activeId,
  onSelect,
  onClose,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 1,
      background: "var(--chrome-900)",
      padding: "6px 8px 0",
      fontFamily: "var(--font-ui)",
      ...style
    }
  }, rest), tabs.map(t => {
    const active = t.id === activeId;
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      onClick: () => onSelect && onSelect(t.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 30,
        padding: "0 14px",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-bold)",
        color: active ? "#fff" : "var(--gray-500)",
        background: active ? "var(--chrome-800)" : "transparent",
        borderTop: active ? "2px solid var(--red-500)" : "2px solid transparent",
        borderTopLeftRadius: "var(--radius-sm)",
        borderTopRightRadius: "var(--radius-sm)",
        cursor: "pointer",
        whiteSpace: "nowrap"
      }
    }, t.label, t.closable && /*#__PURE__*/React.createElement("i", {
      className: "fa fa-times",
      onClick: e => {
        e.stopPropagation();
        onClose && onClose(t.id);
      },
      style: {
        fontSize: 11,
        opacity: 0.7
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/back-office/Chrome.jsx
try { (() => {
/**
 * Back Office app chrome: dark top bar (workspace tabs + utility
 * icons) and the collapsed navy icon rail on the left.
 */
function Chrome({
  activeTab,
  onTab,
  children
}) {
  const tabs = [{
    id: "workflow",
    label: "My Workflow",
    icon: "fa-diagram-project"
  }, {
    id: "shortcuts",
    label: "Shortcuts",
    icon: "fa-share"
  }, {
    id: "summary",
    label: "Summary",
    icon: "fa-list"
  }];
  const railIcons = ["fa-house", "fa-cash-register", "fa-utensils", "fa-chart-line", "fa-chart-pie", "fa-users", "fa-file-lines", "fa-user-gear", "fa-circle-question"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--gray-100)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      height: "var(--topbar-h)",
      background: "var(--chrome-900)",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      width: 54,
      border: "none",
      background: "var(--chrome-950)",
      color: "#fff",
      fontSize: 18,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-bars"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch"
    }
  }, tabs.map(t => {
    const active = t.id === activeTab;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onTab(t.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "0 22px",
        border: "none",
        cursor: "pointer",
        background: active ? "var(--white)" : "transparent",
        color: active ? "var(--gray-900)" : "rgba(255,255,255,0.78)",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-md)",
        fontWeight: "var(--weight-bold)"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: `fa ${t.icon}`,
      style: {
        opacity: 0.85
      }
    }), t.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "0 18px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 26,
      padding: "0 12px",
      background: "var(--red-500)",
      color: "#fff",
      borderRadius: "var(--radius-pill)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-circle-question"
  }), " Help"), /*#__PURE__*/React.createElement("i", {
    className: "fa fa-magnifying-glass",
    style: {
      color: "#fff",
      fontSize: 16,
      cursor: "pointer"
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa fa-bell",
    style: {
      color: "#fff",
      fontSize: 16,
      cursor: "pointer"
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa fa-circle-user",
    style: {
      color: "#fff",
      fontSize: 20,
      cursor: "pointer"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 54,
      flex: "0 0 54px",
      background: "var(--chrome-900)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 10,
      gap: 4
    }
  }, railIcons.map((ic, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    title: "Module",
    style: {
      width: 40,
      height: 40,
      border: "none",
      background: i === 0 ? "rgba(255,255,255,0.10)" : "transparent",
      borderLeft: i === 0 ? "3px solid var(--red-500)" : "3px solid transparent",
      color: i === 0 ? "#fff" : "rgba(255,255,255,0.62)",
      fontSize: 16,
      cursor: "pointer",
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `fa ${ic}`
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#eef2fb",
      borderBottom: "1px solid var(--gray-300)",
      padding: "5px 16px",
      fontSize: "var(--text-sm)",
      color: "var(--gray-700)"
    }
  }, "DashBoard | (User: ErsAdmin11)"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto",
      padding: "16px"
    }
  }, children))));
}

// expose to in-browser Babel scope
window.Chrome = Chrome;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/back-office/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/back-office/SummaryScreen.jsx
try { (() => {
/**
 * Summary screen — stacked report panels (Cash & Sales, Inventory)
 * with the standard control strip, DataTable, and Pagination.
 */
function SummaryScreen({
  DS
}) {
  const {
    DataTable,
    Pagination,
    StatusLock,
    Select,
    Button
  } = DS;
  const cashCols = [{
    key: "date",
    label: "Date",
    link: true,
    align: "center"
  }, {
    key: "store",
    label: "Store No.",
    align: "center"
  }, {
    key: "name",
    label: "Store Name",
    align: "center"
  }, {
    key: "gross",
    label: "Gross Sales",
    align: "right",
    numeric: true
  }, {
    key: "net",
    label: "Net Sales",
    align: "right",
    numeric: true
  }, {
    key: "status",
    label: "Status",
    align: "center",
    sortable: false,
    render: v => /*#__PURE__*/React.createElement(StatusLock, {
      locked: v
    })
  }];
  const cashRows = [{
    date: "06/17/2026",
    store: "1018",
    name: "Eden",
    gross: "$1,462.06",
    net: "$1,366.41",
    status: true
  }, {
    date: "06/16/2026",
    store: "1018",
    name: "Eden",
    gross: "$8,198.54",
    net: "$7,662.63",
    status: true
  }, {
    date: "06/15/2026",
    store: "1018",
    name: "Eden",
    gross: "$8,196.92",
    net: "$7,661.07",
    status: true
  }, {
    date: "06/14/2026",
    store: "1018",
    name: "Eden",
    gross: "$8,185.37",
    net: "$7,650.13",
    status: true
  }, {
    date: "06/13/2026",
    store: "1018",
    name: "Eden",
    gross: "$8,796.69",
    net: "$8,221.49",
    status: true
  }];
  const invCols = [{
    key: "date",
    label: "Date",
    link: true,
    align: "center"
  }, {
    key: "store",
    label: "Store",
    align: "center"
  }, {
    key: "freq",
    label: "Inventory Frequency",
    align: "center"
  }, {
    key: "sales",
    label: "Sales During Inv. Cy.",
    align: "right",
    numeric: true
  }, {
    key: "cos",
    label: "Actual COS $",
    align: "right",
    numeric: true
  }, {
    key: "theo",
    label: "Theo. $",
    align: "right",
    numeric: true
  }, {
    key: "dvar",
    label: "Dollar Variance",
    align: "right",
    numeric: true,
    render: v => /*#__PURE__*/React.createElement("span", {
      className: v.startsWith("(") ? "ab-negative" : ""
    }, v)
  }, {
    key: "avar",
    label: "% Variance",
    align: "right",
    numeric: true,
    render: v => /*#__PURE__*/React.createElement("span", {
      className: v.startsWith("(") ? "ab-negative" : ""
    }, v)
  }, {
    key: "status",
    label: "Status",
    align: "center",
    sortable: false,
    render: v => /*#__PURE__*/React.createElement(StatusLock, {
      locked: v
    })
  }];
  const invRows = [{
    date: "06/16/2026",
    store: "1018",
    freq: "Daily",
    sales: "$7,662.63",
    cos: "$1,062.63",
    theo: "$845.96",
    dvar: "($216.67)",
    avar: "(2.83%)",
    status: true
  }, {
    date: "06/15/2026",
    store: "1018",
    freq: "Daily",
    sales: "$7,661.07",
    cos: "$1,998.42",
    theo: "$831.45",
    dvar: "($1,166.96)",
    avar: "(15.23%)",
    status: true
  }];
  const ReportControls = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Select, {
    options: [25, 50, 100],
    size: "sm"
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      marginLeft: 10,
      fontSize: "var(--text-sm)"
    }
  }, "Records per page"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--gray-700)",
      marginRight: 8
    }
  }, "Search:"), /*#__PURE__*/React.createElement("input", {
    style: {
      height: 26,
      width: 200,
      border: "1px solid var(--gray-400)",
      borderRadius: 3,
      padding: "0 8px",
      fontSize: "var(--text-sm)"
    }
  }));
  const sectionTitle = {
    fontFamily: "var(--font-ui)",
    fontSize: "var(--text-lg)",
    fontWeight: "var(--weight-bold)",
    color: "var(--gray-900)",
    margin: "0 0 14px"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column",
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    defaultValue: "1018, Eden",
    style: {
      height: 32,
      width: 220,
      border: "1px solid var(--gray-400)",
      borderRadius: 3,
      padding: "0 8px",
      fontSize: "var(--text-sm)"
    }
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--white)",
      border: "1px solid var(--gray-300)",
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-card)",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: sectionTitle
  }, "Cash Column: Daily-Cash & Sales Report"), /*#__PURE__*/React.createElement(ReportControls, null), /*#__PURE__*/React.createElement(DataTable, {
    columns: cashCols,
    rows: cashRows
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-link)"
    }
  }, "Showing 1 - 5 of 5 records"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Pagination, {
    page: 1,
    pageCount: 1,
    onChange: () => {}
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "22px 0 6px"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: "var(--text-md)",
      fontWeight: "var(--weight-bold)",
      display: "block",
      marginBottom: 4
    }
  }, "Cash Column: Daily-Regional-Cash & Sales Report"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: "var(--text-md)",
      fontWeight: "var(--weight-bold)"
    }
  }, "Cash Column: Weekly-Regional-Cash & Sales Report")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      margin: "16px 0 12px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...sectionTitle,
      margin: 0
    }
  }, "Inventory"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Select, {
    options: ["Select Count Freq", "Daily", "Weekly"],
    size: "sm",
    style: {
      width: 200
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    style: {
      marginLeft: 8
    }
  }, "GO")), /*#__PURE__*/React.createElement(ReportControls, null), /*#__PURE__*/React.createElement(DataTable, {
    columns: invCols,
    rows: invRows
  })));
}

// expose to in-browser Babel scope
window.SummaryScreen = SummaryScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/back-office/SummaryScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/back-office/Workflow.jsx
try { (() => {
/**
 * The green pennant/tag workflow node from the Start of Day flow:
 * a person glyph + checkmark in a green tag with a pointed right edge,
 * connected by a black baseline. Pending nodes render white/gray.
 */
function WorkflowNode({
  label,
  done = true
}) {
  const green = "var(--green-500)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 96,
      flex: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 3,
      height: 34,
      padding: "0 12px 0 8px",
      background: done ? green : "var(--white)",
      color: done ? "#fff" : "var(--gray-500)",
      border: done ? `1px solid var(--green-600)` : "1px solid var(--gray-400)",
      borderRadius: "4px",
      clipPath: "polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-user",
    style: {
      fontSize: 13
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: `fa ${done ? "fa-check" : "fa-circle"}`,
    style: {
      fontSize: 13
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--gray-700)",
      marginTop: 6,
      textAlign: "center",
      lineHeight: 1.2
    }
  }, label));
}

/** A horizontal workflow chain: nodes joined by a black baseline. */
function WorkflowChain({
  nodes
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      position: "relative",
      padding: "4px 0 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 21,
      left: 12,
      right: 12,
      height: 2,
      background: "var(--black)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 80,
      position: "relative"
    }
  }, nodes.map((n, i) => /*#__PURE__*/React.createElement(WorkflowNode, {
    key: i,
    label: n.label,
    done: n.done !== false
  }))));
}

// expose to in-browser Babel scope
window.WorkflowNode = WorkflowNode;
window.WorkflowChain = WorkflowChain;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/back-office/Workflow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/back-office/WorkflowScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Start of Day workflow screen — KPI row, control strip, module
 * column, and the workflow chains. Composes DS primitives
 * (KpiCard, DateSelector, ModuleButton, Button) + kit Workflow nodes.
 */
function WorkflowScreen({
  DS,
  Workflow,
  businessDate,
  onPrevDay,
  onNextDay
}) {
  const {
    KpiCard,
    DateSelector,
    ModuleButton,
    Button
  } = DS;
  const {
    WorkflowChain
  } = Workflow;
  const kpis = [{
    title: "Forecasted Sales",
    primary: "$7,578.23",
    secondary: "$7,544.66"
  }, {
    title: "Actual Sales",
    primary: "$7,662.63",
    secondary: "$7,661.07"
  }, {
    title: "Variance (Act vs Ideal)",
    primary: "3.43",
    secondary: "5.13"
  }, {
    title: "Labor %",
    primary: "16.83%",
    secondary: "13.13%"
  }, {
    title: "OT Hours",
    primary: "0.00",
    secondary: "0.00"
  }, {
    title: "Actual ICOS %",
    primary: "(2.83%)",
    secondary: "(15.23%)",
    negative: true
  }];
  const modules = [{
    label: "Cash and Sales",
    icon: "fa-cash-register"
  }, {
    label: "Forecast",
    icon: "fa-chart-line"
  }, {
    label: "Food Management",
    icon: "fa-utensils"
  }, {
    label: "Labor Management",
    icon: "fa-helmet-safety"
  }, {
    label: "Payroll Management",
    icon: "fa-money-check-dollar"
  }];
  const chains = [[{
    label: "Previous Day Cash and Sales"
  }], [{
    label: "Review Forecast"
  }], [{
    label: "Print Prep Guide"
  }, {
    label: "Print Bin Guide"
  }, {
    label: "Receiving"
  }, {
    label: "Transfer In/Out"
  }, {
    label: "Waste"
  }, {
    label: "Ordering"
  }], [{
    label: "Schedule"
  }, {
    label: "Edit Punches"
  }, {
    label: "Approve Timecards",
    done: false
  }]];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "var(--surface-toolbar)",
      border: "1px solid var(--gray-300)",
      borderRadius: "var(--radius-sm)",
      padding: "10px 12px",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("select", {
    style: {
      height: 32,
      border: "1px solid var(--gray-400)",
      borderRadius: 3,
      padding: "0 8px",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("option", null, "Yesterday"), /*#__PURE__*/React.createElement("option", null, "Today"), /*#__PURE__*/React.createElement("option", null, "Custom")), /*#__PURE__*/React.createElement("input", {
    defaultValue: "1018, Eden",
    style: {
      height: 32,
      width: 220,
      border: "1px solid var(--gray-400)",
      borderRadius: 3,
      padding: "0 8px",
      fontSize: "var(--text-sm)"
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "GO"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      fontSize: "var(--text-xs)",
      color: "var(--gray-700)",
      fontWeight: "var(--weight-bold)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Last Cash and Sales Polling : 04:15 AM EST"), /*#__PURE__*/React.createElement("span", null, "Last Timekeeping Polling : 02:05 AM EST"), /*#__PURE__*/React.createElement("span", null, "Last PMIX Polling : 08:01 AM EST")), /*#__PURE__*/React.createElement("i", {
    className: "fa fa-file-pdf",
    style: {
      color: "var(--red-600)",
      fontSize: 18
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa fa-rotate-right",
    style: {
      color: "var(--blue-500)",
      fontSize: 16
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement(DateSelector, {
    label: "Day",
    value: businessDate,
    onPrev: onPrevDay,
    onNext: onNextDay,
    style: {
      minWidth: 150
    }
  }), kpis.map(k => /*#__PURE__*/React.createElement(KpiCard, _extends({
    key: k.title
  }, k, {
    style: {
      flex: 1
    },
    width: undefined
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--white)",
      border: "1px solid var(--gray-300)",
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "var(--navy-900)",
      color: "#fff",
      padding: "8px 14px",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-bold)"
    }
  }, "Start of Day", /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 560,
      height: 18,
      background: "rgba(255,255,255,0.15)",
      borderRadius: 2,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "repeating-linear-gradient(135deg, var(--green-400) 0 10px, var(--green-500) 10px 20px)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#fff",
      color: "var(--gray-900)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      padding: "2px 8px",
      borderRadius: 2
    }
  }, "1/1")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      flex: "0 0 auto"
    }
  }, modules.map(m => /*#__PURE__*/React.createElement(ModuleButton, {
    key: m.label,
    label: m.label,
    icon: /*#__PURE__*/React.createElement("i", {
      className: `fa ${m.icon}`
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      overflowX: "auto"
    }
  }, chains.map((c, i) => /*#__PURE__*/React.createElement(WorkflowChain, {
    key: i,
    nodes: c
  }))))));
}

// expose to in-browser Babel scope
window.WorkflowScreen = WorkflowScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/back-office/WorkflowScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ModuleButton = __ds_scope.ModuleButton;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.KpiCard = __ds_scope.KpiCard;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.StatusLock = __ds_scope.StatusLock;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.WorkflowTask = __ds_scope.WorkflowTask;

__ds_ns.DateSelector = __ds_scope.DateSelector;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.SidebarNav = __ds_scope.SidebarNav;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
