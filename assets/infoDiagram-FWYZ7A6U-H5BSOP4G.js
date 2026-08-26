import {
  selectSvgElement
} from "./chunk-2T36Y5LB.js";
import {
  parse
} from "./chunk-IHBTCTDP.js";
import "./chunk-Y6H7JP4H.js";
import "./chunk-T3KD3WEI.js";
import "./chunk-WVSCUTQ2.js";
import "./chunk-LEAQ3WHR.js";
import "./chunk-2WVQUDXN.js";
import "./chunk-D334IIHC.js";
import "./chunk-RRUFYFOP.js";
import "./chunk-YZMRXILK.js";
import "./chunk-AOQJWOXQ.js";
import "./chunk-D5NZFYKW.js";
import "./chunk-7BGPGTO3.js";
import "./chunk-2WKWGA4W.js";
import "./chunk-GW5WY5FI.js";
import "./chunk-ROKY376Z.js";
import "./chunk-KVXW4U7R.js";
import "./chunk-ZCAZ5UNX.js";
import {
  configureSvgSize
} from "./chunk-WJQF57YW.js";
import {
  log
} from "./chunk-3LKKL5XU.js";
import {
  __name
} from "./chunk-YJ72FJSK.js";
import "./chunk-TRTQSARU.js";

// ../../node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-FWYZ7A6U.mjs
var parser = {
  parse: /* @__PURE__ */ __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = {
  version: "11.16.0" + (true ? "" : "-tiny")
};
var getVersion = /* @__PURE__ */ __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = /* @__PURE__ */ __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
