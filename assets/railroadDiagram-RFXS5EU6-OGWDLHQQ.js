import {
  db,
  getStyles,
  renderer
} from "./chunk-WOKTYWZZ.js";
import {
  populateCommonDb
} from "./chunk-5SH2GAVV.js";
import "./chunk-2T36Y5LB.js";
import {
  MermaidParseError
} from "./chunk-IHBTCTDP.js";
import "./chunk-Y6H7JP4H.js";
import "./chunk-T3KD3WEI.js";
import "./chunk-WVSCUTQ2.js";
import "./chunk-LEAQ3WHR.js";
import "./chunk-2WVQUDXN.js";
import "./chunk-D334IIHC.js";
import "./chunk-RRUFYFOP.js";
import {
  createRailroadServices
} from "./chunk-YZMRXILK.js";
import "./chunk-AOQJWOXQ.js";
import "./chunk-D5NZFYKW.js";
import "./chunk-7BGPGTO3.js";
import "./chunk-2WKWGA4W.js";
import "./chunk-GW5WY5FI.js";
import "./chunk-ROKY376Z.js";
import "./chunk-KVXW4U7R.js";
import "./chunk-ZCAZ5UNX.js";
import "./chunk-WJQF57YW.js";
import {
  log
} from "./chunk-3LKKL5XU.js";
import {
  __name
} from "./chunk-YJ72FJSK.js";
import "./chunk-TRTQSARU.js";

// ../../node_modules/mermaid/dist/chunks/mermaid.core/railroadDiagram-RFXS5EU6.mjs
var langiumParser = createRailroadServices().Railroad.parser.LangiumParser;
var transformExpression = /* @__PURE__ */ __name((expr) => {
  switch (expr.$type) {
    case "RailroadTerminalExpr":
      return {
        type: "terminal",
        value: expr.value
      };
    case "RailroadNonTerminalExpr":
      return {
        type: "nonterminal",
        name: expr.name
      };
    case "RailroadSpecialExpr":
      return {
        type: "special",
        text: expr.text
      };
    case "RailroadSequenceExpr": {
      const elements = expr.elements.map(transformExpression);
      return elements.length === 1 ? elements[0] : { type: "sequence", elements };
    }
    case "RailroadChoiceExpr": {
      const alternatives = expr.alternatives.map(transformExpression);
      return alternatives.length === 1 ? alternatives[0] : { type: "choice", alternatives };
    }
    case "RailroadOptionalExpr":
      return {
        type: "optional",
        element: transformExpression(expr.element)
      };
    case "RailroadOneOrMoreExpr":
      return {
        type: "repetition",
        element: transformExpression(expr.element),
        min: 1,
        max: Infinity
      };
    case "RailroadZeroOrMoreExpr":
      return {
        type: "repetition",
        element: transformExpression(expr.element),
        min: 0,
        max: Infinity
      };
    default:
      throw new Error(`Unsupported railroad expression: ${expr.$type}`);
  }
}, "transformExpression");
var transformRule = /* @__PURE__ */ __name((rule) => {
  return {
    name: rule.name,
    definition: transformExpression(rule.definition)
  };
}, "transformRule");
var populateDb = /* @__PURE__ */ __name((ast) => {
  populateCommonDb(ast, db);
  if (ast.title) {
    db.setTitle(ast.title);
  }
  ast.rules.map((rule) => db.addRule(transformRule(rule)));
}, "populateDb");
var parser = {
  parse: /* @__PURE__ */ __name((input) => {
    db.clear();
    log.debug("[Railroad Parser] Starting Langium parse");
    const result = langiumParser.parse(input);
    if (result.lexerErrors.length > 0 || result.parserErrors.length > 0) {
      throw new MermaidParseError(result);
    }
    const ast = result.value;
    log.debug("[Railroad Parser] Parsed rules:", ast.rules.length);
    populateDb(ast);
    log.debug("[Railroad Parser] Parse complete");
  }, "parse"),
  parser: {
    yy: db
  }
};
var diagram = {
  parser,
  db,
  renderer,
  styles: getStyles
};
var railroadDiagram_default = diagram;
export {
  railroadDiagram_default as default,
  diagram
};
