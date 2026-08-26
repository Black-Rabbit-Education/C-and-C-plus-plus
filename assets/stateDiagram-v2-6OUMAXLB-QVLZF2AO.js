import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-HZFXJNBX.js";
import "./chunk-DKBL5IWT.js";
import "./chunk-OCUSDMU6.js";
import "./chunk-WO6RAN72.js";
import "./chunk-OVB53EUQ.js";
import "./chunk-WBKQ4HGQ.js";
import "./chunk-DVOYKHN3.js";
import "./chunk-U3PDN3TP.js";
import "./chunk-OX3ZSLOR.js";
import "./chunk-PC2HJNTU.js";
import "./chunk-MKXD5PKQ.js";
import "./chunk-HRHBLNUP.js";
import "./chunk-5XVBHQT7.js";
import "./chunk-FRFAVM5R.js";
import "./chunk-QBBE6XKG.js";
import "./chunk-WJQF57YW.js";
import "./chunk-3LKKL5XU.js";
import {
  __name
} from "./chunk-YJ72FJSK.js";
import "./chunk-TRTQSARU.js";

// ../../node_modules/mermaid/dist/chunks/mermaid.core/stateDiagram-v2-6OUMAXLB.mjs
var diagram = {
  parser: stateDiagram_default,
  get db() {
    return new StateDB(2);
  },
  renderer: stateRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.state) {
      cnf.state = {};
    }
    cnf.state.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
  }, "init")
};
export {
  diagram
};
