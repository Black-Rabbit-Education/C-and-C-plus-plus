import {
  AbstractMermaidTokenBuilder,
  CommonValueConverter,
  CynefinGrammarGeneratedModule,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject
} from "./chunk-ZCAZ5UNX.js";

// ../../node_modules/mermaid/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-OSBZ3O6U.mjs
var CynefinTokenBuilder = class extends AbstractMermaidTokenBuilder {
  static {
    __name(this, "CynefinTokenBuilder");
  }
  constructor() {
    super(["cynefin-beta"]);
  }
};
var CynefinModule = {
  parser: {
    TokenBuilder: /* @__PURE__ */ __name(() => new CynefinTokenBuilder(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ __name(() => new CommonValueConverter(), "ValueConverter")
  }
};
function createCynefinServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const Cynefin = inject(
    createDefaultCoreModule({ shared }),
    CynefinGrammarGeneratedModule,
    CynefinModule
  );
  shared.ServiceRegistry.register(Cynefin);
  return { shared, Cynefin };
}
__name(createCynefinServices, "createCynefinServices");

export {
  CynefinModule,
  createCynefinServices
};
